export default class GameController {

    constructor(model, viewContainer) {
        this.viewContainer = viewContainer;
        this.model = model;
        this.isRunning = false;
        this.pillarIndex = 0;
    }

    run() {
        this.isRunning = true;
        // draw the initial game board, start the game
        
        this.viewContainer.innerHTML = '';
        
        this.viewContainer.append(this.getBoardHtml(this.model));
        // start countdown
        this.animate();
        // start game-loop

    }

    stop() {
        this.isRunning = false;
    }


    resizeUI() {
        if(this.isRunning) {
            // redraw
            this.viewContainer.innerHTML = '';
            this.viewContainer.append(this.getBoardHtml(this.model));
        }
    }


    
    animate() {
        setTimeout(() => {
            let colWidth = (window.innerWidth - 17) / this.model.colCount ;
            let rowHeight = (window.innerHeight - document.getElementById('control').clientHeight - 3) / this.model.rowCount;

            if (this.pillarIndex % 30 === 0){
                
                this.model.removeFirstAddLast(true);
            } else{
                this.model.removeFirstAddLast();
            }
            let gameboard = document.getElementById("gameboard");
            gameboard.removeChild(gameboard.firstChild);
            
            
            let colElem = document.createElement('div');
            colElem.left
            colElem.style.minWidth = colWidth + 'px';
            colElem.style.minHeight = rowHeight + 'px';
            colElem.style.display = 'inline-block';
            
            let lastItem = this.model.board[this.model.board.length - 1];
            lastItem.forEach(rowData => {
                let rowElem = document.createElement('div');
                if (rowData === this.model.gameCellUp()) {
                    rowElem.style.backgroundColor = '#228B22';
                } else if (rowData === this.model.gameCellDown()) {
                    rowElem.style.backgroundColor = '#228B22';
                } else {
                    rowElem.style.backgroundColor = '#00BFFF';
                }

                rowElem.style.minHeight = rowHeight + 'px';
                rowElem.style.maxHeight = rowHeight + 'px';

                colElem.append(rowElem);
            });
            gameboard.append(colElem);
            this.pillarIndex++;
            this.animate();
    
        }, 50);
    }


    getBoardHtml(gamebrain) { 
        let content = document.createElement('div');
        content.id = "gameboard";

        
        let colWidth = (window.innerWidth - 17) / gamebrain.colCount ;
        let rowHeight = (window.innerHeight - document.getElementById('control').clientHeight - 3) / gamebrain.rowCount;
        
        gamebrain.getGameBoard().forEach(colData => {
            let colElem = document.createElement('div');
            colElem.left
            colElem.style.minWidth = colWidth + 'px';
            colElem.style.minHeight = rowHeight + 'px';
            colElem.style.display = 'inline-block';
            
            colData.forEach(rowData => {
                let rowElem = document.createElement('div');
                if (rowData === gamebrain.gameCellUp()) {
                    rowElem.style.backgroundColor = '#32CD32';
                } else if (rowData === gamebrain.gameCellDown()) {
                    rowElem.style.backgroundColor = '#228B22';
                } else {
                    rowElem.style.backgroundColor = '#00BFFF';
                }

                rowElem.style.minHeight = rowHeight + 'px';
                rowElem.style.maxHeight = rowHeight + 'px';

                colElem.append(rowElem);
            });
            content.append(colElem);
        });

        return content;
    }
}