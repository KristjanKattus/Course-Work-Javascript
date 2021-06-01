import { EventAggregator, IDisposable } from "aurelia";
import { JokeState } from "./state/joke-state";
import { JokeService} from "./services/getjoke-service";

export class MyApp {
  private subscriptions: IDisposable[] = [];

  constructor(
    private eventAggregator: EventAggregator,
    private jokesState: JokeState,
    private jokesService: JokeService
  ) {}

  async attached() {
    this.jokesState.Initialize(); 
  }



  detached() {
    this.subscriptions.forEach(subscription => subscription.dispose());
    this.subscriptions = [];
  }

}
