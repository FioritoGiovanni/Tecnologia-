
export class Icon { //classe ico creata per ridimensionare le icone
    public scaledSize:ScaledSize;
    constructor(public url: string, size: number){
        this.scaledSize = new ScaledSize(size,size);
    }

    setSize(size: number) { //Metodo che imposta la grandezza dell'icona
        this.scaledSize = new ScaledSize(size,size);
    }
}

export class ScaledSize { //classe che contiene l'altezza e la larghezza
    constructor(
    public width:  number,
    public height: number){}
}
