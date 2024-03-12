import { coordonnee_final} from './file_reader.js';

function road_generator(tableauPosition){

    /*const tableauPosition = [
        [new THREE.Vector3(-7, 0, 5), new THREE.Vector3(20, 0, 10),],
        [new THREE.Vector3(-15, 0, 0), new THREE.Vector3(5, 0, -15)]

    ];*/

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000});
    var mesh = new THREE.Mesh(boxGeometry, material);


    for (var i=0; i<tableauPosition.length; i++){
        for (var j=1; j<tableauPosition[i].length; j++){

            const newRoad = document.createElement('a-entity');

            var temp = mesh.clone();

            newRoad.setAttribute('road', {width: 0.5, position_start: tableauPosition[i][j-1], position_end: tableauPosition[i][j], basicCube: temp});
            const roadScene = document.getElementById('roadScene');
            roadScene.appendChild(newRoad);
        }
    }

}
setTimeout(function() {
    road_generator(coordonnee_final);
}, 10);
