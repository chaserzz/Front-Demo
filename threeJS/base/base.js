    /**
     * 创建场景对象Scene
     */
     var scene = new THREE.Scene();
     /**
      * 创建网格模型
      */
     var spheregeometry = new THREE.SphereGeometry(70, 60, 60); //创建一个球体几何对象
     var geometry = new THREE.BoxGeometry(120, 70, 70);
     var material = new THREE.MeshBasicMaterial({
       color: 0x00ff00
     }); //材质对象Material
     var sphereMaterial = new THREE.MeshPhongMaterial({
      color:0x0000ff,
      specular:0x4488ee,
      shininess:12,
      opacity: 0.9,
      transparent:true
     })
     var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
     var sphere = new THREE.Mesh(spheregeometry,sphereMaterial);
     scene.add(mesh); //网格模型添加到场景中
     scene.add(sphere);
     /**
      * 光源设置
      */
     //点光源
     var point = new THREE.PointLight(0xffffff);
     point.position.set(400, 200, 300); //点光源位置
     scene.add(point); //点光源添加到场景中
     //环境光
     var ambient = new THREE.AmbientLight(0x444444);
     // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
     var axisHelper = new THREE.AxisHelper(250);
     scene.add(axisHelper);
     scene.add(ambient);
     // console.log(scene)
     // console.log(scene.children) 
     /**
      * 相机设置
      */
     var width = window.innerWidth; //窗口宽度
     var height = window.innerHeight; //窗口高度
     var k = width / height; //窗口宽高比
     var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
     //创建相机对象
     var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
     camera.position.set(200, 300, 200); //设置相机位置
     console.log(scene.position); // 默认画布的的position坐标为 0.0.0
     camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
     /**
      * 创建渲染器对象
      */
     var renderer = new THREE.WebGLRenderer();
     renderer.setSize(width, height);//设置渲染区域尺寸
     renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
     document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
     //执行渲染操作   指定场景、相机作为参数
     //制定动画效果
     // 设置时间修正
     let T1 = new Date();
     function render (){
        let T2 = new Date();
        const t = T2 - T1;
        T1 = T2;
        renderer.render(scene, camera);
        mesh.rotateY(0.001 * t);
        requestAnimationFrame(() => {
          render();
        });
     }
     render()