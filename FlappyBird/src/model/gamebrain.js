import Bird from './bird.js';


class GameScore {
    constructor(name = '', score = 0) {
        this.name = name;
        this.score = 0;
    }
}

export const gameCellUp = -1;
export const gameCellPath = 0;
export const gameCellDown = 1;

const pillarWidth = 20;

export default class GameBrain {


    constructor (rowCount = 100, colCount = 128) {
        this.rowCount = rowCount;
        this.colCount = colCount;

        this.scoreBoard = [];
        

        this.initializeBoard();
    }

    initializeBoard(){
        this.bird = new Bird(this.rowCount, this.colCount);

        this.board = [];
        this.gameScore = 0;
        this.columnHolder = [];

        for(let index = 0; index < this.colCount; index ++) {
            this.board.push(this.createGameRow(this.rowCount / 2, pillarWidth));
        }
        this.board.push()
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

    getRandomPillarPos() {
        let randPathPos = Math.random() * ((this.rowCount - 8) - pillarWidth) + 4;
        randPathPos = Math.floor(randPathPos);
        return randPathPos
    }

    createPillar(){
        let randPathPos = this.getRandomPillarPos();
        let pillarCol = this.createGameRow(randPathPos, pillarWidth, true);
        this.columnHolder = pillarCol;
        return pillarCol;
    }

    removeFirstAddLast(pillar = false, start = false){
        if(!this.checkCollision()){
            this.birdFall();
        }

        this.board.shift();
        if(pillar){
            let pillarCol = [];
            if (start){
                pillarCol = this.createPillar();
                this.gameScore++;
                
            } else{
                pillarCol = this.columnHolder;
                
            }
            this.board.push(pillarCol)
        } else {
            this.board.push(this.createGameRow())
        }
    }

    checkCollision() {
        let birdLocation = this.getBirdLocation();
    
        for(let rowInd = birdLocation[2]; rowInd < birdLocation[3]; rowInd++){
            
            if(this.board[birdLocation[0]][rowInd] == this.gameCellUp() || this.board[birdLocation[1]][rowInd] == this.gameCellDown()) {
                this.gameScore -= 2;
                return true;
            }
        }

        for(let colInd = birdLocation[0]; colInd < birdLocation[1]; colInd++){
            
            if (this.board[colInd][birdLocation[2]] == this.gameCellUp() || this.board[colInd][birdLocation[3]] == this.gameCellDown()) {
                this.gameScore -= 2;
                return true;
            }
        }
        if (birdLocation[2] <= 0 || birdLocation[3] >= this.colCount) {
            this.gameScore -= 2;
            return true;    
        }
        return false;
    } 

    insertScore(name){
        this.scoreBoard.push(new GameScore(name, this.gameScore));
    }

    birdJump() {
        this.bird.moveVertically(true);
    }

    birdFall(){
        this.bird.moveVertically();
    }

    getGameBoard() { return this.board; }

    getScore() { return this.gameScore;}
    getScoreBoard() { return this.scoreBoard;}

    getBirdLocation() { return this.bird.getLocation();}
    getBirdCell(x, y) { return this.bird.getBirdCell(x, y); }
    birdCellOrange() { return this.bird.getBirdCellOrange(); }
    birdCellBlack() { return this.bird.getBirdCellBlack(); }
    birdCellWhite() { return this.bird.getBirdCellWhite(); }



    gameCellPath() { return gameCellPath; }
    gameCellUp() { return gameCellUp; }
    gameCellDown() { return gameCellDown; }
}