const express = require('express');
const app = new express();
const sql = require('mssql'); //Libreria per la connessione al dbms MSSQL
const CC = require('./CoordConverter.js');
const coordConverter =  new CC();
const cors = require ("cors");

//Importo la classe per le chiamate al DB
const sqlUtils = require('./SqlUtils.js'); 
app.use (cors());
app.get('/', function (req, res) {
   //Per connettermi al DB uso il metodo statico sqlUtils.connect
   //Passo come parametro la funzione sqlUtils.makeSqlRequest che verrà lanciata 
   //se la connessione al DB avrà successo  
   sqlUtils.connect(req,res, sqlUtils.makeSqlRequest);
});

/*ci_vettore:foglio è la route che ci permette di accedere ai dati dei fogli catastali ottiene i dati nella variabile req e li stampa nella console */
app.get('/ci_vettore/:foglio', function (req, res) {
    console.log(req.params.foglio);
    //richiamo il metodo che ottiene l'elenco dei vettori energetici
    sqlUtils.connect(req, res, sqlUtils.ciVettRequest);//qui utilizza il metodo ciVettRequest per ottenere e visualizzare i dati del foglio
 });




app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});