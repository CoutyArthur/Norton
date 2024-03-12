AFRAME.registerComponent('car',{

    schema: {

        model: { type: 'asset' },
        positionStart: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
        positionEnd: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
    },

    init: function () {
        // Accès au composant pour utiliser GLTFLoader
        const loader = new THREE.GLTFLoader();
        const el = this.el;
        const data = this.data;
        const groupeCar = new THREE.Group();


        //on load le model, on le place au centre, on le redimensionne et on l'ajoute au groupe groupeCar
        loader.load(data.model, 
            function (gltf) {

                gltf.scene.position.set(0,2,0);
                gltf.scene.scale.set(2,2,2);
                groupeCar.add(gltf.scene);

            });
        
        //on gere l'orientation suivant si la position z du debut de la route ets superieur ou non a la position e de la fin de la route
        var orientation = 0;
        var sens_angle = 0;
        if (data.positionStart.z > data.positionEnd.z){

            sens_angle = -1;

    
        }
        else{
    
            sens_angle = 1;
            orientation = Math.PI;
    
        }

        //on trouve l'angle de la voiture grace au cosinus entre dans le triangle route, axe z, axe x
        var distance = Math.sqrt(Math.pow(data.positionEnd.x - data.positionStart.x, 2) + Math.pow(data.positionEnd.z - data.positionStart.z, 2)); //hypoténus
        adjacent = Math.abs(data.positionStart.z - data.positionEnd.z);
        var cos = adjacent / distance;
        var angle = Math.acos(cos);
        angle *= sens_angle;
        
        //on rotate le groupe pour etre dans le bon sens
        groupeCar.rotateY(angle+orientation);
        
        this.el.setObject3D('groupeCar', groupeCar);

        //on positionne le groupe au debut de la route
        this.el.getObject3D('groupeCar').position.set(data.positionStart.x,data.positionStart.y,data.positionStart.z);

    },

    tick: function (time, timeDelta){

        const data = this.data;
        //on recupere laposition actuel du groupe
        var actual_position = this.el.getObject3D('groupeCar').position;
        speed = 0.05

        //on trouve l'equation de la droite de la forme ax+b (coef_dir*x + ordonnee_orig)
        var coef_dir = (data.positionEnd.z-data.positionStart.z)/(data.positionEnd.x-data.positionStart.x);
        var ordonee_orig = data.positionStart.z - coef_dir*data.positionStart.x;

        //si la voiture doit aller de la gauche vers le droite, on incremente x
        if (data.positionStart.x < data.positionEnd.x){

            //si la voiture n'a pas atteint l'arrivee on la fait avancer
            if(actual_position.x < data.positionEnd.x){

                actual_position.x += speed;
                actual_position.z = coef_dir*actual_position.x + ordonee_orig;

            }
            //si la voiture a atteint l'arrivee, elle ne bouge plus et on la rend invisible
            else{

                this.el.getObject3D('groupeCar').visible = false;
            }

        }
        //si la voiture doit aller de la droite vers le gauche, on decremente x
        if (data.positionEnd.x < data.positionStart.x){

            //si la voiture n'a pas atteint l'arrivee on la fait avancer
            if(actual_position.x > data.positionEnd.x){

                actual_position.x -= speed;
                actual_position.z = coef_dir*actual_position.x + ordonee_orig;

            }
            //si la voiture a atteint l'arrivee, elle ne bouge plus et on la rend invisible
            else{

                this.el.getObject3D('groupeCar').visible = false;
            }

        }
        
        //on place la voiture à sa nouvelle position
        this.el.getObject3D('groupeCar').position.set(actual_position.x,0,actual_position.z);

    }

})