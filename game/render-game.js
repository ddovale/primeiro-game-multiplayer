export default function renderGame(game, gameCanvas, scoreBoard, currentPlayer) {

    const screen = gameCanvas.getContext('2d');
    const state = game.state;
    renderGameScreen();  

    function renderGameScreen() {
        screen.globalAlpha = 1;
        screen.fillStyle = 'white';
        screen.fillRect(0, 0, state.screenWidth, state.screenHeight);
    
        //Render Players
        for (let playerId in state.players) {
            let player = state.players[playerId];
            screen.fillStyle = player.name == currentPlayer.name ? '#fbc02d' : '#002f6c';
            screen.globalAlpha = 0.8;
            screen.fillRect(player.x, player.y, state.objectWidth, state.objectHeight);
    
            screen.globalAlpha = 1;
            screen.textAlign = 'center';
            screen.fillText(player.name, (player.x + state.objectWidth / 2), (player.y + state.objectHeight + state.objectHeight / 2));
        }
    
        //Render Goals
        for (let goalId in state.goals) {
            let goal = state.goals[goalId];
            screen.fillStyle = '#4caf50';
            screen.globalAlpha = 1;
            screen.fillRect(goal.x, goal.y, state.objectWidth, state.objectHeight);
        }
    
        renderScoreBoard();
        requestAnimationFrame(renderGameScreen);
    }

    function renderScoreBoard() {

        const maxResults = 10;
        let scoreTableInnerHtml = `
            <tr class="header">
                <td></td>
                <td>Top ${maxResults} Jogadores</td>
                <td align="right">Pontos</td>
            </tr>
        `;

        let gamePlayers = [];

        state.players.forEach((player) => {
            gamePlayers.push(player);
        })

        let playersByScore = gamePlayers.sort((a,b) => { return b.score - a.score });
        let top10Players = playersByScore.slice(0, maxResults);

        top10Players.forEach((player, index) => {
            scoreTableInnerHtml += `
                <tr class="${ player.name === currentPlayer.name ? 'current-player' : ''}">
                    <td class="rank">${index+1}º</td>
                    <td class="player">${player.name}</td>
                    <td class="score">${player.score}</td>
                </tr>
            `;
        })

        if(currentPlayer.name && top10Players.indexOf(currentPlayer) == -1) {
            state.players[state.players.indexOf(currentPlayer)]
            scoreTableInnerHtml += `
                <tr>
                    <td colspan="3" class="text-center">...</td>
                </tr>
                <tr class="current-player bottom">
                    <td class="rank">${playersByScore.indexOf(currentPlayer)+1}º</td>
                    <td class="player">${playersByScore[playersByScore.indexOf(currentPlayer)].name}</td>
                    <td class="score">${playersByScore[playersByScore.indexOf(currentPlayer)].score}</td>
                </tr>
            `;
        }

        scoreTableInnerHtml += `
            <tr class="footer">
                <td colspan="2">Total de jogadores</td>
                <td align="right">${state.players.length}</td>
            </tr>
        `;

        scoreBoard.innerHTML = scoreTableInnerHtml;
    }

}