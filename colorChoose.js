function changeColor(){


    var scene = document.querySelector('a-scene').object3D;
    var billBoard;
    console.log(scene.children.length);
    for (var i=0; i<scene.children.length; i++){
    
        if (scene.children[i].name == 'billBoard'){
        
            billBoard = scene.children[i];
            console.log("ok1");
            break;        
        }
        if (i == (scene.children.length-1)){
            console.log("ok2");
            i = 0;

        }
        
    }

    var btnColorChange = document.createElement('a-plane');
        btnColorChange.setAttribute('id', 'btnColorChange');
        btnColorChange.setAttribute('width', '13/5');
        btnColorChange.setAttribute('height', '7/5');
        btnColorChange.setAttribute('color', '#FF0000');

    var texte = document.createElement('a-text');
        texte.setAttribute('value', 'Changer de couleur');
        texte.setAttribute('align', 'center');
        texte.setAttribute('color', '#000000');
        texte.setAttribute('width', '(7/5)-0.5');
        texte.setAttribute('position', '0 0 0.1');
    
    btnColorChange.appendChild(texte);
    console.log(btnColorChange.object3D);
    billBoard.children.push(btnColorChange.object3D);
    billBoard.children[0].visible = true;
    billBoard.children[0].position.z += 0.2;
    console.log(billBoard);

}

setTimeout (function(){
    changeColor();
},10);