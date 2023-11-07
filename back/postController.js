import { supabase } from "./app.js"
import { supabaseAd } from "./app.js"
import jwt from 'jsonwebtoken';

// Check en premier si jeton JWT valide et si c'est le jeton de l'admin
export const checkAuthAdmin = async (req, res, next) => {

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      // Verifie le token avec la clef secrète
      const decoded = jwt.verify(token, process.env.SUPABASE_TOKEN);
      req.userData = decoded;
      if (await checkAdmin(req) == false) {
        return res.status(401).send("Check your privileges");
      }
    } catch (err) {
      return res.status(401).json({
        message: "Auth failed",
        err,
      });
    }
  } else {
    res.status(401);
  }
  next();
};

// CREATION
export const postItem = async (req, res) => {
  const jsonData = req.body;
  if (jsonData.archived) {
    return res
      .status(403)
      .send(
        "Interdit : les items ne peuvent pas être créés et archivés en même temps"
      );
  }

  const { data, error } = await supabaseAd.from("ITEM").insert([jsonData])

  if (error) {
    return res
      .status(500)
      .send("Erreur lors de l'enregistrement des données dans Supabase :" + error.message);
  }

  return res.send(
    `Données enregistrées avec succès dans Supabase. Nouveau meuble ajouté dans le BackOffice : ${jsonData.name}`
  );
};

// MODIFICATION
export const editItem = async (req, res) => {
  const jsonData = req.body;
  if (jsonData.archived) {
    return res
      .status(403)
      .send(
        "Interdit : les items ne peuvent pas être modifiés et archivés en même temps"
      );
  } else {
    const { data, error } = await supabaseAd
      .from("ITEM")
      .update([jsonData])
      .eq("id", jsonData.id);

    if (error) {
      return res.status(403)
        .send(`Echec de la modification de l'item (nom :'${jsonData.name}', prix :'${jsonData.price}'), Supabase_error: ${error.message}
      `);
    }

    return res
      .status(201)
      .send(
        "Données enregistrées avec succès. Item modifié : " + jsonData.name
      );
  }
};

// ARCHIVAGE
export const archiveItem = async (req, res) => {
  const jsonData = req.body;

  const { data, error } = await supabaseAd
    .from("ITEM")
    .update([jsonData])
    .eq("id", jsonData.id);
  if (!jsonData.archived) {
    return res.status(403).send("La propriété 'archived' doit être modifiée");
  } else {
    if (error) {
      return res.status(403)
        .send(`Echec de l'archivage de l'item, assurez-vous de ne modifier que la propriété "archived"
       (nom :'${jsonData.name}',
       prix :'${jsonData.price}'),
      Supabase_error: ${error.message}
      `);
    }

    return res
      .status(201)
      .send("Données enregistrées avec succès. Archivé : " + jsonData.name);
  }
};

// RESTORATION
export const restoreItem = async (req, res) => {
  const jsonData = req.body;

  const { data, error } = await supabaseAd
    .from("ITEM")
    .update([jsonData])
    .eq("id", jsonData.id);
  if (jsonData.archived) {
    return res.status(403).send("La propriété 'archived' doit être modifiée");
  } else {
    if (error) {
      return res.status(403)
        .send(`Echec de la restoration de l'item, assurez-vous de ne modifier que la propriété "archived"
       (nom :'${jsonData.name}',
       prix :'${jsonData.price}'),
      Supabase_error: ${error.message}
      `);
    }

    return res
      .status(201)
      .send("Données enregistrées avec succès. Restauré : " + jsonData.name);
  }
};

// SUPPRESSION (Work In Progress :update or delete on table "ITEM" violates foreign key constraint
//"ITEM_COLOR_RELA_item_id_fkey" on table "ITEM_COLOR_RELA")
export const deleteItem = async (req, res) => {
  const jsonData = req.body;

  if (!jsonData.archived) {
    return res
      .status(403)
      .send("Interdit : les items doivent être archivés avant suppression");
  } else {
    const { data, error } = await supabaseAd
      .from("ITEM")
      .delete([jsonData])
      .eq("id", jsonData.id);

    if (error) {
      return res.status(404)
        .send(`Echec de la suppression de l'item (nom :'${jsonData.name}', prix :'${jsonData.price}'), Supabase_error: ${error.message}
      `);
    }

    return res
      .status(201)
      .send(
        "Données enregistrées avec succès. Item supprimé : " + jsonData.name
      );
  }
};

// CREATE COLOR
export const postColor = async (req, res) => {
  const jsonData = req.body;

  const { data, error } = await supabase.from("COLOR").insert([jsonData]);

  if (error) {
    return res
      .status(500)
      .send("Erreur lors de l'enregistrement des données dans Supabase.");
  }

  return res.send(
    "Données enregistrées avec succès dans Supabase. Nouvelle couleur ajoutée dans le BackOffice."
  );
};

// CREATE CAT
export const postCategory = async (req, res) => {
  const jsonData = req.body;

  const { data, error } = await supabase.from("CATEG").insert([jsonData]);

  if (error) {
    return res
      .status(500)
      .send("Erreur lors de l'enregistrement des données dans Supabase.");
  }

  return res.send(
    "Données enregistrées avec succès dans Supabase. Nouvelle catégorie ajoutée dans le BackOffice."
  );
};

// CREATE SUB_CAT
export const postSubcategory = async (req, res) => {
  const jsonData = req.body;

  const { data, error } = await supabase.from("SUB_CATEG").insert([jsonData]);

  if (error) {
    return res
      .status(500)
      .send("Erreur lors de l'enregistrement des données dans Supabase.");
  }

  return res.send(
    "Données enregistrées avec succès dans Supabase. Nouvelle sous-catégorie ajoutée dans le BackOffice."
  );
};

export async function checkAdmin(req) {
  // Verifie si l'user enregeristré dans le jeton JWT correspond a l'Admin
  if (!req.userData) {
    return false;
  }

  const { data, error } = await supabase.from('profiles').select().eq('id', req.userData.sub)

  if (data[0].admin == true) {
    return true;
  } else {
    return false;
  }
}
