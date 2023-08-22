<template>
  <div class="container">
    <h1 class="title-rgs">Register</h1>
    <b-form
      @submit.prevent="onRegister"
      @reset.prevent="onReset"
      class="rg-cont"
    >
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
          style="width: 200px"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username alpha
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-firstName"
        label-cols-sm="3"
        label="First Name:"
        label-for="firstName"
      >
        <b-form-input
          id="firstName"
          v-model="$v.form.firstName.$model"
          type="text"
          :state="validateState('firstName')"
          style="width: 200px"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          First name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-lastName"
        label-cols-sm="3"
        label="Last Name:"
        label-for="lastName"
      >
        <b-form-input
          id="lastName"
          v-model="$v.form.lastName.$model"
          type="text"
          :state="validateState('lastName')"
          style="width: 200px"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          Last name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
          style="width: 200px"
        ></b-form-select>
        <b-form-invalid-feedback> Country is required </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
          style="width: 200px"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.password.vaildCharacter">
          <li>
            password need contain at least 1 digit and 1 special character
          </li>
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
          style="width: 200px"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="text"
          :state="validateState('email')"
          style="width: 200px"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          Email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.email.email">
          Email is not vaild
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-profileImage"
        label-cols-sm="3"
        label="Profile Image:"
        label-for="profileImage"
      >
        <b-form-input
          id="profileImage"
          v-model="$v.form.profileImage.$model"
          type="text"
          :state="validateState('profileImage')"
          style="width: 200px"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.profileImage.required">
          Profile Image is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.profileImage.url">
          The link to profile image is not vaild
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width: 250px"
        class="ml-5 w-60"
        id="btn"
        >Register</b-button
      >
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
  url,
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        profileImage: "",
        submitError: undefined,
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false,
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha,
      },
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      country: {
        required,
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        vaildCharacter: function (password) {
          const CheckContainDigit = /[0-9]/.test(password);
          const CheckContainSpecialChar = /[#?!@$%^&*()_-]/.test(password);
          const result = CheckContainDigit && CheckContainSpecialChar;
          return result;
        },
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
      profileImage: {
        required,
        url,
      },
      email: {
        required,
        email,
      },
    },
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/Register",
          {
            username: this.form.username,
            firstname: this.form.firstName,
            lastname: this.form.lastName,
            country: this.form.country,
            password: this.form.password,
            email: this.form.email,
            image: this.form.profileImage,
          }
        );
        this.$router.push("/login");
        console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data;
        console.log(this.form.submitError);
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        porfileImage: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Anton&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Anton&family=Lobster&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Anton&family=Lobster&family=Righteous&display=swap");
.container {
  max-width: 500px;
  background-color: rgba(107, 170, 118, 0.767);
  border-radius: 25px;
}

.title-rgs {
  font-family: "Anton", sans-serif;
  text-align: center;
  color: rgb(6, 97, 13);
  text-shadow: 4px 4px 4px #92eb8f;
}

.rg-cont {
  font-family: "Righteous", cursive;
}

#btn {
  font-size: 30px;
  font-family: "Lobster", cursive;
  letter-spacing: 3px;
  background-color: rgb(35, 197, 116);
  border: 5px solid rgb(6, 97, 13);
}
</style>
