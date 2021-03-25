import gamebrain from "../model/gamebrain";


export default class GameController {
    private viewContainer: any;
    private model: any;
    private isRunning: boolean;
    private pillarIndex: number;
    private birdLocation: any;
    private timer: any = null;

    constructor(model: gamebrain, viewContainer: Element) {
        this.viewContainer = viewContainer;
        this.model = model;
        this.isRunning = false;
        this.pillarIndex = 0;
    }

    run() {
        this.model.resetGame();
        this.isRunning = true;
        this.viewContainer.innerHTML = '';
        this.viewContainer.append(this.getBoardHtml(this.model));
        this.birdLocation = this.model.getBirdLocation();
        this.placeBird();
        this.animate();
    }

    

    stop(): void{
        this.isRunning = false;
        clearTimeout(this.timer);
    }


    resizeUI() {
        if(this.isRunning) {
            this.viewContainer.innerHTML = '';
            this.viewContainer.append(this.getBoardHtml(this.model));
        }
    }

    getColWidth(colCount: number) {
        return (window.innerWidth - 17) / colCount;
    }
    getRowHeight(rowCount: number) {
        return (window.innerHeight - document.getElementById('control')!.clientHeight - 3) / rowCount;
    }

    placeBird() {
        this.birdLocation = this.model.getBirdLocation();
        let x = 0;
        for (let colInd = this.birdLocation[0]; colInd < this.birdLocation[1]; colInd++){
            let col = this.viewContainer.firstElementChild.childNodes[colInd].childNodes;

            let y = 0; 
            for (let rowInd = this.birdLocation[2]; rowInd < this.birdLocation[3]; rowInd++){
                col[rowInd].style.backgroundColor = this.getCellColour(this.model.getBirdCell(x, y));
                y++;
            }
            x++;
        }
    }

    removeBird(){
        
        let col  = this.viewContainer.firstElementChild.childNodes;
        for (let colInd = this.birdLocation[0] - 1; colInd < this.birdLocation[1] - 1; colInd++){
            for (let rowInd = this.birdLocation[2]; rowInd < this.birdLocation[3]; rowInd++) {
                col[colInd].childNodes[rowInd].style.backgroundColor = '#00BFFF';
            }
        }
    }

    birdJump() {
        this.model.birdJump();
    }

    
    animate() {
        this.timer = setTimeout(() => {
            this.moveBoard();
            this.displayScore();
            if(this.isRunning){
                this.animate();
            }
        }, 50);
    }

    moveBoard() {

        if (this.pillarIndex < 60){
            if(this.pillarIndex < 6){
                if(this.pillarIndex < 1){
                    this.model.removeFirstAddLast(true, true);
                }else{
                    this.model.removeFirstAddLast(true, false);
                }               
            } else{
                this.model.removeFirstAddLast();
            }
            this.pillarIndex++;
        } else{
            this.pillarIndex = 0;
            this.model.removeFirstAddLast();
        }

        this.removeFirstColumn();
        let gameboard = document.getElementById("gameboard")!;
        this.getColumnHtml(this.model.board[this.model.board.length - 1], gameboard);


        if (this.model.checkCollision()){
            this.stop();
            let name = prompt("Insert your name!");
            if(name != null){ 
                this.model.insertScore(name);
            }
            else{
                this.model.insertScore();
            }
            this.model.initializeBoard();
            this.viewContainer.append(this.getBoardHtml(this.model));

        }
        else{
            this.removeBird();
            this.placeBird();
        }
    }

    removeFirstColumn() {
        this.viewContainer.firstChild.firstChild.remove()
    }

    getColumnHtml(colData: any[], content: Element) {
            let colWidth = this.getColWidth(this.model.colCount);
            let rowHeight = this.getRowHeight(this.model.rowCount);

            let colElem = document.createElement('div');
            
            colElem.style.minWidth = colWidth + 'px';
            colElem.style.minHeight = rowHeight + 'px';
            colElem.style.display = 'inline-block';
            
            colData.forEach((rowData: any) => {
                let rowElem = document.createElement('div');
                rowElem.style.backgroundColor = this.getCellColour(rowData);

                rowElem.style.minHeight = rowHeight + 'px';
                rowElem.style.maxHeight = rowHeight + 'px';

                colElem.append(rowElem);
            });
            content.append(colElem);
    }

    getCellColour(rowData: any) {
        switch(rowData) {
            case this.model.gameCellUp():
                return '#228B22'; 
            case this.model.gameCellDown():
                return '#228B22';
            case this.model.birdCellOrange():
                return '#FFA500';
            case this.model.birdCellBlack():
                return '#000000';
            case this.model.birdCellWhite():
                return '#FFFFFF';
            default:
                return '#00BFFF';
        };
    }

    getBoardHtml(gamebrain: { getGameBoard: () => any[]; }) { 
        let content = document.createElement('div');
        content.id = "gameboard";

        gamebrain.getGameBoard().forEach((colData: any) => {
            this.getColumnHtml(colData, content)
        });

        return content;
    }

    displayScore() {
        document.getElementById("scoreElem")!.textContent = this.model.getScore();
    }
}