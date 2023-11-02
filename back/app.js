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


// textSearch permet de faire une recherche (en lien avec la navbar côté front-end). 
// Celle-ci renvoie les chaises.
app.get('/search_bar/chaise', async (req, res) => {
    const { data, error } = await supabase
        .from('ITEM')
        .select()
        .textSearch('desc', 'chaise');
    if (error) {
        res.status(500).json({ error: "Une erreur s'est produite" });
    } else {
        res.status(200).json(data);
    }
});

// textSearch pour les armoires.
app.get('/search_bar/armoire', async (req, res) => {
const { data, error } = await supabase
        .from('ITEM')
        .select()
        .textSearch('desc', 'armoire');
    if (error) {
        res.status(500).json({ error: "Une erreur s'est produite" });
    } else {
        res.status(200).json(data);
    }
});

// textSearch pour les tables.
app.get('/search_bar/table', async (req, res) => {
const { data, error } = await supabase
        .from('ITEM')
        .select()
        .textSearch('desc', 'table');
    if (error) {
        res.status(500).json({ error: "Une erreur s'est produite" });
    } else {
        res.status(200).json(data);
    }
});

// textSearch pour les lits
app.get('/search_bar/lit', async (req, res) => {
const { data, error } = await supabase
        .from('ITEM')
        .select()
        .textSearch('desc', 'lit');
    if (error) {
        res.status(500).json({ error: "Une erreur s'est produite" });
    } else {
        res.status(200).json(data);
    }
});

// textSearch pour les canapés.
app.get('/search_bar/canape', async (req, res) => {
const { data, error } = await supabase
        .from('ITEM')
        .select()
        .textSearch('desc', 'canapé');
    if (error) {
        res.status(500).json({ error: "Une erreur s'est produite" });
    } else {
        res.status(200).json(data);
    }
});

export default app;