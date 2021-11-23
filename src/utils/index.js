import ConfettiGenerator from "confetti-js";
import moment from "moment";

export const getRowById = (key) => {
  return document.querySelector(`[data-id="${key}"]`);
}

export const exportContentCSV = (content) => {
  const csvContent = "data:text/csv;charset=utf-8," + content;
  const link = document.createElement('a');
  link.setAttribute("href", csvContent);
  link.setAttribute("download", "candidates.csv");
  link.click();
}

export const getNextDay = (date, days) => {
  let d = moment(new Date(date)).add(Math.floor(days / 5) * 7, 'd');
  let remaining = days % 5;
  while (remaining) {
    d.add(1, 'd');
    if (d.day() !== 0 && d.day() !== 6)
      remaining--;
  }
  return d.format('YYYY-MM-DD');
};


export const row = (key) => (
  `
  <tr data-id="${key}" class="transition-all">
  <td class="px-6 py-4 whitespace-nowrap">
  <div class="flex items-center">
    <div class="text-sm font-medium text-gray-900">${++key}</div>
  </div>
</td>
<td class="px-6 py-4 whitespace-nowrap">
  <div class="flex items-center">
    <div class="text-sm font-medium text-gray-900">
    <input oninput="onInput(event)" type="text" class="_input ring-green-400">
    </div>
  </div>
</td>
<td class="px-6 py-4 whitespace-nowrap">
  <div class="text-sm text-gray-900">
  <input oninput="onInput(event)" type="text" class="_input ring-green-400">
  </div>
</td>
<td class="px-6 py-4 whitespace-nowrap">
  <span id="cel4"  onclick="handleDelete(${key})" class="ccel4 cursor-pointer px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
    Delete Candidate
  </span>
</td>
</tr>
`
);

export const initConfetti = () => {
  const confettiElement = document.getElementById('confetti');
  const confettiSettings = { target: confettiElement };
  const confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
}

export const query = (id) => document.querySelector(id);

export const displayCandidate = (name, date) => {
  query('#_name').innerHTML = name;
  query('#_date').innerHTML = date;
}

export const disableButton = (button, disable) => {
  if (disable) {
    button.classList.add('opacity-50', 'cursor-not-allowed');
    button.disabled = true;
  } else {
    button.classList.remove('opacity-50', 'cursor-not-allowed');
    button.disabled = false;
  }
}