<template>
  <v-layout row wrap>
    <v-flex xs12>
      <officenote :officenote="6295"></officenote>
      <officenote :officenote="6756"></officenote>
      <officenote :officenote="6790"></officenote>
      <officenote :officenote="6285"></officenote>
    </v-flex>
  </v-layout>
</template>
<script>
import officenote from "~/components/Officenote.vue";

export default {
  components: { officenote },

  data() {
    return {};
  }
};
</script>
<style>

</style>
