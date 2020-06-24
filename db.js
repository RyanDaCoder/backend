/** Database setup for users. */
const { Client } = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {  
    DB_URI = "postgresql:///users_test";
} else {
    DB_URI = "postgresql:///leaderboard";
}

let db = new Client({
    connectionString: DB_URI
});
try {
db.connect();
}
catch(err) {
    console.log("Your DB isn't connecting", err)
}
module.exports = db;  

 
 
  