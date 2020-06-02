
export class Icon { //classe ico creata per ridimensionare le icone
    public scaledSize:ScaledSize;
    constructor(public url: string, size: number){
        this.scaledSize = new ScaledSize(size,size);//metodo che ridimensione le icone
    }
    //metodo che imposta la grandezza dell'icona utilizzando un solo parametro numerico che sarà poi uguale ma duplicato
    setSize(size: number) {
        this.scaledSize = new ScaledSize(size,size);//i due size sono il valore di number due volte
    }
}
//nella classe ScledSize sono contenuti i valori dell'altezza e della larghezza delle icone che servirà poi per modificare queste ultime
export class ScaledSize {
    constructor(
    public width:  number,
    public height: number){}
}


