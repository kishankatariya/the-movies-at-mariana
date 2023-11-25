<template>
  <div id="app">
    <v-app>
  <v-main>
    <TopAppBar />
    <TableSection />
  </v-main>
</v-app>
  </div>
</template>

<script>
import TopAppBar from './components/TopAppBar.vue';
import TableSection from './components/TableSection.vue'
export default {
  name: 'App',
  components: {
    TopAppBar,
    TableSection
  }
}
</script>

<style>
</style>
