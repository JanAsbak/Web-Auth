const mysql = require("mysql2");

// Voor dit project zonder dotenv omdat ik dat niet nodig vind
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "authenticationdb"
});

db.connect(err => {
    if (err) {
        console.log("Database connection failed");
    }
    else {
        console.log("Database connection established");
    }
});

module.exports = db;