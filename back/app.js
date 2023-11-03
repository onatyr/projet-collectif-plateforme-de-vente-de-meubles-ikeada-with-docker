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

//Requête d'ajout d'un item dans le BackOffice
app.post('admin/postItem', async (req, res) => {
    const jsonData = req.body;

    const { data, error } = await supabase.from('ITEM').insert([jsonData]);

    if (error) {
        return res.status(500).send('Erreur lors de l\'enregistrement des données dans Supabase.');
    }

    return res.send('Données enregistrées avec succès dans Supabase. Nouveau meuble ajouté dans le BackOffice.');
});

//Requête d'ajout d'un item dans le BackOffice
app.post('admin/postColor', async (req, res) => {
    const jsonData = req.body;

    const { data, error } = await supabase.from('COLOR').insert([jsonData]);

    if (error) {
        return res.status(500).send('Erreur lors de l\'enregistrement des données dans Supabase.');
    }

    return res.send('Données enregistrées avec succès dans Supabase. Nouvelle couleur ajoutée dans le BackOffice.');
});

//Requête d'ajout de catégories dans le BackOffice
app.post('admin/postCateg', async (req, res) => {
    const jsonData = req.body;

    const { data, error } = await supabase.from('CATEG').insert([jsonData]);

    if (error) {
        return res.status(500).send('Erreur lors de l\'enregistrement des données dans Supabase.');
    }

    return res.send('Données enregistrées avec succès dans Supabase. Nouvelle catégorie ajoutée dans le BackOffice.');
});

//Requête d'ajout d'une sous-catégorie dans le BackOffice
app.post('admin/postSubCateg', async (req, res) => {
    const jsonData = req.body;

    const { data, error } = await supabase.from('SUB_CATEG').insert([jsonData]);

    if (error) {
        return res.status(500).send('Erreur lors de l\'enregistrement des données dans Supabase.');
    }

    return res.send('Données enregistrées avec succès dans Supabase. Nouvelle sous-catégorie ajoutée dans le BackOffice.');
})

export default app;