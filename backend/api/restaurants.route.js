const express = require('express');
const RestaurantsCtrl =require('./restaurants.controller.js')
const ReviewsCtrl=require('./reviews.controller.js')
const router=express.Router()

router.route("/").get(RestaurantsCtrl.apiGetRestaurants)
router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiPutReview)
    .delete(ReviewsCtrl.apiDeleteReview)
module.exports= router