// Set constraints for the video stream
var constraints = { video: {facingMode: {exact: "environment"}}, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    
   // mobilenet = ml5.imageClassifier('MobileNet', function(){mobilenet.predict(cameraOutput,gotResults);});
};

function gotResults(error,results){
    alert( results[0].className );
    alert( "Confidence: " + results[0].probability*100 + "%" );
}

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
