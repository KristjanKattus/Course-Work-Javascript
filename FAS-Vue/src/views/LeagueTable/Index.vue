<template>
    <div  v-if="gate">
        <div class="d-sm-flex align-items-center justify-content-center" >
            <div class="card shadow mb-2" style="width: 100%;">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">{{ LeagueTableClient.leagueName }}</h6>
                </div>
                <div class="card-body">
                    <div id="dataTable_wrapper" class="dataTables_wrapper dt-bootstrap4">
                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table table-bordered dataTable" id="dataTable" width="100%" cellspacing="0" role="grid" aria-describedby="dataTable_info" style="width: 100%;">
                                    <thead>
                                    <tr role="row">
                                        <th rowspan="1" colspan="1">LeagueTeamName</th>
                                        <th rowspan="1" colspan="1">GamesPlayed</th>
                                        <th rowspan="1" colspan="1">GamesWon</th>
                                        <th rowspan="1" colspan="1">GamesLost</th>
                                        <th rowspan="1" colspan="1">GamesTied</th>
                                        <th rowspan="1" colspan="1">GoalsScored</th>
                                        <th rowspan="1" colspan="1">GoalsConceded</th>
                                        <th rowspan="1" colspan="1">Points</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in LeagueTableClient.leagueTableTeams" :key="item.points">
                                            <td>{{ item.leagueTeamName }}</td>
                                            <td>{{ item.gamesPlayed }}</td>
                                            <td>{{ item.gamesWon }}</td>
                                            <td>{{ item.gamesLost }}</td>
                                            <td>{{ item.gamesTied }}</td>
                                            <td>{{ item.goalsScored }}</td>
                                            <td>{{ item.goalsConceded }}</td>
                                            <td>{{ item.points }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <div class="row"></div>
    <div class="d-sm-flex align-items-center justify-content-center">
        <div class="card shadow mb-4" style="width: 100%;">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Games</h6>
            </div>
            <div class="card-body">
                <div id="dataTable_wrapper" class="dataTables_wrapper dt-bootstrap4">
                    <div class="row">
                        <div class="col-sm-12">
                            <table class="table table-bordered dataTable" id="dataTable" width="100%" cellspacing="0" role="grid" aria-describedby="dataTable_info" style="width: 100%;">
                                <thead class="text-center">
                                <tr role="row">
                                    <th rowspan="1" colspan="1">HomeTeam</th>
                                    <th rowspan="1" colspan="1"></th>
                                    <th rowspan="1" colspan="1"></th>
                                    <th rowspan="1" colspan="1"></th>
                                    <th rowspan="1" colspan="1">AwayTeam</th>
                                    <th rowspan="1" colspan="1">Stadium</th>
                                    <th rowspan="1" colspan="1"></th>
                                </tr>
                                </thead>
                                <tbody class="text-center ">
                                    <tr v-for="item in LeagueTableClient.leagueGames" :key="item.id">
                                        <td>{{ item.homeTeam.team.name }}</td>
                                        <td>{{ item.homeTeam.scored }}</td>
                                        <td>:</td>
                                        <td>{{ item.awayTeam.scored }}</td>
                                        <td>{{ item.awayTeam.team.name }}</td>
                                        <td class="">
                                            <div class="d-sm-flex align-items-center justify-content-center">Stadium</div>
                                        </td>
                                        <td>
                                            <router-link :to="'/Game/Details/' + item.game.id">
                                                <a class="btn btn-info btn-circle">
                                                    <i class="fas fa-info-circle">I</i>
                                                </a>
                                            </router-link>
                                        </td>
                                    </tr>
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
import { LeagueTableClient } from "@/domain/DTO/LeagueTableClient";
import Loader from "@/components/Loader.vue";

@Options({
    components: { Loader },
    props: { id: String },
})

export default class LeagueTableIndex extends Vue {
    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };
    id!:string;
    LeagueTableClient?: LeagueTableClient;
    gate: boolean = false

    async mounted(): Promise<void> {
        const result = await BaseService.get<LeagueTableClient>("LeagueTable/" + this.id);

        if (result.ok && result.data
        ) {
            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 }
            this.LeagueTableClient = result.data;
            this.gate = true;
        } else {
            this.pageLoader = {
                pageStatus: EPageStatus.Error,
                statusCode: (!result.ok ? result
                    : result).statusCode
            }
        }
    }
}
</script>
