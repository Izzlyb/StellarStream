import { mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if( `${process.env.MONGODB_DATABASE_TH_URI}` == "" ) {
  console.log("Missing the database URI:🔴");
} else {
  console.log(`connecting to MongoDB "${process.env.MONGODB_DATABASE_TH_URI}"🟠`);
};

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    // await mongoose.connect(process.env.MONGODB_DATABASE_TH_URI);
    console.log("🚜 MongoDB server connected: 👍");

    console.log("Server waiting for requests:🟢");

  } catch (error) {
    // error with connection:
    console.log("Connection to database failed:🔴");

    console.error( `ERROR: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;

