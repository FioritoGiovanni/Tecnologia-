var express = require('express');
var app = express(); 

const path = require('path');

app.get('/', getcallback);   //metodo che ci permette di ottenere i dati della pagina iniziale del sito 
function getcallback(req,res) {
  res.sendFile(path.join(__dirname, 'index.html'));
}

app.get('/about',function(req,res){
 res.sendFile(path.join(__dirname, 'about.html')); //i metodi get seguenti simili al primo servono per le restanti pagine del sito da cui possiamo accedere tramite la navbar
});

app.get('/sitemap',function(req,res){
 res.sendFile(path.join(__dirname, 'sitemap.html')); //il costrutto __dirname affiancato dal nome del file ci permette di trovare il percorso del file senza doverlo scrivere a mano
});   //mentre join unisce le due componenti tra parentesi,inquesto caso il percorso ipotetico(__dirname) con il file effettivo(sitemap.html)

app.listen(3000, funzione);
function funzione() {
  console.log('Example app listening on port 3000!');
}