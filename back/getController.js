//affiche tous les meubles

exports.getAllItems =  async (req, res) => {
  let { data, error } = await supabase
    .from("ITEM")
    .select()
  if (checkAdmin(req) == false) {
    data = data.filter((e) => e.status == true)
  }

  if (error) {
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
};

//affiche les meubles selon le nom du produit ou sa description

exports.searchByNameDesc = async (req, res) => {

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

  if (checkAdmin(req) == false) {
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

exports.getItemById = async (req, res) => {
  const itemId = req.params.id;

  const { data, error } = await supabase
  .from("ITEM")
  .select(`
    *,
    colors:COLOR(*);
  `)
  .eq("id", itemId);

  if (error) {
    console.error(error);

    res.status(500).json({ error: "Une erreur s'est produite" });
  } else if (
    data.filter((e) => e.status == false).length > 0 &&
    checkAdmin(req) == false
  ) {
    res.status(561).json("Check your privileges");
  } else {
    res.status(200).json(data);
  }
};

// Affiche toutes les catégories de mobilier
exports.getAllCategories = async (req, res) => {
  const { data, error } = await supabase.from("CATEG").select();
  // .eq('name', 'Cuisine') // Permet d'affiner l'affichage par catégorie.
  if (error) {
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
};

// Affiche toutes les sous-catégories de mobilier
exports.getAllSubcategories = async (req, res) => {
  const { data, error } = await supabase.from("SUB_CATEG").select();
  // .eq('name', 'Canapés') // Permet d'affiner l'affichage par sous catégorie.
  if (error) {
    res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
    res.status(200).json(data);
  }
};

//Recherche une catégorie
exports.searchCategory = async (req, res) => {
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
exports.searchSubcategory = async (req, res) => {
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