const express =require( "express")
const cors=require("cors")
const restaurants =require( "./api/restaurants.route.js")

const app = express()

//Setting middleware
app.use(cors())
//Body parser
app.use(express.json())


//Set routes
app.use("/api/v1/restaurants", restaurants)

app.use("*",(req,res)=>res.status(404).json({error:"not found"}))

module.exports= app