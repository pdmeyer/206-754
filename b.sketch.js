//global configs
const sketchName = "linearConst2";
const fileFormat = 'png'; //'jpg' or 'png'
const debug = false;
const audiofile = 'https://files.cargocollective.com/c700175/01_berg-intro-MIX-1.0_M3_256.mp3';
const jsonfile = 'https://files.cargocollective.com/c700175/bergintro_trimmed.json';
const imgfile = 'https://files.cargocollective.com/c700175/2019-02-26-15.45.50_res.jpg';
const submatx = 0.5;
const easing = 0.03;
const growShrinkOn = true;
const linesPerWrite = 1;
const initBezzes = 1; //how many lines to start with
const initMaxBezzes = 200; // how many lines to grow to
const writeSpeed = 10; //framerate
const scaleX = 1.2;
const scaleY = 1.0;
const rotateAmt = -20;
const bgColor = {
    red_i: 232,
    red: 232,
    green: 220,
    blue: 204,
    alpha: 150
}

//vars
let loopState = false;
let initState = true;
let ii = 0;
let bez1;
let bezzes = [];
let maxBezzes = initMaxBezzes;
let gXPos;
let gYPos;
let c;
let frames = 1;

let clickCount = 0;
let subx = 0;
let suby = 0;
let growShrinkAmt = 1;
let pauseTime;


//JSON data
let songData;
let data1;


function preload() {
	songData = loadJSON(jsonfile);
	img = loadImage(imgfile);
	song = createAudio(audiofile);

}

function setup() {
	c = createCanvas(windowWidth, windowHeight);	
	data1 = new DataStream(songData.razor);
	gXPos = width * 0.25; 
	gYPos = height * 0.5;


	bez1 = {
		vert: {
			x1: width * 0.25,
			y1: height * 0.5, 
			cpx1: width*0.05,
			cpy1: -height*0.1,
			cpx2: width*0.45,
			cpy2: -height*0.1,
			x2: width * 0.75,
			y2: height * 0.5,
		},
		stroke: {
			red: 255,
			green: 255,
			blue: 255,
			alpha: 255,
		},
		fill: {
			red: 150,
			green: 150,
			blue: 150,
			alpha: 100,
		}
	}

	frameRate(writeSpeed);
	angleMode(DEGREES);
	mouseX = width / 2;
	mouseY = height / 2;

	showimage();
	c.background(bgColor.red_i, bgColor.green, bgColor.blue, bgColor.alpha);
	// noLoop();
	song.onended(reset)
}

function draw() {
	showimage();
	c.background(bgColor.red_i, bgColor.green, bgColor.blue, bgColor.alpha);
	if(loopState) {
		gettime();
	
		//modulations
		bez1.vert.x1 = followPointer('x', bez1.vert.x1, easing); 
		bez1.vert.y1 = followPointer('y', bez1.vert.y1, easing); 

		bez1.vert.cpx1 += 11 * vect_(ii, 105).y;
		bez1.vert.cpy1 += 1.3 * sin_(ii,45);
		bez1.vert.cpy2 += 1.3 * sin_(ii,52);
		bez1.vert.cpy1 += 7.6 * vect_(ii, 300).y;
		bez1.vert.cpx2 += 10 * vect_(ii, 400).y;
		bez1.vert.cpy1 += 4.2 * vect_(ii, 500).x;
		bez1.vert.x2 += -0.5 * sin_(ii,1000)
		
		//fill color
		bez1.fill.alpha = 10 * sin_(ii,1000);
		bgColor.red = bgColor.red_i + data1.modulator(timecode, 0.8, 0, 0, 20);
		
		//create bez objects
		bezzes.push(new Bez(bez1));
			if(bezzes.length > 1001) { 
				let d = bezzes.length - 1001;
				for(i=0; i<d; i++) {
					bezzes.shift();
				} 
			};
	
		//drawing
		if(frameCount % linesPerWrite == 0) {
			showimage();
			if(!bgColor.red) {
				bgColor.red = bgColor.red_i;
			}
			c.background(bgColor.red, bgColor.green, bgColor.blue, bgColor.alpha);

			push();
			scale(scaleX,scaleY);
			writeLines(frames, maxBezzes,0,0);
			pop();
			if(growShrinkOn) {
				growShrink(initMaxBezzes);
			};
		};
		frames += 1;
	
		if(debug) console.log(millisToTime(mills)+' | '+timecode+' | '+Math.floor(100 * timecode / data1.stream.length)+'%' );
	}	else{
		playButton();
		toggleLoop();
	}
}

