import { JokeService } from "../services/getjoke-service"
import { HttpClient } from "@aurelia/fetch-client";
import { IJokeCategory } from "../domain/IJokeCategory";


export class JokeState {

    private jokeService : JokeService;
    private jokeCategories : IJokeCategory[];
    constructor() {
        this.jokeService = new JokeService(new HttpClient);
        
    }

    async Initialize(): Promise<void>{
        this.jokeCategories = [];
        let jokeCat: IJokeCategory;
        jokeCat = {category: "science", jokes:[]};
        this.jokeCategories.push(jokeCat);
        jokeCat = {category: "sport", jokes:[]};
        this.jokeCategories.push(jokeCat);
        jokeCat = {category: "food", jokes:[]};
        this.jokeCategories.push(jokeCat);

        for(let i = 0; i < 3; i++){
            this.requestJoke(i, 5);
        }


    }

    async requestJoke(pageNumber: number, amount: number): Promise<void> {
        let jokeCat: IJokeCategory = this.jokeCategories[pageNumber];
        
        for (let i = 0; i < amount; i++){
            this.jokeService.getJoke(jokeCat.category.toString())
            .then(joke => {
                if(jokeCat.jokes.find(j => j.id == joke.id) == undefined){
                    jokeCat.jokes.unshift(joke);
                }
            });
        }
    }

     getJokeCat(pageNumber: number): IJokeCategory{

        return this.jokeCategories[pageNumber];
    }
}