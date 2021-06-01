<template>
    <div v-if="gate">
        <div class="d-sm-flex align-items-center justify-content-center">
            <div class="card shadow mb-4" style="width: 80%;">
                <div class="card-header py-3">
                    <div class="row d-sm-flex justify-content-between">
                        <h4 class="m-0 font-weight-bold text-primary">{{ LeagueGame.homeTeam.team.name }}</h4>
                        <div class="d-sm-flex align-items-center justify-content-center">
                            <h4 class="m-0 font-weight-bold text-primary">{{ LeagueGame.homeTeam.scored }}</h4>
                            <h4 class="m-0 font-weight-bold text-primary">:</h4>
                            <h4 class="m-0 font-weight-bold text-primary">{{ LeagueGame.awayTeam.scored }}</h4>
                        </div>
                        <h4 class="m-0 font-weight-bold text-primary">{{ LeagueGame.awayTeam.team.name }}</h4>
                    </div>
                </div>
                <div class="card-body">
                    <div id="dataTable_wrapper" class="dataTables_wrapper dt-bootstrap4" style="width: 100%;">

                    <div class="row d-sm-flex align-items-center justify-content-between" v-if="role === 'Admin' || role == 'Referee'"><router-link :to="'/GameEvent/' + LeagueGame.homeTeam.id" class="btn btn-primary">
                            <span class="icon text-white-50">
                                <i class="fas fa-flag"></i>
                            </span>
                            <span class="text">Add game event</span>
                        </router-link>
                        <router-link :to="'/GameEvent/' + LeagueGame.awayTeam.id" class="btn btn-primary">
                            <span class="icon text-white-50">
                                <i class="fas fa-flag"></i>
                            </span>
                            <span class="text">Add game event</span>
                        </router-link>

                    </div>
                    <div class="row d-sm-flex align-items-center justify-content-center">
                        <div class="h2 text-black-800 text-center">Game events</div>
                        <table class="table table-bordered dataTable" id="dataTable" width="100%" cellspacing="0" role="grid" aria-describedby="dataTable_info" style="width: 100%;"
                        v-if="LeagueGame.game.gameEvents.Count != 0">
                                <thead>
                                <tr role="row">
                                    <th rowspan="1" colspan="1">Game Time</th>
                                    <th rowspan="1" colspan="1">GameEvents</th>
                                    <th rowspan="1" colspan="1">Player</th>
                                    <th rowspan="1" colspan="1">Team Name</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in LeagueGame.game.gameEvents" :key="item.gameTime">
                                        <td>{{ item.gameTime }}</td>
                                        <td>{{ item.eventType.name }}</td>
                                        <td>{{ item.gameTeamList.teamPerson.person.fullName }}</td>
                                        <td>
                                            <div v-if="item.gameTeamList.gameTeamId == LeagueGame.homeTeam.id">{{ LeagueGame.homeTeam.team.name }}</div>
                                            <div v-else>{{ LeagueGame.awayTeam.team.name }}</div>
                                        </td>
                                    </tr>
                                </tbody>
                        </table>
                    </div>

                    <div class="row d-sm-flex align-items-center justify-content-center">

                        <div class="col-sm-6">
                            <div class="h4 text-black-800 text-center">In starting lineup</div>

                            <table class="table table-bordered dataTable" id="dataTable" width="100%" cellspacing="0" role="grid" aria-describedby="dataTable_info" style="width: 100%;">
                                <thead>
                                <tr role="row">
                                    <th rowspan="1" colspan="1">FirstName</th>
                                    <th rowspan="1" colspan="1">LastName</th>
                                </tr>
                                </thead>

                                <tbody v-if="LeagueGame.homeTeamList.length !== 0">
                                    <tr v-for="item in LeagueGame.homeTeamList" :key="item.id" role="row">
                                            <td rowspan="1" colspan="1">{{ item.teamPerson.person.firstName }}</td>
                                            <td rowspan="1" colspan="1">{{ item.teamPerson.person.lastName }}</td>
                                        </tr>
                                    <tr role="row">
                                        <td rowspan="2" colspan="2">
                                            <div class="h4 text-black-800 text-center">
                                                Subsitutions
                                            </div>
                                        </td>
                                    </tr>
                                    <tr></tr>
                                    <tr v-for="item in LeagueGame.homeTeamList.filter(item => !item.inStartingLineup && !item.staff)" :key="item.id" role="row">
                                        <td rowspan="1" colspan="1">{{ item.teamPerson.person.firstName }}</td>
                                        <td rowspan="1" colspan="1">{{ item.teamPerson.person.lastName }}</td>
                                    </tr>

                                    <tr role="row" class="text-center">
                                        <td rowspan="2" colspan="2">
                                            <div class="h4 text-black-800 text-center">
                                                Staff
                                            </div>
                                        </td>
                                    </tr>
                                    <tr></tr>
                                    <tr v-for="item in LeagueGame.homeTeamList.filter(item => item.staff)" :key="item.id" role="row">
                                        <td rowspan="1" colspan="1" v-if="item.person != null">{{ item.person.firstName }}</td>
                                        <td rowspan="1" colspan="1" v-if="item.person != null">{{ item.person.lastName }}</td>
                                        <td rowspan="1" colspan="1" v-if="item.person == null">{{ item.teamPerson.person.firstName }}</td>
                                        <td rowspan="1" colspan="1" v-if="item.person == null">{{ item.teamPerson.person.lastName }}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <div v-if="role !== null">
                                        <router-link :to="'/GameTeamList/Create/' + LeagueGame.homeTeam.id" class="btn btn-primary">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-flag"></i>
                                            </span>
                                            <span class="text">Add starting lineup</span>
                                        </router-link>
                                    </div>
                                </tbody>
                            </table>
                        </div>

                        <div class="col-sm-6">

                            <div class="h4 text-black-800 text-center">In starting lineup</div>

                            <table class="table table-bordered dataTable" id="dataTable" width="100%" cellspacing="0" role="grid" aria-describedby="dataTable_info" style="width: 100%;">
                                <thead>
                                <tr role="row">
                                    <th rowspan="1" colspan="1">FirstName</th>
                                    <th rowspan="1" colspan="1">LastName</th>
                                </tr>
                                </thead>
                                <tbody v-if="LeagueGame.awayTeamList.length !== 0">
                                    <tr v-for="item in LeagueGame.awayTeamList" :key="item.id" role="row">
                                        <td rowspan="1" colspan="1">{{ item.teamPerson.person.firstName }}</td>
                                        <td rowspan="1" colspan="1">{{ item.teamPerson.person.lastName }}</td>
                                    </tr>
                                    <tr role="row">
                                        <td rowspan="2" colspan="2">
                                            <div class="h4 text-black-800 text-center">
                                                Subsitutions
                                            </div>
                                        </td>
                                    </tr>
                                    <tr></tr>
                                    <tr v-for="item in LeagueGame.awayTeamList.filter(item => !item.inStartingLineup && !item.staff)" :key="item.id" role="row">
                                        <td rowspan="1" colspan="1">{{ item.teamPerson.person.firstName }}</td>
                                        <td rowspan="1" colspan="1">{{ item.teamPerson.person.lastName }}</td>
                                    </tr>

                                    <tr role="row" class="text-center">
                                        <td rowspan="2" colspan="2">
                                            <div class="h4 text-black-800 text-center">
                                                Staff
                                            </div>
                                        </td>
                                    </tr>
                                    <tr></tr>
                                    <tr v-for="item in LeagueGame.awayTeamList.filter(item => item.staff)" :key="item.id" role="row">
                                        <td rowspan="1" colspan="1" v-if="item.person != null">{{ item.person.firstName }}</td>
                                        <td rowspan="1" colspan="1" v-if="item.person != null">{{ item.person.lastName }}</td>
                                        <td rowspan="1" colspan="1" v-if="item.person == null">{{ item.teamPerson.person.firstName }}</td>
                                        <td rowspan="1" colspan="1" v-if="item.person == null">{{ item.teamPerson.person.lastName }}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <div v-if="role !== null">
                                        <router-link :to="'/GameTeamList/Create/' + LeagueGame.awayTeam.id" class="btn btn-primary">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-flag"></i>
                                            </span>
                                            <span class="text">Add starting lineup</span>
                                        </router-link>
                                    </div>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                </div>
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
import { LeagueGame } from "@/domain/DTO/LeagueGame";
import { GameEvent } from "@/domain/DTO/GameEvent";

@Options({
    components: { Loader },
    props: { id: String },
})

export default class GameDetails extends Vue {
    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };
    id!:string;
    LeagueGame?: LeagueGame;
    gate: boolean = false;
    role?: string

    async mounted(): Promise<void> {
        const resultLeagueGame = await BaseService.get<LeagueGame>("LeagueTeam/" + this.id)
        const resultGameEvent = await BaseService.getAll<GameEvent>("GameEvent/gameId=" + resultLeagueGame.data?.game?.id)
        if (resultLeagueGame.ok && resultLeagueGame.data &&
        resultGameEvent.ok && resultGameEvent.data
        ) {
            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 }
            this.role = store.state.role
            this.LeagueGame = resultLeagueGame.data;
            this.LeagueGame.game!.gameEvents = resultGameEvent.data;
            this.gate = true;
        } else {
            this.pageLoader = {
                pageStatus: EPageStatus.Error,
                statusCode: (!resultLeagueGame.ok ? resultLeagueGame
                    : resultLeagueGame).statusCode
            }
        }
    }
}

</script>
