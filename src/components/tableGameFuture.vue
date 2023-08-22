<template>
  <div>
    
    <b-table striped hover :fields="fields" :items="games" >
      
    <template #cell(addTo)="row"> 
      <p v-if="!$root.store.username || row.item.favoriteGame ">
        <b-button disabled :ref="'add'+row.item.gameID" value="dontADD" variant="danger" v-on:click="AddGame(row.item.gameID)" >Add Game</b-button>
      </p>
    
      <p v-else>
        <b-button  :ref="'add'+row.item.gameID" value="dontADD" variant="danger" v-on:click="AddGame(row.item.gameID)" v-if="!row.disabled && $root.store.username" >Add Game</b-button>
      </p>
      </template>

    <template #cell(home_team)="row"> 
        <a href="#" style="color:black"  v-on:click="GoPersonalPage(row.item.home_teamID)">{{row.item.home_team}}</a>
    </template>

    <template #cell(away_team)="row"> 
     <a href="#"  style="color:black" v-on:click="GoPersonalPage(row.item.away_teamID)">{{row.item.away_team}}</a>
    </template>

      <template #cell(away_team)="row">
        <a  href="#" style="color:black" v-on:click="GoPersonalPage(row.item.away_teamID)">{{ row.item.away_team }}</a>
        <br />
     
     </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "tableGameFuture",

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

        { key: "addTo", label: "Add game to favorite" },
      ],
      isActive: false,
    };
  },
  props: {
    games: {
      type: Array,
      require: true,
    },
  },

  mounted(){
      console.log("ikkk games mounted");
     console.log(this.games)
    
  },
  methods: {
    async AddGame(gameID) {
      let response = " ";
      try {
        this.axios.defaults.withCredentials = true;
 
        response = await this.axios.post("http://localhost:3000/users/AddfavoriteGame/",
            {
                gameId: gameID 
                
            }
    );
        this.axios.defaults.withCredentials = false                                                                                                                                                                                                                                                                                                                                                                                                             ;
      
         if(response.status==201){
           
             this.$refs["add"+gameID].disabled=true;
             
         }
      }
      catch(error){
           this.$router.push('/404') 


      }
      },

     

    async GoPersonalPage(teamID) {
      this.$router.push("/peronalPage/TeamPersonalPage/" + String(teamID));
    },
  },
};
</script>
<style>
</style>