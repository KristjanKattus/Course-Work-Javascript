import {JokeState} from "../state/joke-state";

export class SportView{

    private page: number = 1;
    private jokeCategory: IJokeCategory;

    constructor(private jokeState : JokeState){
        
    }

    async attached() {
        
    }
}