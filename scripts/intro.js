class Movie {

	constructor() {
		this. masterTl = new TimelineMax({delay: 1});
		//this.aeonTheme = new buzz.sound("https://s3.amazonaws.com/cdn.siggyworks.com/playground/aeon-flux/aeon_flux_theme.mp3", {preload: true, autoplay: false, loop: false});
		this.actors = {
			cfaLogo: document.querySelector("#cfa_logo"),
			titleText: document.querySelector("#Text"),
			rightVeins: document.querySelector("#righteyeveins"),
			leftVeins: document.querySelector("#lefteyeveins"),
			redRect: document.querySelector("#red_rectangle"),
			iris: document.querySelector('#iris-pupil'),
			pupil: document.querySelector('#iris-pupil #pupil'),
			bottomLashes: document.querySelectorAll('#bottom_lashes path')
		};
		this.replayButton = document.querySelector('#replay_button');
	}

	//clear stage
	clearStage() {
		let clearTl = new TimelineMax();

		clearTl
			//.set(this.actors.redRect, { autoAlpha: 0})
			.set(this.actors.cfaLogo, { autoAlpha: 0})
			.set(this.actors.titleText, { autoAlpha: 0})
			.set(this.actors.rightVeins, { autoAlpha: 0})
		;

		return clearTl;
	}

	//fly wings loop
	startFly(wing1,wing2,fly, bottomLashes, theme) {
		//let flyTl = new TimelineMax({repeat:-1, yoyo: true});

		//flyTl.staggerFromTo([wing1, wing2], 0.06, {rotation:-40, transformOrigin:'left bottom'}, {rotation:30, transformOrigin:'left bottom'}, 0.01);

		// quivers ...
		function redoQuiver(fly) {
			TweenMax.to(fly, 0.2, {x: Math.random()*6 -3, y:Math.random()*6 -3, onComplete: redoQuiver, onCompleteParams: [fly]});
		}
		redoQuiver(fly);

		function lashQuiver(bottomLashes) {
			TweenMax.staggerTo(bottomLashes, 0.2, {rotation:Math.random()*2 -1, transformOrigin:'right bottom', onComplete: lashQuiver, onCompleteParams: [bottomLashes]}, 0.01);
		}
		lashQuiver(bottomLashes);

		//start playing the sound
		if(theme) {
			theme.play().fadeIn(800);
		}
	}

	//animate iris
	animateIris() {
		let irisTl = new TimelineMax({immediateRender:false});

		irisTl
			.set(this.actors.iris,{rotation:4, scale:0.6, transformOrigin: 'center center'})
			.add('eye-roll-start')
			.to(this.actors.iris, 1.6, {
				bezier: { type: 'soft', values: [{x:0,y:8},{x:-104,y:-22},{x:-229,y:-5},{x:-344,y:52}], autoRotate: false},  //,{x:-114,y:100}{x:-229,y:18},{x:-344,y:59}
				transformOrigin: 'center center',
				scale:1,
				ease: Power1.easeInOut, onStart: this.startFly, onStartParams: [this.actors.flyLeftWing, this.actors.flyRightWing, this.actors.fly, this.actors.bottomLashes, this.aeonTheme] })
			.to(this.actors.iris, 0.6, {scaleX: 0.7, transformOrigin:'center center'}, '-=0.75')
			.add('eye-roll-stop')
			.to(this.actors.pupil, 0.8, {scale:0.45, transformOrigin: 'center center', ease: Power2.easeInOut})
			.add('pupils-constricted')
			.to(this.actors.leftVeins, 0.8, {x:'-=25', scale:0.3, transformOrigin: 'left bottom'}, 'eye-roll-start+=1.1')
			.fromTo(this.actors.rightVeins, 1.3, {x:'+=100', scale:0.4, transformOrigin:'right bottom',autoAlpha:1}, 
				{x:0, scale:1, transformOrigin:'right bottom', ease: Power1.easeInOut}, 'eye-roll-start+=0.5')
			.to(this.actors.cfaLogo, 1, {autoAlpha:1, ease: Linear.easeNone})
			.to(this.actors.titleText, 1, {autoAlpha:1, ease: Linear.easeNone})
			
		;

		return irisTl;
	}

	//animate red_rectangle
	animateRect() {
		let rectTl = new TimelineMax({immediateRender:false});

		rectTl
			.set(this.actors.redRect,{rotation:4, scale:0.6, transformOrigin: 'center center'})
			.add('eye-roll-start')
			.to(this.actors.redRect, 1.6, {
				bezier: { type: 'soft', values: [{x:0,y:8},{x:-104,y:-22},{x:-229,y:-5},{x:-344,y:52}], autoRotate: false},  //,{x:-114,y:100}{x:-229,y:18},{x:-344,y:59}
				transformOrigin: 'center center',
				scale:1,
				ease: Power1.easeInOut, onStart: this.startFly, onStartParams: [this.actors.flyLeftWing, this.actors.flyRightWing, this.actors.fly, this.actors.bottomLashes, this.aeonTheme] })
			.to(this.actors.redRect, 0.6, {scaleX: 0.7, transformOrigin:'center center'}, '-=0.75')
			.add('eye-roll-stop')
			.to(this.actors.pupil, 0.8, {scale:0.45, transformOrigin: 'center center', ease: Power2.easeInOut})
			.add('pupils-constricted')
			.to(this.actors.redRect, 1, {autoAlpha:1, ease: Linear.easeNone})
			.to(this.actors.leftVeins, 0.8, {x:'-=25', scale:0.3, transformOrigin: 'left bottom'}, 'eye-roll-start+=1.1')
			.fromTo(this.actors.rightVeins, 1.3, {x:'+=100', scale:0.4, transformOrigin:'right bottom',autoAlpha:1}, 
				{x:0, scale:1, transformOrigin:'right bottom', ease: Power1.easeInOut}, 'eye-roll-start+=0.5')
			.to(this.actors.cfaLogo, 1, {autoAlpha:1, ease: Linear.easeNone})
			
		;

		return rectTl;
	}

	start() {
		this.masterTl
			.add(this.clearStage(), 'clearstage')
			.add(this.animateIris(), 'animate-iris')
		;

		console.log('going...');

		//bind replay button
		this.replayButton.addEventListener('click', () => {
			this.replay();
		})
	}

	replay() {
		this.masterTl.seek(0).play();
		console.log('replaying...');
	}
}

var movie = new Movie();
movie.start();
