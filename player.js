    //look up player id
const db = require("./db");
var player = {};
async function GetPlayerId(playerName){
    if (playerName === null) {
        console.log("null player name");
        return -1;
    }
    try {
        let getplayerid = await db.query(
        `SELECT id FROM players WHERE username = $1`, [playerName]);
        //console.log("past db ") 
        //console.log(getplayerid)
        if (getplayerid.rows.length > 0) {
            player_ID = getplayerid.rows[0].id;
            console.log(getplayerid);
        } else {
            player_ID = -1;
        }
        //console.log(player_ID);
        return player_ID;
        
    }
    catch (err) {
        console.log("player_ID getting it", err)
    }
}

async function createNewPlayer(playerName) {
    if (playerName === null) {
        console.log("null player name");
        return -1;
        
    }
    console.log("begin");
    
    try{
        let newPlayer = await db.query(
            `INSERT INTO players (username) VALUES ($1)`, [playerName]);
            console.log(newPlayer);

        let idFromName = await db.query(
            `SELECT id FROM players WHERE username = $1`, [playerName]);
        return idFromName.rows[0].id;
    }
    catch (err) {
        console.log("your newplayer rows dont work", err);
    }
    //console.log("after");
    //let newScore = await db.query(
    //`INSERT INTO score (players_id, score, gamemode) VALUES ($1, '', '')`, [player_ID]);
    
}

player.GetPlayerId = GetPlayerId; 
player.createNewPlayer = createNewPlayer; 
module.exports=player;


    
    