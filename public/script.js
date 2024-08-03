// document.getElementById('progressButton').addEventListener('click', function () {
//     if (typeof unityInstance !== 'undefined' && unityInstance !== null) {
//         unityInstance.SendMessage('GameController', 'GetProgress');
//     } else {
//         console.error('Unity instance is not defined or not yet initialized');
//     }
// });

document.getElementById('end-turn-button').addEventListener('click', function () {
    if (typeof unityInstance !== 'undefined' && unityInstance !== null) {
        unityInstance.SendMessage('GameState', 'EndTurn');
    } else {
        console.error('Unity instance is not defined or not yet initialized');
    }
});

document.getElementById('start-game-button').addEventListener('click', function () {
    if (typeof unityInstance !== 'undefined' && unityInstance !== null) {
        unityInstance.SendMessage('GameState', 'StartGame');
    } else {
        console.error('Unity instance is not defined or not yet initialized');
    }
});


function ReceiveCharactersData(playerData, opponentData) {
    const playerCharacters = JSON.parse(playerData).characters;
    const opponentCharacters = JSON.parse(opponentData).characters;

    const tableBody = document.querySelector("#playerTable tbody");
    tableBody.innerHTML = ''; // Clear any existing rows

    playerCharacters.forEach((character, index) => {
        const row = tableBody.insertRow();
        const playerCell = row.insertCell(0);
        const opponentCell = row.insertCell(1);

        playerCell.innerHTML = `
                <div>Персонаж: ${character.Name}</div>
                <div>HP: ${character.Health + "/" + character.MaxHealth}</div>
                <div>ATK: ${character.Attack}</div>
                <div>DEF: ${character.Defense}</div>
                <div>MAG: ${character.MagicAttack}</div>
                <div>SPD: ${character.Speed}</div>
                <div>Эффекты: ${character.Statuses}</div>
        `;

        if (opponentCharacters[index]) {
            const opponent = opponentCharacters[index];
            opponentCell.innerHTML = `
                <div>Персонаж: ${opponent.Name}</div>
                <div>HP: ${opponent.Health + "/" + opponent.MaxHealth}</div>
                <div>ATK: ${opponent.Attack}</div>
                <div>DEF: ${opponent.Defense}</div>
                <div>MAG: ${opponent.MagicAttack}</div>
                <div>SPD: ${opponent.Speed}</div>
                <div>Эффекты: ${opponent.Statuses}</div>
            `;
        }
    });
}

function ReceiveTurnData(turnNumber, isPlayerTurn) {
    document.getElementById('turn').innerText = "Turn: " + turnNumber;
    var button = document.getElementById('end-turn-button');
    if (isPlayerTurn === 0) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', true);
    }
}

function ReceiveLoadGameScene() {
    document.getElementById('start-game-panel').setAttribute('hidden', '');
    document.getElementById('battle-scene-panel').removeAttribute("hidden");
    document.getElementById('defeat-panel').setAttribute('hidden', '');
    document.getElementById('win-panel').setAttribute('hidden', '');
}
function ReceiveLoadMenuScene() {
    document.getElementById('start-game-panel').removeAttribute('hidden');
    document.getElementById('battle-scene-panel').setAttribute('hidden', '');
}

function ReceiveActionsData(actions) {
    const tableBody = document.querySelector("#actionsTable tbody");
    tableBody.innerHTML = '';
    actions.forEach((action, index) => {
        const row = tableBody.insertRow();
        const cell = row.insertCell(0);
        cell.innerHTML = `
                <div>${action}</div>\
        `;
    });
}

function ReceiveWin() {
    document.getElementById('win-panel').removeAttribute("hidden");
    document.getElementById('end-turn-button').setAttribute('disabled', '');
}

function ReceiveDefeat() {
    document.getElementById('defeat-panel').removeAttribute("hidden");
    document.getElementById('end-turn-button').setAttribute('disabled', '');
}