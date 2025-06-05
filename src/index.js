import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port :${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongo DB connection Failed !!! ", error);
  });

// import express from 'express'
// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// dotenv.config()

// const app = express()
// (async() => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
//     app.on('error', (error) => {
//       console.error('Server error:', error)
//       throw error
//     })

//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${process.env.PORT}`)
//     })

//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error)
//     throw error
//   }
// })()
