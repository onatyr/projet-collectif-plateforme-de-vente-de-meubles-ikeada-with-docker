// Importez les modules 
const http = require('http');
const app = require('./app.js');

// Définir les ports
const port = process.env.PORT || 3000;
app.set('port', port);

// Créez le serveur HTTP
const server = http.createServer(app);

// Ecoutez le port spécifié
server.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});
