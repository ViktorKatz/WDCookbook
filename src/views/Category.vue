<template>
    <div>
        <b-container fluid>
            <b-row>
                <b-card class="mb-4"
                        bg-variant="warning"
                        border-variant="warning">
                    <h1 style="padding-bottom: 20px;">{{$t(categories[this.id].i18n_name)}}</h1>
                </b-card>
                <b-col cols="12" lg="6">
                    <div style="text-align: left;">
                        {{$t('categories.sort')}}:
                        <b-form-select v-model="sort" @change="resort">
                            <option value="0">{{$t("categories.order.id")}} {{$t("categories.order.asc")}}</option>
                            <option value="1">{{$t("categories.order.id")}} {{$t("categories.order.desc")}}</option>
                            <option value="2">{{$t("categories.order.rating")}} {{$t("categories.order.asc")}}</option>
                            <option value="3">{{$t("categories.order.rating")}} {{$t("categories.order.desc")}}</option>
                            <option value="4">{{$t("categories.order.difficulty")}} {{$t("categories.order.asc")}}</option>
                            <option value="5">{{$t("categories.order.difficulty")}} {{$t("categories.order.desc")}}</option>
                        </b-form-select>
                    </div>
                </b-col>
                <b-col cols="12" lg="6">
                    <b-form @submit="doSearch">
                        <div class="flex-row">
                            <b-form-input v-model="search" v-bind:placeholder="$t('header.search')"></b-form-input>
                            <b-button type="sumbit"> <b-icon-search /> </b-button>
                        </div>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
        <RecipeCard v-for="recipe in this.searchRecipes"
                    :key="recipe.id"
                    :title="recipe.title"
                    :difficulty="recipe.difficulty"
                    :rating="average(recipe.ratings)"
                    :category="recipe.category"
                    :picture="(recipe.pictures.length > 0) ? recipe.pictures[0]:'/missing.jpg'"
                    :id="recipe.id"
                    :userId="-1">
            >
        </RecipeCard>
    </div>
</template>

<style scoped>
    .flex-row {
        display: flex;
        flex-direction: row;
    }

    h3 {
        padding-bottom: 20px;
    }

    .pad {
        height: 28px;
    }

    .new-comment {
        margin-top: 20px;
    }

    .mb {
        margin: 10px;
    }
</style>
<script>
    import categories from '@/data/categories.js';
    import RecipeCard from '../components/RecipeCard.vue'

    export default {
        name: 'Category',
        components: {
            RecipeCard
        },
        data() {
            return {
                id: this.$route.params.id,
                categories: categories,
                loggedUserId: parseInt(localStorage.getItem("loggedUserId")),
                recipes: [],
                sort: 0,
                sortfs: [
                    (a, b) => a.id - b.id,
                    (a, b) => b.id - a.id,
                    (a, b) => this.average(a.ratings) - this.average(b.ratings),
                    (a, b) => this.average(b.ratings) - this.average(a.ratings),
                    (a, b) => a.difficulty - b.difficulty,
                    (a, b) => b.difficulty - a.difficulty,
                ],
                search: "",
                searchRecipes: []
            }
        },
        created() {
            this.$title = this.$t(categories[this.id].i18n_name);
            this.recipes = JSON.parse(localStorage.getItem('recipes')).filter(e => e.category == this.id || this.id == 0);
            if (this.$route.query.search) {
                this.search = this.$route.query.search;
            }
            this.doSearch();

            // Update breadcrumbs
            let bc_items = [
                {
                    text: this.$t('breadcrumbs.home'),
                    to: {
                        name: 'Home'
                    }
                },
                {
                    text: this.$t(categories[this.id].i18n_name),
                },
            ];
            if (this.id != 0) {
                bc_items.splice(1, 0, {
                    text: this.$t(categories[0].i18n_name),
                    to: {
                        name: 'Category',
                        params: {
                            id: 0
                        }
                    }
                })
            }
            this.$emit('update-breadcrumbs', bc_items);
            // End update breadcrumbs
        },
        methods: {
            average(array) {
                if (array == null || array.length == 0)
                    return 0;
                var total = 0;
                for (var i = 0; i < array.length; i++) {
                    total += array[i].rating;
                }
                return total / array.length;
            },
            resort(val) {
                this.recipes = JSON.parse(localStorage.getItem('recipes')).filter(e => e.category == this.id || this.id == 0);
                this.recipes = this.recipes.sort(this.sortfs[val]);
                this.doSearch();
            },
            doSearch(e) {
                if (e)
                    e.preventDefault();
                this.searchRecipes = this.recipes.filter(e => e.title.toLowerCase().search(this.search) != -1);
            }
        },
        beforeRouteUpdate(to, from, next) {
            this.id = to.params.id;
            this.recipes = JSON.parse(localStorage.getItem('recipes')).filter(e => e.category == this.id || this.id == 0);
            this.search = "";
            this.sort = 0;
            this.resort(this.sort);

            // Update breadcrumbs
            let bc_items = [
                {
                    text: `${this.$t('breadcrumbs.home')}`,
                    to: {
                        name: 'Home'
                    }
                },
                {
                    text: this.$t(categories[this.id].i18n_name),
                },
            ];
            if (this.id != 0) {
                bc_items.splice(1, 0, {
                    text: this.$t(categories[0].i18n_name),
                    to: {
                        name: 'Category',
                        params: {
                            id: 0
                        }
                    }
                })
            }
            this.$emit('update-breadcrumbs', bc_items);
            // End update breadcrumbs

            next();
        },
    }
</script>
