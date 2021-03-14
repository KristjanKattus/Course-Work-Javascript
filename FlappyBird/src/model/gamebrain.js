class GameScore {
    constructor() {
        this.name = '';
        this.score = 0;
    }
}
export const gameCellPillar = 2;
export const gameCellSky = 3;
export const gameCellUp = -1;
export const gameCellPath = 0;
export const gameCellDown = 1;
export const pillarWidth = 20;

export default class GameBrain {


    constructor (rowCount = 100, colCount = 128) {
        this.rowCount = rowCount;
        this.colCount = colCount;

        this.scoreBoard = [];
        this.board = [];

        this.initializeBoard();
    }


    createGameRow(pathPosition = 0, pathWidth = 0, pillar = false) {
        let res = [];

        for (let index = 0; index < this.rowCount; index++) { 
            if(pillar) {
                switch(true) {
                case index < pathPosition:
                    res.push(gameCellUp);
                    break;
                case index >= pathPosition + pathWidth:
                    res.push(gameCellDown);
                    break;
                default: 
                    res.push(gameCellPath);
                    break;
            }
            }else{
                res.push(gameCellPath);
            }
        }
        return res;
    }

    initializeBoard(){
        for(let index = 0; index < this.colCount; index ++) {
            this.board.push(this.createGameRow(this.rowCount / 2, pillarWidth));
        }
        this.board.push()
    }

    removeFirstAddLast(pillar = false){
        this.board.shift();
        let randPathPos = Math.random() * ((this.rowCount - 8) - pillarWidth) + 4;
        randPathPos = Math.floor(randPathPos);
        if(pillar){
            this.board.push(this.createGameRow(randPathPos, pillarWidth, true))
        } else {
            this.board.push(this.createGameRow())
        }
    }



    getGameBoard() { return this.board; }

    gameCellPillar() { return gameCellPillar; }
    gameCellSky() { return gameCellSky; }


    gameCellPath() { return gameCellPath; }
    gameCellUp() { return gameCellUp; }
    gameCellDown() { return gameCellDown; }
    pillarWidth() { return pillarWidth; }
}