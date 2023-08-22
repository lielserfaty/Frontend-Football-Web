<template>
  <div>
    <b-table striped hover :fields="fields" :items="games">
      <template #cell(events)="row">
        <eventListPreview :arrayEvent="row.item.events.event">
        </eventListPreview>
      </template>
         <template #cell(home_team)="row"> 
           <a href="#"  style="color:black" v-on:click="GoPersonalPage(row.item.home_teamID)">{{row.item.home_team}}</a>
      </template>

    <template #cell(away_team)="row"> 
      <a href="#" style="color:black" v-on:click="GoPersonalPage(row.item.away_teamID)">{{row.item.away_team}}</a>
    </template>

    </b-table>
  </div>
</template>

<script>
import eventListPreview from "../components/eventListPreview.vue";

export default {
  name: "tableGameHistory",
  props: {
    paramsHistory: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      fields: [
        {
          // A column that needs custom formatting,
          // calling formatter 'fullName' in this app
          key: "gameID",
          label: "Game ID",
        },
        {
          key: "date",
          label: "Date",
        },
        {
          key: "time",
          label: "Houer",
        },
        {
          key: "home_team",
          label: "Home Team",
        },
        {
          key: "away_team",
          label: "Away Team",
        },
        {
          key: "field",
          label: "Field",
        },
        {
          key: "refreeID",
          label: "Referee",
        },
        {
          key: "homeTeamResult",
          label: "Home Result",
        },
        {
          key: "awayTeamResult",
          label: "Away Result",
        },
        {
          key: "events",
          label: "Game Events",
        },
      ],
    };
  },
  props: {
    games: {
      type: Array,
      require: true,
    },
  },
  

  components: { eventListPreview },

  mounted() {
    console.log(this.games);
  },
  methods: {
    GoPersonalPage(teamID)
      {
          this.$router.push('/peronalPage/TeamPersonalPage/' +String(teamID))
          console.log(this.$router)


      }
  },
};
</script>
<style>
</style>