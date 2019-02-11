    /*Arrays, welche die Level-Elemente enthalten*/

    //das Bildelement für die Begrenzungen und Hecken, die nicht berührt werden dürfen
    var hecke = new Image();
    hecke.src = "img/hecke.png";

    var begrenzung = new Image();
    begrenzung.src = "img/begrenzungen.png";

    //Array an Gebieten, dass die Begrenzungen mit verschiedenen Hecken für das jeweilige Level enthält
    var gebiete = [];
    for (var i = 0; i < gebiete.length; i++) {
      gebiete[i] = [i++];
    };

    gebiete[0] = [new element(begrenzung,0,0,window.innerWidth,50),
                  new element(begrenzung,0,(window.innerHeight)-(40),window.innerWidth,50)];

    gebiete[1] = [new element(begrenzung,20,0,window.innerWidth,50),
                  new element(begrenzung,20,(window.innerHeight)-(40),window.innerWidth,50),
                  new element(hecke,200,110,80,80)];

    gebiete[2] = [new element(begrenzung,0,0,window.innerWidth,50),
                  new element(begrenzung,0,(window.innerHeight)-(40),window.innerWidth,50),
                  new element(hecke,100,80,80,80),
                  new element(hecke,300,250,80,80)];

    gebiete[3] = [new element(begrenzung,0,0,window.innerWidth,50),
                  new element(begrenzung,0,(window.innerHeight)-(40),window.innerWidth,50),
                  new element(hecke,40,40,20,50),
                  new element(hecke,20,40,30,50),
                  new element(hecke,30,10,20,30)];


    //das Grundbildelement für die bösen Blumen, die nicht berührt werden dürfen
    var blume1 = new Image();
    blume1.src = "img/blume1.png";

    //Array, in dem die Blumen gespeichert sind
    var blumen = [];
    blumen[0] = new blume(blume1,210,150,70,70);
    blumen[1] = new blume(blume1,600,190,70,70);
    blumen[2] = new blume(blume1,300,80,50,50);


    //Bildelemente für die Raupe, die in jedem Level weiter wächst
    var raupe0 = new Image();
    raupe0.src = "img/raupe.png";
    var raupe1 = new Image();
    raupe1.src = "img/raupe2.png";
    var raupe2 = new Image();
    raupe2.src = "img/raupe3.png";

    //Array für die verschiedenen Raupen
    var raupen = [];
    raupen[0] = new raupe(raupe0,20,100,50,50);
    raupen[1] = new raupe(raupe1,20,100,50,50);
    raupen[2] = new raupe(raupe2,40,80,50,50);


    //Bildelemente für die verschiedenen Äpfel der Level
    var apfel1 = new Image();
    apfel1.src = "img/apfelrot.png";
    var apfel2 = new Image();
    apfel2.src = "img/apfelgruen.png";
    /*weitere Äpfel werden folgen*/

    //Array für die verschiedenen Äpfel
    var aepfel = [];
    aepfel[0] = new apfel(apfel1,(window.innerWidth-50),window.innerHeight/2,50,50);
    aepfel[1] = new apfel(apfel2,(window.innerWidth-50),window.innerHeight/1.8,50,50);
    aepfel[2] = new apfel(apfel1,(window.innerWidth-50),window.innerHeight/1.6,50,50);
    aepfel[3] = new apfel(apfel2,(window.innerWidth-50),window.innerHeight/2,50,50);


    /*Grundelemente der App*/

    // Variablen zur Referenzierung des Canvas- und 2D-canvas-Kontext
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    //Canvas auf Bildschirmgröße anpassen
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    //Event-Listener, der bei Änderung des App-Fensters aktiv wird
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    //Event-Listener, die auf click und touch reagieren
    canvas.addEventListener('click', onCheckClick, false);
    canvas.addEventListener('touchstart', canvas_touchStart, false);
    canvas.addEventListener('touchend', canvas_touchEnd, false);
    canvas.addEventListener('touchmove', canvas_touchMove, false);

    function onCheckClick(ev) {
      var x = ev.clientX - canvas.offsetLeft;
      var y = ev.clientY - canvas.offsetTop;
          /*
          //Für alle Elemente in der Liste :-)


          if(gebiet.hit(x,y)==1){
          alert("AHHHHHHHH");
        }

        if(gebiet2.hit(x,y)==1){
        alert("AHHHHHHHH");
      }*/

    }

    //Variablen für die Zeichnung der Linie
    //letzte Position der Linie tracken
    var lastX,lastY=-1;
    var firstX,firstY;
    var hue=0;

    //Funktion, die die Linie bei touch-Bewegung zeichnet
    function drawLine(ctx,x,y,size) {
      //wenn die letzte x-Poistion nicht bekannt ist, setzte lastX und lastY auf derzeitige Position
      if (lastX==-1) {
        lastX=x;
        lastY=y;
      }
      //Variablen für die Farben der Linie
      var sat=100;
      var lum=50;
      var a=255;
      hue+=2;

      if (hue>360) {
        hue = 0;
      }
      ctx.strokeStyle = "hsla("+hue+","+sat+"%,"+lum+"%,"+(a/255)+")";
      //Linienenden auf rund setzen
      ctx.lineCap = "round";
      //gefüllte Linie zeichnen
      ctx.beginPath();
      //zuerst gehe zur letzten touch-Position
      ctx.moveTo(lastX,lastY);
      //dann zeichne eine Linie zur derzeitigen touch-Position
      ctx.lineTo(x,y);
      //Liniendicke festlegen und die Linie zeichnen
      ctx.lineWidth = size;
      ctx.stroke();
      ctx.closePath();
      //aktualisiere die letzte touch-Position auf die derzeitige
      lastX=x;
      lastY=y;
    }

    function canvas_touchStart() {
      var touchX;
      var touchY;
      //aktualisiere touch-Koordinaten
      getTouchPos();
      //Beginne die Linie
      drawLine(ctx,touchX,touchY,12);
      //verhindere, dass ein zusätzliches Ereignis ausgelöst wird
      event.preventDefault();
    }

    function canvas_touchEnd() {
      //lastX and lastY auf -1 zurücksetzen, um anzuzeigen, dass sie jetzt ungültig sind
      lastX=-1;
      lastY=-1;
    }

    function canvas_touchMove(e) {
      //aktualisiere die touch-Koordinaten
      getTouchPos(e);
      drawLine(ctx,touchX,touchY,12);

      //wenn der Apfel des jeweiligen Levels berührt wird,
      //blende das "Erfolg"-Bild ein und den jeweiligen Button zum nächsten Level

      /*
      hier fehlt die Realisierung: Überprüfe ob die Raupe berührt wurde UND der Apfel auch
      && raupe[0].beruehre(lastX,lastY)==1 funktioniert nicht, da beide dann gleichzeitig berührt werden müssten...
      */
      if(aepfel[0].beruehre(lastX,lastY)==1){
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        document.getElementById('winraupe').style.display='block';
        document.getElementById('winraupe').style.zIndex = 100;
        document.getElementById('btnlevel').style.display='block';
        document.getElementById('btnlevel').style.zIndex=101;
        TTS.speak({
          text: 'Super, tippe auf den Apfel, damit ich noch weiter wachsen kann',
          locale: 'de-DE',
          rate: 1
        });
      }

      if(aepfel[1].beruehre(lastX,lastY)==1){
        document.getElementById('winraupe').style.display='block';
        document.getElementById('winraupe').style.zIndex = 100;
        document.getElementById('btnlevel').style.display='none';
        document.getElementById('btnlevel').style.zIndex=0;
        document.getElementById('btnlevel2').style.display='block';
        document.getElementById('btnlevel2').style.zIndex=101;
        TTS.speak({
          text: 'Super, tippe auf den Apfel, damit ich noch weiter wachsen kann',
          locale: 'de-DE',
          rate: 1
        });
      }

      if(aepfel[2].beruehre(lastX,lastY)==1){
        document.getElementById('winraupe').style.display='block';
        document.getElementById('winraupe').style.zIndex = 100;
        document.getElementById('btnlevel2').style.display='none';
        document.getElementById('btnlevel2').style.zIndex=0;
        document.getElementById('btnlevel3').style.display='block';
        document.getElementById('btnlevel3').style.zIndex=101;
        TTS.speak({
          text: 'Super, tippe auf den Apfel, damit ich noch weiter wachsen kann',
          locale: 'de-DE',
          rate: 1
        });
      }

      //für jedes Gebiet, dass berührt wird, zeige das "Misserfolg"-Bild und den "wiederhole"-Button
      for(let i=0; i < gebiete.length; i++){
        for(let j=0; j < gebiete[i].length; j++){
          /*
          Problem: Hecken von zukünftigen und vergangenen Levels können, obwohl sie nicht sichtbar sind
          berührt werden, sodass "Aua" ausgelöst wird. Überprüfungsversuche in der if-Schleife, ob die Hecken
          auch gerade angezeigt werden sind gescheitert... && (gebiete[i][j].draw(ctx)!==undefined) lässt die
          verborgenen Hecken nur zusätzlich noch erscheinen
          */
          if(gebiete[i][j].hit(touchX,touchY) /*&& (gebiete[i][j].draw(ctx)!==undefined)*/){
            TTS.speak({
              text: 'Aua',
              locale: 'de-DE',
              rate: 1
            });

            /*
            derzeitig folgender auskommentierter Code lässt gewünschte traurige Raupe erscheinen;
            aber wie auch den dazugehörigen Button zum neustart des derzeitigen Levels anzeigen?
            Versuche, nur die gezogene Linie zu löschen sind gescheitert -> clerRect löscht das canvas
            -> wie den current level stand wieder einzeichnen?
            oder gar den Grundaufbau des bisherigen Codes ändern?
            */

            /*
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            document.getElementById('loosraupe').style.display='block';
            document.getElementById('loosraupe').style.zIndex = 100;
            */
          }
        }
      };

      //für jede Blume die berührt wird, zeige loosraupe-Bild und restarte das Level
      //Schleifeninhalt entspricht dem der Gebiets-for-Schleife
      for(let i=0; i < blumen.length; i++){
        if(blumen[i].beruehre(touchX,touchY)==1){
          TTS.speak({
            text: 'Böse Blume!',
            locale: 'de-DE',
            rate: 1
          });
        }
      };

      //verhindere, dass ein zusätzliches Ereignis ausgelöst wird
      event.preventDefault();
    }

    function getTouchPos(e) {
      if (!e)
      var e = event;

      if(e.touches) {
        //nur mit 1 Finger touchbar
        if (e.touches.length == 1) {
          //bekomme Informatoinen für Finger #1
          var touch = e.touches[0];
          touchX=touch.pageX-touch.target.offsetLeft;
          touchY=touch.pageY-touch.target.offsetTop;
        }
      }
    }

    $("#btnstart").bind( "click", function(event, ui) {

      /*gescheiterter Versuch einer anderen Herangehensweise*/
      //var level1 = new level1(gebiete[0], raupen[0], aepfel[0]);
      //level1.draw(ctx);

      TTS.speak({
        text: 'Hallo ich bin die kleine Raupe Lisa und will ein großer schöner Schmetterling werden. Hilfst du mir dabei?',
        locale: 'de-DE',
        rate: 1
        //nachdem der Vorstellungstext gesagt wurde, zeige das Einführungslevel und erkläre
      }, function () {
        document.getElementById('traurig').style.display='none';
        TTS.speak({
          text: 'Probier es doch einmal aus und zeig mir den Weg. Tippe auf mich und zieh mir eine Linie zu dem roten Apfel.',
          locale: 'de-DE',
          rate: 1
        });
      });
      //zeichne Raupe und Apfel des Einführungslevels
      raupen[0].draw(ctx);
      aepfel[0].draw(ctx);

      //zeichne die beiden Gebiete, die die Wegbegrenzungen darstellen
      for (var i in gebiete){
        for(var j in gebiete[i]){
          gebiete[0][j].draw(ctx);
        }
      };
    });

    $("#btnlevel").bind( "click", function(event, ui) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      document.getElementById('winraupe').style.display='none';
      document.getElementById('winraupe').style.zIndex = 0;
      document.getElementById('btnlevel').style.display='none';
      document.getElementById('btnlevel').style.zIndex=-1;

      //Zeichne Raupe, Apfel und Gebiete des Levels
      raupen[1].draw(ctx);
      aepfel[1].draw(ctx);
      for (var i in gebiete){
        for(var j in gebiete[i]){
          gebiete[1][j].draw(ctx);
        }
      };
    });

    $("#btnlevel2").bind( "click", function(event, ui) {
      TTS.speak({
        text: 'Oh nein! Böse Blumen versperren den Weg! Weiche ihnen aus.',
        locale: 'de-DE',
        rate: 1
      });
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      document.getElementById('winraupe').style.display='none';
      document.getElementById('winraupe').style.zIndex = 0;
      document.getElementById('btnlevel2').style.display='none';
      document.getElementById('btnlevel2').style.zIndex=-1;

      //Zeichne Raupe, Blume, Apfel und Gebiete des Levels
      raupen[2].draw(ctx);
      blumen[0].draw(ctx);
      aepfel[2].draw(ctx);
      for (var i in gebiete){
        for(var j in gebiete[i]){
          gebiete[2][j].draw(ctx);
        }
      };

    });
    $("#btnlevel3").bind( "click", function(event, ui) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      document.getElementById('winraupe').style.display='none';
      document.getElementById('winraupe').style.zIndex = 0;
      document.getElementById('btnlevel3').style.display='none';
      document.getElementById('btnlevel3').style.zIndex=-1;
      /*Code folgt*/
    });
