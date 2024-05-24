AFRAME.registerComponent('car',{

    schema: {

        positionStart: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
        positionEnd: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
        taille:{type: 'number', default: 1}
    },

    init: function () {
        // Accès au composant pour utiliser GLTFLoader
        
        const el = this.el;
        const data = this.data;
        var scene = document.querySelector('a-scene').object3D;
        this.carHeight = 0.2
        carHeight = this.carHeight;
        var carOrigine;

        for(var i=0; i<scene.children.length; i++){

            if (scene.children[i].name == 'sphere'){

                carOrigine = scene.children[i];
                break;
            }

        }

        var car = carOrigine.clone();
        car.visible = true

        this.actual_position = data.positionStart.clone();

        car.position.set(0,carHeight,0);
        car.scale.set(carHeight,carHeight,carHeight);
        var red = data.taille;
        var blue = (255-data.taille);
        const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(red, 0, blue) });
        car.material = material;

        
        //on gere l'orientation suivant si la position z du debut de la route ets superieur ou non a la position e de la fin de la route
        var orientation = 0;
        var sens_angle = 1;
            
        if (data.positionStart.z > data.positionEnd.z){

            sens_angle *= -1;


        }
        else{

            sens_angle *= 1;
            orientation = Math.PI;

        }

        if (data.positionStart.x > data.positionEnd.x){

            sens_angle *= -1;
            

        }
        else{

            sens_angle *= 1;
            

        }

        //on trouve l'angle de la voiture grace au cosinus entre dans le triangle route, axe z, axe x
        var distance = Math.sqrt(Math.pow(data.positionEnd.x - data.positionStart.x, 2) + Math.pow(data.positionEnd.z - data.positionStart.z, 2)); //hypoténus
        adjacent = Math.abs(data.positionStart.z - data.positionEnd.z);
        var cos = adjacent / distance;
        var angle = Math.acos(cos);
        angle *= sens_angle;
        
        //on rotate le groupe pour etre dans le bon sens
        car.rotateY(angle+orientation);

        this.coef_dir = (data.positionEnd.z-data.positionStart.z)/(data.positionEnd.x-data.positionStart.x);
        this.ordonee_orig = data.positionStart.z - this.coef_dir*data.positionStart.x;
        
        this.el.setObject3D('car', car);

        //on positionne le groupe au debut de la route
        this.el.getObject3D('car').position.set(data.positionStart.x,carHeight,data.positionStart.z); 

    },

    tick: function (time, timeDelta){

        if (!this.el.getObject3D('car')) return;

        const data = this.data;
        //on recupere la position actuel du groupe

        const carHeight = this.carHeight;
        var actual_position = this.actual_position;

        actual_position.copy(this.el.getObject3D('car').position);
        const speed = 0.05

        //on trouve l'equation de la droite de la forme ax+b (coef_dir*x + ordonnee_orig)
        var coef_dir = this.coef_dir
        var ordonee_orig = this.ordonee_orig

        //si la voiture doit aller de la gauche vers le droite, on incremente x
        if (data.positionStart.x < data.positionEnd.x){
            
            //si la voiture n'a pas atteint l'arrivee on la fait avancer
            if(actual_position.x < data.positionEnd.x){

                actual_position.x += speed;
                actual_position.z = coef_dir*actual_position.x + ordonee_orig;
                
            }
            //si la voiture a atteint l'arrivee, elle ne bouge plus et on la rend invisible
            else{

                actual_position = data.positionStart.clone();
            }

        }
        
        //si la voiture doit aller de la droite vers le gauche, on decremente x
        else if (data.positionEnd.x < data.positionStart.x){
            
            //si la voiture n'a pas atteint l'arrivee on la fait avancer
            if(actual_position.x > data.positionEnd.x){

                actual_position.x -= speed;
                actual_position.z = coef_dir*actual_position.x + ordonee_orig;

            }
            //si la voiture a atteint l'arrivee, elle ne bouge plus et on la rend invisible
            else{

                actual_position = data.positionStart.clone();
            }

        }
        
        else{
            
            if(data.positionStart.z > data.positionEnd.z){
                
                if(actual_position.z > data.positionEnd.z){
                    
                    actual_position.z -= speed

                }
                else{

                    actual_position = data.positionStart.clone();

                }

            }
            else{

                if(actual_position.z < data.positionEnd.z){
                    
                    actual_position.z += speed

                }
                else{

                    actual_position = data.positionStart.clone();

                }
            }

        }
        //console.log(actual_position);
        //on place la voiture à sa nouvelle position
        this.el.getObject3D('car').position.set(actual_position.x,carHeight,actual_position.z);

    }

})