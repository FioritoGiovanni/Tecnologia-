/*otteniamo il punto dove situare la mappa facendo la media di latitudine e longitudine è questo il modo per trovare il punto dove situare il centro della mappa perchè si presuppone che la media di tutti i punti riesca approssimativamente a ricoprire un area abbastanza vasta da includere tutti i punti da visualizzare*/


import { Component, OnInit } from '@angular/core';
import { GeoFeatureCollection } from './models/geojson.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ci_vettore } from './models/ci_vett.model';
import { Marker } from './models/marker.model';
import { MouseEvent } from '@agm/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ang-maps';
  // google maps zoom level
  zoom: number = 12;
  serverUrl : string = "http://https://3000-c196f089-0985-4196-a119-21cde0085783.ws-eu01.gitpod.io/";
  geoJsonObject: GeoFeatureCollection; //Oggetto che conterrà il vettore di GeoJson
  fillColor: string = "#FF0000";  //Colore delle zone catastali
  obsGeoData: Observable<GeoFeatureCollection>;
  lng: number = 9.205331366401035;
  lat: number = 45.45227445505016;
  obsCiVett : Observable<Ci_vettore[]>
  markers: Marker[];
  foglio : string;
  circleLat : number = 0; //Latitudine e longitudine iniziale del cerchio
  circleLng: number = 0;
  maxRadius: number = 400; //Voglio evitare raggi troppo grossi
  radius : number = this.maxRadius; //Memorizzo il raggio del cerchio

  constructor(public http: HttpClient) {
  //Facciamo iniettare il modulo HttpClient dal framework Angular (ricordati di importare la libreria)
  }

  // Questo metodo ottiene i dati e li scarica dal server per metterli nella variabile geoJsonObject
  prepareData = (data: GeoFeatureCollection) => {
    this.geoJsonObject = data   //traserimento dei dati nella variabile
    console.log( this.geoJsonObject );//mostriamo il dato ottenuto nella console
  }

  //Una volta che la pagina web è caricata, viene lanciato il metodo ngOnInit scarico i    dati
  //dal server
  ngOnInit() {

  }

  //Questo metodo richiama la route sul server che recupera il foglio specificato nella casella di testo
  //il metodo cambia foglioriceve il foglio da prendere in considerazione e lo cambia con quello presente
  cambiaFoglio(foglio) : boolean
  {
    let val = foglio.value; //otteniamo nella variabile val il valore del foglio passato come parametro
    this.obsCiVett = this.http.get<Ci_vettore[]>(`https://3000-ea2b2a35-54b0-4c0b-b66d-33a17bf00515.ws-eu01.gitpod.io/ci_vettore/${val}`);  //otteniamo i dati del vettore da passare all'observable
    this.obsCiVett.subscribe(this.prepareCiVettData); //all'interno di obsCiVett aggiungiamo prepareCiVettdata e il suo valore
    console.log(val);//STAMPIAMO NELLA CONSOLE I DATI DELLA VARIABILE VAL OVVERO IL VALORE DEL FOGLIO
    return false;
  }



styleFunc = (feature) => {
    return ({
      clickable: false,
      fillColor: this.avgColorMap(feature.i.media),
      strokeWeight: 1,
      fillOpacity : 1  //Fill opacity 1 = opaco (i numeri tra 0 e 1 sono le gradazioni di trasparenza)
    });
  }
    //metodo che riceve i vettori energetici e riempie un vettore di marker creando per ogni oggetto un marker

avgColorMap = (media) =>
  {
    if(media <= 36) return "#00FF00";
    if(36 < media && media <= 40) return "#33ff00";
    if(40 < media && media <= 58) return "#66ff00";
    if(58 < media && media <= 70) return "#99ff00";
    if(70 < media && media <= 84) return "#ccff00";
    if(84 < media && media <= 100) return "#FFFF00";
    if(100 < media && media <= 116) return "#FFCC00";
    if(116 < media && media <= 1032) return "#ff9900";
    if(1032 < media && media <= 1068) return "#ff6600";
    if(1068 < media && media <= 1948) return "#FF3300";
    if(1948 < media && media <= 3780) return "#FF0000";
    return "#FF0000"
  }

prepareCiVettData = (data: Ci_vettore[]) =>
  {
    let latTot = 0; //Uso queste due variabili per calcolare latitudine e longitudine media
    let lngTot = 0; //E centrare la mappa

    console.log(data);
    this.markers = [];

    for (const iterator of data) {
      let m = new Marker(iterator.WGS84_X,iterator.WGS84_Y,iterator.CI_VETTORE);
      latTot += m.lat; //Sommo tutte le latitutidini e longitudini
      lngTot += m.lng;
      this.markers.push(m);
    }
    this.lng = lngTot/data.length; //Commenta qui
    this.lat = latTot/data.length;
    this.zoom = 16;
  }

  mapClicked($event: MouseEvent) {
    this.circleLat = $event.coords.lat; //Queste sono le coordinate cliccate
    this.circleLng = $event.coords.lng; //Sposto il centro del cerchio qui
    this.lat = this.circleLat; //Sposto il centro della mappa qui
    this.lng = this.circleLng;
    this.zoom = 15;  //Zoom sul cerchio
  }



//Aggiungi il gestore del metodo radiusChange
circleRedim(newRadius : number){
    console.log(newRadius) //posso leggere sulla console il nuovo raggio
    this.radius = newRadius;  //Ogni volta che modifico il cerchio, ne salvo il raggio
  }

//Aggiungi il gestore del metodo circleDblClick
circleDoubleClicked(circleCenter)//Metodo che parte quando si clicca due volte per spostare un cerchio e modifica le cordinate di quest'ultimo con le nuove ottenute dal punto di click
  {
    console.log(circleCenter); //Voglio ottenere solo i valori entro questo cerchio
    console.log(this.radius);//stampa sulla console i valori del raggio

    this.circleLat = circleCenter.coords.lat; //Aggiorno le coordinate del cerchio
    this.circleLng = circleCenter.coords.lng; //Aggiorno le coordinate del cerchio

    //Non conosco ancora le prestazioni del DB, non voglio fare ricerche troppo onerose
    if(this.radius > this.maxRadius)//l' if determina se l'area del raggio è troppo grande
    {
      console.log("area selezionata troppo vasta sarà reimpostata a maxRadius");//messaggio visualizzato quando l'area è troppo vasta
       this.radius = this.maxRadius;
    }
   let raggioInGradi = (this.radius * 0.00001)/1.1132;


    const urlciVett = `${this.serverUrl}/ci_geovettore/
    ${this.circleLat}/
    ${this.circleLng}/
    ${raggioInGradi}`;

    const urlGeoGeom = `${this.serverUrl}/geogeom/
    ${this.circleLat}/
    ${this.circleLng}/
    ${raggioInGradi}`;
    //Posso riusare lo stesso observable e lo stesso metodo di gestione del metodo cambiaFoglio
    //poichè riceverò lo stesso tipo di dati
    //Divido l'url andando a capo per questioni di leggibilità non perchè sia necessario
    this.obsCiVett = this.http.get<Ci_vettore[]>(urlciVett);
    this.obsCiVett.subscribe(this.prepareCiVettData);

    this.obsGeoData = this.http.get<GeoFeatureCollection>(urlGeoGeom);
    this.obsGeoData.subscribe(this.prepareData);

    //console.log ("raggio in gradi " + (this.radius * 0.00001)/1.1132)

    //Voglio spedire al server una richiesta che mi ritorni tutte le abitazioni all'interno del cerchio

  }

}
