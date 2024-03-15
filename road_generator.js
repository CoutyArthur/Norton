import { coordonnee_final} from './file_reader.js';

function road_generator(tableauPosition){

    /*tableauPosition = [
        [new THREE.Vector3(-150, 1, -150), new THREE.Vector3(150, 1, 150)],
        [new THREE.Vector3(0, 1, -150), new THREE.Vector3(0, 1, 150)],
        [new THREE.Vector3(-150, 1, 0), new THREE.Vector3(150, 1, 0)]

    ];*/
    const newRoad = document.createElement('a-entity');
    newRoad.setAttribute('road', {width: 0.5, positions: tableauPosition});
    const scene = document.querySelector('a-scene');
    scene.appendChild(newRoad);
    

}
setTimeout(function() {
    road_generator(coordonnee_final);
}, 10);
