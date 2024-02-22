function createCar(val_model, val_position_start, val_position_end) {
    /*const el = document.querySelector('#carScene');
    const val_model = el.getAttribute('model');
    const val_position_start = el.getAttribute('position_start');
    const val_position_end = el.getAttribute('position_end');*/

    const newCar = document.createElement('a-entity');

    newCar.setAttribute('car', {model: val_model, position_start: val_position_start, position_end: val_position_end});
  
    const carScene = document.querySelector('#carScene');
    console.log(document.getElementById('carScene'));
    carScene.appendChild(newCar);
}
  
function loopCar() {

    const tableauPosition_start = [
        new THREE.Vector3(-7, -40, 5),
        new THREE.Vector3(-15, -40, 0)
        
    ];

    const tableauPosition_end = [
        new THREE.Vector3(20, -40, 10),
        new THREE.Vector3(5, -40, -15)
        
    ];

    const tableauFrequency = [
        1500,
        3000
    ];
    
    for (let i=0; i<tableauPosition_start.length; i++){

        setInterval(() => createCar('#car1',tableauPosition_start[i], tableauPosition_end[i]), tableauFrequency[i]);

    }
}

loopCar();
