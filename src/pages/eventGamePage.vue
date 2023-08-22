<template>
  <table class="tbl-evt">
    <tr>
      <td>
        <div class="container-evgm">
          <h1 class="title-evgm">Event Game</h1>
          <b-form
            @submit.prevent="onLogin"
            @reset.prevent="onReset"
            class="rg-cont"
          >
            <b-form-group
              id="input-group-date"
              label-cols-sm="3"
              v-model="$v.form.date.$model"
              label="Date :"
              label-for="date"
            >
              {{ form.date }}
            </b-form-group>

            <b-form-group
              id="input-group-time"
              label-cols-sm="3"
              label="Time event:"
              label-for="time"
            >
              <b-form-input
                id="time"
                type="time"
                v-model="$v.form.time.$model"
                :state="validateState('time')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.time.required">
                Time is required
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-minutes"
              label-cols-sm="3"
              label="minutes event:"
              label-for="minutes"
            >
              <b-form-input
                id="minutes"
                v-model="$v.form.minutes.$model"
                :state="validateState('minutes')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.minutes.between">
                Score must be a number
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="!$v.form.minutes.required">
                Minutes score is required
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-description"
              label-cols-sm="3"
              label="description event:"
              label-for="description"
            >
              <b-form-input
                id="description"
                v-model="$v.form.description.$model"
                :state="validateState('description')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.description.required">
                Description is required
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-type"
              label-cols-sm="3"
              label="Type:"
              label-for="type"
            >
              <b-form-select
                id="type"
                v-model="$v.form.typeSelect.$model"
                :options="types"
                :state="validateState('typeSelect')"
              ></b-form-select>
              <b-form-invalid-feedback>
                type is required
              </b-form-invalid-feedback>
            </b-form-group>

            <b-button
              type="reset"
              variant="danger"
              style="width: 100px; display: block"
              class="mx-auto w-100"
              >Reset</b-button
            >
            <br />
            <b-button
              type="submit"
              variant="primary"
              style="width: 100px; display: block"
              class="mx-auto w-100"
              >Add Event</b-button
            >

            <br />
            <b-button
              variant="success"
              v-on:click="addEvents"
              style="width: 100px; display: block"
              class="mx-auto w-100"
              >Finish to add event</b-button
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
            Add event failed: {{ form.submitError }}
          </b-alert>
        </div>
      </td>

      <td>
        <div class="ext-evt">
          The existing events for this game
          <eventListPreview :arrayEvent="eventArrayExsist"> </eventListPreview>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import eventListPreview from "../components/eventListPreview.vue";

import { required, between } from "vuelidate/lib/validators";

export default {
  name: "eventGame",
  components: { eventListPreview },

  data() {
    return {
      form: {
        submitError: undefined,
        date: this.$route.params.date,
        time: " ",
        minutes: " ",
        description: " ",
        typeSelect: " ",
      },

      types: [
        { value: null, text: "Pleas select type of event" },
        { value: "Goal", text: "Goal" },
        { value: "Offense", text: "Offense" },
        { value: "RedCard", text: "RedCard" },
        { value: "Offside", text: "Offside" },
        { value: "YellowCard", text: "YellowCard" },
        { value: "Injury", text: "Injury" },
        { value: "Subsitution", text: "Subsitution" },
      ],

      eventArray: [],
      eventArrayExsist: [],
    };
  },
  validations: {
    form: {
      date: {
        required,
      },
      time: {
        required,
      },
      minutes: {
        required,
        between: between(0, 120),
      },
      typeSelect: {
        required,
      },
      description: {
        required,
      },
    },
  },
  mounted() {
    this.form.date = this.$route.params.date;
    this.eventArrayExsist.push(...this.$route.params.events);

    this.eventArray = [];
    this.types = [
      { value: null, text: "Pleas select type of event", disabled: true },
      { value: "Goal", text: "Goal" },
      { value: "Offense", text: "Offense" },
      { value: "RedCard", text: "RedCard" },
      { value: "Offside", text: "Offside" },
      { value: "YellowCard", text: "YellowCard" },
      { value: "Injury", text: "Injury" },
      { value: "Subsitution", text: "Subsitution" },
    ];
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },

    async addEvents() {
      try {
        if(this.eventArrayExsist.length<3 )
        {
            await this.$root.toast("update", "You need at least 3 event to this game", "danger");


        }
        else{
        let response=" "
        this.axios.defaults.withCredentials = true;
         response = await this.axios.post(
          "http://localhost:3000/association/addEvent",
          {
            
           gameID :this.$route.params.gameID,
           events: this.eventArray

          }
        );
        this.axios.defaults.withCredentials = false;
        console.log(response)
         if(response.status==200)
        
          {
            await this.$root.toast("update", "Event game update successfully", "success");

           this.$router.push('/association')
           this.eventArrayExsist=[]



          }
        }
      } catch (err) {
        console.log(err.response);
        this.eventArray=[] 
        this.eventArrayExsist=[]
        this.eventArrayExsist.push(...this.$route.params.events)
        this.form.submitError = err.response.data;
      }
    },
    GoPage() {
      this.$router.push("/association");
    },
    add() {
      let eventNew = {
        date: " ",
        time: "",
        minutes: " ",
        description: " ",
        event: " ",
      };
      let eventExist = {
        date: " ",
        time: "",
        minutes: " ",
        description: " ",
        eventType: " ",
      };

      eventNew.date = this.form.date;
      eventNew.time = this.form.time + ":00";
      eventNew.minutes = this.form.minutes;
      eventNew.description = this.form.description;
      eventNew.event = this.form.typeSelect;
      this.eventArray.push(eventNew);

      eventExist.date = this.form.date;
      eventExist.time = this.form.time + ":00";
      eventExist.minutes = this.form.minutes;
      eventExist.description = this.form.description;
      eventExist.eventType = this.form.typeSelect;
      this.eventArrayExsist.push(eventExist);

      this.onReset();
      this.$nextTick(() => {
        this.$v.$reset();
        this.show = true;
      });

      console.log(this.eventArray);
    },
    onLogin() {
      this.form.submitError = undefined;

      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.add();
    },
    onReset() {
      this.form = {
        date: this.$route.params.date,
        time: "",
        minutes: "",
        typeSelect: null,
        description: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
        this.show = true;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Anton&family=Lobster&family=Righteous&display=swap");
.container-evgm {
  max-width: 450px;
  background-color: rgba(107, 170, 118, 0.767);
  margin-left: auto;
  margin-right: auto;
  font-family: "Righteous", cursive;
}
.title-evgm {
  font-family: "Anton", sans-serif;
  text-align: center;
  color: rgb(6, 97, 13);
  text-shadow: 4px 4px 4px #92eb8f;
}

.ext-evt {
  background-color: rgb(100, 196, 75);
  border-radius: 25px;
  width: 150px;
}
.tbl-evt {
  margin-left: auto;
  margin-right: auto;
  font-family: "Righteous", cursive;
}
</style>
