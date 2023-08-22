<template>
  <div>
    <div class="container" v-if="dateReady">
      <TeamPreview :teamInfo="teamInfo" :id="id"></TeamPreview>
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
import TeamPreview from "../components/TeamPreview";

export default {
  name: "TeamPersonalPage",

  components: {
    TeamPreview,
  },
  data() {
    return {
      teamInfo: [],
      id: " ",
      dateReady: false,
    };
  },

  mounted() {

   this.dateReady=false
   console.log("kkf")
   this.getPersonalPage()
   
   
 
  },

  watch:{
    '$route.params': {
      handler(newValue){
        this.getPersonalPage();
      },
      immediate:true,
  }
  },

  methods: {
    async getPersonalPage() {
      let response = " ";
      try {
        this.dateReady = false;
        this.id = " ";
        console.log(this.$route.params);
        this.axios.defaults.withCredentials = true;
        response = await this.axios.get("http://localhost:3000/personalPage/TeamPersonalPage/"+ this.$route.params.teamID );
       this.axios.defaults.withCredentials = false;

       this.teamInfo=response.data;
       this.id=this.$route.params.teamID;
        this.dateReady=true     
       }
       
      catch (err) {
        console.log(err);
        if(err.response.data.includes("exist in the system") || err.response.status==400 || err.response.status==500 ){
          this.$router.push('/404')  
          this.dateReady=true
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
