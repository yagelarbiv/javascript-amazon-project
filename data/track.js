
export let Track = JSON.parse(localStorage.getItem('Track'));


export function addTotrack(track) {
  Track = track
  saveOrdersToStorage();
}

function saveOrdersToStorage() {
  localStorage.setItem("Track", JSON.stringify(Track));
}