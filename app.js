let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let winnerimg = document.querySelector("#winnerimg");
let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  winnerimg.innerHTML = "";
  winnerimg.style.display = "none";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");

  winnerimg.innerHTML = ""; // Clear previous content
  winnerimg.style.display = "block";

  const img = document.createElement("img");
  img.src = "rajnikanth-memes-rajinikanth.gif"; // Replace with your draw gif path
  img.alt = "Draw Meme";
  img.style.width = "300px";
  img.style.height = "auto";
  img.style.display = "block";
  img.style.marginBottom = "10px";

  const cross = document.createElement("span");
  cross.innerText = "❌";
  cross.classList.add("pop-animation");

  winnerimg.appendChild(img);
  winnerimg.appendChild(cross);

  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = " ";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, ${winner}`;
  msgContainer.classList.remove("hide");

  winnerimg.innerHTML = ""; // Clear previous content
  winnerimg.style.display = "block";

  const img = document.createElement("img");
  img.src = "kbc-memes-7crore-meme.gif"; // Replace with your winner gif path
  img.alt = "Winner Meme";
  img.style.width = "300px";
  img.style.height = "auto";
  img.style.display = "block";
  img.style.marginBottom = "10px";

  const tick = document.createElement("span");
  tick.innerText = "✅";
  tick.classList.add("pop-animation");

  winnerimg.appendChild(img);
  winnerimg.appendChild(tick);

  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
