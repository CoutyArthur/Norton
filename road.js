import * as THREE from './node_modules/three/build/three.module.js';
import * as BufferGeometryUtils from './node_modules/three/examples/jsm/utils/BufferGeometryUtils.js';


AFRAME.registerComponent('road',{

    schema: {
        width: {type:'number', default: 0.5},
        positions: { type: 'array'},
        color: {type: 'color', default: '#000000'},
    },

    init: function () {

        var data =this.data;
        var el = this.el;
        var lines = new THREE.Object3D;

        var linesGeometries = [];

        console.log(data.positions.length);
        for(var i=0; i<data.positions.length; i++){

            var lineGeometry = new THREE.BufferGeometry().setFromPoints([data.positions[i][0], data.positions[i][1]]);
            linesGeometries.push(lineGeometry);

        }

        const mergedGeometry = BufferGeometryUtils.mergeGeometries(linesGeometries, false);

        const lineMaterial = new THREE.LineBasicMaterial({
            color: data.color,
            linewidth: data.width
        });

        const mesh = new THREE.LineSegments(mergedGeometry, lineMaterial);
        lines.add(mesh);

        var scene = this.el.sceneEl.object3D;

        scene.add(lines);

        /*console.log(mergedGeometry.type, mesh.type);
        console.log(mesh instanceof THREE.Object3D);
        if(mesh instanceof THREE.Object3D){
            el.setObject3D('mesh', mesh);
        }
        else;
            console.log("dommage")
*/


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