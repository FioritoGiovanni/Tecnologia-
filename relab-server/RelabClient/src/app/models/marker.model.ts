import { Icon } from './icon.model';

export class Marker {
    icon = {}
   //Quando creo un nuovo marker e verifico quale label viene passata al costruttore, se contiene il testo
   //“Gas naturale” o “Energia elettrica” (abbreviati in Gas e Elettrica) imposto l’icona e cancello
   //l’etichetta
    constructor(public lat: number, public lng: number, public label?: string)
    {
        if (this.label.includes("Corona")) {
            this.icon = new Icon ( './assets/img/corona.ico', 24 );
             this.label = "";
        }
        if(this.label.includes("Elettricita"))
        {
            this.icon = new Icon('./assets/img/lampadina.ico',24 );
             this.label = "";
        }
        if(this.label.includes("OLIO"))
        {
            this.icon = new Icon ('./assets/img/oil.ico',24 );
             this.label = "";
        }
        if(this.label.includes("Riscaldamento"))
        {
            this.icon = new Icon ( './assets/img/caldo.ico',24 );
             this.label = "";
        }
        if(this.label.includes("GAS"))
        {
            this.icon = new Icon('./assets/img/gasOil.ico',24);
             this.label = "";
        }
        if(this.label.includes("GPL"))
        {
            this.icon = new Icon ('./assets/img/GPL.ico',24 );
             this.label = "";
        }
        if(this.label.includes("Biomasse solide"))
        {
            this.icon = new Icon ('./assets/img/solide.ico',24 );
             this.label = "";
        }
        if(this.label.includes("Biomasse liquide"))
        {
            this.icon = new Icon ('./assets/img/liquido.ico',24 );
             this.label = "";
        }
        if(this.label.includes("RSU"))
        {
            this.icon = new Icon('./assets/img/RSU.ico',24 );
             this.label = "";
        }
    }
}


