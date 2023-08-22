<template>
  <div>
    <div v-if="dataReady">
      <br /><br />
      <p id="gm-title-ss">Previous games:</p>
      <gameHistory :games="gamesHistory" class="games-tbl"></gameHistory>
      <p id="gm-title-ss">Future games:</p>
      <gamesFuture :games="gameFuture" class="games-tbl"></gamesFuture>
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
import gameHistory from "../components/tableGameHistory.vue";
import gamesFuture from "../components/tableGameFuture.vue";

export default {
  name: "Demo",
  data() {
    return {
      gamesHistory: [],
      gameFuture: [],
      dataReady: false,
    };
  },
  components: { gamesFuture, gameHistory },

  methods: {
    async updateGames() {
      this.dataReady = false;
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/game/CurrentStageGames"
        );
        this.axios.defaults.withCredentials = false;
        console.log(response);
        const games = response.data;
        this.gamesHistory = [];
        this.gameFuture = [];
        this.gamesHistory = games.history_game;
        this.gameFuture = games.future_game;
      } catch (error) {
        this.$router.push("/404");
      }
    },
  },
  async mounted() {
    console.log("favorite games mounted");
    await this.updateGames();
    this.dataReady = true;
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Acme&family=Do+Hyeon&family=Indie+Flower&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Courgette&family=Lobster&display=swap");
.games-tbl {
  background-color: rgba(212, 212, 212, 0.842);
  font-size: 22px;
  font-family: "Acme", sans-serif;
}
#gm-title-ss {
  font-family: "Courgette", cursive;
  text-align: left;
  font-size: 30px;
  text-shadow: 4px 4px 4px black;
  color: rgb(250, 250, 250);
}
</style>
