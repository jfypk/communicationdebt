var json;

function preload() {
	json = loadJSON("fbjson.json");
}

function setup() {
	console.log(json[0]);
	console.log("hello");
}

function draw() {

}