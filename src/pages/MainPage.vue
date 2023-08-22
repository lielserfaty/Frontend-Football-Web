<template>
  <div class="container">
    <table>
      <td class="league-info" ><LeagueInfo ></LeagueInfo></td>
      <td class="space"> </td>
      <td class="login" ><LoginPage v-if="!$root.store.username" class="login-box" > </LoginPage>
      <p v-else>
       <favoriteGameHome> </favoriteGameHome>
      </p></td>
    </table>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import favoriteGameHome from "../components/favoriteGameHome";
import LoginPage from "../pages/LoginPage";

export default {
  name: "homePage",
  components: {
    LeagueInfo,
    LoginPage,
    favoriteGameHome,
  },
  
};
</script>


<style lang="scss" scoped>
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
.container {
  margin-top: 50px;
}
.login {
  width: 350px;
}
.login-box {
  width: 350px;
  background-color: rgba(212, 201, 201, 0.767);
}
.space {
  width: 1000px;
}
.league-info {
  width: 800px;
}


</style>
