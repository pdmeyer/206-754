
//global configs
const sketchName = "linearConst2";
const fileFormat = 'png'; //'jpg' or 'png'

//background
// const imgfile = 'img/2019-02-26 15.39.57.jpg';
const imgfile = 'img/2019-02-26 15.45.50.jpg';
const submatx = 0.5;
// const matxeasing = 0.1;


//vars
let loopState;
let initState;
let ii = 0;

let bezzes = [];
let growShrinkOn;
let initMaxBezzes;
let maxBezzes;
let gXPos;
let gYPos;
let c;

let bez1;


let writeRate;
let scaleX;
let scaleY;
let clickCount = 0;


let growShrinkAmt;
let bgColor;

let subx = 0;
let suby = 0;

//JSON data
let songData;
let data1;
