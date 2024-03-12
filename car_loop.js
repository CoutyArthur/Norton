function createCar(val_model, val_start, val_end) {

    const newCar = document.createElement('a-entity');

    newCar.setAttribute('car', {model: val_model, positionStart: val_start, positionEnd: val_end});
    
    const carScene = document.querySelector('#carScene');
    carScene.appendChild(newCar);

}



function loopCar() {

    const tableauPosition = [

        [new THREE.Vector3(-7, 2, 5), new THREE.Vector3(20, 2, 10)],
        [new THREE.Vector3(-15, 2, 0), new THREE.Vector3(5, 2, -15)]

    ]

    const tableauFrequency = [

        1500,
        3000
    ];

    for (let i=0; i<tableauPosition.length; i++){

        (function (start, end) {
            setInterval(() => createCar('#car1', start, end), tableauFrequency[i]);
        })(tableauPosition[i][0], tableauPosition[i][1]);

    }
}


setTimeout (function(){
    //loopCar();
},10);

