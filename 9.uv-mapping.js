// import * as THREE from 'three'
// import { Stats } from './libs/stats'


const init = () => {
    let stats = initStats()

    let scene = new THREE.Scene()

    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

    let webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setClearColor(0xffffff)
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMapEnabled = true

    camera.position.x = -30
    camera.position.y = 40
    camera.position.z = 50
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement)

    let step = 0


    let texture = new THREE.TextureLoader().load("./assets/textures/ash_uvgrid01.jpg")
    let material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    material.map = texture
    let geom = new THREE.BoxGeometry(24, 24, 24)
    let mesh = new THREE.Mesh(geom, material)

    mesh.rotation.z = 0.5 * Math.PI
    mesh.rotation.y = 0.2 * Math.PI
    mesh.rotation.x = 0.2 * Math.PI
    scene.add(mesh)

    var controls = new function () {
        // we need the first child, since it's a multimaterial
        this.uv1 = geom.faceVertexUvs[0][0][0].x;
        this.uv2 = geom.faceVertexUvs[0][0][0].y;
        this.uv3 = geom.faceVertexUvs[0][0][1].x;
        this.uv4 = geom.faceVertexUvs[0][0][1].y;
        this.uv5 = geom.faceVertexUvs[0][0][2].x;
        this.uv6 = geom.faceVertexUvs[0][0][2].y;
    };

    var gui = new dat.GUI();
    gui.add(controls, 'uv1', 0, 1).onChange(function (e) {
        for (let index = 0; index < geom.faceVertexUvs[0].length; index++) {
            geom.faceVertexUvs[0][index][0].x = e;
            // console.log(index, geom.faceVertexUvs[0][index][0])
        }
        geom.uvsNeedUpdate = true
        // console.log(geom.faceVertexUvs)
    });
    gui.add(controls, 'uv2', 0, 1).onChange(function (e) {
        for (let index = 0; index < geom.faceVertexUvs[0].length; index++) {
            geom.faceVertexUvs[0][index][0].y = e;
            // console.log(index, geom.faceVertexUvs[0][index][0])
            // console.log(index, geom.faceVertexUvs[0][index][0])
        }
        geom.uvsNeedUpdate = true
        // console.log(geom.faceVertexUvs)
    });
    gui.add(controls, 'uv3', 0, 1).onChange(function (e) {
        for (let index = 0; index < geom.faceVertexUvs[0].length; index++) {
            geom.faceVertexUvs[0][index][1].x = e;
        }
        geom.uvsNeedUpdate = true
        // console.log(geom.faceVertexUvs)
    });
    gui.add(controls, 'uv4', 0, 1).onChange(function (e) {
        for (let index = 0; index < geom.faceVertexUvs[0].length; index++) {
            geom.faceVertexUvs[0][index][1].y = e;
        }
        geom.uvsNeedUpdate = true
        // console.log(geom.faceVertexUvs)
    });
    gui.add(controls, 'uv5', 0, 1).onChange(function (e) {
        for (let index = 0; index < geom.faceVertexUvs[0].length; index++) {
            geom.faceVertexUvs[0][index][2].x = e;
        }
        geom.uvsNeedUpdate = true
        // console.log(geom.faceVertexUvs)
    });
    gui.add(controls, 'uv6', 0, 1).onChange(function (e) {
        for (let index = 0; index < geom.faceVertexUvs[0].length; index++) {
            geom.faceVertexUvs[0][index][2].y = e;
        }
        geom.uvsNeedUpdate = true
        // console.log(geom.faceVertexUvs)
    });

    // let controls = new function () {
    //     // we need the first child, since it's a multimaterial
    //     this.loadCube1 = function () {

    //         let loader = new THREE.OBJLoader()
    //         loader.load('./assets/models/UVCube1.obj', function (geometry) {
    //             if (mesh) scene.remove(mesh)
    //             let material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    //             let texture = new THREE.TextureLoader().load("./assets/textures/ash_uvgrid01.jpg")
    //             material.map = texture

    //             geometry.children[0].material = material
    //             mesh = geometry

    //             geometry.scale.set(15, 15, 15)

    //             scene.add(geometry)
    //         })
    //     }

    //     this.loadCube2 = function () {

    //         let loader = new THREE.OBJLoader()
    //         loader.load('./assets/models/UVCube2.obj', function (geometry) {
    //             if (mesh) scene.remove(mesh)
    //             let material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    //             let texture = new THREE.TextureLoader().load("../assets/textures/ash_uvgrid01.jpg")
    //             material.map = texture

    //             geometry.children[0].material = material

    //             mesh = geometry
    //             geometry.scale.set(15, 15, 15)
    //             geometry.rotation.x = -0.3


    //             scene.add(geometry)
    //         })
    //     }
    // }



    // let gui = new dat.GUI()
    // gui.add(controls, 'loadCube1')
    // gui.add(controls, 'loadCube2')

    // let mesh
    // controls.loadCube1()

    const render = () => {
        stats.update()

        if (mesh) {
            mesh.rotation.y += 0.006
            mesh.rotation.x += 0.006
            mesh.rotation.z += 0.006
        }

        requestAnimationFrame(render)
        webGLRenderer.render(scene, camera)
    }

    render()
}


const initStats = () => {
    let stats = new Stats()
    stats.setMode(0)

    stats.domElement.style.position = 'absolute'
    stats.domElement.style.left = '0px'
    stats.domElement.style.top = '0px'

    document.getElementById("Stats-output").appendChild(stats.domElement)

    return stats
}


window.onload = init