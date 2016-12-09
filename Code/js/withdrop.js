//DOM variables
var canvas;
var introP;
var dropzone;

//textartifact variables
var stringarray = [];
var counter = 0;
var txt =" ";
var w, h;
var wGap;
var hGap;
var txtsize;
var stringDone;
var longstr = "";

//img variables
var img;
var imgDisplay;
var vScale;

//program logic
var fileReceived;

function preload() {
	//txt = loadStrings("sampletext.txt");
	img = loadImage("profile.jpg");
	fileReceived = false;
}

function setup() {
    //fileReceived = true;

    //DOM elements
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');

    introP = select('#intro');
    introP.style('color', '#fff');
    introP.style('text-align', 'center');
    introP.position(0,0);

    dropzone = select('#dropzone');
    dropzone.dragOver(highlight);
    dropzone.dragLeave(unhighlight);
    dropzone.drop(gotFile, unhighlight);

    //txtartifact elements
    stringDone = false;
    txtsize = 10;
    vScale = txtsize;
    w = txtsize;
    h = txtsize;
    wGap = txtsize * 0.8;
    hGap = txtsize;

    fileToStringArray();

    //profilepic elements
    pixelDensity(1);
    background(0);
}

function draw() {
    if (fileReceived) {
        drawArtifact();
    }
}

function drawArtifact () {
	var c = img.get(w, h);
        if (stringDone === false) {
            fill(c);
            textSize(txtsize);
            text(stringarray[counter], w, h);
            counter++;
            w += wGap;
            if (w > width - txtsize) {
                h += hGap;
                w = 0;
            }
            if (counter === stringarray.length || h > windowHeight) {
                stringDone = true;
            }
        }
}

function fileToStringArray() {
    for (var z = 0; z < txt.length; z++) {
        longstr = longstr + txt[z].trim();
    }

    for (var i = 0; i < longstr.length; i++) {
        stringarray.push(longstr.substr(i, 1));
    }
}

function parseMessagesHTML() {
    
}

function getProfilePicture() {
    
}

function gotFile(file) {
    if(file.type == 'text' && file.name == "messages.htm") {
        txt = txt + file.data;
        fileSuccess();
    } else {
        fileError();
    }
    
    console.log(txt);
}

function highlight() {
    introP.style('color', 'F0F');
    background(255, 0, 255);
}

function unhighlight() {
    introP.style('color', 'fff');
    background(0);
}

function fileSuccess() {
	introP.hide();
	fileReceived = true;
    fileToStringArray();
    console.log('file success');
}

function fileError() {
	console.log("The file you uploaded didn't work :( Are you sure it was the message.htm file?");
}
