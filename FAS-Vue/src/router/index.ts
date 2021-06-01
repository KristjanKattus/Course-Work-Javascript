import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../containers/identity/Login.vue';
import Register from '../containers/identity/Register.vue';
import Identity from '../views/Identity.vue';
import LeagueTableIndex from "@/views/LeagueTable/Index.vue";
import GameDetail from "@/views/Game/Details.vue";
import GameEventCreate from "@/views/GameEvent/Create.vue";
import GameTeamListCreate from "@/views/GameTeamList/Create.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            { path: '/LeagueTable/:id', name: 'LeagueTable', component: LeagueTableIndex, props: true },
            { path: '/GameEvent/:id', name: 'GameEvent', component: GameEventCreate, props: true },
            { path: '/Game/Details/:id', name: 'GameDetails', component: GameDetail, props: true },
            { path: '/GameTeamList/Create/:id', name: 'GameDetail', component: GameTeamListCreate, props: true }]
    },
    {
        path: '/Identity',
        name: 'Identity',
        component: Identity,
        children: [
            { path: '/Identity/Login', name: 'identity-login', component: Login },
            { path: '/Identity/Register', name: 'identity-register', component: Register },
        ]
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
