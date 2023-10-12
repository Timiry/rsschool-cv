const area = document.getElementById('area')
const modalWindow = document.getElementById('modal-window-wrapper');
const overlay = document.getElementById('overlay');
const btnNewGame = document.getElementById('btn-new-game');
const content = document.getElementById('content');
let move = 0;
let result;

area.addEventListener('click', e => {
    if(e.target.className === 'box'){
        move % 2 === 0 ? e.target.innerHTML = 'X' : e.target.innerHTML = 'O';
        e.target.classList.add('full');           
        move++;
        check();
    }
})

const check = () => {
    const boxes = document.getElementsByClassName('box');
    const wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for(i = 0; i < wins.length; i++){
        if(boxes[wins[i][0]].innerHTML === 'X' && boxes[wins[i][1]].innerHTML === 'X' && boxes[wins[i][2]].innerHTML === 'X'){
            result = 'X';
            showResult(result);
            return;
        }
        else if(boxes[wins[i][0]].innerHTML === 'O' && boxes[wins[i][1]].innerHTML === 'O' && boxes[wins[i][2]].innerHTML === 'O'){
            result = 'O';
            showResult(result);
            return;
        }
    }
    if(move === 9){
        result = 'Friendsheep';
        showResult(result);
    }
}

const showResult = result =>{
    content.innerHTML = `${result} Wins!`;
    modalWindow.style.display = 'block';
}

const closeModal = () => {
    modalWindow.style.display = 'none';
    location.reload();
}

btnNewGame.addEventListener('click', closeModal);