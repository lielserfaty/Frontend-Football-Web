<template>
  <!----TODO IF DOSEND HAVE GAME---->
  <div v-if="dataReady">

  <p class="fav-game"><img src='../../img/fav.jpg' width="50" height="50"><title-game><u>Your Game</u></title-game><img src='../../img/fav.jpg' width="50" height="50"></p>

    <div v-if="arrayGame.length">
      <GamePreview
        v-for="g in arrayGame"
        :id="g.gameID"
        :hostTeam="g.home_team"
        :guestTeam="g.away_team"
        :date="g.date"
        :field="g.field"
        :referee="g.refreeID"
        :hour="g.time"
        :key="g.id"
      ></GamePreview>
    </div>
    <div v-else class="no-game" style="">
      You havn't yet added games to your favorites
    </div>
  </div>
</template>

<script>
import GamePreview from "../components/GamePreview.vue";
export default {
  name: "favoriteGameHome",
  components: {
    GamePreview,
  },
  data() {
    return {
      arrayGame: [],
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
      console.log("home");
      try {
        this.dataReady = false;
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/home/rightDetails"
        );
        this.axios.defaults.withCredentials = false;

        let home_response_right = response.data;

        this.arrayGame = [];

        if (home_response_right == "Login or Register")
          home_response_right = [];

        if (
          home_response_right ==
          "User has not favorit games that not yet occurred"
        )
          home_response_right = [];

        this.arrayGame = home_response_right;
      } catch (err) {
        this.$router.push("/404");

        console.log(err);
      }

    }, 

  },
};
</script>

<style lang="scss" scoped>

@import url("https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@1,400;1,600&display=swap");
.no-game {
  font-family: "Alegreya", serif;
  color: seashell;
  font-size: 18px;
}
.fav-game {
  width: 350px;
  text-align: center;
}
title-game {
  font-family: "Alegreya", serif;
  font-size: 45px;
  text-shadow: 2px 2px 2px #ffffff;
}
</style>
