<template>
  <!----TODO: IF DOSEND HAVE GAME---->
  <div>
    <EventPreview
      v-for="g in arrayEvent"
      :eventInfo="g"
      :key="g.id"
    ></EventPreview>
  </div>
</template>

<script>
import EventPreview from "../components/EventPreview.vue";
export default {
  name: "EventListPreview",
  components: {
    EventPreview,
  },
  props: {
    arrayEvent: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    console.log("ffff");
  },
};
</script>

<style></style>
