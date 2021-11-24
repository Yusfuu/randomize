import './style.css'
import { query, exportContentCSV, getNextDay, getRowById, initConfetti, row, displayCandidate, disableButton } from './utils';

let ExporterCandidates = [];
let NUMBER_CANDIDATES;
let Candidates = [];
let currentDate = new Date().toISOString().split('T')[0];


const sounds = {
  wii: new Audio('./src/audio/wii.mp3'),
  hrab: new Audio('./src/audio/hrab.mp3'),
  hanya: new Audio('./src/audio/hanya.mp3'),
}

const soundRandom = [
  new Audio('./src/audio/hee.mp3'),
  new Audio('./src/audio/labalina.mp3'),
  new Audio('./src/audio/nice.mp3')
]

setTimeout(() => {

}, 2000);
const start = query('#start');
const _number = query('#_number');
const startNow = query('#startNow');
const startContent = query('#startContent');
const candidateBody = query('#candidateBody');
const save = query('#save');
const candidateContainer = query('#candidateContainer');
const shuffle = query('#shuffle');
const exportButton = query('#export');
const date = query('#initDate');

// disbale old dates
date.min = currentDate;

_number?.addEventListener('input', (event) => {
  const text = event.target.value;

  if (!isNaN(+text) && text.trim().length > 0) {
    startNow?.removeAttribute("disabled");
    startNow?.classList.remove('opacity-50');
  } else {
    startNow?.setAttribute("disabled", "");
    startNow?.classList.add('opacity-50');
  }
});

start?.addEventListener('submit', (event) => {
  event.preventDefault();
  // @ts-ignore
  NUMBER_CANDIDATES = +_number?.value;
  startContent?.remove();
  // init app
  initCandidates();
  sounds.wii.play();
  sounds.wii.volume = 0.1

});

save?.addEventListener('click', () => {
  const children = [...candidateContainer?.children];
  children.forEach((item) => {
    const [nameInput, breifInput] = [...item.getElementsByTagName('input')];

    nameInput.disabled = true;
    breifInput.disabled = true;

    const _cand = {
      key: item.dataset.id,
      name: nameInput.value,
      breif: breifInput.value,
    }

    Candidates.push(_cand);
  });
  save.remove();
  disableButton(shuffle, false);


  [...document.querySelectorAll('#cel4')].forEach(element => {
    element.innerHTML = `
    <div class="flex p-1 items-center gap-3">
  <span>Waitng...</span>
  <img class="w-5 h-5" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/whatsapp/302/upside-down-face_1f643.png">
</div>
    `
  });
});

shuffle?.addEventListener('click', () => {
  let len = Candidates.length;
  if (len === 0) return;
  // get all Candidates ids 
  const keys = Candidates.map(({ key }) => +key);
  // get random id from Candidates array
  const index = keys[~~(Math.random() * keys.length)];
  // find the candidate that selectd with index
  const current = Candidates.find(item => +item.key === index);
  // filter what left from the  Candidates array
  Candidates = Candidates.filter(item => +item.key !== index);

  // get next day with skipping the weekend
  current.date = getNextDay(currentDate, NUMBER_CANDIDATES - Candidates.length);

  // display Candidate with name and date
  document.querySelector('#display').classList.add('animate-bounce');
  document.querySelector('#display').classList.remove('bg-gradient-to-br', 'from-green-400', 'to-cyan-500');
  disableButton(shuffle, true);


  setTimeout(() => {
    try {
      displayCandidate(current.name, current.date);
      document.querySelector('#display').classList.add('bg-gradient-to-br', 'from-green-400', 'to-cyan-500');
      document.querySelector('#display').classList.remove('animate-bounce');
      // disbale row that selected in shuffle
      getRowById(index)?.classList.add('opacity-30', 'cursor-not-allowed');
      getRowById(index).lastElementChild.firstElementChild.innerHTML = "Relax thaden";

      disableButton(shuffle, false);
    } catch (error) {
      return;
    }


    if (ExporterCandidates.length === 1) {
      sounds.hrab.play();
      setTimeout(() => {
        sounds.hrab.pause();
      }, 2000);
      return;
    }
    if (ExporterCandidates.length === 2) {
      sounds.hanya.play();
      return;
    }

    const soundR = Math.floor(Math.random() * soundRandom.length)
    soundRandom[soundR].play();
    return;
  }, 1500);

  ExporterCandidates.push(current);

  // if no candidate left remove the shuffle button
  if (len === 1) {
    getRowById(index)?.classList.add('opacity-30', 'cursor-not-allowed');
    getRowById(index).lastElementChild.firstElementChild.innerHTML = "Relax thaden";
    shuffle.remove();
    // enable export button
    disableButton(exportButton, false);
    query('#display')?.remove();
  };

});


// export button 
exportButton?.addEventListener('click', () => {
  // show  the Confetti
  initConfetti();
  // get element in array and converted to string
  const clone = ExporterCandidates.map((item, key) => Object.values({ ...item, key }));
  const csvContent = [['ID', 'name', 'brief', 'date'], ...clone].map(item => item.join(",")).join("\n");
  // export content to csv
  exportContentCSV(csvContent);
});

date?.addEventListener('change', (event) => {
  currentDate = event.target.value;
});

const initCandidates = () => {
  query('#display')?.classList.remove('hidden')
  candidateBody?.classList.remove('hidden');
  // fill an array with number of candidates and render each as row in table
  Array(NUMBER_CANDIDATES).fill(0).forEach((_, key) => {
    candidateContainer?.insertAdjacentHTML('beforeend', row(key));
  });
}