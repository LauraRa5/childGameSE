/**
* Eine Level-Klasse für Level 1
*/
class Level1{

  /**Konstruieren
  *des Levels
  */
  constructor(g,r,a){
    this.gebiet = g; //gebiete des Levels
    this.raupe = r; //Raupe des Levels
    this.apfel = a; //Apfel des Levels

  }
  /**Zeichnen
  *des Levels
  */
  draw(ctx){
    ctx.draw(this.gebiet,this.raupe,this.apfel);
  }
}
