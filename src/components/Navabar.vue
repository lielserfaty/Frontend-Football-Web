<template>
  <div id="nevebar">
    <b-navbar toggleable="lg" type="dark" variant="info" sticky >
      <b-navbar-brand :to="{ name: 'main' }">
        <img
          src="../../img/icon.png"
          class="d-inline-block align-top"
          alt="Kitten"
          width="50px"
          height="50px"
      /></b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'main' }" class="nav-item">Main</b-nav-item>

          <b-nav-item :to="{ name: 'gameSeason' }" class="nav-item"
            >Game</b-nav-item
          >

          <b-nav-item :to="{ name: 'about' }" class="nav-item"
            >About
          </b-nav-item>

          <b-nav-item :to="{ name: 'search' }" class="nav-item"
            >Search</b-nav-item
          >
          <b-nav-item
            v-if="$root.store.username == 'AviLevy'"
            :to="{ name: 'association' }"
            class="nav-item"
            >Game Mangmaent</b-nav-item
          >
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-item :to="{ name: 'login' }" class="nav-item"
            >Login</b-nav-item
          >
          <b-nav-item :to="{ name: 'register' }" class="nav-item"
            >Register</b-nav-item
          >
          <b-nav-item :to="{ name: 'login' }" class="nav-item">
            Hello Guest</b-nav-item
          >
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown right style="float: right">
            <template #button-content>
              <pi>
                {{ $root.store.username }}
              </pi>
            </template>
            <b-dropdown-item
              class="b-dropdown-item"
              type="button"
              v-on:click="Logout"
              >Sign Out
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right style="float: right">
            <template #button-content>
              <pi
                ><img
                  src="../../img/favorite_icon.png"
                  width="30px"
                  height="30px"
              /></pi>
            </template>
            <b-dropdown-item :to="{ name: 'FavoriteGames' }"
              >Games</b-dropdown-item
            >

            <b-dropdown-item :to="{ name: 'favoriteTeam' }"
              >Teams</b-dropdown-item
            >

            <b-dropdown-item :to="{ name: 'favoritePlayers' }"
              >Players
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "nevebar",

  methods: {
    async Logout() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = this.axios.post("http://localhost:3000/logout");

        this.axios.defaults.withCredentials = false;
        this.$root.store.setResultPlayers([]);
        this.$root.store.setResultTeam([]);
        this.$root.store.setquery("");
        this.$root.store.logout();
        this.$root.toast("Logout", "User logged out successfully", "success");

        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      } catch (err) {
        console.log("jjjj");
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
@import url("https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap");

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffffff;
  min-height: 100vh;
}

#nevebar {
  padding: 30px;
  position: sticky;

}

#nav a {
  font-weight: bold;
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: #f5f5f5;
}

.nav-item {
  font-size: 24px;
  font-family: "Do Hyeon", sans-serif;
}
</style>