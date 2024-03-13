import { coordonnee_final} from './file_reader.js';

function road_generator(tableauPosition){

    /*tableauPosition = [
        [new THREE.Vector3(-150, 1, -150), new THREE.Vector3(150, 1, 150)],
        [new THREE.Vector3(0, 1, -150), new THREE.Vector3(0, 1, 150)],
        [new THREE.Vector3(-150, 1, 0), new THREE.Vector3(150, 1, 0)]

    ];*/
    
    for (var i=0; i<tableauPosition.length; i++){
        for (var j=1; j<tableauPosition[i].length; j++){

            const newRoad = document.createElement('a-entity');
            newRoad.setAttribute('road', {width: 0.5, position_start: tableauPosition[i][j-1], position_end: tableauPosition[i][j]});
            const roadScene = document.getElementById('roadScene');
            roadScene.appendChild(newRoad);
            
        }
    }
    

}
setTimeout(function() {
    road_generator(coordonnee_final);
}, 10);
