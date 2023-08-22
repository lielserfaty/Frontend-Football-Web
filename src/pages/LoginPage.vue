<template>
  <div class="container">
    <h1 class="title-lg">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width: 80%; display: block"
        class="mx-auto w-80"
        id="lg-btn"
        >Login</b-button
      >
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined,
      },
    };
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },

    async Login() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post("http://localhost:3000/Login", {
          username: this.form.username,
          password: this.form.password,
        });
        this.axios.defaults.withCredentials = false;

        this.$root.loggedIn = true;

        this.$root.store.login(this.form.username);

        this.$router.push("/");

        /************************Get the game favorite of user****************************** */

        try {
          this.axios.defaults.withCredentials = true;
          const response = await this.axios.get(
            "http://localhost:3000/users/ViewAllfavoriteGames"
          );
          this.axios.defaults.withCredentials = false;

          let game = [];
          if (response.data != "User has not favorite games")
            game = response.data;


        } catch (error) {
          console.log("error in update games");
          console.log(error);
        }
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.Login();
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Anton&family=Lobster&family=Righteous&display=swap");
.container {
  max-width: 400px;
  background-color: rgba(107, 170, 118, 0.767);
  border-radius: 25px;
}
#Username {
  width: 200px;
  font-family: "Righteous", cursive;
}
#Password {
  width: 200px;
}
.title-lg {
  font-family: "Anton", sans-serif;
  text-align: center;
  color: rgb(6, 97, 13);
  text-shadow: 4px 4px 4px #92eb8f;
}

#lg-btn {
  font-size: 30px;
  font-family: "Lobster", cursive;
  letter-spacing: 3px;
  background-color: rgb(35, 197, 116);
  border: 5px solid rgb(6, 97, 13);
}
#input-group-Username {
  font-family: "Righteous", cursive;
}
#input-group-Password {
  font-family: "Righteous", cursive;
}
</style>
