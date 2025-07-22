const flashcard = document.querySelector('.flashcard');
const flipBtn = document.getElementById('flip-btn');
let flipped = false;

flipBtn.addEventListener('click', () => {
  flipped = !flipped;
  flashcard.classList.toggle('flipped', flipped);
});

