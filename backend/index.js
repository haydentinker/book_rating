const mongodb= require('mongodb')
const dotenv=require('dotenv')
const app = require('./server'); 
const RestaurantsDAO= require("./dao/restaurantsDAO.js");
const ReviewsDAO = require('./dao/reviewsDAO');
dotenv.config()
const MongoClient=mongodb.MongoClient

const port =process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize:50,
        wtimeoutMS:25,
    },
).catch(err =>{
    console.error(err.stack)
    process.exit(1)
})
    .then(async client =>{
        await RestaurantsDAO.injectDB(client)
        await ReviewsDAO.injectDB(client)
        app.listen(port,()=>
        console.log(`listening on port ${port}`))
    })
