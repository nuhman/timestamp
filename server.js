const express = require('express');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req, res) => {
    //res.sendFile(__dirname + '\\index.html');
    res.render("index.ejs", {name: 'nuhman'});
});

var monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];


app.get("/:date", (req, res) => {
    //res.sendFile(__dirname + '\\index.html');
    var param = urldecode(req.params.date);
    param = param.trim();    
    param = param.split('-').length > 1 ? param.split('-') : param;
    // dates with '-' follows 'yyyy-mm-dd' however url is mm-dd-yyyy
    var date, natural, unix;
    if(typeof param === "string"){   
        if (param.match(/[a-z]/i) || /\s/g.test(param)) { // does it contain alphabets or spaces in between?
            date = new Date(param);    
        } else{
            date = new Date(param * 1000);
            unix = param;
        }     
        
    } else {
        date = new Date(param[2], param[0] - 1, param[1]);        
    }         
    natural =  monthNames[date.getMonth()] + " " + date.getDate() +", " + date.getFullYear();
    if(!unix){
        unix = Date.parse( monthNames[date.getMonth()] + " " + date.getDate()+", " + date.getFullYear() );
        unix = unix/1000;
    }
    var data = {"unix":  unix, "natural": natural};
    var error = {"unix":  null, "natural": null};
    data = JSON.parse(JSON.stringify(data));    
    error = JSON.parse(JSON.stringify(error));    
    console.log(typeof data);
    // it is a date
    if ( isNaN( date.getTime() ) ) {  // d.valueOf() could also work
        // date is not valid
        re.send(error);
    }
    else {
        // date is valid        
        res.send(data);
    }          
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on 3000...");
});

console.log('May Node be with you');


function urldecode(str) {
    return decodeURIComponent((str+'').replace(/\+/g, '%20'));
 }
