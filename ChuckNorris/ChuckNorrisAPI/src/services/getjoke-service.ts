
import { IJoke } from "../domain/IJoke";
import { HttpClient, inject } from "aurelia";

@inject()
export class JokeService {

    constructor(private httpClient: HttpClient) {

    }

    async getJoke(cat: string): Promise<IJoke> {
        const response = await this.httpClient
            .get('https://api.chucknorris.io/jokes/random?category=${cat}', { cache: "no-store" });
        console.log(response);
        if (response.ok) {
            const data = (await response.json());
            return data;
        }
        
    }

    // getAllPromiseStyle(): Promise<IContactType[]> {
    //     return this.httpClient
    //         .get("https://localhost:5001/api/contacttypes/", { cache: "no-store" })
    //         .then(response => {
    //             console.log(response);
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log(data);
    //             return data;
    //         })
    //         .catch(error => []);
    // }
}
