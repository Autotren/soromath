
let voicemodeenabled = false;
let voicerate = 1;
let voicevolume = 1;


function voicemodeclick(yarr=true){

  let button = document.getElementById("voicebutton");


  voicemodeenabled = !voicemodeenabled;

  if(voicemodeenabled){

    button.innerHTML = "voice mode: on";
    button.classList.add("textselected");

    setTimeout(() => {

      synthesisvoice("Voice mode is now on.")

    })


    document.getElementById("problemscontainer").style.display = "none";
    document.getElementsByClassName("numrestart")[0].style.left = "0%";
    document.getElementsByClassName("inputexample")[0].style.left = "0%";
    document.getElementById("voicemodetext").style.display = "";
    document.getElementById("voicerestart").style.display = ""
    document.getElementById("voicesettings").disabled = false;

    init();

  }
  else{

    if (synth.speaking) {
      synth.cancel();
    }

    init();

    button.innerHTML = "voice mode: off";
    button.classList.remove("textselected");

    document.getElementById("problemscontainer").style.display = "";
    document.getElementsByClassName("numrestart")[0].style.left = "50%";
    document.getElementsByClassName("inputexample")[0].style.left = "50%";
    document.getElementById("voicemodetext").style.display = "none";
    document.getElementById("voicerestart").style.display = "none"
    document.getElementById("voicesettings").disabled = true;

  }


}

function voicesettingsclick(){

}


function voiceinit(doinit=false){
  setvoicesliders(doinit);
}

function getvoicesliders(){
  voicerate = 1 + document.getElementById("voicespeedslider").value / 3;
  voicevolume = document.getElementById("voicevolumeslider").value / 7;
}

function setvoicesliders(doinit){
  document.getElementById("voicespeedslider").value = (voicerate - 1)*3;
  document.getElementById("voicevolumeslider").volume = Math.round((voicevolume)*7);
}

function removevoicecontainer(event, bypass){

  if(!bypass && event.target.id != "voicecontainer") return

  document.getElementById("voicecontainer").style.display = "none";
  init();


}

function showvoicecontainer(){

  document.getElementById("voicecontainer").style.display = "";

}


function synthesisvoice(text){

  const utterance = new SpeechSynthesisUtterance(text);

  // console.log(speechSynthesis.getVoices());

  utterance.lang = "en-GB";
  // Fix this
  utterance.voice = speechSynthesis.getVoices().find((voice) => voice.name.includes("Daniel"))

  utterance.rate = voicerate;
  utterance.volume = voicevolume;


  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }

  // console.log("SPEAK");

  speechSynthesis.speak(utterance)

}
