export default function createGame() {

    let screenWidth = 500;
    let screenHeight = 500;
    let objectSizeFactor = 0.05;

    const state = {
        screenWidth: screenWidth,
        screenHeight: screenHeight,
        objectWidth: screenWidth * objectSizeFactor,
        objectHeight: screenHeight * objectSizeFactor,                    
        players: [],
        goals: []
    }

    function joinGame(name) {
        return insertPlayer(name);
    }

    function insertPlayer(name) {
        let x = Math.floor((Math.random() * state.screenWidth) / state.objectWidth) * state.objectWidth; //Considers object width
        let y = Math.floor((Math.random() * state.screenHeight) / state.objectHeight) * state.objectHeight; //Considers object height
        let newPlayer = createPlayer(name, x, y);

        state.players.push(newPlayer);
        return newPlayer;
    }

    function insertGoal() {
        let x = Math.floor((Math.random() * state.screenWidth) / state.objectWidth) * state.objectWidth; //Considers object width
        let y = Math.floor((Math.random() * state.screenHeight) / state.objectHeight) * state.objectHeight; //Considers object height
        let newGoal = createGoal(x, y);

        state.goals.push(newGoal);
    }

    function movePlayer(direction) {
        
        let hasMoved = false;
        switch (direction) {
            case 'ArrowUp':
                if(currentPlayer.y - state.objectHeight >= 0) {
                    currentPlayer.y -= state.objectHeight;
                    hasMoved = true;
                }

                break;
            case 'ArrowRight':
                if(currentPlayer.x + state.objectWidth < state.screenWidth) {
                    currentPlayer.x += state.objectWidth;
                    hasMoved = true;
                }

                break;
            case 'ArrowDown':
                if(currentPlayer.y + state.objectHeight < state.screenHeight) {
                    currentPlayer.y += state.objectHeight;
                    hasMoved = true;
                }

                break;
            case 'ArrowLeft':
                if(currentPlayer.x - state.objectWidth >= 0) {
                    currentPlayer.x -= state.objectWidth;
                    hasMoved = true;
                }

                break;
        }
        
        if(hasMoved)
            handleGoalCollision(currentPlayer);
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
        state.players[state.players.indexOf(player)].score++;
    }

    function createPlayer(name, x, y) {
        return {
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