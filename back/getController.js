import { supabase } from "./app.js"
import { checkAdmin } from "./postController.js";
//affiche tous les meubles
export const getAllItems = async (req, res) => {
  let { data, error } = await supabase
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

//affiche les meubles selon le nom du produit ou sa description

export const searchByNameDesc = async (req, res) => {

  let searchRequest = req.params.name.split(" ");
  console.log("Requête avec name:", searchRequest);

  let data = [];
  let error = "";

  let { data: nameData, error: nameError } = await supabase
    .from("ITEM")
    .select()
    .ilikeAnyOf("name", searchRequest.map((e) => `%${e}%`))

  data = data.concat(nameData);

  let { data: descData, error: descErr } = await supabase
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

//affiche les meubles selon l'id du produit

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
    console.error(error);

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

// Affiche toutes les catégories de mobilier
export const getAllCategories = async (req, res) => {
  const { data, error } = await supabase.from("CATEG").select();
  // .eq('name', 'Cuisine') // Permet d'affiner l'affichage par catégorie.
  if (error) {
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
};

// Affiche toutes les catégories de mobilier
export const getColorList = async (req, res) => {
  const { data, error } = await supabase.from("COLOR").select();
  if (error) {
    res.status(500).send("Erreur lors de la récupération de la liste des couleurs");
  } else {
    res.status(200).json(data);
  }
};

// Affiche toutes les sous-catégories de mobilier
export const getAllSubcategories = async (req, res) => {
  const { data, error } = await supabase.from("SUB_CATEG").select();
  // .eq('name', 'Canapés') // Permet d'affiner l'affichage par sous catégorie.
  if (error) {
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
};

//Recherche une catégorie
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

// Recherche une sous catégorie
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
    console.log("resultat:", data);
    res.status(200).json(data);
  }
};