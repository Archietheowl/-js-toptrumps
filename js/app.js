// CARD TRUMPS MAKR 2.1

// //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< -VARIABLES and CONSTANTS- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const p1 = "p1"
const cpu = "cpu"
const decks = {
    fierceAnimals,
    scifiVessels,
    dinosaurs,
    britishMonarchs
};
let players = [cpu, p1]
let p1CardData;
let cpuCardData;
let message = ""
let drawContainer = []
let currentDeck;

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CACHED ELEMENT REFERENCES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Cached Elements for P1 and CPU Cards
const categorySelection = document.querySelectorAll(".categoryBtn");
const cpuCategories = document.querySelectorAll(".cpu-category");

//Function to cache card elements dynamically
const getCardElements = (player) => {
    return{
        title: document.querySelector(`#${player}Title`),
        img: document.querySelector(`#${player}Img`),
        info: [...Array(5)].map((_,) => document.querySelector(`#${player}Info${i+1}`))
    };
};

// Chached Button Elements
const startBtn = document.querySelector("#start-game");
const howToPlayBtn = document.querySelector("#how-to-play-btn");
const closeBtn = document.querySelector('#close-btn')
const endGameBtn = document.querySelector("#end-game");

// Other Cached Elements
// Button to open and close game into and instructions modal
const howToPlayBox = document.querySelector(".how-to-play-box");

//Deck Selection 
const deckDropdown = document.querySelector("#select-deck")

// Message area for displaying game status messages
const messageBox = document.querySelector("#message");

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Global Functions >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Show/hide How To Play Info Box
const handleHowToPlay = (event) => {
    howToPlayBox.classList.toggle("show-how-to-play-box");
}

//SLEEP FUNCTION
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Dsiplay Game Status Messages
const handleMessages = () => {
    if (window.GSAPAnimations) {
        window.GSAPAnimations.animateMessage(message);
    } else {
        messageBox.innerHTML = message
    }
}

// Show/Hide and Enable/Disable Game Control Buttons (Form of input validation and to help direct flow of gameplay)
const hideNextHandBtn = () => {
    document.getElementById("nextHandBtn").style.display = "none"
}
const showNextHandBtn = () => {
    document.getElementById("nextHandBtn").style.display = "block"
}
const disableUserBtns = () => {
    categorySelection.forEach((categoryBtn) => {
        categoryBtn.disabled = true;
    })
}
const enableUserBtns = () => {
    categorySelection.forEach((categoryBtn) => {
        categoryBtn.disabled = false;
    })
}

// Showing and hiding start button to direct user interactions
const hideStartBtn = () => {
    document.getElementById('start-game').style.display = "none"
}

const showStartBtn = () => {
    const startButton = document.getElementById('start-game');
    startButton.style.display = "block";
    
    // Animate the start button when it appears
    if (window.GSAPAnimations) {
        window.GSAPAnimations.animateStartButtonAppear();
    }
}

