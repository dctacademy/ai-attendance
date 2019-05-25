let mobilenet;
let classifier;
let video;
let label = 'test';
let sudhanvaButton;
let harishButton;
let aniButton;
let trainButton;

function modelReady() {
    console.log('Model is ready');
}

function videoReady() {
    console.log('Video is ready');
}

function whileTraining(loss) {
    if (loss == null) {
        console.log('Training Complete');
        classifier.classify(gotResults);
    } else {
        console.log(loss);
    }
}


function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        label = result;
        classifier.classify(gotResults);
    }
}

function setup() {
    createCanvas(800, 600);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(video, videoReady);

    sudhanvaButton = createButton('sudhanva');
    sudhanvaButton.mousePressed(function () {
        classifier.addImage('sudhanva');
        console.log('Sudhanva!');
    });

    harishButton = createButton('harish');
    harishButton.mousePressed(function () {
        classifier.addImage('harish');
        console.log('Harish!');
    });

    aniButton = createButton('ani');
    aniButton.mousePressed(function () {
        classifier.addImage('ani');
        console.log('Ani!');
    });

    trainButton = createButton('train');
    trainButton.mousePressed(function () {
        classifier.train(whileTraining);
    });
}

function draw() {
    background(0);
    image(video, 0, 0, 800, 600);
    fill(255);
    textSize(16);
    text(label, 10, height - 10);
}