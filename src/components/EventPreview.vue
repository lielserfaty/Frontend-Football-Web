<template>
  <div class="EventPreview">
    <b-button v-b-toggle.collapse-1 variant="primary" class="event-btn">{{
      eventInfo.eventType
    }}</b-button>
    <b-collapse id="collapse-1" class="mt-2">
      <b-card>
        <p class="card-text">
          <strong
            >{{ eventInfo.date }} | {{ eventInfo.time }} <br />
            minute: {{ eventInfo.minutes }}</strong
          >
        </p>
        <b-button v-b-toggle.collapse-1-inner size="sm">Description</b-button>
        <b-collapse id="collapse-1-inner" class="mt-2">
          <b-card>{{ eventInfo.description }}</b-card>
        </b-collapse>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "EventPreview",

  props: {
    eventInfo: {
      type: Object,
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

.event-btn {
  background-color: #70a872; /* Green */
  border: none;
  color: white;
  padding: 8px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
