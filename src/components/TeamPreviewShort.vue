
<template>
  <div class="team-preview">
    <b-card
      id="tm-crd-s"
      :img-src="teamInfo.image"
      img-alt="Image"
      styLeft="max-width: 10rem;"
      class="mb-2"
    >
      <b-card-titLeft id="tm-crd-s-title">{{ teamInfo.name }}</b-card-titLeft>
      <b-card-text id="tm-crd-s-txt"> ID: {{ teamInfo.teamId }} </b-card-text>

      <b-button
        href="#"
        variant="primary"
        v-on:click="GoPersonalPage(teamInfo.teamId)"
        class="tn-s-bt"
        >Go to Personal Page</b-button
      >
    </b-card>
  </div>
</template>

<script>
export default {
  name: "TeamPreviewShort",

  props: {
    teamInfo: {
      type: Object,
      require: true,
    },
  },
  methods: {
    GoPersonalPage(teamID) {
      this.$router.push("/peronalPage/TeamPersonalPage/" + String(teamID));
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Acme&family=Do+Hyeon&family=Indie+Flower&display=swap");
-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
}

-preview -title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

-preview -content {
  width: 100%;
  overflow: hidden;
}
.team-preview {
  position: relative;
  display: inline-block;
  padding: 15px;
}
#tm-crd-s {
  height: 300px;
  width: 200px;
  background-image: url("../../img/bg-team.jpg");
  background-repeat: no-repeat;
  background-size: 210px 310px;
  text-align: right;
  color: rgb(0, 255, 0);
  text-shadow: 4px 4px 4px #000000;
}
#tm-crd-s-title {
  font-family: "Lobster", cursive;
  margin-left: auto;
  margin-right: auto;
  font-size: 26px;
}
#tm-crd-s-txt {
  font-family: "Acme", sans-serif;
}
.tn-s-bt {
  background-color: rgb(52, 129, 0);
  border: lawngreen;
}
</style>
