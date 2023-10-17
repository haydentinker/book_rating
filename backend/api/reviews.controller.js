const ReviewsDAO=require( "../dao/reviewsDAO.js")

class ReviewsController{
    static async apiPostReview(req,res,next){
        try{
            const restaurantId=req.restaurant_id
            const review=req.body.text
            const user_id=req.body.user_id
            const name=req.body.name
              
            console.log(name)
            const date= new Date()
            const ReviewResponse=await ReviewsDAO.addReview(
                restaurantId,
                user_id,
                "Hayden",
                "AWFUL",
                date,
            )
            res.json({status:"success"})
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }
    static async apiPutReview(req,res,next){
        try{
            const reviewId=req.body.review_id
            const review=req.body.text
            const date= new Date()

            const ReviewResponse=await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                review,
                date,
            )
            var {error}=ReviewResponse
            if(error){
                res.status(400).json({error})
            }
            if(ReviewResponse.modifiedCount===0){
                throw new Error(
                    "Unable to update review -user may not be original poster"
                )
            }
            res.json({status:"success"})
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }
    static async apiDeleteReview(req,res,next){
        try{
            const reviewId=req.query.review_id
            const userId=req.body.user_id
            console.log(reviewId)
            const ReviewResponse=await ReviewsDAO.deleteReview(
                reviewId,
                userId
            )
            res.json({status:"success"})
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }
}



module.exports= ReviewsController