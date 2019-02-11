
/**
 * Ein einfaches Element, das nicht berührt werden darf
 */

class begrenzung{


    /** Konstruieren
     * ein Rechteck
     * */
    constructor(img,pX,pY,b,h){
        this.image = img;
        this.positionX = pX; //Position in der Breite
        this.positionY = pY; //Höhen Position

        this.breite = b; //Breite des Elements
        this.hoehe= h;   // Hoehe des Elements

    }

    /** Hit
     * Methode, die true zurückgibt, wenn x,y im Objekt liegen
     * @returns 1 falls getroffen sonst 0
     */
    hit(posx,posy){
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
        //ctx.fillStyle = "green";
        //ctx.fillRect(this.positionX,this.positionY,this.breite,this.hoehe);
        ctx.fillStyle = ctx.createPattern(this.image, 'repeat'); /* or 'no-repeat', or 'repeat-x', or 'repeat-y' */
	    /* note that the image is tiled from the top left of the canvas */
	    ctx.fillRect(this.positionX,this.positionY,this.breite,this.hoehe);

	    /* also draw a circle, why not
	    ctx.beginPath();
	    ctx.arc(150, 150, 40, 0, Math.PI*2);
	    ctx.fill(); */
    }


}
