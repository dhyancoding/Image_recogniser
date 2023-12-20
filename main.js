//https://teachablemachine.withgoogle.com/models/2EWym4Xyp/

Webcam.set({
    width: 350, height: 300,
    image_format: "png", png_quality: 90
})
camera = document.getElementById("camera")

Webcam.attach("#camera")

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("results").innerHTML = '<img id="img1" src="' + data_uri + '"/>'
    })
}

console.log(ml5.version)

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/2EWym4Xyp/model.json", model_loaded)

function model_loaded() {
    console.log("model_loaded")
}

function Check() {
    img = document.getElementById("img1")
    classifier.classify(img, Results)
}

function Results(error, results) {
    if(error){
        console.error(error)
    }
    else{
        var s = window.speechSynthesis
        var data = "this is " + results[0].label
        var speak = new SpeechSynthesisUtterance(data)
        s.speak(speak)
        document.getElementById("result_object_name").innerHTML=results[0].label
        document.getElementById("result_object_accuracy").innerHTML=(results[0].confidence*100).toFixed(2)+"%"
    }
}