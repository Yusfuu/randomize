import './style.css'
import { query, exportContentCSV, getNextDay, getRowById, initConfetti, row, displayCandidate, disableButton } from './utils';

let ExporterCandidates = [];
let NUMBER_CANDIDATES;
let Candidates = [];
let currentDate = new Date().toISOString().split('T')[0];

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


_number?.addEventListener('input', (event) => {
  // @ts-ignore
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
});

save?.addEventListener('click', () => {
  // @ts-ignore
  const children = [...candidateContainer?.children];
  children.forEach((item) => {
    // @ts-ignore
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

  // disbale row that selected in shuffle
  getRowById(index)?.classList.add('opacity-30', 'cursor-not-allowed');

  // get next day with skipping the weekend
  current.date = getNextDay(currentDate, NUMBER_CANDIDATES - Candidates.length);
  // display Candidate with name and date
  displayCandidate(current.name, current.date);
  ExporterCandidates.push(current);

  // if no candidate left remove the shuffle button
  if (len === 1) {
    shuffle.remove();
    // enable export button
    disableButton(exportButton, false);
    query('#display')?.remove();
  };
});


// export button 
exportButton?.addEventListener('click', () => {
  // show init the Confetti
  initConfetti();
  // get element in array and converted to string
  const clone = ExporterCandidates.map((item, key) => Object.values({ ...item, key }));
  const csvContent = [['ID', 'name', 'brief', 'date'], ...clone].map(item => item.join(",")).join("\n");
  // export content to csv
  exportContentCSV(csvContent);
});

date?.addEventListener('change', (event) => {
  // @ts-ignores
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