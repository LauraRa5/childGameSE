# childGameSE
App für Software Engineering<p>
Eine Raupe möchte durch ein Labyrinth zu einem Apfel gelangen.<br>
Dies soll durch "touch" erreicht werden.<br>
Gelingt es, ohne die Ränder zu berühren, durch das Labyrinth mit dem Finger eine Linie zu ziehen, kann die Raupe den Apfel essen und wachsen.<br>
Gelingt es nicht und es findet eine Kollision statt, wird eine traurige Raupe angezeigt und das Level muss noch einmal versucht werden.<p>

Ist das letzte Level des Spiels erreicht wird die Raupe zu einem Schmetterling.<p>


<p>Aktuelle Probleme:<br>
- unsichtbare Gebiete anderer Level können kollidiert werden<br>
- bei alleiniger Berührung des Apfels wird das neue Level erreicht -> check if Raupe ebenfalls berührt wurde fehlt<br>
- bei einer Kollision wird nur "aua" ausgegeben -> der Restart-Button bzw. das Neu-Zeichnen des aktuellen Level-Canvas fehlt<br>
(- Level 1 wird warum auch immer ab und zu übersprungen)<br>
