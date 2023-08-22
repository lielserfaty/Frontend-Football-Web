<template>
  <div class="game-preview">
    <div :title="id" class="game-title"><b>Game Id:</b> {{ id }}</div>

    <div class="game-cont">
      <lis name="1" style="list-style-type: none"
        ><b class="team_name">{{ hostTeam }}</b>
        <vs class="vs">VS.</vs>
        <b class="team_name">{{ guestTeam }} </b></lis
      ><br />
      <lis name="2" class="game_data">{{ date }} | {{ hour }}</lis
      ><br />
      <lis name="3" class="game_data">{{ field }}</lis
      ><br />
      <lis name="3" class="game_data">Refree: {{ referee }}</lis>
    </div>
  </div>
</template>

<script>
export default {
  name: "GamePreview",
  props: {
    id: {
      type: Number,
      required: true,
    },
    hostTeam: {
      type: String,
      required: true,
    },
    guestTeam: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },

    field: {
      type: String,
      required: true,
    },
    referee: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@1,600&display=swap");
.game-preview {
  display: inline-block;
  width: 300px;
  height: 200px;
  position: relative;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: rgb(14, 49, 0);
  background-image: url("../../img/bg_game.jpg");
  background-repeat: no-repeat;
  background-size: 300px 200px;
}
.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(47, 255, 0);
  text-shadow: 4px 4px 4px #ffffff;
}

.game-preview .game-cont {
  width: 100%;
  overflow: hidden;
}
.game-preview {
  background-color: seashell;
  line-height: 1.6;
}
.team_name {
  font-family: Lucida Handwriting;
  font-size: 18px;
}
.vs {
  font-family: Brush Script MT;
  font-size: 10px;
  color: red;
  padding: 6px;
}

.game-cont {
  text-align: center;
  text-shadow: 2px 2px 4px #000000;
}
lis {
  color: white;
}

.game_data {
  font-family: "Alegreya", serif;
  list-style-type: none;
  font-size: 17px;
  text-shadow: 2px 2px 4px #000000;
}
</style>
