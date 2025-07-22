document.addEventListener('DOMContentLoaded', () => {
  const flashcard = document.querySelector('.flashcard');
  const flipBtn = document.getElementById('flip-btn');
  let flipped = false;

  flipBtn?.addEventListener('click', () => {
    flipped = !flipped;
    flashcard?.classList.toggle('flipped', flipped);
  });

  const addBtn = document.getElementById('add-card-btn');
  const modal = document.getElementById('add-card-modal');
  const saveBtn = document.getElementById('save-card-btn');
  const closeBtn = document.getElementById('close-modal');
  const deckList = document.getElementById('deck-list');

  addBtn?.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

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

  function renderCard({ front, back }) {
    const card = document.createElement('div');
    card.className = 'flashcard';
    card.innerHTML = `<div class="front">${front}</div><div class="back">${back}</div>`;
    deckList.appendChild(card);
  }

  const storedCards = JSON.parse(localStorage.getItem('flashcards') || '[]');
  storedCards.forEach(renderCard);
});
