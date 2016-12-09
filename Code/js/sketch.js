//DOM variables
var canvas;
var introP;
var fbprofile;

//textartifact variables
var stringarray = [];
var counter = 0;
var txt = " ";
var w, h;
var wGap;
var hGap;
var txtsize;
var stringDone;
var longstr = "";
var theLostOne = {};

//img variables
var img;
var adit, alex, charles, christophe, henry, jake, jason, julian, karen, matt, olivia, terrence, tracy, zack;
var convoNum = [1, 22, 23, 34, 44, 50, 52, 57, 61, 64, 67, 71, 82, 90];
var imgDisplay;

//program logic
var fileReceived;
var artifactRdy;

//test variables
var namearray = [];

function preload() {
    txt = '';
    adit = loadImage("imgs/adit.jpeg");
    alex = loadImage("imgs/alex.jpeg");
    charles = loadImage("imgs/charles.jpeg");
    christophe = loadImage("imgs/christophe.jpeg");
    henry = loadImage("imgs/henry.jpeg");
    jake = loadImage("imgs/jake.jpeg");
    jason = loadImage("imgs/jason.jpeg");
    julian = loadImage("imgs/julian.jpeg");
    matt = loadImage("imgs/matt.jpeg");
    olivia = loadImage("imgs/olivia.jpeg");
    terrence = loadImage("imgs/terrence.jpeg");
    tracy = loadImage("imgs/tracy.jpeg");
    zack = loadImage("imgs/zack.jpeg");


    fileReceived = false;
    artifactRdy = false;
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
    introP.position(0, 0);

    //txtartifact elements
    stringDone = false;
    txtsize = 12;
    w = txtsize;
    h = txtsize;
    wGap = txtsize;
    hGap = txtsize;

    //profilepic elements
    pixelDensity(1);
    background(0);

    //array of objects containing info of people you've lost touch with
    parseMessagesHTMLtoGetLostOneMessages();

}

function draw() {
    if (artifactRdy) {
        drawArtifact();
    }
}

function drawArtifact() {
    if (artifactRdy) {
        clearScreen();
        var c = img.get(w, h);
        if (stringDone != true) {
            fill(c);
            textSize(txtsize);
            text(stringarray[counter], w, h);
            counter++;
            w += wGap;
            if (w > width - txtsize) {
                h += hGap;
                w = 0;
            }
            if (counter === stringarray.length && h < windowHeight) {
                counter = 0;
            } else if (h > windowHeight) {
                stringDone = true;
            }
        }
    }
}

function stringToCharArray() {
    for (var z = 0; z < txt.length; z++) {
        longstr = longstr + txt[z].trim();
    }

    for (var i = 0; i < longstr.length; i++) {
        stringarray.push(longstr.substr(i, 1));
    }
    //console.log(stringarray);
}

function parseMessagesHTMLtoGetLostOneMessages() {
    console.log("starting parse");
    //jquery handler
    $(document).ready(function() {
        var convoObjArray = [];
        var myConvos = $(".thread");
        var numOfConvos = myConvos.length;
        var msgarray = [];

        console.log("starting 1st for loop in parse");
        for (var i = 0; i < 100; i++) { //should be numOfConvos instead of 100, but for sake of performance
            //get msgarray
            msgarray = $(myConvos[i]).find("p");
            //console.log(msgarray);

            //if i knew how to parse the date information from facebook,
            //check if last time we spoke was greater than a year ago && length of convo > 50 msgs
            if (msgarray.length > 50) {
                //get Names
                var nameLoc = myConvos[i].firstChild.data;
                //CHECK IF ITS AN @FACEBOOK NAME. DON'T INCLUDE IF SO.
                if (!nameLoc.includes("@")) {
                    convoObjArray[i] = new convoObjects();
                    if (nameLoc.startsWith("Jeff Park")) {
                        convoObjArray[i].setName(nameLoc.substring(10, nameLoc.length - 1));
                    } else {
                        convoObjArray[i].setName(nameLoc.substring(0, nameLoc.indexOf(',')));
                    }
                    
                    // //get last date
                    var lastMsgDate = myConvos.find(".message_header")[i].children[1].innerHTML;
                    convoObjArray[i].setDate(lastMsgDate);
                    // var momentDate = moment(lastMsgDate); http://momentjs.com/docs/#/use-it/
                    //get messages

                    convoObjArray[i].setMessages(msgarray);
                }
            }
        }
        //console.log(namearray);
        console.log("finished loop");

        //why does convoObjArray add elements not from 1-14, but 1, 22, 23, 34, 44, 50, etc. 
        //console.log(convoObjArray);
        var randomNum = floor(random(1, convoNum.length));
        //console.log(randomNum);
        var output = convoObjArray[convoNum[randomNum]];
        //console.log(convoObjArray);
        console.log(output.convoPartner);

        //get image
        if (output.convoPartner === "Adit Basheer") {
            img = adit;
        } else if (output.convoPartner === "Julian Fu") {
            img = julian;
        } else if (output.convoPartner === " Jake Robb") {
            img = jake;
        } else if (output.convoPartner === "Christophe Bogdanowicz Bindert") {
            img = christophe;
        } else if (output.convoPartner === "Karen L Davidowitz") {
            img = karen;
        } else if (output.convoPartner === " Jason Tolki") {
            img = jason;
        } else if (output.convoPartner === " Charles Camero") {
            img = charles;
        } else if (output.convoPartner === "Tracy Kao") {
            img = tracy;
        } else if (output.convoPartner === " Zack Purd") {
            img = zack;
        } else if (output.convoPartner === " Olivia Urang") {
            img = olivia;
        } else if (output.convoPartner === " Matt William") {
            img = matt;
        } else if (output.convoPartner === " Henry Par") {
            img = henry;
        } else if (output.convoPartner === "Alex J. Kim") {
            img = alex;
        } else if (output.convoPartner === " Terrence Caldwel") {
            img = terrence;
        }


        console.log("starting 2nd for loop in parse");
        //preparing string of messages
        for (var j = output.messages.length - 1; j >= 0; j--) {
            txt = txt + output.messages[j].innerHTML + "/ ";
        }

        console.log("converting to array of characters");
        //
        stringToCharArray();
        console.log("finished conversion");


        artifactRdy = true;

        //console.log(output);
        //console.log(output.messages[0].innerHTML);

    });
}

function convoObjects() {
    this.convoPartner = "";
    this.date = "";
    this.messages = [];

    this.setName = function(convoName) {
        this.convoPartner = convoName;
    };

    this.setDate = function(date) {
        this.date = date;
    }

    this.setMessages = function(msgs) {
        this.messages = msgs;
    }
}

function getProfilePicture() {
    //code from fb.js should go here if the fb api let me search friends. 
}

function clearScreen() {
    introP.hide();
}