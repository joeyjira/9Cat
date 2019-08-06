const PLAYER_STAT = "http://data.nba.net/10s/prod/v1/2018/players/203500_profile.json"

function Main() {
  this.TAG = "MAIN"
}

Main.prototype.start = function() {
  this.listPlayers();
}

Main.prototype.listPlayers = function() {
  console.log("Curry")
}

new Main().start()
