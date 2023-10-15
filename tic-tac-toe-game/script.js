const area = document.getElementById('area')
const windowResult = document.getElementById('modal-window-result');
const overlay = document.getElementById('overlay');
const btnNewGame = document.getElementById('btn-new-game');
const content = document.getElementById('content');
let move = 0;
let result;

if(localStorage.history == undefined){
    localStorage.history = JSON.stringify([]);
}


let historyElements = document.getElementsByClassName("history-element");
let historyData = JSON.parse(localStorage.history); 
for(let i = 0; i < historyData.length; i++) {
    historyElements[i].innerHTML = `${i+1}. steps: ${historyData[i]['steps']}, win: ${historyData[i]['win']}`;
}



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
            updateHistory();
            return;
        }
        else if(boxes[wins[i][0]].innerHTML === 'O' && boxes[wins[i][1]].innerHTML === 'O' && boxes[wins[i][2]].innerHTML === 'O'){
            result = 'O';
            showResult(result);
            updateHistory();
            return;
        }
    }
    if(move === 9){
        result = 'Friendship';
        showResult(result);
        updateHistory();
    }
}

const showResult = result =>{
    content.innerHTML = `${result} Wins!`;
    windowResult.style.display = 'flex';
    overlay.style.display = 'block';
}

const closeModal = () => {
    windowResult.style.display = 'none';
    overlay.style.display = 'none';
    location.reload();
}

const updateHistory = () => {
    let newData = {steps: move, win: result};
    if (historyData.length >= 10) {
        historyData.shift();
    }    
    historyData.push(newData);

    for(let i = 0; i < historyData.length; i++) {
        historyElements[i].innerHTML = `${i+1}. steps: ${historyData[i]['steps']}, win: ${historyData[i]['win']}`;
    }

    localStorage.history = JSON.stringify(historyData);
}

btnNewGame.addEventListener('click', closeModal);

document.getElementById('btn-history').addEventListener('click', () => {
    document.getElementById('modal-window-history').style.display = 'flex';
    overlay.style.display = 'block';
});

document.getElementById('btn-close-history').addEventListener('click', () => {
    document.getElementById('modal-window-history').style.display = 'none';
    overlay.style.display = 'none';
});