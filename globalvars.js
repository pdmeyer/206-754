//global configs
const sketchName = "linearConst2";
const fileFormat = 'png'; //'jpg' or 'png'
const debug = false;

//background
const imgfile = 'img/2019-02-26 15.45.50.jpg';
const submatx = 0.5;
// const matxeasing = 0.1;


//vars
let loopState;
let initState;
let ii = 0;
let bezzes = [];
let maxBezzes;
let gXPos;
let gYPos;
let c;
let bez1;
let clickCount = 0;
let subx = 0;
let suby = 0;
let growShrinkAmt = 1;

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

//JSON data
let songData;
let data1;
