<template>
  <div class="game-preview">
    <div :title="gameInfo.gameId" class="game-title">
      <b>Game Id:</b> {{ gameInfo.gameId }}
    </div>
    <ul class="game-content">
      <li>host: {{ gameInfo.home_team }}</li>
      <li>guest: {{ gameInfo.away_team }}</li>
      <li>date: {{ gameInfo.date }}</li>
      <li>time: {{ gameInfo.time }}</li>
      <li>field: {{ gameInfo.field }}</li>
      <li>homeTeamResult: {{ gameInfo.homeTeamResult }}</li>
      <li>awayTeamResult: {{ gameInfo.awayTeamResult }}</li>
      <li>refree: {{ gameInfo.refreeID }}</li>
      <li>
        events:
        <eventListPreview :arrayEvent="gameInfo.events.event">
        </eventListPreview>
      </li>
    </ul>
  </div>
</template>

<script>
import eventListPreview from "../components/eventListPreview.vue";
export default {
  name: "GameHistoryPreview",
  components: {
    eventListPreview,
  },
  props: {
    gameInfo: {
      type: Array,
      require: true,
    },
  },
};
</script>

<style>
.game-preview {
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

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}
</style>
