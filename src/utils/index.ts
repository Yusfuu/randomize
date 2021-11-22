// @ts-ignore
import ConfettiGenerator from "confetti-js";
import moment from "moment";

export const getRowById = (key: number) => {
  return document.querySelector(`[data-id="${key}"]`);
}

export const exportContentCSV = (content: string) => {
  const csvContent = "data:text/csv;charset=utf-8," + content;
  const link = document.createElement('a');
  link.setAttribute("href", csvContent);
  link.setAttribute("download", "candidates.csv");
  link.click();
}

export const getNextDay = (date: string, days: number) => {
  let d = moment(new Date(date)).add(Math.floor(days / 5) * 7, 'd');
  let remaining = days % 5;
  while (remaining) {
    d.add(1, 'd');
    if (d.day() !== 0 && d.day() !== 6)
      remaining--;
  }
  return d.format('YYYY-MM-DD');
};


export const row = (key: number): string => (
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
    <input onfocusout="focusout()" type="text" class="_input">
    </div>
  </div>
</td>
<td class="px-6 py-4 whitespace-nowrap">
  <div class="text-sm text-gray-900">
  <input onfocusout="focusout()" type="text" class="_input">
  </div>
</td>
<td class="px-6 py-4 whitespace-nowrap">
  <span class="cursor-pointer px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
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

type Element = HTMLFormElement | HTMLInputElement | HTMLButtonElement | HTMLDivElement;
export const query = (id: string) => document.querySelector<Element>(id);



export const displayCandidate = (name: string, date: string) => {
  // @ts-ignore
  query('#_name').innerHTML = name;
  // @ts-ignore
  query('#_date').innerHTML = date;
}

export const disableButton = (button: any, disable: boolean): void => {
  if (disable) {
    button.classList.add('opacity-50', 'cursor-not-allowed');
    button.disabled = true;
  } else {
    button.classList.remove('opacity-50', 'cursor-not-allowed');
    button.disabled = false;
  }
}