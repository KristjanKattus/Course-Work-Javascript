
import {JokeState} from "../state/joke-state";
import { IJokeCategory} from "../domain/IJokeCategory";

export class ScienceView{

    private page: number = 0;
    private jokeCategory: IJokeCategory;

    constructor(private jokeState : JokeState){
    }

    async attached() {
        this.jokeState.requestJoke(page)
    }
}