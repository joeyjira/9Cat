const http = require('http')
const fs = require('fs')

function Utility() {
  this.players = require("./players.json")
  this.stats = {
    players: []
  }
  this.counter = 0
}

Utility.prototype.grabPlayers = function() {
  let playerList = this.players.league.standard
  let playerStats = []

  for (let i = 0; i < this.players.league.standard.length; i++) {
    let player = playerList[i]
    // console.log(i + ": " + player.firstName + " " + player.lastName + "\n")
    this.grabPlayerStats(player.personId).then((json)=>{
      console.log(json)
    })
  }
}

Utility.prototype.grabPlayerStats = function(personId) {
  let promise = new Promise(function(resolve, reject) {
    http.get(`http://data.nba.net/10s/prod/v1/2018/players/${personId}_profile.json`, (resp) => {
      let data = ''

      // Receive chunks of data
      resp.on('data', (chunk) => {
        data += chunk
      })

      resp.on('end', () => {
        // .league.standard.stats.regularSeason.season[0].total
        let json = JSON.parse(data)
        resolve(json)
      })
    }).on("error", (err) => {
      console.log("Error: " + err.message);
      reject(err)
    })
  })

  return promise
}

Utility.prototype.showPlayers = function() {
  console.log(this.players.league.standard.length)
}

new Utility().grabPlayers()

// Get "ppg: points per game", "rpg: rebounds per game", "apg: assists per game",
//     "fgp: field goal percentage", "ftp: free throw percentage", "tpm/gamesPlayed = 3 points made per game"
//     "spg: steals per game", "bpg: blocks per game", "topg: turnover per game"


//
// let jsonString = JSON.stringify(json)
// fs.writeFileSync('stats.json', jsonString)
