function road_generator(){

    const tableauPosition_start = [
        new THREE.Vector3(-7, -40, 5),
        new THREE.Vector3(-15, -40, 0)
        
    ];

    const tableauPosition_end = [
        new THREE.Vector3(20, -40, 10),
        new THREE.Vector3(5, -40, -15)
        
    ];

    console.log();

    for (var i=0; i<=tableauPosition_start.length; i++){

        const newRoad = document.createElement('a-entity');

        newRoad.setAttribute('road', {width: 4, position_start: tableauPosition_start[i], position_end: tableauPosition_end[i]});
        const roadScene = document.getElementById('roadScene');
        roadScene.appendChild(newRoad);

    }

}
setTimeout(function() {
    road_generator();
}, 10);
