<template>
    <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
    >
        <!-- Sidebar - Brand -->
        <router-link
            class="sidebar-brand d-flex align-items-center justify-content-center"
            asp-area=""
            asp-controller="Home"
            asp-action="Index"
            to="/"
        >
            <div class="sidebar-brand-text mx-3">Football association</div>
        </router-link>

        <!-- Divider -->
        <hr class="sidebar-divider" />

        <!-- Heading -->
        <div class="sidebar-heading">Leagues</div>

        <!-- Nav Item - Pages Collapse Menu -->

        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMenLeagues" aria-expanded="true" aria-controls="collapseMenLeagues">
                <i class="fas fa-fw fa-cog"></i>
                <span>Men</span>
            </a>
            <div id="collapseMenLeagues" class="collapse" aria-labelledby="collapseMenLeagues" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                       <router-link class="collapse-item" to="/LeagueTable/1AF2336C-8A54-4A4C-0CEA-08D922301FB4">Premier League</router-link>
                </div>
            </div>
        </li>
        <!-- Divider -->
        <hr class="sidebar-divider" />

        <!-- Heading -->
    </ul>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    components: {},
    props: {},
})
export default class Sidebar extends Vue {}
</script>
