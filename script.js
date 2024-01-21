const music = new Audio("music.mp3");
const audioturn = new Audio("ting.mp3");
const gameover = new Audio("gameover.mp3");
let playerTurn = 'X';
let isgameover = false;
let count = 0;

//function to change turn
const changeTurn = () => {
    return playerTurn === 'X' ? 'O' : 'X';
};

//function to check for a win
const checkWin = () => {
    let win = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8],
        [2, 4, 6],
    ]

    let boxes = document.getElementsByClassName("boxText");
    win.forEach(Element => {

        //check whether any player win
        if (boxes[Element[0]].innerText === boxes[Element[1]].innerText &&
            boxes[Element[1]].innerText === boxes[Element[2]].innerText &&
            boxes[Element[0]].innerText !== "") {

            isgameover = true;
            document.getElementsByClassName("turn")[0].innerText = "Player " + boxes[Element[0]].innerText + "  Won.";
            gameover.play();

            boxes[Element[0]].style.color = 'red';
            boxes[Element[1]].style.color = 'red';
            boxes[Element[2]].style.color = 'red';
        }

        //check whether match is draw
        if (count == 9 && isgameover == false) {
            document.getElementsByClassName("turn")[0].innerText = "Match Draw";
            isgameover = true;
            gameover.play();
        }
    })
};

//Game logic
let boxes = document.getElementsByClassName("box");
let boxClick = Array.from(boxes).forEach(Element => {
    let boxText = Element.querySelector(".boxText");

    Element.addEventListener('click', () => {

        if (boxText.innerText === '' && isgameover == false) {

            count++;
            boxText.innerText = playerTurn;
            playerTurn = changeTurn();
            audioturn.play();
            checkWin();

            if (!isgameover) {
                document.getElementsByClassName("turn")[0].innerText = "Turn for " + playerTurn;
            }
        }
    })
})

//Reset
let button = document.querySelector("button");
button.addEventListener('click', () => {
    Array.from(boxes).forEach(Element => {

        let boxText = Element.querySelector(".boxText");

        if (!(boxText.innerText === '')) {
            boxText.innerText = ' ';
            playerTurn = 'X';
            isgameover = false;
            boxText.style.color = 'white';
        }
    })

    document.getElementsByClassName("turn")[0].innerText = "Turn for " + playerTurn;
    count = 0;
})

