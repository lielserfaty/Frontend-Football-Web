
<template>
  <div id="pp-team">
    <p id="pp-t-title">{{ teamInfo.name }}</p>
    <b-card
      id="pp-team-img"
      :img-src="teamInfo.logo"
      img-alt="Image"
      tag="artic"
      styLeft="max-width: 10rem;"
      class="mb-2"
    ></b-card>
    <div id="pp-team-bt">
      <b-button
        :ref="'append'"
        variant="danger"
        v-on:click="AddTeam"
        v-if="!$root.store.username || teamInfo.favoriteTeam"
        disabled
        >Add {{ teamInfo.name }} to favorite teams</b-button
      >
      <p v-else>
        <b-button :ref="'append'" variant="danger" v-on:click="AddTeam"
          >Add {{ teamInfo.name }} to favorite teams</b-button
        >
      </p>
    </div>

    <b-card-text>
      <p id="pp-team-pl-title"><br />Players:</p>
      <b-card id="pp-team-pl">
        <playerPreview
          v-for="g in teamInfo.players"
          :playerInfo="g"
          :key="g.playerId"
        ></playerPreview>
      </b-card>
    </b-card-text>
    <p id="pp-team-pl-title"><br />Games:</p>
    <div id="pp-team-gm">
      <p id="pp-team-pl-subtitle"><br />History Games:</p>
      <gameHistory :games="gamesHistory" class="games-tbl"></gameHistory>
      <p id="pp-team-pl-subtitle"><br />Future Games:</p>
      <gamesFuture :games="gameFuture" class="games-tbl"></gamesFuture>
    </div>
  </div>
</template>

<script>
import playerPreview from "../components/playerPreviewShort.vue";
import gameHistory from "../components/tableGameHistory.vue";
import gamesFuture from "../components/tableGameFuture.vue";

export default {
  name: "TeamPreview",
  components: {
    playerPreview,
    gameHistory,
    gamesFuture,
  },
  props: {
    teamInfo: {
      type: Object,
      require: true,
    },
    id: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      gamesHistory: [],
      gameFuture: [],
    };
  },
  mounted() {
    this.gamesHistory = this.teamInfo.history_game;
    this.gameFuture = this.teamInfo.future_game;
  },
  methods: {
    async AddTeam() {
      try {
        this.axios.defaults.withCredentials = true;
        let response = await this.axios.post(
          "http://localhost:3000/users/AddfavoriteTeam/",
          {
            teamID: this.id,
          }
        );
        this.axios.defaults.withCredentials = false;
        if (response.status == 201) {
          this.$refs["append"].disabled = true;
        }
      } catch (error) {
        this.$router.push("/404");
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Courgette&family=Lobster&display=swap");
#pp-t-title {
  font-family: "Courgette", cursive;
  text-align: center;
  font-size: 50px;
  color: darkgreen;
  text-shadow: 4px 4px 4px darkolivegreen;
}
#pp-team {
  background-color: rgba(171, 207, 177, 0.863);
  border-radius: 25px;
}
#pp-team-img {
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
}
#pp-team-bt {
  text-align: center;
}
#pp-team-pl {
  background-color: rgba(171, 207, 177, 0.863);
  text-align: center;
}
#pp-team-pl-title {
  font-family: "Courgette", cursive;
  text-align: center;
  font-size: 50px;
  color: darkgreen;
}
#pp-team-gm {
  font-family: "Acme", sans-serif;
}
#pp-team-pl-subtitle {
  font-family: "Courgette", cursive;
  text-align: left;
  font-size: 20px;
  color: darkgreen;
}
.games-tbl {
  background-color: rgb(0, 155, 26);
}
</style>
