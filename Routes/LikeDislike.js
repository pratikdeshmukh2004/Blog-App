module.exports = (app, knex, jwt) => {

    app.post("/", (req, res) => {
        console.log(req.headers.cookie);

        if (req.headers.cookie !== "" && req.headers.cookie !== undefined) {
            var token = req.headers.cookie.slice(4)
            if (req.body.Like !== undefined && req.body.Dislike !== undefined && req.body.postId !== undefined) {
                var decoded = jwt.verify(token, "123")
                if (req.body.Like && !req.body.Dislike || !req.body.Like && req.body.Dislike) {
                    knex("Posts").where("id", req.body.postId)
                        .then((data) => {
                            if (data.length > 0) {
                                knex("LikeDislike").where("postId", req.body.postId).andWhere("userId", decoded.id)
                                    .then((data) => {
                                        if (data.length > 0) {
                                            var dic = req.body
                                            dic["Date"] = new Date()
                                            knex("LikeDislike").update(dic)
                                                .then(() => {
                                                    res.send({ "Success": "You have done like or dislike on this post" })
                                                })
                                                .catch((err) => {
                                                    res.send(err)
                                                })
                                        } else {
                                            var dic = req.body
                                            dic["Date"] = new Date()
                                            dic.userId = decoded.id
                                            knex("LikeDislike").insert(dic)
                                                .then(() => {
                                                    res.send({ "Success": "You have done like or dislike on this post" })
                                                })
                                                .catch((err) => {
                                                    res.send(err)
                                                })
                                        }
                                    })
                            }else{
                                res.send({"Error":"This post is not Exists..."})
                            }
                        })
                } else {
                    res.send({ "Error": "Please Like Or Dislike Post..." })
                }
            } else {
                res.send({
                    "Error": "Please Fill Information In Body...", "Hint": {
                        "Text": "Enter your text.",
                        "Description": "Enter your description."
                    }
                })
            }
        } else {
            res.send({ "Error": "Please Login..." })
        }
    })
}