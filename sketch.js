//SETUP
function preload() {
	songData = loadJSON('data/bergintro_trimmed.json');
	img = loadImage(imgfile);
	
	soundFormats('mp3');
	song = loadSound('audio/01_berg intro MIX 1.0_M3_256');
}

function setup() {
	c = createCanvas(windowWidth, windowHeight);	
	data1 = new DataStream(songData.razor);
	//data2 = new DataStream(songData.udu);
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

	//initializations
	loopState = false;
	initState = true;
	maxBezzes = initMaxBezzes;
	frameRate(writeSpeed);
	angleMode(DEGREES);
	mouseDownX = 0;
	mouseDownY = 0;
	mouseX = width / 2;
	mouseY = height / 2;	
	ellipseX = mouseX;
	ellipseY = mouseY;

	showimage();
	c.background(bgColor.red_i, bgColor.green, bgColor.blue, bgColor.alpha);
	noLoop();
}

//DRAW
function draw() {
	if(!initState) {
		ii = millis() * writeSpeed/60; //
		mills = Date.now() - startTime;
		timecode = Math.ceil(mills/16); //sync song to visual
		let easing = 0.03;
	
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
				bg.Color.red = bgColor.red_i;
			}
			c.background(bgColor.red, bgColor.green, bgColor.blue, bgColor.alpha); //

			push();
			// shearX(rotateAmt); // does this work? 
			scale(scaleX,scaleY);
			writeLines(frameCount-2, maxBezzes,0,0);
			pop();
			if(growShrinkOn) {
				growShrink(initMaxBezzes);
			};
		};
	
		if (timecode >= data1.stream.length - 10*(1000/writeSpeed)) {
			console.log(timecode); 
			startPlay(song);
		 };
	
		if(debug) console.log(millisToTime(mills)+' | '+timecode+' | '+Math.floor(100 * timecode / data1.stream.length)+'%' );
	}	
}
