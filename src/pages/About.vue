<template>
  <div class="aboutt">
    <div class="about-section">
      <h1>About Us</h1>
      <p class="abt-con">The site includes information on games, players and teams in the Superliga.</p>
      <p class="abt-con">Also, the Football Association representative can manage the league and add games, referees, results and events to the games.</p>
    </div>

    <h2 style="text-align:center"><strong><u>Our Team</u></strong></h2>
    <div class="row">
      <div class="column">
        <div class="card">
          <img src="../../img/liel.jpg" alt="liel" style="width:100%">
          <div class="container">
            <h2>Liel Serfaty</h2>
            <p class="title">ID - 312350622</p>
            <p>Third year student in the Department of Information Systems Engineering at Ben Gurion.</p>
            <p>Previous submissions: <br/> <a href="https://web-development-environments-2021.github.io/312350622/">Assignment-1</a><br/>
            <a href="https://web-development-environments-2021.github.io/assignment2_312350622_207783150/">Assignment-2</a></p>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <img src="../../img/efrat.png" alt="efrat" style="width:80%">
          <div class="container">
            <h2>Efrat Cohen</h2>
            <p class="title">ID - 207783150</p>
            <p>Third year student in the Department of Information Systems Engineering at Ben Gurion.</p>
            <p>Previous submissions: <br/> <a href="https://web-development-environments-2021.github.io/207783150/">Assignment-1</a><br/>
            <a href="https://web-development-environments-2021.github.io/assignment2_312350622_207783150/">Assignment-2</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Indie+Flower&display=swap');
.aboutt {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.column {
  width: 30%;
  height: 20%;
  margin-bottom: 16px;
  padding: 0 8px;
  margin-left: auto;
  margin-right: auto;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}

.about-section {
  padding: 50px;
  text-align: center;
  background-color: #474e5d;
  color: white;
  font-family: 'Indie Flower', cursive;
}

.container {
  padding: 0 16px;
}

.container::after, .row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}
.abt-con{
  font-size: 30px;
}
.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #555;
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}
</style>