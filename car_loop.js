import { coordonnee_final} from './file_reader.js';
import {frequency} from './file_reader.js';

function createCar(val_start, val_end, val_frequency) {

    var newCar = document.createElement('a-entity');
    newCar.setAttribute('cartest', {positionStart: val_start, positionEnd: val_end, taille: val_frequency});
    const scene = document.querySelector('a-scene');
    scene.appendChild(newCar);
    return newCar; 

}

function loopCar(tableauPosition, tableauFrequency){

    const scene = document.querySelector('a-scene').object3D;
    console.log(scene);
    var groupCar = new THREE.Group();
    groupCar.name = 'groupCar';
    var newCar;
    var car;

    const loader = new THREE.GLTFLoader();
    const assetEl = document.querySelector('#car1');
    const assetUrl = assetEl.getAttribute('src');

    //mettre le loader GLTF ici pour limiter le nombre de création du matéiriaux et juste cloner l'objet
    loader.load(assetUrl, //model gltf
        function (gltf) {

            car = gltf.scene;
            car.name = 'car';
            car.visible = false;
            car.position.set(0,10,-25);
            scene.add(car);
        var count = 0;
        for(var i=0; i<tableauPosition.length; i++){

            if(Math.sqrt(Math.pow(tableauPosition[i][1].x - tableauPosition[i][0].x, 2) + Math.pow(tableauPosition[i][1].y - tableauPosition[i][0].y, 2)) > 0.5){

                newCar = createCar(tableauPosition[i][0], tableauPosition[i][1], tableauFrequency[i]).object3D;
                //console.log(newCar);
                groupCar.add(newCar);
                count++;
            }       
        }
        console.log(count, tableauPosition.length);
        scene.add(groupCar);
        console.log(scene);
    });

}


setTimeout (function(){
    loopCar(coordonnee_final, frequency);
},10);

