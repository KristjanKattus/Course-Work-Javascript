export default class GameController {

    constructor(model, viewContainer) {
        this.viewContainer = viewContainer;
        this.model = model;
        this.isRunning = false;
        this.pillarIndex = 0;
        // this.colWidth = this.getColWidth();
        // this.rowHeight = this.getRowHeight();
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

    getColWidth(colCount) {
        return (window.innerWidth - 17) / colCount;
    }
    getRowHeight(rowCount) {
        return (window.innerHeight - document.getElementById('control').clientHeight - 3) / rowCount;
    }

    
    animate() {
        setTimeout(() => {
                    
            if (this.pillarIndex < 15){
                if(this.pillarIndex < 5){
                    this.model.removeFirstAddLast(true);
                } else{
                    this.pillarIndex++;
                    this.model.removeFirstAddLast();
                }
                this.pillarIndex++;
            } else{
                this.pillarIndex = 0;
                this.model.removeFirstAddLast();
            }
            this.removeFirstRow();
            let lastItem = this.model.board[this.model.board.length - 1];
            this.getColumnHtml(lastItem, gameboard); 
            this.pillarIndex++;
            this.animate();
    
        }, 50);
    }

    removeFirstRow() {
        this.viewContainer.firstChild.firstChild.remove()
    }
    getColumnHtml(colData, content) {
            let colWidth = this.getColWidth(this.model.colCount);
            let rowHeight = this.getRowHeight(this.model.rowCount);

            let colElem = document.createElement('div');
            colElem.left
            colElem.style.minWidth = colWidth + 'px';
            colElem.style.minHeight = rowHeight + 'px';
            colElem.style.display = 'inline-block';
            
            colData.forEach(rowData => {
                let rowElem = document.createElement('div');
                if (rowData === this.model.gameCellUp()) {
                    rowElem.style.backgroundColor = '#32CD32';
                } else if (rowData === this.model.gameCellDown()) {
                    rowElem.style.backgroundColor = '#228B22';
                } else {
                    rowElem.style.backgroundColor = '#00BFFF';
                }

                rowElem.style.minHeight = rowHeight + 'px';
                rowElem.style.maxHeight = rowHeight + 'px';

                colElem.append(rowElem);
            });
            content.append(colElem);
    }

    getBoardHtml(gamebrain) { 
        let content = document.createElement('div');
        content.id = "gameboard";

        gamebrain.getGameBoard().forEach(colData => {
            this.getColumnHtml(colData, content)
        });

        return content;
    }
}