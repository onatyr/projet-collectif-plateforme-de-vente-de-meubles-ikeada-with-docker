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

//---> DEBUT ROOTING PUBLIC GET

//affiche tous les meubles

app.get("/items", async (req, res) => {
  const { data, error } = await supabase
    .from("ITEM")
    .select()
    .eq("status", true);

  if (error) {
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
});

//affiche les meubles selon le nom du produit

app.get("/items/:name", async (req, res) => {
  const itemName = req.params.name;
  console.log("Requête avec name:", itemName); // Ajout de ce message de débogage

  const { data, error } = await supabase
    .from("ITEM")
    .select()
    .eq("name", itemName);

  if (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
});

//affiche les meubles selon l'id du produit

app.get("/items/id/:id", async (req, res) => {
  const itemId = req.params.id;

  const { data, error } = await supabase.from("ITEM").select().eq("id", itemId);

  if (error) {
    console.error(error);

    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
});

// Public GET category
// Affiche toutes les catégories de mobilier
app.get("/category", async (req, res) => {
  const { data, error } = await supabase.from("CATEG").select();
  // .eq('name', 'Cuisine') // Permet d'affiner l'affichage par catégorie.
  if (error) {
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
});

// Public GET sub_category
// Affiche toutes les sous-catégories de mobilier
app.get("/sub_category", async (req, res) => {
  const { data, error } = await supabase.from("SUB_CATEG").select();
  // .eq('name', 'Canapés') // Permet d'affiner l'affichage par sous catégorie.
  if (error) {
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
});

// GET Public catégories
// Recherche par motclé des catégories
app.get("/search_bar/category/:motcle", async (req, res) => {
  const motCle = req.params.motcle;
  console.log(motCle);
  if (!motCle) {
    return res
      .status(400)
      .json({ error: "Le paramètre 'motcle' est manquant dans l'URL." });
  } else {
    const { data, error } = await supabase
      .from("CATEG")
      .select()
      .textSearch("name", motCle);
    console.log("resultat:", data);
    res.status(200).json(data);
  }
});
// Fin GET Public catégories

// GET Public Sous catégories
// Sous catégories
app.get("/search_bar/sub_categ/:motcle", async (req, res) => {
  const motCle = req.params.motcle;
  console.log(motCle);
  if (!motCle) {
    return res
      .status(400)
      .json({ error: "Le paramètre 'motcle' est manquant dans l'URL." });
  } else {
    const { data, error } = await supabase
      .from("SUB_CATEG")
      .select()
      .textSearch("name", motCle);
    console.log("resultat:", data);
    res.status(200).json(data);
  }
});
// Fin GET Public catégories
//---> FIN ROOTING PUBLIC GET

//---> DEBUT ROOTING BO

// Check en premier si jeton JWT valide et si c'est le jeton de l'admin
app.use("/admin/*", checkAuth, checkAdmin, (req, res, next) => {
  next();
});

//Requête d'ajout d'un item dans le BackOffice
app.post("/admin/postItem", checkAdmin, async (req, res) => {
  const jsonData = req.body;

  const { data, error } = await supabaseAd.from("ITEM").insert([jsonData]);

  if (error) {
    return res
      .status(500)
      .send("Erreur lors de l'enregistrement des données dans Supabase.");
  }

  return res.send(
    "Données enregistrées avec succès dans Supabase. Nouveau meuble ajouté dans le BackOffice."
  );
});

//Requête d'ajout d'un item dans le BackOffice
app.post("/admin/postColor", checkAdmin, async (req, res) => {
  const jsonData = req.body;

  const { data, error } = await supabaseAd.from("COLOR").insert([jsonData]);

  if (error) {
    return res
      .status(500)
      .send("Erreur lors de l'enregistrement des données dans Supabase.");
  }

  return res.send(
    "Données enregistrées avec succès dans Supabase. Nouvelle couleur ajoutée dans le BackOffice."
  );
});

//Requête d'ajout de catégories dans le BackOffice
app.post("/admin/postCateg", checkAdmin, async (req, res) => {
  const jsonData = req.body;

  const { data, error } = await supabaseAd.from("CATEG").insert([jsonData]);

  if (error) {
    return res
      .status(500)
      .send("Erreur lors de l'enregistrement des données dans Supabase.");
  }

  return res.send(
    "Données enregistrées avec succès dans Supabase. Nouvelle catégorie ajoutée dans le BackOffice."
  );
});

//Requête d'ajout d'une sous-catégorie dans le BackOffice
app.post("/admin/postSubCateg", checkAdmin, async (req, res) => {
  const jsonData = req.body;

  const { data, error } = await supabaseAd.from("SUB_CATEG").insert([jsonData]);

  if (error) {
    return res
      .status(500)
      .send("Erreur lors de l'enregistrement des données dans Supabase.");
  }

  return res.send(
    "Données enregistrées avec succès dans Supabase. Nouvelle sous-catégorie ajoutée dans le BackOffice."
  );
});

//---> FIN ROOTING BO

//---> Fonctions Check pour les requetes BO

// func pour checker le token des requetes sur le BO
function checkAuth(req, res, next) {
  // Recupère l' access token du header de la requète
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      // Verifie le token avec la clef secrète
      const decoded = jwt.verify(token, process.env.SUPABASE_TOKEN);
      req.userData = decoded;
      // S'il est possible de le decoder alors on passe au prochains middleware
      next();
    } catch (err) {
      return res.status(401).json({
        message: "Auth failed",
      });
    }
  } else {
    res.status(401);
  }
}

function checkAdmin(req, res, next) {
  // Verifie si l'user enregeristré dans le jeton JWT correspond a l'Admin
  if (req.userData.sub == "2e0ab73d-47b8-4ee2-8f43-e22fe8a63dce") {
    next();
  } else {
    res.status(401);
  }
}

export default app;
