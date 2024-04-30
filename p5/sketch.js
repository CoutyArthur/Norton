function preload(){

    troncon_file = loadStrings('info_route/troncon.csv');
    noeuds_file = loadStrings('info_route/noeud.csv');

}

function setup() {
  createCanvas(400, 400);

  //tronconCSV(troncon_file);
  //noeudsCSV(noeuds_file);
  frequencyCSV(troncon_file);
  console.log("finished");
}

function tronconCSV(data){

    //on récupère les donnees de troncon sous formede js
    //export permet d'exporter la variable vers fileReader.js
    var tableau = "export var tableau_troncon = [ \n";
    console.log(data[1]);

    for (i=1; i<data.length; i++){

        semi_column_count = 0;
        //val sert à stocker temporairement les valeurs des donnees 
        val="";
        //temp sert a stocke temporairement les sous_tableau
        temp = "";

        //si laligne est vide on la passe, sinon on ouvre les crochets pour démarrere un sous_tableau
        if(data[i] == ""){
            continue;
        }
        else{
            temp = "[";
        }

        for(j=0; data[i].length; j++){

            // seul les infos situés aux poistions 1,2,3 nous intéressent;
            
            if (semi_column_count > 0 && semi_column_count < 3){

                //si on tombe sur un point virgule, on est sur la fin d'une donnée .Donc on ajoute la valeur récupérer au sous_tableau

                if(data[i][j] == ';'){

                    semi_column_count ++;

                    if(semi_column_count < 3){

                        temp += val;
                        temp += ", ";
                        val = "";
                    }
                    //si on est sur la dernière donnee de la ligne, on ajoute la valeur au sous_tableau et on ferme ce dernier,
                    //puis on met une virgule pour le prochain.
                    //si c'est la dernière ligne de la page, on ajoute la valeur au sous_tableau, on ferme ce dernier et on ferme le tableau general
                    else{
                        if((data.length-2) == i){
                            temp += val;
                            temp += "] \n];";
                            val = "";
                        }
                        else{
                            temp += val;
                            temp += "], \n";
                            val = "";
                        }
                    }

                }
                //si ce n'est pas un point virgule, alors on ajoute le chiffre actuel aux chiffres de la valeur deja recuperer 
                else{

                    val += data[i][j]

                }

            }
            else if(data[i][j] == ';'){

                semi_column_count ++;
                continue;
            }
            //si on est a 3 point virgule ou plus, les donnees ne nous interessent plus donc on passe a la ligne suivante
            if(semi_column_count >= 3){

                break;

            }
        }
        //on ajoute au tableau general le sous tableau generer sur la ligne
        tableau += temp;
    }

    // Créez un écrivain de fichier personnalisé avec l'extension .js
    let writer = createWriter('troncon.js');
    
    // Écrivez le contenu dans le fichier
    writer.print(tableau);
    
    // Fermez le fichier
    writer.close();
}

//comme tronconCSV sauf qu'on remplace les ',' par des '.' et on prend toutes les donnees du fichier donc inutile de compter les points virgules
function noeudsCSV(data){

    var tableau = "export var tableau_noeud = [ \n";

    for (i=1; i<data.length; i++){

        val="";
        temp = "";

        if(data[i] == ""){
            continue;
        }
        else{
            temp = "[";
        }

        for(j=0; j<data[i].length; j++){
            
            if(data[i][j] == ";"){
        
                temp += val;
                temp += ", ";
                val = "";

            }

            else if (data[i][j] == ","){
                val += ".";

            }

            else{

                val += data[i][j];

            }

        }

        temp += val;

        if(i == data.length-2){
            temp += "]"
        }
        else{
            temp += "],"
        }
        
        tableau += temp;
        tableau += "\n";
    }
    tableau += "];";

    let writer = createWriter('noeud.js');

    writer.print(tableau);
    
    writer.close();
}

function frequencyCSV(data){

    var tableau = "export var tableau_frequency = [ \n";

    var val = "";
    var temp = "";

    for (var i=1; i<data.length; i++){

        if(data[i] == "")
            continue;

        var semi_column = 0;
        val = "";
     
        for (var j=0; j<data[i].length; j++){

            if(semi_column == 5){

                if(data[i][j] == ";"){

                    val += ",\n";
                    tableau += val;
                    break;
                
                }

                else
                    val += data[i][j];

            }

            else if(data[i][j] == ";")
                semi_column ++;

        }


    }

    tableau += "];"
    console.log(tableau);

    let writer = createWriter('frequency.js');

    writer.print(tableau);
    
    writer.close();
}