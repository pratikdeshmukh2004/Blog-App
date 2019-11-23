module.exports = (app, knex, jwt) => {

    app.get("/", (req, res) => {
        if (req.headers.cookie !== "" && req.headers.cookie !== undefined) {
            var token = req.headers.cookie.slice(4)
                jwt.verify(token,"123",(err,decoded)=>{
                    if (!err){
                       knex.select("*").from("Posts")
                       .then((data)=>{
                           res.send({"Counts":data.length,"Data":data})
                       })
                    }else {
                        console.log(err);
                        
                        res.send({"Error":"Please Login..."})
                    }
                })
        }else{
            res.send({"Error":"Please Login..."})
        }
    })
}