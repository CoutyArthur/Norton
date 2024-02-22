AFRAME.registerComponent('car',{

    schema: {

        model: { type: 'asset' },
        position_start: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
        position_end: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },

    },

    init: function () {
        // Accès au composant pour utiliser GLTFLoader
        const loader = new THREE.GLTFLoader();
        const el = this.el;
        const data = this.data;
        const groupeCar = new THREE.Group();
        const conv = (1/24);



        loader.load(data.model, 
            function (gltf) {

                gltf.scene.position.set(0,-38,0);
                gltf.scene.scale.set(2,2,2);
                groupeCar.add(gltf.scene);

            });
        
        var orientation = 0;
        if (data.position_start.z > data.position_end.z){

            sens_angle = -1

    
        }
        else{
    
            sens_angle = 1
            orientation = Math.PI;
    
        }

        const distance = Math.sqrt(Math.pow(data.position_end.x - data.position_start.x, 2) + Math.pow(data.position_end.z - data.position_start.z, 2)); //hypoténus
        adjacent = Math.abs(data.position_start.z - data.position_end.z);
        var cos = adjacent / distance;
        var angle = Math.acos(cos)
        angle *= sens_angle;
        
        groupeCar.rotateY(angle+orientation);
        
        this.el.setObject3D('groupeCar', groupeCar);

        this.el.getObject3D('groupeCar').position.set(data.position_start.x,data.position_start.y,data.position_start.z);

    },

    tick: function (time, timeDelta){

        const data = this.data
        var actual_position = this.el.getObject3D('groupeCar').position;
        speed = 0.05       
        const coef_dir = (data.position_end.z-data.position_start.z)/(data.position_end.x-data.position_start.x);
        const ordonee_orig = data.position_start.z - coef_dir*data.position_start.x;

        if (data.position_start.x < data.position_end.x){

            if(actual_position.x < data.position_end.x){

                actual_position.x += speed;
                actual_position.z = coef_dir*actual_position.x + ordonee_orig;

            }
            else{

                this.el.getObject3D('groupeCar').visible = false;
            }

        }
        if (data.position_end.x < data.position_start.x){

            if(actual_position.x > data.position_end.x){

                actual_position.x -= speed;
                actual_position.z = coef_dir*actual_position.x + ordonee_orig;

            }
            else{

                this.el.getObject3D('groupeCar').visible = false;
            }

        }
        
        this.el.getObject3D('groupeCar').position.set(actual_position.x,0,actual_position.z);

    }

})