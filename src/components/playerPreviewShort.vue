
<template>
  <div class="player-preview-short">
    <b-card
      id="pl-crd-s"
      :img-src="playerInfo.image"
      img-alt="Image"
      img-height="130px"
      img-width="15px"
      styLeft="max-width: 10rem;"
      class="mb-2"
    >
      <b-card-titLeft id="pl-crd-s-title">{{ playerInfo.name }}</b-card-titLeft>
      <b-card-text id="pl-crd-s-txt">
        <b> Player ID: </b>{{ playerInfo.playerId }}
        <br />
        <b>Team: </b>{{ playerInfo.team_name }}
        <br />
        <b>Position: </b>{{ playerInfo.position }}
      </b-card-text>

      <b-button href="#" v-on:click="GoPersonalPage" class="pl-s-bt"
        >Go to {{ playerInfo.name }} page</b-button
      >
    </b-card>
  </div>
</template>

<script>
export default {
  name: "PlayerPreviewShort",
  props: {
    playerInfo: {
      type: Object,
      require: true,
    },
  },
  methods: {
    async GoPersonalPage() {
      this.$router.push(
        "/peronalPage/playerPersonalPage/" + String(this.playerInfo.playerId)
      );
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Acme&family=Do+Hyeon&family=Indie+Flower&display=swap");

.player-preview-short {
  position: relative;
  display: inline-block;
  padding: 15px;
}
#pl-crd-s {
  height: 350px;
  width: 250px;
  background-image: url("../../img/vg-player.jpg");
  background-repeat: no-repeat;
  background-size: 260px 360px;
  text-align: center;
  color: rgb(0, 255, 0);
  font-size: 16px;
  text-shadow: 4px 4px 4px #000000;
}
#pl-crd-s-title {
  font-family: "Lobster", cursive;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
}
#pl-crd-s-txt {
  font-family: "Acme", sans-serif;
  text-align: left;
}
.pl-s-bt {
  background-color: rgb(52, 129, 0);
  border: lawngreen;
}
</style>
