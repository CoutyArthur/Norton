import {tableau_noeud} from './p5/data/noeud.js';
import {tableau_troncon} from './p5/data/troncon.js';
import {tableau_frequency} from './p5/data/frequency.js';

function tri_data(troncon_data, noeud_data, frequency_data){

  console.log(troncon_data.length);

  for(var i=0; i<troncon_data.length; i++){

    var temp = troncon_data[i];

    for (var j=i+1; j<troncon_data.length; j++){

      if(troncon_data[j][0] == troncon_data[i][1] && troncon_data[j][1] == troncon_data[i][0]){

        troncon_data.splice(j,1);
        frequency_data.splice(j,1);
        break;

      }

    }

  }

  console.log(troncon_data.length);

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

  console.log(x_max, x_min, y_max, y_min);

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

  var frequency = mappage_frequency(frequency_data);

  //console.log(coordonnee_final.length, troncon_data.length);

  var mem_start;
  var mem_end;

  /*for(var i=0; i<coordonnee_final.length; i++){

    mem_start = coordonnee_final[i][0];
    mem_end = coordonnee_final[i][1];
    for (var j=i; j<coordonnee_final.length; j++){

      if(mem_start == coordonnee_final[j][0] && mem_end == coordonnee_final[j][1]);
        console.log(mem_start, "   ", coordonnee_final[j][0]);
        console.log(mem_end, "    ", coordonnee_final[j][1])
        console.log("---------------");

    }
  }*/

  var temp = [coordonnee_final, frequency];

  return temp;
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

  return (new THREE.Vector3(new_x, 0.1, new_y));
}

function mappage_frequency(frequency_data){

  var a_max = 255;
  var a_min = 0;

  var f_max = frequency_data[0];
  var f_min = frequency_data[0];

  for(var i=0; i<frequency_data.length; i++){

    if(frequency_data[i] > f_max)
      f_max = frequency_data[i];

    else if(frequency_data[i] < f_min)
      f_min = frequency_data[i];

  }
  console.log(f_max, f_min);
  var frequency = [];

  for(var i=0; i<frequency_data.length; i++){

    var proportion = (frequency_data[i]-f_min)/(f_max-f_min);
    var new_f = a_min + proportion*(a_max-a_min);
    frequency.push(new_f);
  }

  return frequency;
}
export var coordonnee_final;
export var frequency;
var temp = tri_data(tableau_troncon, tableau_noeud, tableau_frequency);

coordonnee_final = temp[0];
frequency = temp[1];