//  Card flip affect
const revealCpuCard = () => {
    document.querySelector('.computer-card').classList.remove('flip');
}
const hideCpuCard = () => {
    document.querySelector('.computer-card').classList.add('flip');
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Main Game Logic >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// +++++++++++++++++++++++++++++++++++++ GAME PLAY FUNCTIONS +++++++++++++++++++++++++++++++++++++
// TEMP MISC GAME PLAY FUNCTIONS (Let's see if these are needed an if so where they belong)


// +++++++++++++++++++++++++++++++++++++ INIT +++++++++++++++++++++++++++++++++++++
//Handle Deck Selection
const handleDeckSelection = () => {
    selectedDeck = event.target.value;
    currentDeck = decks[selectedDeck];
    showStartBtn()
    console.log(currentDeck)
    return currentDeck
    
}

//Get Category Names for the deck that has been selected (This will change in a multiple decks mode to will be dependent on deck choice)
const getCategories = () => {
    keys = Object.keys(currentDeck[0]);
}

//Render Category info to the cards on screen
const renderCategories = () => {
    //Render to P1 Cards
    categorySelection.forEach((btn, index) => {
        if (index < keys.length - 1) { // Adjusting for 'keys' alignment 
            btn.innerHTML = keys[index + 2];//Startig from the 3rd key as first two are "name" and "image".
        }
    })
    //Render to CPU Cards 
    cpuCategories.forEach((cpuCat, index) => {
        if (index < keys.length - 1) {// Adjusting for 'keys' alignment
            cpuCat.innerHTML = keys[index + 2];
        }
    });
};

const init = () => {
    handleHowToPlay()
    hideNextHandBtn()
    revealCpuCard()
    
    // Initialize GSAP animations
    if (window.GSAPAnimations) {
        window.GSAPAnimations.initializeCategoryAnimations();
    }
}
init()


// +++++++++++++++++++++++++++++++++++++ START GAME +++++++++++++++++++++++++++++++++++++

//Shuffle Deck
const shuffle = () => {
    for (let i = currentDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentDeck[i], currentDeck[j]] = [currentDeck[j], currentDeck[i]]
    }
    console.log(currentDeck)
    return currentDeck;
}

//Deal Deck (will need amending for aditional players)
const deal = () => {
    p1Deck = shuffledDeck.filter((element, index) => index % 2 === 0);
    cpuDeck = shuffledDeck.filter((element, index) => index % 2 != 0);
}

//Select which player goes first
const whoStarts = () => {
    const r = Math.floor(Math.random() * 2); 
    let whosTurn = players[r];
    return whosTurn;
}

const handleStartGame = async () => {
    // Animate button click
    if (window.GSAPAnimations) {
        window.GSAPAnimations.animateButton('start-game');
    }
    
    // Fade out welcome box and wait for it to complete
    if (window.GSAPAnimations) {
        await window.GSAPAnimations.fadeOutWelcomeBox();
    }
    
    handleHowToPlay()
    playGame = true
    getCategories()
    renderCategories()
    shuffledDeck = shuffle(currentDeck);
    deal();
    whosTurn = whoStarts(players);
    hideCpuCard();
    
    // Animate card reveal and shuffle
    if (window.GSAPAnimations) {
        window.GSAPAnimations.animateShuffle();
        setTimeout(() => {
            window.GSAPAnimations.animateCardReveal();
        }, 500);
    }
    
    // handleHowToPlay();
    handleGamePlay(whosTurn, playGame);
    hideStartBtn() //Resetting the start button to ensure that on subsequent games the user flow stays robust
};


// +++++++++++++++++++++++++++++++++++++ PLAY GAME +++++++++++++++++++++++++++++++++++++

const renderCardInfo = () => {
    const keys = Object.keys(currentDeck[0])
    const p1Elements = [p1Title, p1Img, p1Info1, p1Info2, p1Info3, p1Info4, p1Info5];
    const cpuElements = [cpuTitle, cpuImg, cpuInfo1, cpuInfo2, cpuInfo3, cpuInfo4, cpuInfo5];
    
    // Iterating through to match up dom elements with correct data from selected deck.
    keys.forEach((key, index)=> {
        if (index < p1Elements.length) {
            if(key === "image") {
                p1Elements[index].innerHTML = `<img src=${p1CardData[key]}>`;
                cpuElements[index].innerHTML = `<img src=${cpuCardData[key]}>`;
            } else {
                p1Elements[index].innerHTML=p1CardData[key];
                cpuElements[index].innerHTML = cpuCardData[key];
            }
        }
    });
    
    // Animate card data reveal
    if (window.GSAPAnimations) {
        window.GSAPAnimations.animateCardData();
    }
}

// ------------------------ Handle P1 Input & Functions ------------------------------
/**
 * Wait for player to select a category, then resolve with their choice.
 * @returns {Promise<{SelectedKey: string, playerSelected: any, cpuSelected: any}>}
 */
