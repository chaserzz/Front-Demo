    /**
     * 创建场景对象Scene
     */
     var scene = new THREE.Scene();
     var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
     var R = 100; //圆弧半径
     var N = 50; //分段数量
     const arc = new THREE.ArcCurve(0,0,R,0,Math.PI,true);
     const leftLine = new THREE.LineCurve(new THREE.Vector2(R, 100), new THREE.Vector2(R, 0, 0))
     const RightLine = new THREE.LineCurve(new THREE.Vector2(-R, 0, 0), new THREE.Vector2(-R, 100, 0))
     const curPath = new THREE.CurvePath()
     curPath.curves.push(leftLine,arc,RightLine);
     var points = curPath.getPoints(200);
     geometry.setFromPoints(points)
     const material = new THREE.LineBasicMaterial({
       color: 0xff0000
     })
     const line = new THREE.Line(geometry,material)
     scene.add(line)
     /**
      * 光源设置
      */
     //点光源
     //环境光
     // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
     //点光源
     // 平行光
     var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
     // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
     directionalLight.position.set(80, 100, 50);
     // 方向光指向对象网格模型mesh2，可以不设置，默认的位置是0,0,0
     scene.add(directionalLight);
     var axisHelper = new THREE.AxisHelper(250);
     var dicrectionLightHelp = new THREE.DirectionalLightHelper(directionalLight,5)
     scene.add(axisHelper);
     scene.add(dicrectionLightHelp);
     /**
      * 相机设置
      */
     var width = window.innerWidth; //窗口宽度
     var height = window.innerHeight; //窗口高度
     var k = width / height; //窗口宽高比
     var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
     //创建相机对象
     var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
     camera.position.set(0,0,400 ); //设置相机位置
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
     renderer.render(scene,camera)
