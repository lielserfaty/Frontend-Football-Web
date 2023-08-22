
<template>
  <div class="player-preview">
    <b-card
      id="pl-crd"
      :img-src="playerInfo.image"
      img-alt="Image"
      img-left
      tag="artic"
      styLeft="max-width: 10rem;"
      class="mb-2"
    >
      <b-card-title-left id="pl-crd-title">{{
        playerInfo.name
      }}</b-card-title-left>
      <b-card-text id="pl-crd-txt">
        <b><u> Team: </u></b>{{ playerInfo.team_name }}
        <br />
        <b><u>Common Name: </u></b>{{ playerInfo.common_name }}
        <br />
        <b><u>Position: </u></b>{{ playerInfo.position }}
        <br />

        <b><u>Nationality: </u></b>{{ playerInfo.nationality }}
        <br />
        <b><u>Birthdate: </u></b>{{ playerInfo.birthdate }}
        <br />
        <b><u>Birthcountry: </u></b>{{ playerInfo.birthcountry }}
        <br />
        <b><u>Height: </u></b>{{ playerInfo.hieght }}
        <br />
        <b><u>Weight: </u></b>{{ playerInfo.weight }}
      </b-card-text>

      <b-button
        :ref="'append'"
        variant="danger"
        v-on:click="AddPlayer"
        v-if="!$root.store.username || playerInfo.favoritePlayer"
        disabled
        pl-f-bt
        >Add {{ playerInfo.name }} to favorite player</b-button
      >
      <p v-else >
      <b-button :ref="'append'" variant="danger" v-on:click="AddPlayer" class="pl-f-bt">Add {{playerInfo.name}}  to favorite  player</b-button>
      </p>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "PlayerPreview",
  props: {
    playerInfo: {
      type: Object,
      require: true,
    },
  },
  methods: {
    async AddPlayer() {
      try {
        this.axios.defaults.withCredentials = true;
        let response = await this.axios.post(
          "http://localhost:3000/users/AddfavoritePlayers/",
          {
            playerId: this.playerInfo.playerID,
          }
        );
        this.axios.defaults.withCredentials = false;
        console.log(response)
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
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Acme&family=Do+Hyeon&family=Indie+Flower&display=swap");

.player-preview {
  position: relative;
  display: inline-block;
  padding: 15px;
}
#pl-crd {
  height: 650px;
  width: 900px;
  background-image: url("../../img/player-m-bg.jpg");
  background-repeat: no-repeat;
  background-size: 910px 660px;
  text-align: center;
  color: rgb(245, 245, 245);
  font-size: 26px;
  text-shadow: 4px 4px 4px #000000;
}
#pl-crd-title {
  font-family: "Lobster", cursive;
  margin-left: auto;
  margin-right: auto;
  font-size: 40px;
}
#pl-crd-txt {
  font-family: "Acme", sans-serif;
  text-align: left;
  line-height: 2;
  font-size: 22px;
}
.pl-f-bt {
  background-color: rgb(52, 129, 0);
  border: lawngreen;
}
</style>