async function handleP1Input() {
    return new Promise((resolve) => {
        categorySelection.forEach((categoryBtn) => {
            categoryBtn.addEventListener('click', function handleSelection(event) { //Was a seperate fucntion that was called but now is defined in the click event.
                let index = parseInt(event.target.id.slice(-1)); //using slice -1 to get the last digit from the ID this is the only part we require to index. parseInt is converting it to a number for use when used as index.
                let key = keys[index + 1]; //Getting the key from the keys array useing [index] with the above means we are selecting the key dynamically.
                //For the above, +1 used to align keys correctly
                SelectedKey = key; // Stores the selected key
                playerSelected = p1CardData[key]; // Get p1's value
                cpuSelected = cpuCardData[key]; // Gets the CPU's value

                categorySelection.forEach((btn) => btn.removeEventListener('click', handleSelection));
                resolve({ SelectedKey, playerSelected, cpuSelected }); // 
            })
        })
    })  
}



 // ----------------------  Handle  CPU Selection & Functions ---------------------------
/**
 * CPU randomly selects a category.
 * @returns {Promise<{SelectedKey: string, cpuSelected: any, playerSelected: any}>}
 */
async function handleCpuSelection() {
    keysArray = Object.keys(cpuCardData);
    valuesArray = Object.values(cpuCardData);
    console.log(keysArray)
    console.log(valuesArray)
    r = random(0, keysArray.length) //Have used this instead of 1-6 to make more scaleable. 
    SelectedKey = `${keysArray[r]}`;
    cpuSelected = parseInt(`${valuesArray[r]}`);
    playerSelected = p1CardData[SelectedKey]
    return {SelectedKey, cpuSelected, playerSelected}
}

// Require a user input after result before moving on to the next hand
/**
 * Wait for user to click Next Hand button before continuing.
 * @returns {Promise<void>}
 */
async function handleNextHand() {
    return new Promise((resolve)=>{
        const nextHandBtn = document.querySelector("#nextHandBtn");

        function onClick() {
            nextHandBtn.removeEventListener("click", onClick);
            resolve();
        }
        nextHandBtn.addEventListener("click", onClick);
        nextHandBtn.style.display = "block";
        message = ""
    })
}

