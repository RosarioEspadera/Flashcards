document.addEventListener('DOMContentLoaded', () => {
  const flipBtn = document.getElementById('flip-btn');
  const flashcard = document.querySelector('.flashcard');
  const addBtn = document.getElementById('add-card-btn');
  const modal = document.getElementById('add-card-modal');
  const saveBtn = document.getElementById('save-card-btn');
  const closeBtn = document.getElementById('close-modal');
  const deckList = document.getElementById('deck-list');

  let flipped = false;

  // Flip logic
  flipBtn?.addEventListener('click', () => {
    flipped = !flipped;
    flashcard?.classList.toggle('flipped', flipped);
  });

  // Modal toggle logic
  addBtn?.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Save card to localStorage
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

  // Render card utility
  function renderCard({ front, back }, index) {
  const card = document.createElement('div');
  card.className = 'flashcard';
  card.innerHTML = `
    <div class="front">${front}</div>
    <div class="back">${back}</div>
    <button class="delete-btn" data-index="${index}">🗑 Delete</button>
  `;
  deckList.appendChild(card);
}


  // Load existing cards
  const storedCards = JSON.parse(localStorage.getItem('flashcards') || '[]');
  storedCards.forEach(renderCard);
});
