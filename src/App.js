import React, { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const speechSynthesis = window.speechSynthesis;
    const updateVoices = () => {
      setVoices(speechSynthesis.getVoices());
      setSelectedVoice(speechSynthesis.getVoices()[0]);
    };

    updateVoices();

    speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleVoiceChange = (event) => {
    setSelectedVoice(voices[event.target.value]);
  };

  const handleSpeak = () => {
    if (selectedVoice) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      window.speechSynthesis.speak(utterance);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-t from-blue-700 via-blue-800 to-gray-900">
      <h1 className="font-mono, font-extrabold , text-4xl mt-[-50px] mb-[50px]">
        Text <span className="text-lime-500 underline">Converter</span>
      </h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="bg-blue-300 rounded-md p-2 font-black w-96 h-52 text-black text-lg"
        placeholder="hello type anything here........."
      ></textarea>
      <div className="mt-2 flex justify-evenly">
        <select className="  outline-none w-48 bg-slate-400" onChange={handleVoiceChange}>
          {voices.map((voice, index) => (
            <option key={index} value={index}>
              {voice.name}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-400 w-12 h-8 rounded-md  ml-2 hover:bg-blue-600 hover:text-white"
          onClick={handleSpeak}
        >
          <span className=" material-symbols-outlined">
volume_down
</span>
          
        </button>

      </div>
    </div>
  );
}

export default App;
