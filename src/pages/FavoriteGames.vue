<template>
  <div>
    <div v-if="dataReady">
      <div v-if="games.length">
        <GamePreview
          v-for="g in games"
          :id="g.gameID"
          :hostTeam="g.home_team"
          :guestTeam="g.away_team"
          :date="g.date"
          :field="g.field"
          :referee="g.refreeID"
          :hour="g.time"
          :key="g.gameID"
        ></GamePreview>
      </div>
      <div id="fgm-else" v-else>
        You havn't yet added games to your favorites
      </div>
    </div>
    <div v-else>
      <br /><br />
      <br /><br /><br /><br />
      <br /><br />
      <br /><br /><br /><br />
      <br /><br />
      <br />

      <div class="text-center">
        <b-spinner
          variant="primary"
          style="width: 10rem; height: 10rem"
          label="Text Centered"
        ></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import GamePreview from "../components/GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview,
  },

  data() {
    return {
      games: "",
      dataReady: false,
    };
  },
  methods: {
    async updateGames() {
      //console.log("i am mounted");
      this.dataReady = false;
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/users/ViewAllfavoriteGames"
        );
        this.axios.defaults.withCredentials = false;

        let game = [];
        if (response.data != "User has not favorite games")
          this.games = response.data;

       // console.log(game);
      } catch (error) {
        this.$router.push("/404");
      }

      this.dataReady = true;
    },
  },
  async mounted() {
    this.dataReady = false;
    console.log("favorite games mounted");
    await this.updateGames();
    this.dataReady = true;
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Lobster&display=swap");
#fgm-else {
  background-color: rgba(212, 212, 212, 0.842);
  font-family: "Alfa Slab One", cursive;
  text-align: center;
  font-size: 26px;
}
</style>
