<template>
  <div>
    <div v-if="dataReady">
      <p v-if="length">
        <TeamPreview
          v-for="g in favoritTeams"
          :teamInfo="g"
          :key="g.id"
        ></TeamPreview>
      </p>
      <p id="ftm-else" v-else>You havn't yet added teams to your favorites</p>
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
import TeamPreview from "../components/TeamPreviewShort";
export default {
  name: "FavoriteTeams",
  components: {
    TeamPreview,
  },

  data() {
    return {
      favoritTeams: [],
      length: false,
      dataReady: false,
    };
  },
  methods: {
    async updateTeam() {
      this.dataReady = false;
      this.length = false;

      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/users/ViewAllfavoriteTeam"
        );
        this.axios.defaults.withCredentials = false;
        console.log(response)
        this.favoritTeams = response.data;
        if (this.favoritTeams != "User has not favorite teams")
          this.length = true;
      } catch (error) {
        this.$router.push("/404");
      }
    },
  },
  async mounted() {
    await this.updateTeam();
    this.dataReady = true;
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Lobster&display=swap");
#ftm-else {
  background-color: rgba(212, 212, 212, 0.842);
  font-family: "Alfa Slab One", cursive;
  text-align: center;
  font-size: 26px;
}
</style>
