const cellBirdOrange = 4;
const cellBirdBlack = 5;
const cellBirdWhite = 6;
const cellBirdBlue = 0;

export default class Bird {
    private width: number;
    private height: number;
    private westSide: number;
    private eastSide: number;
    private northSide: number;
    private southSide: number;
    private bird: Array<Array<number>> = [];
    constructor(boardWidth : number, boardHeight: number){


        this.width = Math.floor(boardWidth * 0.05);
        this.height = Math.floor(boardHeight * 0.05);

        this.westSide = Math.floor(boardWidth * 0.25);
        this.eastSide = this.westSide + this.width + 1;
        
        
        this.northSide = Math.floor(boardHeight * 0.35);
        this.southSide = this.northSide + this.height;

        this.createBird();
    }

    createBird() { 

        this.bird = [[0, 0, 4, 4, 0, 0],
                     [0, 4, 4, 4, 4, 0],
                     [4, 4, 4, 4, 4, 4],
                     [4, 4, 4, 4, 4, 4],
                     [4, 6, 5, 4, 4, 4],
                     [0, 6, 6, 4, 4, 0]];

    }

    getBirdCell(x : number, y : number) {
        return this.bird[x][y];}

    moveVertically(jump = false) {
        if (jump) {
            this.northSide -= 10;
            this.southSide -= 10;
        } else{
            this.northSide++;
            this.southSide++;
        }

    }


    getLocation() { return [this.westSide, this.eastSide, this.northSide, this.southSide];}
    getBirdCellOrange() {return cellBirdOrange;}
    getBirdCellBlack() {return cellBirdBlack;}
    getBirdCellWhite() {return cellBirdWhite;}
}