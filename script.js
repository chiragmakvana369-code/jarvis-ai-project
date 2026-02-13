// Speech Recognition Setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "hi-IN";

recognition.onresult = function(event) {
    let transcript = event.results[0][0].transcript.toLowerCase();
    document.getElementById("user").innerText = transcript;
    jarvisReply(transcript);
};

// Start Listening Function
function startJarvis() {
    recognition.start();
}

// Jarvis Reply Logic
function jarvisReply(text) {

    let reply = "";

    if (text.includes("naam")) {
        reply = "Mera naam Jarvis hai, aur main Chirag ka assistant hoon.";
    }

    else if (text.includes("time")) {
        reply = "Abhi ka time hai " + new Date().toLocaleTimeString();
    }

    else if (text.includes("google")) {
        reply = "Google khol raha hoon.";
        window.open("https://www.google.com", "_blank");
    }

    else if (text.includes("youtube")) {
        reply = "YouTube khol raha hoon.";
        window.open("https://www.youtube.com", "_blank");
    }

    else if (text.includes("hello") || text.includes("hi")) {
        reply = "Hello Chirag, main taiyar hoon.";
    }

    else {
        reply = "Mujhe samajh nahi aaya, fir se bolo.";
    }

    document.getElementById("response").innerText = reply;

    let speech = new SpeechSynthesisUtterance(reply);
    speech.lang = "hi-IN";
    window.speechSynthesis.speak(speech);
}