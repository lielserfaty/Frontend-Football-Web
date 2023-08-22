import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main

  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
  path: "/gameSeason",
  name: "gameSeason",
  component: () => import("./pages/gameSeason")
},
{
  path: "/association",
  name: "association",
  component: () => import("./pages/associationPage")
},

{
  path: "/about",
  name: "about",
  component: () => import("./pages/About")
},
{
  path: "/FavoriteGames",
  name: "FavoriteGames",
  component: () => import("./pages/FavoriteGames")
},
{
  path: "/favoriteTeam",
  name: "favoriteTeam",
  component: () => import("./pages/favoriteTeam")
},
{
  path: "/favoritePlayers",
  name: "favoritePlayers",
  component: () => import("./pages/favoritePlayers")
},

{
  path: "/assocition/updateScore/:gameID",
  name: "scoreGame",
  component: () => import("./pages/scoreGamePage")
},
{
  path: "/assocition/addGamePage",
  name: "addGame",
  component: () => import("./pages/addGamePage")
},

{
  path: "/assocition/updateEvent/:gameID/:date",
  name: "eventUpdate",
  component: () => import("./pages/eventGamePage")
},

{
  path: "/peronalPage/playerPersonalPage/:playerID",
  name: "playerPersonalPage",
  component: () => import("./pages/personalPagePlayer")
},

{
  path: "/peronalPage/TeamPersonalPage/:teamID",
  name: "TeamPersonalPage",
  component: () => import("./pages/personalPageTeam")
},

{
  path: "/404",
  component: NotFound
},
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
