<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row class="search-container">
     
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Search"
          label-for="search-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="serch-input"
              v-model="search"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!search" @click="search_query"
                >search</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <br>
       <b-col lg="6" class="my-1">
        <b-form-group
          label="Sort players results"
          label-for="sort-by-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>

            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>


     <b-col lg="6" class="my-1">
        <b-form-group
          v-model="sortDirection"
          label="Filter On:"
          description="Leave all unchecked to filter on all data"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-input-group :aria-describedby="ariaDescribedby" class="mt-1">
            <b-input-group prepend="Filter:" id="position-filter">
              <b-form-input v-model="filter_position"></b-form-input>
              <b-input-group-append>
                <b-button
                  :disabled="!filter_position"
                  @click="filter_position = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-input-group>
        </b-form-group>
      </b-col>

    <b-col lg="6" class="my-1">
        <b-form-group
          v-model="sortDirection"
          label="Filter On"
          description="Leave all unchecked to filter on all data"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-checkbox value="position">Position</b-form-checkbox>
            <b-form-checkbox value="team_name">Team name</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      
    </b-row>

    <br /><br />
    <!-- Main table element -->
    <div v-if="this.ready" class="rsl-tbl">
      <b-table
        :items="items"
        striped
        hover
        :fields="fields"
        :filter="filter_position"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered"
      >
        <template #cell(image)="row">
          <img
            class="image"
            :src="row.item.image"
            v-on:click="GoPersonalPage(row.item.playerID)"
          /><img />
        </template>

        <template #cell(name)="row">
          <a href="#" v-on:click="GoPersonalPage(row.item.playerID)">
            {{ row.item.name }}</a
          >
        </template>
      </b-table>
    </div>

    <br />
    <div v-if="this.ready" class="rsl-tbl">
      <b-table
        :items="iteamsTeam"
        striped
        hover
        
        :fields="fieldsTeam"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered"
      >
        <template #cell(Logo)="row">
          <img
            class="image"
            :src="row.item.Logo"
            v-on:click="GoPersonalPageTeam(row.item.teamID)"
          /><img />
        </template>

        <template #cell(Team_Name)="row">
          <a href="#" v-on:click="GoPersonalPageTeam(row.item.teamID)">
            {{ row.item.Team_Name }}</a
          >
        </template>
      </b-table>
    </div>
    <div v-else>
      <br /><br />
      <br />
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
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      iteamsTeam: [],
      fieldsTeam: [
        {
          key: "teamID",
          label: "Team ID",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "Team_Name",
          label: "Team full name",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "Logo", label: "Logo Team" },
      ],

      fields: [
        {
          key: "playerID",
          label: "Player ID",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "name",
          label: "Player full name",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "image", label: "Profile player", class: "text-center" },
        {
          key: "team_name",
          label: " Team",
          sortable: true,
          class: "text-center",
        },
        {
          key: "position",
          label: "Position player",
          sortable: true,
          class: "text-center",
        },
      ],
      totalRows: 1,
      ready: false,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      search: " ",
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      filter_position: null,

      filter_teamName: null,
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    // Set the initial number of items
    this.ready = false;
    this.query = "";
    this.items = [];
    this.iteamsTeam = [];
    this.totalRows = this.items.length;
    if (this.$root.store.username) {
      this.items = JSON.parse(localStorage.getItem("resultPlayers"));
      this.iteamsTeam = JSON.parse(localStorage.getItem("resultTeams"));
      this.search = this.$root.store.query;
    }
    this.ready = true;
  },
  methods: {
    async GoPersonalPage(playerId) {
      this.$router.push("/peronalPage/playerPersonalPage/" + String(playerId));
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    async search_query() {
      this.ready = false;
      this.length = false;
      try {
        this.axios.defaults.withCredentials = true;

        const response = await this.axios.get(
          "http://localhost:3000/search/query/" + this.search
        );

        this.axios.defaults.withCredentials = false;
       
        let player_result = response.data.players;
        let team_result = response.data.teams;
 
        this.items=[]
        this.iteamsTeam=[]
        this.items.push(...player_result);
        this.iteamsTeam.push(...team_result);
        this.$root.store.setResultPlayers(player_result);
        this.$root.store.setResultTeam(team_result);
        this.$root.store.setquery(this.search);
        this.ready = true;
        console.log( this.$root.store.resultPlayers)
      } catch (error) {
        //console.log("error in update games")
        let player_result = [];
        let team_result = [];

        this.items = player_result;
        this.iteamsTeam = team_result;

        this.$root.store.setResultPlayers(player_result);
        this.$root.store.setResultTeam(team_result);
        this.$root.store.setquery(this.search);
        this.ready = true;
      }
    },
    async AddPlayer(playerID) {
      try {
        this.axios.defaults.withCredentials = true;
        let response = await this.axios.post(
          "http://localhost:3000/users/AddfavoritePlayers/",
          {
            playerId: playerID,
          }
        );
        this.axios.defaults.withCredentials = false;

        if (response.status == 201) {
          this.$refs["append" + playerID].disabled = true;
        }
      } catch (error) {}
    },
    async AddTeam(teamID) {
      try {
        this.axios.defaults.withCredentials = true;
        let response = await this.axios.post(
          "http://localhost:3000/users/AddfavoriteTeam/",
          {
            teamID: teamID,
          }
        );
        this.axios.defaults.withCredentials = false;
        if (response.status == 201) {
          this.$refs["append"].disabled = true;
        }
      } catch (error) {}
    },
    async GoPersonalPageTeam(teamID) {
      this.$router.push("/peronalPage/TeamPersonalPage/" + String(teamID));
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Acme&family=Do+Hyeon&family=Indie+Flower&display=swap");
.search-container {
  background-color: rgba(212, 212, 212, 0.842);
  width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding: 30px;
}

.rsl-tbl {
  font-family: "Acme", sans-serif;
  font-size: 22px;
  background-color: rgba(212, 212, 212, 0.842);
}
</style>