import app from "../app.js";
import cloudinary from "cloudinary";
import { dbConnection } from "../database/dbConnection.js";

let isInitialized = false;

const initialize = async () => {
  if (isInitialized) {
    return;
  }

  await dbConnection();

  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  isInitialized = true;
};

export default async function handler(req, res) {
  try {
    await initialize();
    return app(req, res);
  } catch (error) {
    console.error("Serverless initialization failed:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server initialization failed",
    });
  }
}