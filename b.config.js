//global configs
const sketchName = "linearConst2";
const fileFormat = 'png'; //'jpg' or 'png'
const debug = true;
const imgfile = '2019-02-26 15.45.50_res.jpg';
const jsonfile = 'bergintro_trimmed.json';
const audiofile = '01_berg intro MIX 1.0_M3_256.mp3';
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
