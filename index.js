module.exports = function ServerTagsInScoreboard(dispatch) {	
       
    const servers = {
        // NA
        4004: '[TR] ',
        4009: '[CH] ',
        4012: '[MT] ',
        4024: '[AV] ',
        4032: '[FF] ' 
    }

    let inBg = false,
    players = [];
    
    dispatch.hook('S_LOAD_TOPO', 3, event => {
        inBg = [116, 112].includes(event.zone) ? true : false;
        if (!inBg) players = [];
    })
    
    // fraywind
    dispatch.hook('S_STRONGHOLD_OCCUPATION_BATTLE_FIELD_BOARD', 1, event => {
        //console.log(' S_STRONGHOLD_OCCUPATION_BATTLE_FIELD_BOARD \n ' + JSON.stringify(event, null, 2));
        for (let i = 0; i < event.players.length; i++) {
            for (let k = 0; k < players.length; k++) {
                if (event.players[i].name === players[k].name) {
                    event.players[i].name = servers[players[k].serverId] + event.players[i].name;
                }
            }
        }    
        return true;
    })    
    
    // corsair
    dispatch.hook('S_CANNON_BATTLE_FIELD_BOARD', 1, event => {
        //console.log(' S_CANNON_BATTLE_FIELD_BOARD \n ' + JSON.stringify(event, null, 2));
        for (let i = 0; i < event.players.length; i++) {
            for (let k = 0; k < players.length; k++) {
                if (event.players[i].name === players[k].name) {
                    event.players[i].name = servers[players[k].serverId] + event.players[i].name;
                }
            }
        }    
        return true;
    })
    
    dispatch.hook('S_SPAWN_USER', 13, { order: -10 }, event => {
        if (!inBg) return;
        
        for (let k = 0; k < players.length; k++) {
            if (event.name === players[k].name) {
                return;
            }
        }
        
        players.push({name: event.name, serverId: event.serverId});
    })    
}
