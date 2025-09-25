// memory_game.js - Memory Game Logic

document.addEventListener('DOMContentLoaded', function () {
  const images = [
    '/assets/img1.png',
    '/assets/img2.png',
    '/assets/img3.png',
    '/assets/img4.png',
    '/assets/img5.png',
    '/assets/img6.png',
    '/assets/img7.png',
    '/assets/img8.png'
  ];

  let cards = [];
  let flippedCards = [];
  let matchedCards = 0;
  let score = 0;
  const gameBoard = document.getElementById('game-board');
  const scoreEl = document.getElementById('score');
  const restartBtn = document.getElementById('restart-btn');

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function createBoard() {
    gameBoard.innerHTML = '';
    const doubledImages = shuffle([...images, ...images]);
    cards = doubledImages.map((img, idx) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front"></div>
          <div class="card-back"><img src="${img}" alt="img" style="width:100%;height:100%;"></div>
        </div>
      `;
      card.dataset.image = img;
      card.dataset.index = idx;
      card.addEventListener('click', () => flipCard(card));
      gameBoard.appendChild(card);
      return card;
    });
    flippedCards = [];
    matchedCards = 0;
    score = 0;
    updateScore();
  }

  function flipCard(card) {
    if (
      flippedCards.length === 2 ||
      card.classList.contains('flipped') ||
      card.classList.contains('matched')
    ) return;
    card.classList.add('flipped');
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      score++;
      updateScore();
      setTimeout(checkMatch, 700);
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.image === card2.dataset.image) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedCards += 2;
      if (matchedCards === cards.length) {
        setTimeout(() => {
          // Flip all cards to show images
          cards.forEach(card => card.classList.add('flipped'));
          // Show victory popup
          showVictoryPopup();
        }, 300);
      }
    } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
    }
    flippedCards = [];
  }

  function updateScore() {
    scoreEl.textContent = score;
  }

  function showVictoryPopup() {
    let popup = document.getElementById('victory-popup');
    if (popup) popup.remove(); // Remove if already exists
    popup = document.createElement('div');
    popup.id = 'victory-popup';
    popup.innerHTML = `
      <div class="victory-content">
        <h2>Herzlichen Glückwunsch!</h2>
        <p>Du hast gewonnen in <strong>${score}</strong> Züge!</p>
        <p>Hier dein Rabatt Code für Inuvet Shop</p>
        <a href="https://inuvet.com">Zum Shop</a>
        <h2>MEMORY15</h2>
        <button id="victory-restart">Neu Starten</button>
      </div>
    `;
    document.body.appendChild(popup);
    document.getElementById('victory-restart').onclick = () => {
      popup.remove();
      createBoard();
    };
  }

  restartBtn.addEventListener('click', () => {
    const popup = document.getElementById('victory-popup');
    if (popup) popup.remove();
    createBoard();
  });
  createBoard();
});
