import { tableau_noeud} from './p5/data/noeud.js';
import { tableau_troncon} from './p5/data/troncon.js';

function tri_data(troncon_data, noeud_data){
  //x et y => longitude et lattitude donnée origine
  //a(x) et b(y) => coordonnée du plan html

  var x_max = noeud_data[0][1];
  var x_min = noeud_data[0][1];
  var y_max = noeud_data[0][2];
  var y_min = noeud_data[0][2];

  const a_max = 150;
  const a_min = -150;
  const b_max = 150;
  const b_min = -150;

  var tableau_route = [];

  //on récupère x_max, x_min, y_max, y_min
  for (var i=1; i<noeud_data.length; i++){

    if(noeud_data[i][1] > x_max){

      x_max = noeud_data[i][1];

    }
    else if (noeud_data[i][1] < x_min){

      x_min = noeud_data[i][1];

    }

    if(noeud_data[i][2] > y_max){

      y_max = noeud_data[i][2];

    }
    else if (noeud_data[i][2] < y_min){

      y_min = noeud_data[i][2];

    }

  } 

  var coordonnee_final = [];

  for(var i=0; i<troncon_data.length; i++){
    var temp = [];
    var temp_coo = []
    for(var j=0; j<troncon_data[i].length; j++){

      temp.push(rechercheNoeud(troncon_data[i][j], noeud_data));
      //console.log(temp[j][0], troncon_data[i][j]);
      temp_coo.push(mappage(temp[j][1], temp[j][2], a_max, a_min, b_max, b_min, x_max, x_min, y_max, y_min));
    
    }

    coordonnee_final.push(temp_coo);
    
  } 

  //console.log(coordonnee_final.length, troncon_data.length);

  var xma = coordonnee_final[0][0].x;
  var xmi = coordonnee_final[0][0].x;
  var yma = coordonnee_final[0][0].z;
  var ymi = coordonnee_final[0][0].z;

  /*for(var i=0; i<coordonnee_final.length; i++){

    for(var j=0; j<2; j++){

      if (coordonnee_final[i][j].x > xma){

        xma = coordonnee_final[i][j].x;

      }

      if (coordonnee_final[i][j].x < xmi){

        xmi = coordonnee_final[i][j].x;

      }

      if (coordonnee_final[i][j].z > yma){

        yma = coordonnee_final[i][j].z;

      }

      if (coordonnee_final[i][j].z < ymi){

        ymi = coordonnee_final[i][j].z;

      }

    }
  }
  console.log(xma,xmi,yma,ymi);*/
  return coordonnee_final;
}

function rechercheNoeud(noeud_cherche, noeud_data){

  var j = 0;
  var gap = parseInt(noeud_data.length/4);
  var i = parseInt(noeud_data.length/2);
  var chercheur = noeud_data[i];

  while(noeud_cherche != chercheur[0]){

    //console.log("j: ",j,"\ni: ",i,"\ngap :",gap,"\nchercheur : ",chercheur,"\nnoeud_cherche : ", noeud_cherche,"\n");
    if(noeud_cherche > noeud_data[i][0]){

      i += gap;

    }
    else{

      i -= gap;

    }

    if (gap == 0){

      if(noeud_cherche > noeud_data[i][0]){

        i++;
      }
      else{
        i--;
      }

    }
    
    chercheur = noeud_data[i];
    gap = parseInt(gap/2)

  }
  return chercheur;

}

function mappage(x, y, a_max, a_min, b_max, b_min, x_max, x_min, y_max, y_min){

  var proportion_x = (x-x_min)/(x_max-x_min);
  var proportion_y = (y-y_min)/(y_max-y_min);

  var new_x = a_min + proportion_x*(a_max-a_min);
  var new_y = b_min + proportion_y*(b_max-b_min);

  return (new THREE.Vector3(new_x, 1, new_y));
}

export var coordonnee_final = tri_data(tableau_troncon, tableau_noeud);
