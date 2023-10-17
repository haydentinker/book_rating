const mongodb= require("mongodb")
const ObjectId=mongodb.ObjectId

let reviews

class ReviewsDAO{
    static async injectDB(conn){
            if (reviews){
                return
            }
            try {
                reviews=await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
            }catch(e){
                console.error(e)
            }
        }
    static async addReview(restaurant_id,user_id,name,review,date){
        try{
            const reviewDoc={name:name,
                            date:date,
                            text:review,
                            restaurant_id: new ObjectId(restaurant_id),
                            }
            console.log(reviewDoc)
            return await reviews.insertOne(reviewDoc)
        }catch(e){
            console.error(e)
            return {error:e}
        }
    }
    static async updateReview(review_id,user_id,text,date){
        try{
            const updateResponse=await reviews.updateOne(
                {user_id:user_id,_id:new ObjectId(review_id)},
                {$set:{text:text,date:date}},
            )
            return updateResponse
        }catch(e){
            console.error("Unable to update review")
            return {error:e}
        }
    }
    static async deleteReview(review_id,user_id){
        try{
            const deleteResponse=await reviews.deleteOne({
                _id: ObjectId(review_id),
                user_id:user_id
            })
            return deleteResponse
        }catch(e){
            console.error(e)
            return {error:e}
        }
    }
    }





module.exports= ReviewsDAO