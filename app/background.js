import Three from 'three';

export default class Background {
	constructor(target) {
		this.target = target;

		this.setupBaseScene();
		this.addLights();
		window.Three = Three;

		for (let i = 0; i < 500; i++) {
			let point = this.addPoint(0xFFFFFF, 2, 10, 10);
			point.position.x = this.getRandomArbitrary(-400, 400);
			point.position.y = this.getRandomArbitrary(-400, 400);
			point.position.z = this.getRandomArbitrary(-400, 400);
		}

		this.update();
		this.render();
	}

	getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}

	addPoint(color, radius, segmentsWidth, segmentsHeight) {
		let geometry;
		let material;
		let shape;

		geometry = new Three.SphereGeometry(radius, segmentsWidth, segmentsHeight);
		material = new Three.MeshLambertMaterial({
			emissive: 0x000000,
			color: color,
			transparent: true,
			opacity: 0.8
		});

		shape = new Three.Mesh(geometry, material);
		this.scene.add(shape);

		return shape;
	}

	setupBaseScene() {
		let aspect = window.innerWidth / window.innerHeight;
		let far = 1000;
		let fov = 45;
		let near = 0.1;

		this.scene = new Three.Scene();
		this.camera = new Three.PerspectiveCamera(fov, aspect, near, far);
		this.renderer = new Three.WebGLRenderer({ antialias: true });
		this.renderer.setClearColor(0x000000);
		this.renderer.shadowMapEnabled = true;
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		this.target.appendChild(this.renderer.domElement);

		this.camera.position.x = 0;
		this.camera.position.y = 0;
		this.camera.position.z = 0;
	}

	addLights() {
		let light = new Three.PointLight(0xFFFFFF);
		light.intensity = 3;
		light.position.x = 0;
		light.position.y = 0;
		light.position.z = 0;

		this.scene.add(light);
	}

	update() {

	}

	render() {
		this.update();

		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(() => this.render());
	}
}
