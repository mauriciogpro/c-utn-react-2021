  var mysql = require('mysql');

  // Create a connection
  var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "nodedb",

  })

  // Connect to MySQL
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to de DB");
    con.query("CREATE DATABASE nodedb", function(err , result) {
    if (err) throw err;
      console.log("Database created");
    });
  });
