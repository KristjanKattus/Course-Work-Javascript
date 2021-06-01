import { ErrorAllert } from "@/types/ErrorAller";
import { MetaErrorInfo } from "./MetaErrorInfo";

export class GameEventErrors extends MetaErrorInfo {
    player: ErrorAllert = new ErrorAllert();
    eventType: ErrorAllert = new ErrorAllert();
    gameTime: ErrorAllert = new ErrorAllert();
}
