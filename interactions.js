// MOUSE CONTROLS
function mousePressed () {
	if(pointerUpperLeft(mouseX,mouseY)) {
		saveImg();
	}
}

function keyPressed () {
	if(keyCode === 32) {
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

//MOUSE POSITION
function pointerUpperLeft(x,y) {
	return x < 0.1 * width && y < 0.1 * height;
}

function pointerUpperRight(x,y) {
	return x > 0.9 * width && y < 0.1 * height;
}

function pointerLowerLeft(x,y) {
	return x<0.1*width && y >0.9*height;
	}

function pointerBottom(y) {
	return y > 0.9 * height;
}	

function pointerMiddleBand(y) {
	return y > 0.9 * height && y > 0.1 * height;
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
