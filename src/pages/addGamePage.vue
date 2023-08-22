<template> 
  <div class="container-addgm">
    <h1 class="title-addgm">Add New Game</h1>
    <b-form @submit.prevent="onLogin" class="cont-addgm">
      <!-- date -->
      <b-form-group
        id="input-group-date"
        label-cols-sm="3" 
        label="Date game:"
        label-for="date">
        <b-form-input
          id="date"
          type= "date"
          style="width:200px;"
          v-model="$v.form.date.$model"
          :state="validateState('date')">
        </b-form-input>
        {{$v.form.date.$model}}
        <b-form-invalid-feedback v-if="!$v.form.date.required">
          Date of game is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.date.vaildDate">
          <li>Date must be in the future</li>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- time -->
      <b-form-group
      id="input-group-time"
      label-cols-sm="3"
      label="Time:"
      label-for="time">
        <b-form-input
          id="time"
          type="time"
          style="width:200px;"
          v-model="$v.form.time.$model"
          :state="validateState('time')">
        </b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.time.required">
          Time is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- home team -->
      <b-form-group
      id="input-group-homeTeam"
      label-cols-sm="3"
      label="Home team id:"
      label-for="homeTeam" >
        <b-form-input
          id="homeTeam"
          style="width:200px;"
          v-model="$v.form.homeTeam.$model"
          :state="validateState('homeTeam')">
        </b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.homeTeam.required">
          Home team is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="$v.form.homeTeam.required && !$v.form.homeTeam.vaildNumber ">
          Home team  must to be a number 
        </b-form-invalid-feedback> 
        <b-form-invalid-feedback v-if="$v.form.awayTeam.required && $v.form.homeTeam.required && !$v.form.homeTeam.vaildGroup">
          Away team must to be diffrent from home team 
        </b-form-invalid-feedback>
      </b-form-group>   

      <!-- away team -->
      <b-form-group
      id="input-group-awayTeam"
      label-cols-sm="3"
      label="Away team id:"
      label-for="type">
        <b-form-input
          id="awayTeam"
          style="width:200px;"
          v-model="$v.form.awayTeam.$model"
          :state="validateState('awayTeam')">
        </b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.awayTeam.required">
          Away team is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="$v.form.awayTeam.required && !$v.form.awayTeam.vaildNumber ">
          Away team must to be a number 
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="$v.form.awayTeam.required && $v.form.homeTeam.required && !$v.form.awayTeam.vaildGroup">
          Away team must to be diffrent from home team 
        </b-form-invalid-feedback>
      </b-form-group>   

    <!-- field -->
     <b-form-group
        id="input-group-field"
        label-cols-sm="3"
        label="Field:"
        label-for="type">
        <b-form-input
          id="field"
          style="width:200px;"
          v-model="$v.form.field.$model"
          :state="validateState('field')">
        </b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.field.required">
         Field is required
        </b-form-invalid-feedback>
      </b-form-group>   
   
      <!-- referee -->
      <b-form-group
        id="input-group-refree"
        label-cols-sm="3"
        label="Refree:"
        label-for="type">
        <b-form-select
          id="refree"
          v-model="$v.form.referee.$model"
          :options="refreeList"
          value-field="refreeId"
          text-field="name"
          style="width:200px;"
          :state="validateState('referee')">
        </b-form-select>
        <b-form-invalid-feedback>
          refree is required
        </b-form-invalid-feedback>
      </b-form-group>
 
      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100">
        Add Game
      </b-button>
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
      show>
      Add game failed: {{ form.submitError }}
    </b-alert>
  </div>

</template>

<script>
import {
  required,
   
} from "vuelidate/lib/validators";


export default {
  name: "addGame",
  
  data() {
    return {
      form: {
        submitError: undefined,
        date:" ",
        time:" ",
        homeTeam:" ",
        awayTeam:" ",
        field:" ",
        referee:" "       
      },
      refreeList:[]
    };
  },
  validations: {
    form: {
      date: {
        required, 
         vaildDate: function(date) {
          var today = new Date()
          date = date.split("-");
          let idate = new Date(date[0], date[1] - 1, date[2])
          if(today.getFullYear()==idate.getFullYear() &&  today.getMonth()==idate.getMonth() && today.getDate()==idate.getDate() )
            return true
          return (today - idate) < 0;
          }
        },
      time: {
        required,
      },
      homeTeam: {
        required,
        vaildNumber: function(away) {
      
          if (parseInt(away)) 
            return true
          else 
            return false
        },
        vaildGroup: function(home) {
            if (home==this.form.awayTeam) 
              return false
            else 
              return true
        }
      },
      awayTeam: {
        required,
        vaildNumber: function(away) {
      
            if (parseInt(away)) 
              return true
            else 
              return false
          },
        vaildGroup: function(away) {
            if (away==this.form.homeTeam) 
              return false
            else 
              return true
          }
      },
      field: {
        required,
      },
      referee: {
        required,
      }
    }
  },
   mounted(){
       this.allRefree();
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },

    async addGame() {
      try {
                  
        let response=" "
        this.axios.defaults.withCredentials = true;
        this.time=this.time+":00"
         response = await this.axios.post(
          "http://localhost:3000/association/addGame",
          {
            
           date: this.form.date,
           time: this.form.time ,
           home_team: this.form.homeTeam,
           away_team: this.form.awayTeam,
           field: this.form.field,
           refreeID: this.form.referee

          }
        );
        this.axios.defaults.withCredentials = false;
        console.log(response)
         if(response.status==201)
        
          {
            await this.$root.toast("update", "Add game successfully", "success");

           this.$router.push('/association')

          }
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data;
               

      }
    },
    GoPage(){

          this.$router.push('/association')


    },
   async allRefree()
   {
     let response=[]
     this.axios.defaults.withCredentials = true;
     try{
      response = await this.axios.get(
          "http://localhost:3000/association/allReferre");
     
      this.axios.defaults.withCredentials = false;

      this.refreeList=response.data;
     }
      catch{
               this.$router.push('/404') 

      }

   },
    
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.addGame();
    }
  }
};
</script>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Lobster&family=Righteous&display=swap');
.container-addgm {
  max-width: 400px;
  background-color: rgba(107, 170, 118, 0.767);
  margin-left: auto;
  margin-right: auto;
}
.title-addgm{
  font-family: 'Anton', sans-serif;
  text-align: center;
  color:rgb(6, 97, 13);
  text-shadow: 4px 4px 4px #92eb8f
}
.cont-addgm{
  font-family: 'Righteous', cursive;
}
</style>
