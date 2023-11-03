import {createClient} from '@supabase/supabase-js';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const supabase = createClient('https://bbrfovbvfzeszrjnhsdp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicmZvdmJ2Znplc3pyam5oc2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NjQwMDAsImV4cCI6MjAxNDI0MDAwMH0.m59kFNiMCInEjaQcC-v32YOJ4JolEwE9dJruivGi5FQ');


//cors
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Public GET category
// Affiche toutes les catégories de mobilier
app.get('/category', async (req, res) => {
  const { data, error } = await supabase
  .from('CATEG')
  .select()
 // .eq('name', 'Cuisine') // Permet d'affiner l'affichage par catégorie.
  if (error) {
      res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
      res.status(200).json(data);
  }
});

// Public GET sub_category
// Affiche toutes les sous-catégories de mobilier
app.get('/sub_category', async (req, res) => {
    const { data, error } = await supabase
  .from('SUB_CATEG')
  .select()
  // .eq('name', 'Canapés') // Permet d'affiner l'affichage par sous catégorie.
  if (error) {
      res.status(500).json({ error: "Une erreur s'est produite" });
  } else {
      res.status(200).json(data);
  }
});

export default app;