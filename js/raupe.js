/**
 * Das Raupen-Element, das berührt werden muss
 */
class raupe{
    /** Konstruieren
     * des Raupenbildes
     * */
    constructor(img,pX,pY,b,h){
        this.image = img; //Bild der Raupe
        this.positionX = pX; //Position in der Breite
        this.positionY = pY; //Höhen Position

        this.breite = b; //Breite des Elements
        this.hoehe= h;   // Hoehe des Elements

    }

    /** Hit
     * Methode, die true zurückgibt, wenn x,y im Objekt liegen
     * @returns 1 falls getroffen sonst 0
     */
    beruehre(posx,posy){
        if((posx <this.positionX+this.breite) && (posx>this.positionX) && (posy < this.positionY+this.hoehe)
        && (posy>this.positionY)){
            return 1;
        }
        else{
            return 0;
        }

    }

    /**
     * Zeichnet das Objekt
     * @param context eines Canvas elements
     */
    draw(ctx){
        ctx.drawImage(this.image,this.positionX,this.positionY,this.breite,this.hoehe);
    }


}
