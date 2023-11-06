import { createClient } from "@supabase/supabase-js";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";


dotenv.config();
const app = express();
import route from './route.js';

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export const supabase = createClient(
  process.env.SUPABASE_AUTH_DOMAIN,
  process.env.SUPABASE_PU_API_KEY
);

export const supabaseAd = createClient(
  process.env.SUPABASE_AUTH_DOMAIN,
  process.env.SUPABASE_AD_API_KEY
);

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/ikeada", route)

export default app;
