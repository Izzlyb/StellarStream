import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const SERVER_URI = process.env.MONGODB_DATABASE_THSS_URI;

if( SERVER_URI == "" ) {
  console.log("Missing the database URI:🔴");
} else {
  console.log(`connecting to MongoDB >${SERVER_URI}<🟠`);
};

const connectDB = async () => {
  try {

    await mongoose.connect(SERVER_URI);
    console.log(`Successfully connnected to mongoDB 👍`);

  } catch (error) {
    // error with connection:
    console.log("Connection to database failed:🚫🔴");

    console.error(`ERROR: ${error.message}`);

    process.exit(1);
  }
};

export default connectDB;
