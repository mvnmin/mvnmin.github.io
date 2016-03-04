class Movie {

	constructor() {
		this. masterTl = new TimelineMax({delay: 1});
		/* this.cfaTheme = new buzz.sound("../fonts/glass_ping.mp3", {preload: true, autoplay: false, loop: false}); */
		this.actors = {
			usaMap: document.querySelector("#map"),
			replayText: document.querySelector("#Text"),
			cfaLogo: document.querySelector("#cfa_logo"),
			redRect: document.querySelector("#red_rectangle")
		};
		this.replayButton = document.querySelector('#replay_button');
	}

	//clear stage
	clearStage() {
		let clearTl = new TimelineMax();

		clearTl
			.set(this.actors.usaMap, { autoAlpha: 0})
			.set(this.actors.replayText, { autoAlpha: 0})
			.set(this.actors.cfaLogo, { autoAlpha: 0})
			.set(this.actors.redRect, { autoAlpha: 0})
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

	//animate red_rectangle
	animateRect(theme) {
		let rectTl = new TimelineMax({immediateRender:false});

		rectTl
			.to(this.actors.redRect, 1, {autoAlpha:1, ease: Linear.easeNone})
			.set(this.actors.redRect,{rotation:0, scale:1, transformOrigin: 'center top'})
			.to(this.actors.redRect, 1.6, {
				bezier: { type: 'soft', values: [{x:-200,y:-200},{x:-104,y:-22},{x:-229,y:-5},{x:-144,y:-52}], autoRotate: false},
				transformOrigin: 'center top',
				scale:1,
				ease: Power1.easeInOut, onStart: this.startFly, onStartParams: [this.actors.flyLeftWing, this.actors.flyRightWing, this.actors.fly, this.actors.bottomLashes, this.cfaTheme] })
			//.to(this.actors.redRect, 0.6, {scaleX: 0.7, transformOrigin:'center top'}, '-=0.75')
			.to(this.actors.cfaLogo, 1, {autoAlpha:1, ease: Linear.easeNone})
			.to(this.actors.usaMap, 1, {autoAlpha:1, ease: Linear.easeNone})
			.to(this.actors.replayText, 1, {autoAlpha:1, ease: Linear.easeNone})

			//start playing the sound
			if(theme) {
				theme.play().fadeIn(800);
			}
		;

		return rectTl;
	}

	start() {
		this.masterTl
			.add(this.clearStage(), 'clearstage')
			.add(this.animateRect(), 'animate-rect')
		;

		console.log('coming...');

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
