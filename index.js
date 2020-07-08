
const axios = require("axios");
const express = require("express");

const app = express();
console.log("before")
const db = require("./db");
console.log("after");
const player = require("./player");

const cors = require("cors");

app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get("/leaderboard", async function(request, response) {

  try {
    let results = await db.query(
      `SELECT players.username, score.score FROM players INNER JOIN score ON players.id=score.players_id;`);
      return response.json(results.rows);
  }
  catch(err) {
    console.log(err)
  }
});  
 

app.post("/leaderboard", async function(request, response) {

  try {
    let gameHighscore = parseInt(request.body.score);
    //look up player id
    //check if player name = null and player id = null. if both are null => deny req
    var playerName = request.body.playerName;
    var player_ID = request.body.playerID;//players_id;

    if(!playerName && !player_ID) {
      response.sendStatus(400);
    }
    
    if (!player_ID) {
      //console.log("looking up player_ID from playerName");
      player_ID = await player.GetPlayerId(playerName);
      console.log(player_ID);
      
      if (player_ID == -1) {
        //console.log("creating new player");
        player_ID = await player.createNewPlayer(playerName);
        let insertScore = await db.query(`INSERT INTO score (players_id, score, gamemode) VALUES ($1, $2, null)`, [player_ID, gameHighscore]);
      }
    }
    // get current score of players from db
    //console.log(player_ID);
    let results = await db.query(
      `SELECT players.username, score.score FROM players INNER JOIN score ON players.id=score.players_id WHERE players.id = $1;`, [parseInt(player_ID)]);
    let dbscore = results.rows[0].score;
    console.log("db ID", dbscore);
    
    console.log("game highscore", gameHighscore);
    if(gameHighscore > dbscore) {
      let updatesSQL = await db.query(
        `UPDATE score SET score = $1 WHERE players_id = $2;`, [gameHighscore, player_ID]);
      return response.json({highscore: true, message: "highscore was successfully updated :D"});
    }else {
      return response.json({highscore: dbscore, success: false, message: "**data base score is the same or higher than game score**"});
    }

    console.log("done");
    // compare to see which score is greater
    
    // // if the score is greater from game, replace it
    // // if its not, do nothing --
    
  }
  catch(err) {
    console.log(err)
  }
});


app.listen(process.env.PORT || 3001, function() {
    console.log("App on port 3001");
  });

console.log("after after");
