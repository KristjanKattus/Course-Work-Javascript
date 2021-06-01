<template>
    <div v-if="gate">
        <div class="d-sm-flex align-items-center justify-content-center">
        <div class="card shadow mb-4" style="width: 70%;">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">{{ AddGameTeamList.gameTeamName }}</h6>
            </div>
            <div class="card-body">
                <div id="dataTable_wrapper" class="dataTables_wrapper dt-bootstrap4">
                    <div class="row">
                        <div class="col-sm-12">
                            <table class="table table-bordered dataTable" id="dataTable" width="100%" cellspacing="0" role="grid" aria-describedby="dataTable_info" style="width: 100%;">
                                <thead>
                                <tr role="row">
                                    <th rowspan="1" colspan="1"><label>Firstname</label></th>
                                    <th rowspan="1" colspan="1"><label>Lastname</label></th>
                                    <th rowspan="1" colspan="1"><label>PartOfGame</label></th>
                                    <th rowspan="1" colspan="1"><label>In starting lineup</label></th>
                                </tr>
                                </thead>
                                <tbody v-if="AddGameTeamList.playerList.Count !== 0">
                                    <tr v-for="item in AddGameTeamList.playerList" :key="item.id">
                                        <td>{{ item.person.person.firstName }}</td>
                                        <td>{{ item.person.person.lastName }}</td>
                                        <td>
                                            <input type="checkbox" v-model="item.partOfGame"/>
                                        </td>
                                        <td>
                                            <input type="checkbox" v-model="item.inStartingLineup"/>
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

    <div class="row"></div>
    <div class="d-sm-flex align-items-center justify-content-center" v-if="AddGameTeamList.staffList.Count !== 0">
        <div class="card shadow mb-4" style="width: 70%;">
            <div class="card-header py-3"><h6 class="m-0 font-weight-bold text-primary">Staff list</h6></div>
            <div class="card-body">
                <div id="dataTable_wrapper" class="dataTables_wrapper dt-bootstrap4">
                    <div class="row">
                        <div class="col-sm-12">
                            <table class="table table-bordered dataTable" id="dataTable" width="100%" cellspacing="0" role="grid" aria-describedby="dataTable_info" style="width: 100%;">
                                <thead class="text-center">
                                <tr role="row">
                                    <th rowspan="1" colspan="1">First name</th>
                                    <th rowspan="1" colspan="1">Last name</th>
                                    <th rowspan="1" colspan="1">Part of game</th>
                                </tr>
                                </thead>
                                <tbody class="text-center ">
                                    <tr v-for="item in AddGameTeamList.staffList" :key="item.id">
                                        <td>{{ item.person.person.firstName }}</td>
                                        <td>{{ item.person.person.lastName }}</td>
                                        <td>
                                            <input type="checkbox" v-model="item.partOfGame"/>
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

    <div class="form-group">
        <button type="submit" class="btn btn-primary" v-on:click="create()">Create</button>
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
import { AddGameTeamList } from "@/domain/DTO/AddGameTeamList";
import { GameTeam } from "@/domain/DTO/GameTeam";

@Options({
    components: { Loader },
    props: { id: String },
})

export default class GameTeamListCreate extends Vue {
    id?:string;
    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };

    AddGameTeamList?: AddGameTeamList;
    gate: boolean = false;
    gameId?: string;
    async mounted(): Promise<void> {
        const resultAddGameTeamList = await BaseService.get<AddGameTeamList>("GameTeamList/" + this.id, store.state.token as string)

        if (resultAddGameTeamList.ok && resultAddGameTeamList.data) {
            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 }
            const resultGameTeamId = await BaseService.get<GameTeam>("GameTeam/" + resultAddGameTeamList.data?.gameTeamId, store.state.token as string)
            this.gameId = resultGameTeamId.data!.gameId as string;
            this.AddGameTeamList = resultAddGameTeamList.data
            this.gate = true;
        } else {
            this.pageLoader = {
                pageStatus: EPageStatus.Error,
                statusCode: (!resultAddGameTeamList.ok ? resultAddGameTeamList
                    : resultAddGameTeamList).statusCode
            }
        }
    }

    async create(): Promise<void> {
        const response = await BaseService.post("GameTeamList", this.AddGameTeamList, store.state.token as string);
        if (response.ok != null && response.messages != null) {
        } else if (response.data != null) {
            this.$router.push("/Game/Details/" + this.gameId);
        }
    }
}
</script>
