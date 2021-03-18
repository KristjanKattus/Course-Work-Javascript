const cellBirdOrange = 4;
const cellBirdBlack = 5;
const cellBirdWhite = 6;

export default class Bird {
    constructor(boardWidth, boardHeight){


        this.width = Math.floor(boardWidth * 0.05);
        this.height = Math.floor(boardHeight * 0.05);

        this.westSide = Math.floor(boardWidth * 0.25);
        this.eastSide = this.westSide + this.width + 1;
        
        
        this.northSide = Math.floor(boardHeight * 0.35);
        this.southSide = this.northSide + this.height;
         
        this.bird = [];

        this.createBird();
    }

    createBird() { 
        // for(let index = 0; index < this.width; index++){
        //     let col = [];
        //     for (let index = 0; index < this.height; index++){
        //         col.push(6);
        //     }
        //     this.bird.push(col);
        // }

        this.bird = [[0, 0, 4, 4, 0, 0],
                     [0, 4, 4, 4, 4, 0],
                     [4, 4, 4, 4, 4, 4],
                     [4, 4, 4, 4, 4, 4],
                     [4, 6, 5, 4, 4, 4],
                     [0, 6, 6, 4, 4, 0]];

    }

    getBirdCell(x, y) {
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