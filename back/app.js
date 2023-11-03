import { createClient } from "@supabase/supabase-js";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();
const app = express();

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const supabase = createClient(
  process.env.SUPABASE_AUTH_DOMAIN,
  process.env.SUPABASE_PU_API_KEY
);

const supabaseAd = createClient(
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

// GET Public catégories
// Recherche par motclé des catégories
app.get('/search_bar/category/:motcle', async(req, res) => {
    const motCle = req.params.motcle;
    console.log(motCle);
    if (!motCle) {
        return res.status(400).json({ error: "Le paramètre 'motcle' est manquant dans l'URL." });
    } else {
    const { data, error } = await supabase
    .from('CATEG')
    .select()
    .textSearch('name', motCle)
    console.log("resultat:", data);
        res.status(200).json(data);
    }
}); 
// Fin GET Public catégories


// GET Public Sous catégories
// Sous catégories
app.get("/search_bar/sub_categ/:motcle", async (req,res)=>{
    const motCle = req.params.motcle;
    console.log(motCle);
    if (!motCle) {
       return res.status(400).json({ error: "Le paramètre 'motcle' est manquant dans l'URL." });
    } else {
        const { data, error } = await supabase
        .from('SUB_CATEG')
        .select()
        .textSearch('name', motCle);
        console.log("resultat:", data);
        res.status(200).json(data);
    }
});
// Fin GET Public catégories


export default app;
