document.addEventListener('DOMContentLoaded', () => {
  const deckList = document.getElementById('deck-list');
  const modal = document.getElementById('add-card-modal');
  const themeToggle = document.getElementById('theme-toggle');
  const deckSelect = document.getElementById('deck-select');
  const addDeckBtn = document.getElementById('add-deck-btn');
  const addBtn = document.getElementById('add-card-btn');
  const saveBtn = document.getElementById('save-card-btn');
  const closeBtn = document.getElementById('close-modal');

  // Theme toggle
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
  });

  // Restore theme
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
  }

  // Modal open/close
  addBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

  // Add new deck
 addDeckBtn.addEventListener('click', () => {
  const name = prompt('Enter new deck name:');
  if (!name) return;

  const decks = JSON.parse(localStorage.getItem('decks') || '["default"]');
  if (decks.includes(name)) return alert('Deck already exists.');

  decks.push(name);
  localStorage.setItem('decks', JSON.stringify(decks));
  updateDeckSelect();
});

function updateDeckSelect() {
  const decks = JSON.parse(localStorage.getItem('decks') || '["default"]');
  deckSelect.innerHTML = '';
  decks.forEach(deck => {
    const option = document.createElement('option');
    option.value = deck;
    option.textContent = `📁 ${deck}`;
    deckSelect.appendChild(option);
  });
}


  // Save new card
  saveBtn.addEventListener('click', () => {
    const front = document.getElementById('front-input').value.trim();
    const back = document.getElementById('back-input').value.trim();
    const deck = deckSelect.value;
    if (!front || !back) return;

    const newCard = { front, back, deck };
    const cards = JSON.parse(localStorage.getItem('flashcards') || '[]');
    cards.push(newCard);
    localStorage.setItem('flashcards', JSON.stringify(cards));
    document.getElementById('front-input').value = '';
    document.getElementById('back-input').value = '';
    modal.classList.add('hidden');
    loadCards();
  });

  // Render card
  function renderCard({ front, back }, index) {
  const card = document.createElement('div');
  card.className = 'flashcard';
  card.innerHTML = `
    <div class="card-inner">
      <div class="front">${front}</div>
      <div class="back">${back}</div>
    </div>
    <button class="edit-btn" data-index="${index}">✏️ Edit</button>
    <button class="delete-btn" data-index="${index}">🗑 Delete</button>
  `;

  // Flip on click (ignore button clicks)
  card.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn') || e.target.classList.contains('delete-btn')) return;
    card.querySelector('.card-inner').classList.toggle('flipped');
  });

  deckList.appendChild(card);
}


  // Load & manage cards
  function loadCards() {
    deckList.innerHTML = '';
    const selectedDeck = deckSelect.value;
    const cards = JSON.parse(localStorage.getItem('flashcards') || '[]');
    cards.forEach((card, index) => {
      if (card.deck === selectedDeck) renderCard(card, index);
    });

    document.querySelectorAll('.delete-btn').forEach(btn =>
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        const cards = JSON.parse(localStorage.getItem('flashcards') || '[]');
        cards.splice(index, 1);
        localStorage.setItem('flashcards', JSON.stringify(cards));
        loadCards();
      })
    );

   document.querySelectorAll('.edit-btn').forEach(btn =>
  btn.addEventListener('click', () => {
    const index = btn.dataset.index;
    const cards = JSON.parse(localStorage.getItem('flashcards') || '[]');
    const card = cards[index];
    const newFront = prompt('Edit question:', card.front);
    const newBack = prompt('Edit answer:', card.back);

    if (!newFront || !newBack) return;

    cards[index] = {
      ...card,
      front: newFront.trim(),
      back: newBack.trim()
    };

    localStorage.setItem('flashcards', JSON.stringify(cards));
    loadCards(); // 🔄 Refresh the deck list
  })
);
  }
});
