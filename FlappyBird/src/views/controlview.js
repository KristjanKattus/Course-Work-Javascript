export default function mainView(eventHandler) {
    let control = document.createElement('div');
    control.id = 'control';
    control.style.textAlign = "center";

    let statisticsButton = document.createElement('button');
    statisticsButton.id = 'statistics';
    statisticsButton.innerText='Statistics';


    let gameButton = document.createElement('button');
    gameButton.id = 'game';
    gameButton.innerText='Game';

    

    let scoreTextElem = document.createElement("span");
    scoreTextElem.textContent = "Your score:";

    let scoreElem = document.createElement("span");
    scoreElem.id = "scoreElem";
    scoreElem.style.fontWeight = "bold";


    control.append(statisticsButton);
    control.append(gameButton);
    control.append(scoreTextElem);
    control.append(scoreElem);

    statisticsButton.addEventListener('click', eventHandler);
    gameButton.addEventListener('click', eventHandler);
    
    return control;
}