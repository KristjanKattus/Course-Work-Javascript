import {JokeState} from "../state/joke-state";
import { IJokeCategory} from "../domain/IJokeCategory";

export class SportView{

    private page: number = 1;
    private jokeCategory: IJokeCategory;

    constructor(private jokeState : JokeState){
        
    }

    async attached() {
        this.jokeState.requestJoke(this.page, 1);
        this.jokeCategory = this.jokeState.getJokeCat(this.page);
    }
}