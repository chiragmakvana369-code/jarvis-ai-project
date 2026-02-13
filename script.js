const recognition = new webkitSpeechRecognition();
recognition.lang = "hi-IN";
recognition.continuous = false;

const chat = document.getElementById("chat");

function startListening() {
    recognition.start();
}

recognition.onresult = function(event) {
    const userText = event.results[0][0].transcript;
    chat.innerHTML += "<p><b>आप:</b> " + userText + "</p>";
    sendToAI(userText);
};

async function sendToAI(message) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_API_KEY"
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "तुम Jarvis नाम के एक स्मार्ट हिंदी AI असिस्टेंट हो। तुम आत्मविश्वास से बात करते हो और हर काम को अच्छे से पूरा करते हो।"
                },
                {
                    role: "user",
                    content: message
                }
            ]
        })
    });

    const data = await response.json();
    const aiText = data.choices[0].message.content;

    chat.innerHTML += "<p><b>Jarvis:</b> " + aiText + "</p>";
    speak(aiText);
}

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";
    window.speechSynthesis.speak(speech);
}