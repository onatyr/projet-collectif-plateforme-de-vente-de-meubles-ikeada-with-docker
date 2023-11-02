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


export default app;