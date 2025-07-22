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

const deckList = document.getElementById('deck-list');

// Save new card
saveBtn.addEventListener('click', () => {
  const front = document.getElementById('front-input').value.trim();
  const back = document.getElementById('back-input').value.trim();

  if (!front || !back) return;

  const newCard = { front, back };
  const cards = JSON.parse(localStorage.getItem('flashcards') || '[]');
  cards.push(newCard);
  localStorage.setItem('flashcards', JSON.stringify(cards));

  renderCard(newCard);
  modal.classList.add('hidden');
  document.getElementById('front-input').value = '';
  document.getElementById('back-input').value = '';
});

// Load cards on page load
window.addEventListener('load', () => {
  const cards = JSON.parse(localStorage.getItem('flashcards') || '[]');
  cards.forEach(renderCard);
});

// Render card
function renderCard({ front, back }) {
  const card = document.createElement('div');
  card.className = 'flashcard';
  card.innerHTML = `<div class="front">${front}</div><div class="back">${back}</div>`;
  deckList.appendChild(card);
}


