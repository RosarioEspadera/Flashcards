const flashcard = document.querySelector('.flashcard');
const flipBtn = document.getElementById('flip-btn');
let flipped = false;

flipBtn.addEventListener('click', () => {
  flipped = !flipped;
  flashcard.classList.toggle('flipped', flipped);
});
const addBtn = document.getElementById('add-card-btn');
const modal = document.getElementById('add-card-modal');
const saveBtn = document.getElementById('save-card-btn');

addBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

saveBtn.addEventListener('click', () => {
  const front = document.getElementById('front-input').value.trim();
  const back = document.getElementById('back-input').value.trim();

  if (!front || !back) return;

  const newCard = document.createElement('div');
  newCard.className = 'flashcard';
  newCard.innerHTML = `<div class="front">${front}</div><div class="back">${back}</div>`;
  document.getElementById('deck-list').appendChild(newCard);

  modal.classList.add('hidden');
  document.getElementById('front-input').value = '';
  document.getElementById('back-input').value = '';
});

