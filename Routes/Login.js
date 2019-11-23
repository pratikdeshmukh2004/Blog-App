module.exports = (app,knex,jwt)=>{

    app.post("/",(req,res)=>{   
        if (req.body.Email !== undefined && req.body.Password !== undefined){
            knex.select("*").from("users").where("Email",req.body.Email)
            .then((resp)=>{
                if (resp.length>0){
                    var token = jwt.sign({id:resp[0].id},"123",{ expiresIn: '1h'})
                    res.cookie("Key",token)
                    res.send({"Success":"Login Success go to home page http://localhost:8090/get_posts"})
                }else{
                    res.send({"Error":"This User Not Exists Please Signup..."})
                }
            })
        }else{
            res.send({"Error":"Please Fill Information In Body...","Hint":{
                "Email":"example@gmail.com",
                "Password":"password"
            }})
        }
    })

}