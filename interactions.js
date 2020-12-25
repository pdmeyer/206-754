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
		return x<0.1*width && y >0.9*height;
	} else if (region == "bottom") {
		return y > 0.9 * height;
	} else if (region == "top") {
		return y < 0.1 * height;
	} else if (region == "middle") {
		return y > 0.9 * height && y > 0.1 * height;
	} else if (region == "canvas") {
		return y > 0.9 * height && y > 0.1 * height && x > 0.9 * width && x > 0.1 * width;
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
