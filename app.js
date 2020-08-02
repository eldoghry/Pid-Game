/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, gameState, activePlayer;

// initialize game
init();


// Roll Dice
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gameState){
        // 1- show dice and roll
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceDom = document.querySelector('.dice');
        diceDom.setAttribute('src', 'dice-' + dice + '.png')
        diceDom.style.display = 'block';

        if(dice !== 1){
            // 2- update round of current player
            roundScore += dice;
            document.getElementById('current-'+activePlayer).textContent = roundScore;
        }else{
            roundScore = 0;
            document.getElementById('current-'+activePlayer).textContent = roundScore;
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

            // toggal active class
            nextPlayer();    
        }
    }
});


// Hold Btn
document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gameState){
        // add round score to Global Score and reset round score
        scores[activePlayer] += roundScore;
        roundScore = 0;
        document.getElementById('current-'+activePlayer).textContent = roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        
        // check if user is winner or not
        if(scores[activePlayer] < 20){
            // change active player
            document.getElementById('current-'+activePlayer).textContent = roundScore;
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            nextPlayer();
        }else{
            // winner logic
            document.getElementById('name-' + activePlayer).textContent = 'Winner'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.dice').style.display = 'none'
            
            // stop game 
            gameState = false;
        }
    }
});


function nextPlayer(){
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}


document.querySelector('.btn-new').addEventListener('click',init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gameState = true; //game is playing

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    
    document.querySelector('.dice').style.display = 'none'

    player0 =  document.querySelector('.player-0-panel');
    player1 =  document.querySelector('.player-1-panel');
    
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