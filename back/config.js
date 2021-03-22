require('dotenv').config();
const mysql=require('mysql2');
const mysql2=require('mysql2/promise');

const DB_Connect=mysql.createConnection({
        host:process.env.config_host,
        user:process.env.config_user,
        password:process.env.config_pass,
        database:process.env.config_db,
        charset : 'utf8'
    });

const pool = mysql2.createPool({
    host:process.env.config_host,
    user:process.env.config_user,
    password:process.env.config_pass,
    database:process.env.config_db,
});   



const mysql_escape=(str)=>{
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}

const body_escape=(body)=>{
    for (const property in body) {
        if(typeof(body[property])==='string') body[property]=mysql_escape(body[property]);
        if(typeof(body[property])==="object")body_escape(body[property]);
    } 
    return body;
}
module.exports={DB_Connect,mysql_escape,body_escape,pool};