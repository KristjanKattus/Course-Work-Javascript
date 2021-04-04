import { JokeService } from "../services/getjoke-service"
import { HttpClient } from "@aurelia/fetch-client";
import { IJoke } from "../domain/IJoke";
import { IJokeCategory } from "../domain/IJokeCategory";


export class JokeState {

    private jokeService : JokeService;
    private jokeCategories : Promise<IJokeCategory[]>;
    constructor() {
        this.jokeService = new JokeService(new HttpClient);
    }

    async Initialize(): Promise<void>{
        

    }

    async requestJoke(pageNumber: number): Promise<IJokeCategory> {
        let jokeCat: IJokeCategory = this.jokeCategories[pageNumber];
        
        for (let i = 0; i < jokeCat.jokes.length; i++){
            this.jokeService.getJoke(jokeCat.category)
            .then(joke => {
                if(jokeCat.jokes.find(j => j.id == joke.id) != undefined){
                    jokeCat.jokes.push(joke);
                }
            });
        }
        return jokeCat;
    }
}