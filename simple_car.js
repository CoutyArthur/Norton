AFRAME.registerComponent('simple_car',{

    schema: {

        position_start: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
        position_end: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },

    },

    init: function () {

        const el = this.el;
        const data = this.data;

        if (data.position_start.z > data.position_end.z){

            sens_angle = -1

        }
        else{

            sens_angle = 1

        }

        

        const boxGeometry = new THREE.BoxGeometry(1.5, 2, 3.5);
        const material = new THREE.MeshBasicMaterial({ color: 0x00FFFF});
        this.cube = new THREE.Mesh(boxGeometry, material);

        //angle de la voiture

        const distance = Math.sqrt(Math.pow(data.position_end.x - data.position_start.x, 2) + Math.pow(data.position_end.z - data.position_start.z, 2)); //hypoténus
        adjacent = Math.abs(data.position_start.z - data.position_end.z);
        var cos = adjacent / distance;
        var angle = Math.acos(cos)
        angle *= sens_angle;

        this.cube.rotation.set(0, angle, 0)

        this.el.setObject3D('cube', this.cube);
        this.el.object3D.position.set(data.position_start.x, data.position_start.y, data.position_start.z);
        
    },

    tick: function (time, timeDelta){

        const data = this.data
        const speed = 0.05;
        var actual_position = this.el.object3D.position;
        const coef_dir = (data.position_end.z-data.position_start.z)/(data.position_end.x-data.position_start.x);
        const ordonee_orig = data.position_start.z - coef_dir*data.position_start.x;

        if (data.position_start.x < data.position_end.x){

            if(actual_position.x < data.position_end.x){

                actual_position.x += speed;
                actual_position.z = coef_dir*actual_position.x + ordonee_orig;

            }

        }
        if (data.position_end.x < data.position_start.x){

            if(actual_position.x > data.position_end.x){

                actual_position.x -= speed;
                actual_position.z = coef_dir*actual_position.x + ordonee_orig;

            }

        }

        this.el.setAttribute('position', {
            x: actual_position.x,
            y: actual_position.y,
            z: actual_position.z
        });

    }

})