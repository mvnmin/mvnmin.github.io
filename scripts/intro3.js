"use strict";

class Movie {

	constructor() {
		this. masterTl = new TimelineMax({delay: 1});
		this.actors = {
			videoMovie: document.querySelector("#video"),
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
			//.set(this.actors.videoMovie, { autoAlpha: 0})
			.set(this.actors.replayText, { autoAlpha: 0})
			.set(this.actors.cfaLogo, { autoAlpha: 0})
			.set(this.actors.redRect, { autoAlpha: 0})
		;

		return clearTl;
	}

	//animate red_rectangle
	animateRect(theme) {
		let rectTl = new TimelineMax({immediateRender:false});

		rectTl
			.to(this.actors.redRect, 1, {autoAlpha:1, ease: Linear.easeNone})
			.set(this.actors.redRect,{rotation:0, scale:1, transformOrigin: 'center top'})
			.to(this.actors.redRect, 1.6, {
				bezier: { type: 'soft', values: [{x:0,y:-200},{x:0,y:-140},{x:0,y:-240},{x:0,y:0}], autoRotate: false},
				transformOrigin: 'center top',
				scale:1 })
			//.to(this.actors.redRect, 0.6, {scaleX: 0.7, transformOrigin:'center top'}, '-=0.75')
			//.to(this.actors.videoMovie, 1, {autoAlpha:1, ease: Linear.easeNone})
			.to(this.actors.cfaLogo, 1, {autoAlpha:1, ease: Linear.easeNone})
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

var cfaIntro = new Movie();

cfaIntro.start();
