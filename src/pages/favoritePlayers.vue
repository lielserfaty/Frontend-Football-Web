<template>
  <div id="fpl-cont">
    <div v-if="dataReady">
      <p v-if="length">
        <PlayerPreview
          v-for="g in favoritPlayers"
          :playerInfo="g"
          :key="g.id"
        ></PlayerPreview>
      </p>
      <p id="fpl-else" v-else>You havn't yet added players to your favorites</p>
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
import PlayerPreview from "../components/playerPreviewShort";
export default {
  name: "FavoritePlayer",
  components: {
    PlayerPreview,
  },

  data() {
    return {
      favoritPlayers: [],
      length: false,
      dataReady: false,
    };
  },
  methods: {
    async updatePlayers() {
      this.dataReady = false;
      this.length = false;
      try {
        this.axios.defaults.withCredentials = true;

        const response = await this.axios.get(
          "http://localhost:3000/users/ViewfavoritePlayers/"
        );
        this.axios.defaults.withCredentials = false;

        this.favoritPlayers = response.data;
        console.log(response);
        if (this.favoritPlayers != "User has not favorite players")
          this.length = true;
      } catch (error) {
        this.$router.push("/404");
      }
    },
  },

  async mounted() {
    await this.updatePlayers();
    this.dataReady = true;
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Lobster&display=swap");
#fpl-else {
  background-color: rgba(212, 212, 212, 0.842);
  font-family: "Alfa Slab One", cursive;
  text-align: center;
  font-size: 26px;
}
</style>