//Random Function
const random = (min, max) => {
    const minCeiled = Math.ceil(2);
    const maxFloored = Math.floor(6);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

//Handling a draw (both cards go into a "pot") next hand, winner takes all
//Previously had a handleDraw function but it fit better and looked nicer keeping it in the main result function.
const winDrawCards = (wonDraw) => {
    for (let i = 0; i < drawContainer.length; i++) {
        wonDraw.push(drawContainer);
    }
    drawContainer.length = 0
}

//Handling string values. Strings such as FTL will always be the highest possible value for that category.
const handleString = (value) =>{
    if (typeof value === 'string' ) return Infinity;
    return value;
}

//Evaluate the result at the end of each hand and call the relevent subfuction
const result = () => {
    if (handleString(playerSelected) > handleString(cpuSelected)) {
        winDrawCards(p1Deck) //All cards from draw container (from previous drawn hands) are added to the winners deck
        p1Deck.push(p1Deck.shift())
        p1Deck.push(cpuDeck.shift())
        message = 
            `<strong>Player 1:</strong> <br>
            ${SelectedKey} ${playerSelected}<br><br>
            <strong>Computer:</strong>  <br>
            ${SelectedKey} ${cpuSelected}<br>
            You won this hand! <br><br>
            Ready to play the next hand? Click Below`
        whosTurn = p1
        
        // Animate winner
        if (window.GSAPAnimations) {
            window.GSAPAnimations.animateWinner('p1');
        }
    } else if (handleString(playerSelected) < handleString(cpuSelected)) {
        winDrawCards(cpuDeck)
        cpuDeck.push(cpuDeck.shift())
        cpuDeck.push(p1Deck.shift())
        message = 
            `<strong>Player 1:</strong> <br>
            ${SelectedKey} ${playerSelected}<br><br>
            <strong>Computer:</strong>  <br>
            ${SelectedKey}  ${cpuSelected}<br>
            You lost this hand!  <br><br>
            Ready to play the next hand? Click Below`
        whosTurn = cpu
        
        // Animate winner
        if (window.GSAPAnimations) {
            window.GSAPAnimations.animateWinner('cpu');
        }
    } else {
        drawContainer.push(p1Deck.shift());
        drawContainer.push(cpuDeck.shift());
        message = 
            `<strong>Player 1:</strong>  <br>
            ${SelectedKey} ${playerSelected}<br><br>
            <strong>Computer</strong>  <br>
            ${SelectedKey} ${playerSelected} <br>
            It's a draw <br>
            Both cards added to "pot"<br>
            Next hand winner takes all. <br><br>
            Ready to play the next hand? Click Below`
    }
}
//After every hand, check to see if the game has ended and there is a winner
const checkDecks = () => {
    if (p1Deck.length < 1 || cpuDeck.length < 1) {
        playGame = false
        handleEndGame()
    } else {
        return
    }
}
// -------------------  Main Handle Game Play Function -------------------------
async function handleGamePlay() {
    while(playGame === true){
        p1CardData = p1Deck[0]
        cpuCardData = cpuDeck[0]
        handleMessages(message)
        hideCpuCard()
        renderCardInfo()
        if(whosTurn === p1){
            message = "Player 1s turn, make your selection."
            handleMessages(message);
            enableUserBtns();
            const selection = await handleP1Input(); // Refactored wait for player input on player turn
            result(selection); //Now we can process the turn after selection.
            checkDecks();
            handleMessages(message);
            revealCpuCard();
            showNextHandBtn();
            await handleNextHand();
        } else if(whosTurn === cpu) {
            message = "Computer making selection..."
            handleMessages(message);
            disableUserBtns();
            const selection = await sleep(3000).then(() => { handleCpuSelection() }); ;
            result(selection); 
            checkDecks();
            handleMessages(message);
            revealCpuCard();
            showNextHandBtn();
            await handleNextHand();

        } else {
            message = "An error has occured. We are very sorry. Please refresh the browser."
            handleMessages(message)
            break;
        }
        continue
    }
}
// +++++++++++++++++++++++++++++++++++++ END GAME +++++++++++++++++++++++++++++++++++++
//Manually End Game
const handleEndGame = () => {
    if (p1Deck > cpuDeck) {
        message = 
            `<strong>Player 1:</strong><br>
            ${p1Deck.length} cards <br>
            <strong>CPU</strong>:<br> 
            ${cpuDeck.length} cards<br>
            Congratulations you won!!!!.  <br> 
            Play again? <br>
            Page Will reload in 10 seconds`
    } else if (p1Deck < cpuDeck) {
        message = 
        `<strong>Player 1 Deck: ${p1Deck.length}</strong><br>
        <strong>CPU Deck: ${cpuDeck.length}</strong><br>
        Better luck next time. <br> 
        Play again?<br>
        Page Will Fresh in 10 seconds`
    } else {
        message = 
        `Stalemate! It's a draw this time. <br>
        Play again? <br>
        Page Will Fresh in 10 seconds`
    }
    handleMessages(message)
    
    // Animate game over
    if (window.GSAPAnimations) {
        window.GSAPAnimations.animateGameOver();
    }
    
    sleep(10000).then(() => { init() });
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< -EVENT LISTENERS- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Start Game
startBtn.addEventListener('click', handleStartGame)

//Next Hand Button
nextHandBtn.addEventListener('click', handleNextHand)

//End Game
endGameBtn.addEventListener('click', handleEndGame)

//View How To Play Info
howToPlayBtn.addEventListener('click', handleHowToPlay)

//Close How To Play Info
closeBtn.addEventListener('click', handleHowToPlay)

//Deck Selection Dropdown
deckDropdown.addEventListener('change', handleDeckSelection)