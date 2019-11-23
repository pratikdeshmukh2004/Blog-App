module.exports = (app, knex, jwt) => {

    app.post("/", (req, res) => {
        console.log(req.headers.cookie);
        
        if (req.headers.cookie !== "" && req.headers.cookie !== undefined) {
            var token = req.headers.cookie.slice(4)
            if (req.body.Text !== undefined && req.body.Description !== undefined) {
                var decoded = jwt.verify(token,"123")
                var dic=req.body;
                dic["userId"]=decoded.id
                dic["Date"]=new Date()
                knex("Posts").insert(dic)
                .then((id)=>{
                    dic["id"]=id[0]
                    res.send(dic)
                })
                .catch((err)=>{
                    res.send("err in database.")
                })
            } else {
                res.send({
                    "Error": "Please Fill Information In Body...", "Hint": {
                        "Text": "Enter your text.",
                        "Description": "Enter your description."
                    }
                })
            }
        }else{
            res.send({"Error":"Please Login..."})
        }
    })
}