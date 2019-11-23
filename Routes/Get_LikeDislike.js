module.exports = (app, knex, jwt) => {

    app.get("/", (req, res) => {
        if (req.headers.cookie !== "" && req.headers.cookie !== undefined) {
            var token = req.headers.cookie.slice(4)
                var decoded = jwt.verify(token, "123")
                knex.select("*").from("Posts").join("LikeDislike",function(){
                    this.on("Posts.id","LikeDislike.postId")
                }).where("Posts.userId",decoded.id)
                .then((data) => {
                    console.log(data);
                    
                    var list=[]
                    var newlist=[]
                    for(dic of data){
                        if (!list.includes(dic.id)){
                            newlist.push(dic)
                            list.push(dic.id)
                        }else{
                            for (i of newlist){
                                console.log(i,dic);
                                
                                if (i.id===dic.id){
                                    i.Like=i.Like+dic.Like
                                    i.Dislike=i.Dislike+dic.Dislike
                                }
                            }
                        }
                    }
                    res.send(newlist)
                })
        } else {
            res.send({ "Error": "Please Login..." })
        }
    })
}