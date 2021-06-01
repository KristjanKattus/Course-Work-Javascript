<template>
    <div v-if="gate">
        <div class="row">
        <div class="col-md-4">
            <Alert :alertInfo="errors.generalError" />
            <div class="form-group">
                <label class="control-label">Player</label>
                <select class="form-control" v-model="GameEvent.gameTeamListId" >
                    <option v-for="player in GameTeamList" :key="player.id" :value="player.id">
                        {{ player.teamPerson.person.fullName }}
                    </option>
                </select>
                <Alert :alertInfo="errors.player" />
            </div>
            <div class="form-group">
                <label class="control-label"> Game event</label>
                <select class="form-control" v-model="GameEvent.eventTypeId" >
                    <option v-for="eventType in EventTypeList" :key="eventType.id" :value="eventType.id">
                        {{ eventType.name }}
                    </option>
                </select>
                <Alert :alertInfo="errors.eventType" />
            </div>
            <div class="form-group">
                <label class="control-label">Game time</label>
                <input class="form-control" v-model="GameEvent.gameTime" />
                <Alert :alertInfo="errors.gameTime" />
            </div>
            <div class="form-group">
                <label class="control-label">Number in order</label>
                <input class="form-control" v-model="GameEvent.numberInOrder" />
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary" v-on:click="create()">Create</button>
            </div>
            <Loader :pageLoader="pageLoader" />
        </div>
    </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { PageLoader } from "@/types/PageLoader";
import { EPageStatus } from "@/types/EPageStatus";
import { BaseService } from "@/services/base-service";
import Loader from "@/components/Loader.vue";
import store from "@/store/index";
import { GameEvent } from "@/domain/DTO/GameEvent";
import { GameTeamList } from "@/domain/DTO/GameTeamList";
import { EventType } from "@/domain/DTO/EventType";
import { GameEventErrors } from "@/domain/errors/GameEventErrors";
import Alert from "@/components/Alert.vue";
import { GameTeam } from "@/domain/DTO/GameTeam";
import { AddGameTeamList } from "@/domain/DTO/AddGameTeamList"

@Options({
    components: {
        Loader,
        Alert
    },
    props: { id: String },
})

export default class GameEventCreate extends Vue {
    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };
    id!:string;
    errors: GameEventErrors = new GameEventErrors();
    GameEvent: GameEvent = new GameEvent();

    GameTeamList?: GameTeamList[];
    EventTypeList?: EventType[];

    gate: boolean = false;
    async mounted(): Promise<void> {
        const returnGTL = await BaseService.getAll<GameTeamList>("GameTeamList/gameTeamId=" + this.id, store.state.token as string)
        const returnGEType = await BaseService.getAll<EventType>("EventType", store.state.token as string)

        if (returnGTL.ok && returnGTL.data &&
            returnGEType.ok && returnGEType.data
        ) {
            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 }

            this.GameTeamList = returnGTL.data
            this.EventTypeList = returnGEType.data
            this.GameEvent.gameId = (await BaseService.get<GameTeam>("GameTeam/" + this.id, store.state.token as string)).data?.gameId as string;
            this.gate = true;
        } else {
            this.pageLoader = {
                pageStatus: EPageStatus.Error,
                statusCode: (!returnGTL.ok ? returnGTL
                    : returnGTL).statusCode
            }
        }
    }

    async create(): Promise<void> {
        if (!this.handleValidation()) {
            return;
        }
        const response = await BaseService.post("GameEvent/", this.GameEvent, store.state.token as string);
        if (response.ok != null && response.messages != null) {
            this.errors.generalError.message = response.messages
        } else if (response.data != null) {
            this.$router.push("/Game/Details/" + response.data.gameId);
        }
    }

    handleValidation(): boolean {
        let formIsValid = true;

        this.errors = new GameEventErrors();

        if (!this.GameEvent.gameTeamListId) {
            this.errors.player.message = "Player field can not be empty!";
            formIsValid = false;
        }

        if (!this.GameEvent.eventTypeId) {
            this.errors.eventType.message = "EventType field can not be empty!";
            formIsValid = false;
        }

        if (!this.GameEvent.gameTime) {
            this.errors.gameTime.message = "GameTime field can not be empty!";
            formIsValid = false;
        }
        return formIsValid;
    }
}
</script>