function playButton() {
  let centerX = width / 2;
  let centerY = height / 2;
  noStroke();
  rectMode(CENTER)
  fill(221, 218, 198);
  rect(centerX, centerY, 110, 70, 5, 5, 5, 5);
  fill(255, 255, 255);
  let s = 20;
	triangle(centerX + s, centerY, centerX - s, centerY + s, centerX - s, centerY - s);
}

function mousePressed () {
	if(pointregion(mouseX,mouseY,"uleft")) {
		saveImg();
	} else if (pointregion(mouseX,mouseY,"canvas")) {
		if (initState) {
			startPlay(song);
		} else if(loopState) {
			pausePlay(song);
			} else {
			resumePlay(song);	
		}
		return false
	}
}
	
function keyPressed () {
	if(keyCode === 32) {
		console.log("spacebar");
	}
}

function pointregion(x, y , region) { //possible regions: uleft, uright, lleft, right, bottom, top, middle
	if(region == "uleft") {
		return x < 0.1 * width && y < 0.1 * height;
	} else if (region == "uright") {
		return x > 0.9 * width && y < 0.1 * height;
	} else if (region == "lleft") {
		return x < 0.1 * width && y > 0.9 * height;
	} else if (region == "bottom") {
		return y > 0.9 * height;
	} else if (region == "top") {
		return y < 0.1 * height;
	} else if (region == "middle") {
		return y < 0.9 * height && y > 0.1 * height;
	} else if (region == "canvas") {
		return y < 0.9 * height && y > 0.1 * height && x < 0.9 * width && x > 0.1 * width;
	}
}

//follow the pointer with easing
function followPointer (axis, val, easing) { 
	if(axis == 'x') {
		if (val != mouseX) {
			return val + (mouseX - val) * easing;
		} else {
			return val
		}
	} else if (axis == 'y') {
		if (val != mouseY) {
			return val + (mouseY - val) * easing;
		}  else {
			return val
		}
	} else {
			'first argument must be x or y (string)'
	}
}

  
  // main bezier curve object
  class Bez {
    constructor(obj) {
      this.x1 = obj.vert.x1;
      this.y1 = obj.vert.y1;
      this.cpx1 = obj.vert.cpx1;
      this.cpy1 = obj.vert.cpy1;
      this.cpx2 = obj.vert.cpx2;
      this.cpy2 = obj.vert.cpy2;
      this.x2 = obj.vert.x2;
      this.y2 = obj.vert.y2;
      this.stR = obj.stroke.red;
      this.stG = obj.stroke.green;
      this.stB = obj.stroke.blue;
      this.stA = obj.stroke.alpha;
      this.fR = obj.fill.red;
      this.fG = obj.fill.green;
      this.fB = obj.fill.blue;
      this.fA = obj.fill.alpha;
    }

    show (strkOr = 0, fillOr = 0) {
      if(!strkOr) {stroke(this.stR,this.stB,this.stG,this.stA)};
      if(!fillOr) {fill(this.fR, this.fG, this.fB, this.fA)};
      bezier(this.x1, this.y1, this.cpx1, this.cpy1, this.cpx2, this.cpy2, this.x2, this.y2);
    }
  }  

function writeLines (framecount, maxbezzes,strkOr=0,fillOr=0) {
  let startLine;
  let numLines;

  if(framecount < maxbezzes) {
    numLines = framecount;
    startLine = bezzes.length - framecount;
  } else if (bezzes.length < maxbezzes) {
    numLines = bezzes.length;
    startLine = 0;
  } else {
    numLines = maxbezzes;
    startLine = bezzes.length - maxbezzes;
  }

  for (let i = startLine; i < startLine + numLines; i++) {
    bezzes[i].show(strkOr,fillOr);
  }
}

//start at the beginning
function startPlay(_song){
	timecode = 0;
	startTime = performance.now();
	_song.play();
	loopState = true;
	initState = false;
	toggleLoop();
	
}

//pause playback
function pausePlay(_song) {
	pauseTime = performance.now();
	if(debug) console.log("pausetime: "+pauseTime);
	loopState = false;
	_song.pause();
}

//resume playing after pause
function resumePlay(_song) {
	interval = performance.now() - pauseTime;
	if(debug) console.log("interval: "+interval)
	startTime = startTime + interval;
	if(debug) console.log("starttime: "+startTime);
	loopState = true;
	_song.play();
	toggleLoop();
}

//reset to beginning
function reset() {
	if(debug) console.log("reset");
	song.stop();
	loopState = false;
	timecode = 0;
	initState = true;
}

function toggleLoop() {
	if(loopState) {
		loop();
	} else {
		noLoop();
	}
}

function gettime() {
	mills = performance.now() - startTime;
	timecode = Math.ceil(mills/16); //sync song to visual
	ii = mills * writeSpeed/60;
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
