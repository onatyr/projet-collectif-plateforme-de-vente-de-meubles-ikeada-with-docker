import { supabase } from "./app.js"
import { checkAdmin } from "./postController.js";

// GET ALL
export const getAllItems = async (req, res) => {
  const { data, error } = await supabase
    .from("ITEM")
    .select()
  if (await checkAdmin(req) == false) {
    data = data.filter((e) => e.status == true)
  }

  if (error) {
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
};

// SEARCH ITEM BY NAME OR DESC
export const searchByNameDesc = async (req, res) => {

  const searchRequest = req.params.name.split(" ");

  const data = [];
  const error = "";

  const { data: nameData, error: nameError } = await supabase
    .from("ITEM")
    .select()
    .ilikeAnyOf("name", searchRequest.map((e) => `%${e}%`))

  data = data.concat(nameData);

  const { data: descData, error: descErr } = await supabase
    .from("ITEM")
    .select()
    .textSearch("desc", searchRequest.map((e) => `'${e}'`).join(" | "));
  data = data.concat(descData);

  if (await checkAdmin(req) == false) {
    data = data.filter((e) => e.status == true)
  }

  if (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
};


// GET BY ID
export const getItemById = async (req, res) => {
  const itemId = req.params.id;

  const { data, error } = await supabase
    .from("ITEM")
    .select(`
    *,
    item_colors:COLOR(*),
    sub_categ:SUB_CATEG(name, room:CATEG(name));
  `)
    .eq("id", itemId);

  if (error) {
    res.status(500).json({ error: "Une erreur s'est produite", message: error.message });
  } else if (
    data.filter((e) => e.status == false).length > 0 &&
    await checkAdmin(req) == false
  ) {
    res.status(561).json("Check your privileges");
  } else {
    res.status(200).json(data);
  }
};

// GET ALL CATS
export const getAllCategories = async ( res) => {
  const { data, error } = await supabase.from("CATEG").select();
  // .eq('name', 'Cuisine') // Permet d'affiner l'affichage par catégorie.
  if (error) {
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
};

// GET COLOR LIST
export const getColorList = async (req, res) => {
  const { data, error } = await supabase.from("COLOR").select();
  if (error) {
    res.status(500).send("Erreur lors de la récupération de la liste des couleurs" + error);
  } else {
    res.status(200).send(data);
  }
};

// GET SUB_CATS
export const getAllSubcategories = async (req, res) => {
  const { data, error } = await supabase.from("SUB_CATEG").select();
  // .eq('name', 'Canapés') // Permet d'affiner l'affichage par sous catégorie.
  if (error) {
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
};

// SEARCH CAT BY KEYWORD
export const searchCategory = async (req, res) => {
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
};

// SEARCH SUB_CAT BY ID
export const searchSubcategory = async (req, res) => {
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
    if(error) {
      return res.status(404).send("Erreur : " + error)
    }
    res.status(200).send(data);
  }
};