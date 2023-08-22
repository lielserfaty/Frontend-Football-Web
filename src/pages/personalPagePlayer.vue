<template>
  <div>
    <div class="container" v-if="dataReady">
      <PlayerPreview :playerInfo="playerInfo" :image="image"></PlayerPreview>
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
import PlayerPreview from "../components/playerPreview";
export default {
  components: {
    PlayerPreview,
  },
  data() {
    return {
      playerInfo: [],
      image: " ",
      dataReady: false,
    };
  },

  mounted() {
    this.dataReady = false;
    this.getPersonalPage();
  },

  methods: {
    async getPersonalPage() {
      try {
        this.axios.defaults.withCredentials = true;

        const response = await this.axios.get(
          "http://localhost:3000/personalPage/playerPersonalPage/" +
            this.$route.params.playerID
        );
        this.axios.defaults.withCredentials = false;

        this.playerInfo = response.data;
        console.log(response);
        this.dataReady = true;
      } catch (err) {
        //TODO:what need to be here
        //what apeen if the player dosent exists
        this.$router.push("/404");
        console.log(err.response);
        //this.$router.push("ccc");
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
