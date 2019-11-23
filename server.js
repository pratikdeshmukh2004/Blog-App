const bodyParser = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const knex = require("knex")({
    client: "mysql",
    connection: {
        "host": "localhost",
        "user": "root",
        "password": "pratik",
        "database": "New_Project"
    }
});
var app = express()
app.use(bodyParser());
function Tables(){
    knex.schema.hasTable('users')
    .then((exists) => {
        if (!exists) {
            knex.schema.createTable('users', (t) => {
                t.increments('id').primary();
                t.string('Name', 100);
                t.string('Email', 100);
                t.string('Password', 100);
            })
                .then((done) => {
                    console.log("Table created...");

                })
        } else {
            console.log("Table Already Exist....");

        }
    });
    knex.schema.hasTable('Posts')
    .then((exists) => {
        if (!exists) {
            knex.schema.createTable('Posts', (t) => {
                t.increments('id').primary();
                t.integer('userId');
                t.string('Text');
                t.dateTime('Date');
                t.string('Description');
            })
                .then(() => {
                    console.log("Table created...");

                })
        } else {
            console.log("Table Already Exist....");

        }
    });
    knex.schema.hasTable('LikeDislike')
    .then((exists) => {
        if (!exists) {
            knex.schema.createTable('LikeDislike', (t) => {
                t.integer('postId');
                t.boolean('Like');
                t.boolean('Dislike');
                t.dateTime('Date');
                t.integer('userId');
            })
                .then(() => {
                    console.log("Table created...");

                })
        } else {
            console.log("Table Already Exist....");

        }
    });


}
Tables()
var Signup = express.Router()
app.use("/register", Signup);
require("./Routes/Register")(Signup, knex, jwt)

var Login = express.Router()
app.use("/login", Login);
require("./Routes/Login")(Login, knex, jwt)

var create_post = express.Router()
app.use("/create_post", create_post);
require("./Routes/Create_post")(create_post, knex, jwt)

var Get_posts = express.Router()
app.use("/get_posts", Get_posts);
require("./Routes/Get_posts")(Get_posts, knex, jwt)

var LikeDislike = express.Router()
app.use("/likedislike", LikeDislike);
require("./Routes/LikeDislike")(LikeDislike, knex, jwt)

var Get_LikeDislike = express.Router()
app.use("/get_likeDislike", Get_LikeDislike);
require("./Routes/Get_LikeDislike")(Get_LikeDislike, knex, jwt)

app.get("/logout",(req,res)=>{
    res.clearCookie("Key")
    res.send({"Success":"Logout Successful..."})
})

app.listen(8090, () => {
    console.log("Your app is runing on port : http://localhost:8090/login");
})