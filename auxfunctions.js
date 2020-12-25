//start at the beginning
function startPlay(_song){
	loop();
	timecode = 0;
	startTime = Date.now();
	_song.play();
	loopState = true;
	initState = false;
}

//pause playback
function pausePlay(_song) {
	pauseTime = Date.now();
	if(debug) console.log("pausetime: "+pauseTime);
	loopState = false;
	noLoop();
	_song.pause();
}

//resume playing after pause
function resumePlay(_song) {
	interval = Date.now() - pauseTime;
	if(debug) console.log("interval: "+interval)
	startTime = startTime + interval;
	if(debug) console.log("starttime: "+startTime);
	loopState = true;
	loop();
	_song.play();
}

//reset to beginning
function reset() {
	if(debug) console.log("reset");
	timecode = 0;
	noLoop();
	showimage();
	c.background(bgColor.red, bgColor.green, bgColor.blue, bgColor.alpha);
	initState = true;
	loopState = false;
	song.stop();
}

//IMAGE + BG
function imgsub() {
	img.resize(width, 0);
	subw = submatx * img.width;
	subh = submatx * img.height;

	//sin / noise
	subx = map(sin_(ii,768),-1,1,0,img.width*submatx);
	suby = map(sin_(ii,890),-1,1,0,img.height*submatx);
}

function showimage() {
	imgsub();
	image(img, 0, 0, width, height, subx, suby, subw, subh);
}

//DRAWING
function maxBezInc(inc) {
	maxBezzes += inc;
}

function growShrink(max) {
	maxBezzes += growShrinkAmt;
	if(maxBezzes > max || maxBezzes < initBezzes) {
		growShrinkAmt = -growShrinkAmt;
	}
}

function linesToDraw() {
	if(frameCount < maxBezzes) {
		return frameCount;
	} else if (bezzes.length < maxBezzes) {
		return bezzes.length;
	} else {
		return maxBezzes;
	}
}

//MODULATORS
function sin_(i, speed = 100) { return sin(i/speed + PI / 2)}

function vect_(i, speed = 1000) { return p5.Vector.fromAngle(i / speed, 1) }

function randomGate (f) {
	if (Math.floor(random(f)) == 0) {return 1} else {return 0}
}

//JSON MANIPULATION
class DataStream {
	constructor (path) {	
		this.stream_ = path.slice(2,path.length); // first two items in the array are weird
	}

	get stream() {
		return this.stream_;
	}

	get min () {
		let bottom = 100000;
		for(let i = 0; i < this.stream.length; i++) {
			if(this.stream[i] < bottom) {
				bottom = this.stream[i];
			}
		}
		return bottom;
	}
	
	get max () {
		let top = -100000;
		for(let i = 0; i < this.stream.length; i++) {
			if(this.stream[i] > top) {
				top = this.stream[i];
			}
		}
		return top;
	}

	modulator (index,scalemin,scalemax,outputmin,outputmax) {
		let inputmin = this.min + scalemin*(this.max - this.min);
		let inputmax = this.max - scalemax*(this.max - this.min);
		let value = map(this.stream[index],inputmin,inputmax,outputmin,outputmax); 
		return this.clamp(value,outputmin,outputmax);// (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
	}

	gate (index,threshold) {
		let value = map(this.stream[index], this.min, this.max, 0, 1);
		return threshold < value 
	}

	clamp(num,low,high) {
		return Math.max(Math.min(num, Math.max(low, high)), Math.min(low, high))
	}
}	

//maps songData array max and minimum to useful range
function mapStream (stream,streammin,streammax) {
	return map(stream,streammin,streammax,-1,1);
}

function clamp (num, high, low) {
		return Math.max(Math.min(num, Math.max(low, high)), Math.min(low, high))
}


//IMAGE EXPORT
function nameFile(){
	return 'sketch_'+year()+month()+day()+'_'+hour()+minute()+second()+clickCount;
}

function saveImg () {
	if(pointerUpperLeft(mouseX,mouseY)) {
		console.log(nameFile());
		saveCanvas(c, nameFile(), fileFormat);
		}
}

//UTILITY
function millisToTime(mills) {
	let minutes = "0"+Math.floor(mills / 60000).toString();
	let seconds = "0"+Math.floor((mills % 60000)/1000).toString(); 
	return minutes.slice(-2)+':'+seconds.slice(-2);
}