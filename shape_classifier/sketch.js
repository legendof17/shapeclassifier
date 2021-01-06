let shapeClassifier;
let canvas;
let resultsDiv;
let input;

function setup() {
    canvas = createCanvas(400, 400);
    let options = {
        inputs: [64, 64, 4],
        task: "imageClassification",
        debug: true
    }

    shapeClassifier = ml5.neuralNetwork(options);

    const modelDetails = {
        model: 'model/model.json',
        metadata: 'model/model_meta.json',
        weights: 'model/model.weights.bin'
    }

    background(255);
    resultsDiv = createDiv('loading model..!');
    input = createGraphics(64, 64);
    shapeClassifier.load(modelDetails, modelLoaded);
}

function modelLoaded() {
    console.log('model loaded..!');
    classifyImage();
}

function classifyImage() {
    input.copy(canvas, 0, 0, 400, 400, 0, 0, 64, 64);
    // image(input, 0, 0);

    // shapeClassifier.classify({ image: canvas}, gotResults);
    shapeClassifier.classify({ image: input}, gotResults);
}

function gotResults(err, results) {
    if (err) {
        console.error(err);
        return;
    }

    let label = results[0].label;
    let confidence = nf(100*results[0].confidence, 2, 0);
    resultsDiv.html(`${label} ${confidence}%`);

    // console.log(results);
    classifyImage();
}

function draw() {
    // background(220);
    
    if (mouseIsPressed) {
        strokeWeight(8);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }

    // stroke(0);
    // noFill();
    // strokeWeight(4);
    // // circle(width/2, height/2, 40);
    // rectMode(CENTER);
    // rect(width/2, height/2, 40);
}