export var tableau_noeud = [];

var taille = 2500;

var x = -150;
var z = -150;

for (var i=0; i<taille; i+=2){

    if(z >= 150){

        z = -150;
        x += 15;

    }

    tableau_noeud.push([i, x, z]);
    tableau_noeud.push([i+1, x+10, z]);

    z += 5;

}

tableau_noeud.push([taille, 150, 150]);
tableau_noeud.push([taille+1, -150, -150]);

