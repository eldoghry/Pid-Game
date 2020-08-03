/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

easy -> normal game
medium -> loose score when two 6 a row 
hard -> play with 2 dice when one of them is 1

*/

var scores, roundScore, gameState, activePlayer, winnerScore, gameMode;
var lastDice = 0; // used in medium mode only
var flag; // used in game mode

// initialize game
init();


// Roll Dice
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gameState) {
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceDom = document.querySelector('.dice');
        diceDom.setAttribute('src', 'dice-' + dice + '.png')
        diceDom.style.display = 'block';


        switch (gameMode) {
            case 'medium':
                // medium mode    
                flag = (dice !== 1 && !( dice === 6 && dice === lastDice));
                break;

            case 'hard':
                //console.log('hard');
                var dice2 = Math.floor(Math.random() * 6) + 1;
                var diceDom2 = document.querySelector('.dice2');
                diceDom2.setAttribute('src', 'dice-' + dice2 + '.png')
                flag = (dice !==1 && dice2 !== 1)
                break;

            default:
                // easy mode
                flag = (dice !== 1);                 
        }

        if (flag) {
            // 2- update round of current player
            roundScore += dice;
            
            if(gameMode === 'hard'){
                roundScore += dice2;
            }

            document.getElementById('current-' + activePlayer).textContent = roundScore;
            lastDice = dice; // used in medium mode only
        }
        else {
            roundScore = 0;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            lastDice = 0; // used in medium mode only
            // toggal active class
            nextPlayer();
        }
    }
});


// Hold Btn
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gameState) {
        // add round score to Global Score and reset round score
        scores[activePlayer] += roundScore;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // check if user is winner or not
        if (scores[activePlayer] < winnerScore) {
            // change active player
            roundScore = 0;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            nextPlayer();
        } else {
            // winner logic
            document.getElementById('name-' + activePlayer).textContent = 'Winner'
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.dice').style.display = 'none'
            
            if(gameMode =='hard')
                document.querySelector('.dice2').style.display = 'none'

            // stop game 
            gameState = false;

            // show new game btn
            document.querySelector('.btn-new').style.display = 'block';
        }
    }
});


function nextPlayer() {
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}


// new game
document.querySelector('.btn-new').addEventListener('click', function () {

    // open game setting model
    document.querySelector('.model').style.display = 'flex'
    //init();
});


document.getElementById('start-game').addEventListener('click', function () {
    // close model
    document.querySelector('.model').style.display = 'none'

    // set game setting
    winnerScore = document.getElementById("winner-score").value;
    gameMode = document.getElementById("gameMode").value;

    // hide new game btn when start game
    document.querySelector('.btn-new').style.display = 'none';

    init();
})

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameState = true; //game is playing
    winnerScore ? '' : winnerScore = 100;
    gameMode ? '' : gameMode = 'easy';

    if(gameMode == 'hard'){
        document.querySelector('.dice').classList.add('dice1');
        document.querySelector('.wrapper').insertAdjacentHTML( 'beforeend', '<img src="dice-5.png" alt="Dice" class="dice dice2">');
    }

    // console.log(winnerScore, diceCount)

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // document.querySelector('.dice').style.display = 'none'

    player0 = document.querySelector('.player-0-panel');
    player1 = document.querySelector('.player-1-panel');

    // handle active class
    player0.classList.remove('active');
    player1.classList.remove('active');
    player0.classList.add('active');

    //remove winner class
    player0.classList.remove('winner');
    player1.classList.remove('winner');

    //reset player name
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
}

