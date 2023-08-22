<template>
  <div class="container-scgm">
    <h1 class="title-scgm">Score Game</h1>
    <b-form @submit.prevent="onLogin" class="cont-scgm">
      <b-form-group
        id="input-group-home"
        label-cols-sm="3"
        label="Home score:"
        label-for="home"
      >
        <b-form-input
          id="home"
          style="width: 200px"
          v-model="$v.form.home.$model"
          type="text"
          :state="validateState('home')"
        ></b-form-input>
        <b-form-invalid-feedback
          v-if="$v.form.home.required && !$v.form.home.vaildNumber"
        >
          Score must be a number
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.home.required">
          home score is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-away"
        label-cols-sm="3"
        label="Away Score:"
        label-for="away"
      >
        <b-form-input
          id="away"
          style="width: 200px"
          v-model="$v.form.away.$model"
          :state="validateState('away')"
        ></b-form-input>
        <b-form-invalid-feedback
          v-if="$v.form.away.required && !$v.form.away.between"
        >
          Score must be a number
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.away.required">
          Away score is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width: 100px; display: block"
        class="mx-auto w-100"
        >Update score</b-button
      >
      <div class="mt-2">
        Go Back?
        <a href="#" v-on:click="GoPage()"> Click here</a>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      update failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required, between } from "vuelidate/lib/validators";
export default {
  name: "scoreGame",
  data() {
    return {
      form: {
        home: "",
        away: "",
        submitError: undefined,
        showSucess: false,
      },
    };
  },
  validations: {
    form: {
      home: {
        required, 
         vaildNumber: function(home) {
      
            if (parseInt(home) || home==0) 
              return true
            else 
              return false

    },

      },
      away: {
        required,
         vaildNumber: function(away) {
      
            if (parseInt(away) || away==0) 
              return true
            else 
              return false

    },
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },

    async updateScore() {
      try {
        let response = " ";
        console.log(this.form.home);
        this.axios.defaults.withCredentials = true;
        response = await this.axios.put(
          "http://localhost:3000/association/addScoreGame",
          {
            gameID: this.$route.params.gameID,
            homeTeamResult: this.form.home,
            awayTeamResult: this.form.away,
          }
        );
        this.axios.defaults.withCredentials = false;
        console.log(response);
        if (response.status == 201) {
          await this.$root.toast(
            "update",
            "Score game update successfully",
            "success"
          );

          this.$router.push("/association");
        }
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data;
      }
    },
    GoPage() {
      this.$router.push("/association");
    },
    onLogin() {
      this.form.submitError = undefined;

      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.updateScore();
    }
  },
 };
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Anton&family=Lobster&family=Righteous&display=swap");
.container-scgm {
  max-width: 450px;
  background-color: rgba(107, 170, 118, 0.767);
  margin-left: auto;
  margin-right: auto;
}
.title-scgm {
  font-family: "Anton", sans-serif;
  text-align: center;
  color: rgb(6, 97, 13);
  text-shadow: 4px 4px 4px #92eb8f;
}
.cont-scgm {
  font-family: "Righteous", cursive;
}
</style>
