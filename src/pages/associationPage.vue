<template>
  <div>
    <div v-if="ready" id="asso-cont">
      <h1 class="title-gm">Representative of the Football Association Page</h1>
      <br />
      
      <b-button
        style="width: 200px; display: block"
        href="#"
        variant="primary"
        v-on:click="addGame()"
        id="add-game"
        >Add New game</b-button
      >
      <br />
      <b-table
        striped
        hover
        :fields="fields"
        :items="games"
        show-empty
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        class="tbl-gm"
      >
        <template #cell(events)="row" show-empty>
          <eventListPreview
            v-if="row.item.past"
            :arrayEvent="row.item.events.event"
          >
          </eventListPreview>
        </template>

        <template #cell(actions)="row">
          <b-button
            v-if="row.item.past"
            href="#"
            variant="success"
            pill
            v-on:click="updateScore(row.item.gameID)"
            >Update Score Game</b-button
          >
          <br />
          <br />
          <b-button
            v-if="row.item.past"
            href="#"
            variant="primary"
            pill
            v-on:click="
              addEvent(row.item.gameID, row.item.date, row.item.events.event)
            "
            >Add events to game</b-button
          >
        </template>
      </b-table>
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
import eventListPreview from "../components/eventListPreview.vue";

export default {
  name: "associationPage",
  components: { eventListPreview },

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
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "time",
          label: "Houer",
        },
        {
          key: "home_team",
          label: "Home Team",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "away_team",
          label: "Away Team",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "field",
          label: "Field",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "refreeID",
          label: "Referee",
          sortable: true,
          sortDirection: "desc",
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
        {
          key: "actions",
          label: "Action",
        },
      ],
      games: [],

      ready: false,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      date: false,
    };
  },

  methods: {
    async updateGames() {
      this.ready = false;
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/game/CurrentStageGames"
        );
        this.axios.defaults.withCredentials = false;
        console.log(response);
        let games = response.data;
        this.games = [];
        let history_game = games.history_game;
        let future_game = games.future_game;
        this.games.push(...history_game);
        this.games.push(...future_game);
      } catch (error) {
        this.$router.push("/404");
      }
    },

    updateScore(gameID) {
      this.$router.push("/assocition/updateScore/" + String(gameID));
    },
    addEvent(gameID, date, event) {
      this.$router.push({
        name: "eventUpdate",
        params: { gameID: gameID, date: date, events: event },
      });
    },
    addGame() {
      this.$router.push({ name: "addGame" });
    },
  },

  async mounted() {
    console.log("favorite games mounted");
    await this.updateGames();
    this.ready = true;
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Acme&family=Do+Hyeon&family=Indie+Flower&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Anton&family=Fredoka+One&family=Lobster&family=Righteous&display=swap");
#asso-cont {
  background-color: rgba(177, 177, 177, 0.788);
}
.title-gm {
  font-family: "Righteous", cursive;
  text-align: center;
}
.tbl-gm {
  font-family: "Acme", sans-serif;
  font-size: 18px;
  background-color: rgba(212, 212, 212, 0.842);
}
#add-game {
  background-color: seagreen;
  border: rgb(0, 51, 22);
}
</style>