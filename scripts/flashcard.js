// === Element Selectors ===
const flashcard = document.querySelector('.flashcard');
const flipBtn = document.getElementById('flip-btn');
const addBtn = document.getElementById('add-card-btn');
const modal = document.getElementById('add-card-modal');
const saveBtn = document.getElementById('save-card-btn');
const closeBtn = document.getElementById('close-modal');
const deckList = document.getElementById('deck-list');

let flipped = false;

// === Flip Logic ===
flipBtn?.addEventListener('click', () => {
  flipped = !flipped;
  flashcard?.classList.toggle('flipped', flipped);
});

// === Modal Show/Hide ===
addBtn?.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

closeBtn?.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// === Save Card Logic ===
saveBtn?.addEventListener('click', () => {
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

// === Load Stored Cards on Page Load ===
window.addEventListener('DOMContentLoaded', () => {
  const cards = JSON.parse(localStorage.getItem('flashcards') || '[]');
  cards.forEach(renderCard);
});

// === Render Card Utility ===
function renderCard({ front, back }) {
  const card = document.createElement('div');
  card.className = 'flashcard';
  card.innerHTML = `
    <div class="front">${front}</div>
    <div class="back">${back}</div>
  `;
  deckList.appendChild(card);
}
