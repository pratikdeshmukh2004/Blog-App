module.exports = (app,knex,jwt)=>{

    app.post("/",(req,res)=>{
        console.log(req.body);
        
        if (req.body.Name !== undefined && req.body.Email !== undefined && req.body.Password !== undefined){
            knex.select("*").from("users").where("Email",req.body.Email)
            .then((resp)=>{
                console.log(resp);
                
                if (resp.length>0){
                    res.send({"Error":"This User already Exists Please Login"})
                }else{
                    knex("users").insert(req.body)
                    .then((id)=>{
                        var token=jwt.sign({id:id},"123", {expiresIn: "1h"})
                        res.send({"Success":"Your User Id is : "+id[0],"Token":token})
                    })
                }
            })
        }else{
            res.send({"Error":"Please Fill Information In Body...","Hint":{
                "Name":"Username",
                "Email":"example@gmail.com",
                "Password":"password"
            }})
        }
    })

}