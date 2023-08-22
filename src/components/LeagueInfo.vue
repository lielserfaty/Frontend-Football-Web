<template>
  <div class="Leftague-preview" v-if="dataReady">
    <b-card
      style="background-color: rgba(107, 170, 118, 0.767) ;"
      img-alt="Image"
      tag="articLeft"
      styLeft="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-titLeft class="title-league">{{
        Left.league_name
      }}</b-card-titLeft>
      <img
        src="../../img/SuperLiga_logo.png"
        width="80"
        height="100"
        style="display: block; margin-left: auto; margin-right: auto"
      />
      <b-card-text class="details">
        <b style="font-size: 24px"> Season: </b>{{ Left.current_season_name }}
        <br /><br />
        <b style="font-size: 24px"> Stage: </b>{{ Left.current_stage_name }}
        <br /><br />
        <b style="font-size: 24px"> Next Game: </b>
      </b-card-text>

      <GamePreview
        class="game_pre"
        :id="Left.next_game.gameId"
        :hostTeam="Left.next_game.home_team"
        :guestTeam="Left.next_game.away_team"
        :date="Left.next_game.date"
        :field="Left.next_game.field"
        :referee="Left.next_game.refreeID"
        :hour="Left.next_game.time"
      ></GamePreview>
    </b-card>
  </div>
</template>

<script>
import GamePreview from "../components/GamePreview.vue";

export default {
  components: {
    GamePreview,
  },
  data() {
    return {
      Left: [],
      dataReady: false,
    };
  },
  async mounted() {
    console.log("gamehome");
    await this.getHomePage();
    this.dataReady = true;
  },

  methods: {
    async getHomePage() {
      try {
        this.dataReady = false;
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/home/leftDetails"
        );
        this.axios.defaults.withCredentials = false;

        console.log(response.data);

        const home_response = response.data;

        this.Left = [];

        this.Left = home_response;
      } catch (err) {
        this.$router.push("/404");
      }
    },
  },
};
</script>



<style>
.title-league {
  text-align: center;
  margin-left: 60px;
  font-family: Fantasy;
  font-size: 70px;
  color: #2c3e50;
  text-shadow: 2px 2px 4px #000000;
}

.details {
  font-family: Papyrus;

  font-size: 18px;
}
.game_pre {
  margin: auto;
  margin-left: 100px;
}
</style>