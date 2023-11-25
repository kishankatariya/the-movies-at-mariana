<template>
    <v-container>
        <v-layout class="pa-2 mt-5">
            <v-row>
                <v-col cols="12" sm="12" md="12">
                    <v-card class="px-2 pt-2">
                        <v-layout>
                            <v-row>
                                <v-col cols="12" sm="12" md="4">
                                    <v-text-field v-model="searchVal" class="mb-0" label="Search"
                                        placeholder="Type To Search.." outlined></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="4">
                                    <v-select v-model="selectedGener" chips label="Genre" :items="genreList" multiple outlined></v-select>
                                </v-col>
                            </v-row>
                        </v-layout>
                    </v-card>
                </v-col>
            </v-row>
        </v-layout>
        <div v-for="(dateData, index) in movieList" :key="index">
            <v-layout class="pa-2">
                <v-row>
                    <v-col>
                        <p class="headline font-weight-black">{{ dateData.date | dateFilter }}</p>
                    </v-col>
                </v-row>
            </v-layout>
            <v-layout class="pa-2">
                <v-row>
                    <v-col v-for="(movie, mIndex) in dateData.movies" :key="mIndex" cols="12" sm="1" md="3" lg="4">
                        <v-card class="mx-auto">
                            <template slot="progress">
                                <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                            </template>

                            <v-img height="250" :src="movie.poster"></v-img>

                            <v-card-title>{{ movie.title }}</v-card-title>

                            <v-card-text>
                                <v-row align="center" class="mx-0">
                                    <v-rating :value="parseFloat(movie.imdb_rating)" color="amber" dense half-increments readonly
                                        size="14"></v-rating>

                                    <div class="grey--text ms-4">
                                        {{ movie.imdb_rating }} ({{ movie.imdb_votes }})
                                    </div>
                                </v-row>

                                <div class="my-4 text-subtitle-1">
                                    {{ movie.box_office }}
                                </div>

                                <div class="movie-plot">{{ movie.plot }}</div>
                                <div class="movie-plot mt-2">Released: {{ movie.released }} ({{ movie.runtime }})</div>
                            </v-card-text>

                            <v-divider class="mx-4"></v-divider>

                            <v-card-title>Actors</v-card-title>

                            <v-card-text>
                                <div class="movie-plot">{{ movie.actors }}</div>
                            </v-card-text>

                            <!-- <v-card-actions>
                                <v-btn color="deep-purple lighten-2" text>
                                    {{movie.language}} ({{ movie.rated }})
                                </v-btn>
                            </v-card-actions> -->
                        </v-card>
                    </v-col>
                </v-row>

            </v-layout>
        </div>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            genreList: [],
            searchVal: '',
            masterMovieList: [],
            movieList: [],
            selectedGener: []
        }
    },
    mounted() {
        console.log('call this');
        this.getGenerList();
    },
    watch: {
        searchVal: {
            handler() {
                console.log('call th');
                this.filterMovieList()
            },
            deep: true
        },
        selectedGener: {
            handler() {
                this.filterMovieByGener()
            },
            deep: true
        }
    },
    methods: {
        getGenerList() {
            fetch('http://localhost:3000/movies').then((response) => {
                response.json().then((data) => {
                    this.masterMovieList = [...data];
                    this.movieList = [...data];
                    this.movieList.forEach(ml => {

                        ml.movies.forEach(element => {
                            const jList = element.genre.filter(x => this.genreList.findIndex(y => y.toLowerCase() === x.toLowerCase() ) < 0)
                            console.log('jList', jList);
                            this.genreList = [...this.genreList, ...jList] 
                        });
                    })
                    console.log('data', data);
                });
            })
        },
        filterMovieList() {
            const mList = JSON.parse(JSON.stringify(this.masterMovieList))
            if (this.searchVal.trim() === '') {
                this.movieList = mList
            } else {
                const result = []

                 mList.forEach(cl => {
                    cl.movies = cl.movies.filter(m => m.title.toLowerCase().includes(this.searchVal.toLowerCase()))
                    if (cl.movies.length > 0) {
                        result.push(cl)
                    }
                });
                this.movieList = result
            }
        },
        filterMovieByGener() {
            const mList = JSON.parse(JSON.stringify(this.masterMovieList))
            if (this.selectedGener.length === 0) {
                this.movieList = mList
            } else {
                const result = []

                 mList.forEach(cl => {
                    cl.movies = cl.movies.filter(m => m.genre.some(x => this.selectedGener.includes(x)))
                    if (cl.movies.length > 0) {
                        result.push(cl)
                    }
                });
                this.movieList = result
            }
        }
    }

}
</script>
<style>
.v-text-field__details {
    display: none !important;
    ;
}

.movie-plot {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>