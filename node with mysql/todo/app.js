const express = require("express");
const app = express();
const LocalStorage = require("node-localstorage").LocalStorage;
const localstorage = new LocalStorage("./scratch");

const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist",
});
con.connect();

app.set("view engine", "ejs");
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/admin", function (req, res) {
  res.render("admin");
});

app.get("/add_admin", function (req, res) {
  res.render("add_admin");
});

app.post("/add_admin", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var query =
    "insert into admin(username,password) values('" +
    username +
    "','" +
    password +
    "')";

  con.query(query, function (error, result, index) {
    if (error) throw error;
    res.redirect("/");
  });
});

app.post("/admin", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var query =
    "select * from admin where username = '" +
    username +
    "' and password = '" +
    password +
    "'";

  con.query(query, function (error, result, index) {
    if (error) throw error;
    if (result.length == 1) {
      localstorage.setItem("login", true);
      res.redirect("/admin_main");
    } else {
      res.redirect("/admin");
    }
  });
});
app.get("/admin_main", function (req, res) {
  if (localstorage.getItem("login") === "true") {
    // Compare with 'true' as a string
    res.render("admin_main");
  } else {
    res.redirect("/admin");
  }
});

app.get("/logout", function (req, res) {
  localstorage.clear("login");
  res.redirect("/admin");
});
app.get("/user", function (req, res) {
  res.render("user");
});
app.get("/add_user", function (req, res) {
  res.render("add_user");
});
app.post("/add_user", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var query =
    "insert into user(username,password) values('" +
    username +
    "','" +
    password +
    "')";

  con.query(query, function (error, result, index) {
    if (error) throw error;
    res.redirect("/user");
  });
});
// app.get('/view_user',function(req,res){
//     res.render("view_user")
// })
app.get("/view_user", function (req, res) {
  if (localstorage.getItem("login") === "true") {
    var query = "SELECT * FROM user";

    con.query(query, function (error, result, index) {
      if (error) throw error;
      res.render("view_user", { result: result });
    });
  } else {
    res.redirect("/admin");
  }
});
// Add this route to render the add_task page
app.get("/add_task", function (req, res) {
    if (localstorage.getItem("login") === "true")
    // Fetch users from the user table
   { var query = "SELECT * FROM user";
    con.query(query, function (error, result, index) {
      if (error) throw error;
      res.render("add_task", { result: result });
    });}else{
        res.redirect("/admin_main")
    }
  });
  
  // Handle the form submission to add a task
  app.post("/add_task", function (req, res) {
    if (localstorage.getItem("login") === "true")
   { var taskname = req.body.taskname;
    var employeeId = req.body.employee;
    var startDate = req.body.startdate;
    var endDate = req.body.enddate;
  
    // Insert the task into the task table with the selected employee
    var query =
      "INSERT INTO task (taskname, employee, startdate, enddate) VALUES (?, ?, ?, ?)";
    con.query(query, [taskname, employeeId, startDate, endDate], function (error, result) {
      if (error) throw error;
      res.redirect("/admin_main");
    });}else{
        res.redirect("/admin");

    }
  });
app.get("/view_task",function(req,res){
    if (localstorage.getItem("login") === "true") {
        var query = "SELECT * FROM task";
    
        con.query(query, function (error, result, index) {
          if (error) throw error;
          res.render("view_task", { result: result });
        });
      } else {
        res.redirect("/admin");
      }
})  
// Handle the delete task request
app.post("/delete_task", function (req, res) {
    if (localstorage.getItem("login") === "true") {
        var taskId = req.body.task_id;
        var query = "DELETE FROM task WHERE id = ?";
        con.query(query, [taskId], function (error, result) {
            if (error) throw error;
            res.redirect("/view_task");
        });
    } else {
        res.redirect("/admin");
    }
});

// Route to render the update task page
app.get("/update_task/:taskId", function (req, res) {
    if (localstorage.getItem("login") === "true") {
        var taskId = req.params.taskId;
        var query = "SELECT * FROM task WHERE id = ?";
        con.query(query, [taskId], function (error, result) {
            if (error) throw error;
            // Convert dates to string for proper rendering in the update form
            result[0].startdate = result[0].startdate.toISOString().split('T')[0];
            result[0].enddate = result[0].enddate.toISOString().split('T')[0];
            res.render("update_task", { task: result[0] });
        });
    } else {
        res.redirect("/admin");
    }
});



// Handle the update task request
app.post("/update_task/:taskId", function (req, res) {
    if (localstorage.getItem("login") === "true") {
        var taskId = req.params.taskId;
        var taskname = req.body.taskname;
        var employeeId = req.body.employee;
        var startDate = req.body.startdate;
        var endDate = req.body.enddate;

        var query =
            "UPDATE task SET taskname = ?, employee = ?, startdate = ?, enddate = ? WHERE id = ?";
        con.query(
            query,
            [taskname, employeeId, startDate, endDate, taskId],
            function (error, result) {
                if (error) throw error;
                res.redirect("/view_task");
            }
        );
    } else {
        res.redirect("/admin");
    }
});

app.get("/login", function (req, res) {
  res.render("login");
});
app.get("/user_main", function (req, res) {
  res.render("user_main");
});

app.post("/login", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var query =
    "select * from user where username = '" +
    username +
    "' and password = '" +
    password +
    "'";

  con.query(query, function (error, result, index) {
    if (error) throw error;
    console.log(result.length);
    if (result.length) {
      localstorage.setItem("login_user", true);
      localstorage.setItem("username", username);
      res.redirect("/user_main");
    } else {
      res.redirect("/login");
    }
  });
});
app.get("/view_user_task", function (req, res) {
  if (localstorage.getItem("login_user") === "true") {
      var username = localstorage.getItem("username"); 

      console.log("Username:", username);

      var query = "SELECT * FROM task WHERE employee = (SELECT id FROM user WHERE username = ?)";
      console.log("SQL Query:", query);
      con.query(query, [username], function (error, result) {
          if (error) {
              console.error(error);
              throw error; 
          }

          console.log("Query result:", result); 

          res.render("view_user_task", { tasks: result });
      });
  } else {
      res.redirect("/login");
  }
});

app.post("/accept_task", function (req, res) {
  var taskId = req.body.task_id;
  var query = "UPDATE task SET status = 'Accepted' WHERE id = ?";
  con.query(query, [taskId], function (error, result) {
      if (error) {
          console.error("Error accepting task:", error);
          throw error;
      }
      res.redirect("/view_user_task");
  });
});

app.post("/decline_task", function (req, res) {
  var taskId = req.body.task_id;
  var query = "UPDATE task SET status = 'Declined' WHERE id = ?";
  con.query(query, [taskId], function (error, result) {
      if (error) {
          console.error("Error declining task:", error);
          throw error;
      }
      res.redirect("/view_user_task");
  });
});

app.get("/accepted", function(req, res) {
  var query = "SELECT * FROM task WHERE status = 'Accepted'";
  con.query(query, function(error, result) {
      if (error) {
          throw error;
      }
      res.render("accepted", { tasks: result });
  });
});

app.get("/decline", function(req, res) {
  var query = "SELECT * FROM task WHERE status = 'Declined'";
  con.query(query, function(error, result) {
      if (error) {
          throw error;
      }
      res.render("decline", { tasks: result });
  });
});

app.listen(3000);
