import {JokeState} from "../state/joke-state";

export class TravelView{


    private page: number = 2;
    private jokeCategory: IJokeCategory;

    constructor(private jokeState : JokeState){
        
    }

    async attached() {
        
    }
}