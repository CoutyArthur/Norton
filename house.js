AFRAME.registerComponent('house',{
  schema: {
    width: {type:'number', default: 1},
    height: {type:'number',default: 0},
    color: {type: 'color', default: '#AAAAAA'}
  },
  
  init: function () {
    
    var data = this.data;
    var el = this.el;
    
    var width = data.width/2;
    var height = data.height/2;
     
   // Créer une boîte
    const boxGeometry = new THREE.BoxGeometry(data.width, data.height, data.width);
  
    // Créer une géométrie de pyramide
    const pyramidGeometry = new THREE.BufferGeometry();
    const pyramidVertices = new Float32Array([
      0, height, 0,   // Sommet haut
      -width, 0,width,  // Sommet base avant gauche
      width, 0, width,   // Sommet base avant droit
      width, 0, -width,  // Sommet base arriere droit
      -width, 0, -width  // Sommet base arriere gauche
    ]);
    
    const pyramidIndices = new Uint16Array([
      0, 1, 2,  // Face avant
      0, 2, 3,  // Face droite
      0, 3, 4,  // Face arriere
      0, 4, 1,  // Face gauche
      1, 2, 3,  // Base
      1, 3, 4
    ]);
    pyramidGeometry.setAttribute('position', new THREE.BufferAttribute(pyramidVertices, 3));
    pyramidGeometry.setIndex(new THREE.BufferAttribute(pyramidIndices, 1));
    
    const material = new THREE.MeshBasicMaterial({ color: data.color});
    
    this.cube = new THREE.Mesh(boxGeometry, material);
    this.cube.position.set(0, 0, 0);
    
    this.pyramid = new THREE.Mesh(pyramidGeometry, material);
    this.pyramid.position.set(0, height, 0);
    
    this.el.setObject3D('cube', this.cube);
    this.el.setObject3D('pyramid', this.pyramid);
      
    
  },
  
  /*tick: function (time, timeDelta) {
    
    var currentRotation = this.el.object3D.rotation;
    
    this.el.setAttribute('rotation', {
      x: currentRotation.x,
      y: currentRotation.y + 0.01*time,
      z: currentRotation.z
    });
    
  }*/
  
})
