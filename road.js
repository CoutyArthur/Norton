AFRAME.registerComponent('road',{

    schema: {
        width: {type:'number', default: 0.5},
        position_start: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
        position_end: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
        color: {type: 'color', default: '#000000'},
    },

    init: function () {

        var data =this.data;
        var el = this.el;

        const points = [data.position_start, data.position_end];

        const lineMaterial = new THREE.LineBasicMaterial({
            color: data.color,
            linewidth: data.width
        })
        var lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

        const line = new THREE.Line(lineGeometry, lineMaterial);
        this.el.setObject3D('line', line);



        /*var x_centre = 0;

        var sens_angle = 1

        //position du centre de la route et orientation de l'angle de la route

        if (data.position_start.x > data.position_end.x){

            x_centre = data.position_start.x - (data.position_start.x - data.position_end.x)/2;
            sens_angle *= -1

        }
        else{

            x_centre = data.position_end.x - (data.position_end.x - data.position_start.x)/2;
            sens_angle *= 1

        }

        var z_centre = 0;

        if (data.position_start.z > data.position_end.z){

            z_centre = data.position_start.z - (data.position_start.z - data.position_end.z)/2;
            sens_angle *= -1

        }
        else{

            z_centre = data.position_end.z - (data.position_end.z - data.position_start.z)/2;
            sens_angle *= 1

        }

        
        //on récupère la distance de la route pour la mettre dans height et dans width on la récupère dans data
        //ensuite on place la route grace au cordoonnee du centre de la route récuperer au dessus
        const distance = Math.sqrt(Math.pow(data.position_end.x - data.position_start.x, 2) + Math.pow(data.position_end.z - data.position_start.z, 2));

        this.plan = data.basicPlan;
        this.plan.scale.set(data.width, distance)

        //angle de la route

        adjacent = Math.abs(data.position_start.z - data.position_end.z);
        var cos = adjacent / distance;
        var angle = Math.acos(cos);
        angle *= sens_angle;

        this.plan.rotation.set(-90, 0, 0);
        this.plan.position.set(x_centre, 100, z_centre);

        this.el.setObject3D('plan', this.plan);
        console.log(this.plan.scale, this.plan.position, this.plan.rotation);*/
    },

})