const mysql = require('mysql');


var connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee_database',
    multipleStatements: true

});

connection.connect(()=>{



    var sql = "CREATE TABLE register (id INT NOT NULL  AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) , name VARCHAR(255), password VARCHAR(255) )";
     
    
    connection.query(sql);
  


});



module.exports = connection;