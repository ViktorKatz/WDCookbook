<template>
    <div id="app">
        <Header />
        <b-container fluid>
            <b-row>
                <b-col cols="12" lg="9">
                    <div id="bc_div" class="mx-sm-4">
                        <b-breadcrumb :items="bc_items"></b-breadcrumb>
                    </div>
                    <div id="router-view">
                        <router-view v-on:update-breadcrumbs="bc_items = $event" />
                    </div>
                </b-col>
                <b-col cols="12" sm="10" offset-sm="1" md="8" offset-md="2" lg="3" offset-lg="0">
                    <AdSpace />
                </b-col>
            </b-row>
        </b-container>
        <Footer />
    </div>
</template>

<script>
    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import AdSpace from '@/components/AdSpace.vue'
    import defaultRecipes from '@/data/defaultRecipes.js';
    import defaultUsers from '@/data/defaultUsers.js';

    export default {
        name: 'App',
        components: {
            Header, Footer, AdSpace
        },
        data() {
            return {
                bc_items: [
                    {
                        text: 'Admin',
                        href: '#'
                    },
                    {
                        text: 'Manage',
                        href: '#'
                    },
                    {
                        text: 'Library',
                        active: true
                    }
                ]
            }
        },
        methods: {
            update_breadcrumbs() {
                alert("updating bcs...");
            }
        },
        created() {
            if (localStorage.getItem("allUsers") == null)
                localStorage.setItem("allUsers", JSON.stringify(defaultUsers));

            if (localStorage.getItem("recipes") == null)
                localStorage.setItem("recipes", JSON.stringify(defaultRecipes));
        }
    }
</script>

<style>

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

        #nav a {
            font-weight: bold;
            color: #2c3e50;
        }

            #nav a.router-link-exact-active {
                color: #42b983;
            }

    #router-view {
        min-height: calc(100vh - 211px); /* 100% visine viewporta - visina footera */
    }

    #breadCrumbs {
        border: 2px solid #ffc107;
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
    }

    .breadcrumb-item + .breadcrumb-item::before {
        content: var(--bs-breadcrumb-divider, ">") !important; /* To overwrite the default divider '/' */
    }

    .breadcrumb-item a {
        color: #ffc107 !important;
    }

    .light-warning {
        color: #664d03;
        background-color: #fff3cd !important;
    }
</style>
