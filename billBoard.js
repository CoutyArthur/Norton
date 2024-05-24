function afficheBillBoard(){

    const scene = document.querySelector('a-scene').object3D;
    var boardGeometry = new THREE.PlaneGeometry(13,7);
    const material = new THREE.MeshBasicMaterial({ color: '#FFFFFF'});

    var billBoard = new THREE.Mesh(boardGeometry, material);

    var camera = document.querySelector('#cameraWrapper').object3D;

    billBoard.name = 'billBoard';

    scene.add(billBoard);

    billBoard.visible = false;

    /*var rota = setInterval(function(){
        billBoard.position.copy( camera.position );
        billBoard.rotation.copy( camera.rotation );
        billBoard.updateMatrix();
        billBoard.translateZ( - 10 );
        console.log("1", scene.children[11].position);
        console.log("2", billBoard.position);},
        
    1000);*/

}

setTimeout (function(){
    afficheBillBoard();
},10);


window.addEventListener('keydown', function(evt){

    var scene;

    switch(evt.key){

        case 'v' || 'V':

            scene = document.querySelector('a-scene').object3D;
            var camera = document.querySelector('#cameraWrapper').object3D;
            var billBoard;
            for (var i=0; i<scene.children.length; i++){
        
                if (scene.children[i].name == 'billBoard'){
        
                    billBoard = scene.children[i];
                    break;
        
                }
        
            }

            billBoard.position.copy( camera.children[0].position );
            billBoard.rotation.copy( camera.children[0].rotation );
            billBoard.position.y += 20;
            billBoard.updateMatrix();
            billBoard.translateZ( - 10 );
        
            billBoard.visible = true;
            console.log("visible");
            break;
        
        case 'i' || 'I':

            scene = document.querySelector('a-scene').object3D;
            var billBoard;
            for (var i=0; i<scene.children.length; i++){
        
                if (scene.children[i].name == 'billBoard'){
        
                    billBoard = scene.children[i];
                    break;
        
                }
        
            }
        
            billBoard.visible = false;
            console.log("invisible");
            break;
    }
})

const rightController = document.querySelector('#rightController');

rightController.addEventListener('buttondown', function(evt){

    if(evt.detail.id == 4){

        const scene = document.querySelector('a-scene').object3D;
        var camera = document.querySelector('#cameraWrapper').object3D;
        var billBoard;
        for (var i=0; i<scene.children.length; i++){
    
            if (scene.children[i].name == 'billBoard'){
        
                billBoard = scene.children[i];
                break;
        
            }
        
        }

        if (billBoard.visible){

            billBoard.visible = false;

        }
        else{

            billBoard.position.copy( camera.children[0].position );
            billBoard.rotation.copy( camera.children[0].rotation );
            billBoard.position.y += 20;
            billBoard.updateMatrix();
            billBoard.translateZ( - 10 );
        
            billBoard.visible = true;

        }

    }
})

