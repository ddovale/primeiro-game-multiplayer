/*export default*/ function createGame() {

    let screenWidth = 500;
    let screenHeight = 500;
    let objectSizeFactor = 0.05;

    const state = {
        screenWidth: screenWidth,
        screenHeight: screenHeight,
        objectWidth: screenWidth * objectSizeFactor,
        objectHeight: screenHeight * objectSizeFactor,                    
        players: {},
        goals: {}
    }

    setTimeout(() => {
        insertGoal();
        insertPlayer('RV1', 'Petrucio');
        insertPlayer('RV2', 'Petrucio');
        insertPlayer('RV3', 'Petrucio');
        insertPlayer('RV4', 'Petrucio');
        insertPlayer('RV5', 'Petrucio');
        insertPlayer('RV6', 'Petrucio');
        insertPlayer('RV7', 'Petrucio');
        insertPlayer('RV8', 'Petrucio');
        insertPlayer('RV9', 'Petrucio');
        insertPlayer('RV10', 'Petrucio');
    }, 5000);

    function joinGame(id, name) {
        insertPlayer(id, name);
    }

    function insertPlayer(id, name) {
        let x = Math.floor((Math.random() * state.screenWidth) / state.objectWidth) * state.objectWidth; //Considers object width
        let y = Math.floor((Math.random() * state.screenHeight) / state.objectHeight) * state.objectHeight; //Considers object height
        let newPlayer = createPlayer(id, name, x, y);

        state.players[id] = newPlayer;
    }

    function insertGoal() {
        let x = Math.floor((Math.random() * state.screenWidth) / state.objectWidth) * state.objectWidth; //Considers object width
        let y = Math.floor((Math.random() * state.screenHeight) / state.objectHeight) * state.objectHeight; //Considers object height
        let newGoal = createGoal(x, y);

        state.goals[Math.random()] = newGoal;
    }

    function movePlayer(playerId, direction) {

        let player = state.players[playerId];
        if (!player) return;
        
        let hasMoved = false;
        switch (direction) {
            case 'ArrowUp':
                if(player.y - state.objectHeight >= 0) {
                    player.y -= state.objectHeight;
                    hasMoved = true;
                }

                break;
            case 'ArrowRight':
                if(player.x + state.objectWidth < state.screenWidth) {
                    player.x += state.objectWidth;
                    hasMoved = true;
                }

                break;
            case 'ArrowDown':
                if(player.y + state.objectHeight < state.screenHeight) {
                    player.y += state.objectHeight;
                    hasMoved = true;
                }

                break;
            case 'ArrowLeft':
                if(player.x - state.objectWidth >= 0) {
                    player.x -= state.objectWidth;
                    hasMoved = true;
                }

                break;
        }
        
        if(hasMoved)
            handleGoalCollision(player);
    }

    function handleGoalCollision(player) {
        for(let goalId in state.goals) {
            
            let goal = state.goals[goalId];
            if(player.x == goal.x && player.y == goal.y) {
                delete state.goals[goalId];
                raisePlayerScore(player);
            }
        }
    }

    function raisePlayerScore(player) {
        state.players[player.id].score++;
    }

    function createPlayer(id, name, x, y) {
        return {
            id: id,
            name: name,
            x: x,
            y: y,
            score: 0
        }
    }

    function createGoal(x, y) {
        return {
            x: x,
            y: y
        }
    }

    return {
        state,
        joinGame,
        movePlayer
    }
}