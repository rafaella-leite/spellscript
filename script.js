/* =====================================================
   SPELLSCRIPT
   SCRIPT.JS
===================================================== */


/* =====================================================
   INGREDIENTES
===================================================== */

const ingredients = [

    {
        id: "moon",
        emoji: "🌙",
        name: "Lua"
    },

    {
        id: "mushroom",
        emoji: "🍄",
        name: "Cogumelo"
    },

    {
        id: "frog",
        emoji: "🐸",
        name: "Sapo"
    },

    {
        id: "sparkle",
        emoji: "✨",
        name: "Pó mágico"
    },

    {
        id: "crystal",
        emoji: "💎",
        name: "Cristal"
    },

    {
        id: "flower",
        emoji: "🌸",
        name: "Flor"
    },

    {
        id: "leaf",
        emoji: "🍃",
        name: "Folha"
    },

    {
        id: "fire",
        emoji: "🔥",
        name: "Chama"
    },

    {
        id: "eye",
        emoji: "👁️",
        name: "Olho"
    },

    {
        id: "apple",
        emoji: "🍎",
        name: "Maçã"
    }

];


/* =====================================================
   CONFIGURAÇÕES
===================================================== */

const TOTAL_ROUNDS = 10;

const RECIPE_SIZE = 4;

const INITIAL_LIVES = 5;

const ERROR_DURATION = 4000;


/* =====================================================
   ESTADO DO JOGO
===================================================== */

let currentRound = 1;

let score = 0;

let lives = INITIAL_LIVES;

let currentRecipe = [];

let playerSequence = [];

let gameState = "waiting";

let currentTimer = null;


/* =====================================================
   ELEMENTOS
===================================================== */

const startScreen =
    document.getElementById("startScreen");

const gameScreen =
    document.getElementById("gameScreen");

const endScreen =
    document.getElementById("endScreen");


const startButton =
    document.getElementById("startButton");

const restartButton =
    document.getElementById("restartButton");


const rulesButton =
    document.getElementById("rulesButton");

const gameRulesButton =
    document.getElementById("gameRulesButton");

const rulesModal =
    document.getElementById("rulesModal");

const closeRulesButton =
    document.getElementById("closeRulesButton");


const ingredientsGrid =
    document.getElementById("ingredientsGrid");

const recipeDisplay =
    document.getElementById("recipeDisplay");

const playerSequenceDisplay =
    document.getElementById("playerSequence");

const statusMessage =
    document.getElementById("statusMessage");


const roundDisplay =
    document.getElementById("round");

const totalRoundsDisplay =
    document.getElementById("totalRounds");

const scoreDisplay =
    document.getElementById("score");

const livesDisplay =
    document.getElementById("lives");


const cauldron =
    document.getElementById("cauldron");


const errorOverlay =
    document.getElementById("errorOverlay");

const errorEmoji =
    document.getElementById("errorEmoji");

const errorCode =
    document.getElementById("errorCode");

const errorTitle =
    document.getElementById("errorTitle");

const errorDescription =
    document.getElementById("errorDescription");


const endIcon =
    document.getElementById("endIcon");

const endEyebrow =
    document.getElementById("endEyebrow");

const endTitle =
    document.getElementById("endTitle");

const endDescription =
    document.getElementById("endDescription");

const finalScore =
    document.getElementById("finalScore");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const catSound =
    document.getElementById("catSound");

const explosionSound =
    document.getElementById("explosionSound");

const frogSound =
    document.getElementById("frogSound");

const ghostSound =
    document.getElementById("ghostSound");

catSound.volume = 0.7;
explosionSound.volume = 0.8;
frogSound.volume = 0.7;
ghostSound.volume = 0.7;

/* =====================================================
   EVENTOS
===================================================== */

startButton.addEventListener(
    "click",
    startGame
);


restartButton.addEventListener(
    "click",
    startGame
);


rulesButton.addEventListener(
    "click",
    openRules
);


gameRulesButton.addEventListener(
    "click",
    openRules
);


closeRulesButton.addEventListener(
    "click",
    closeRules
);

/*
Fecha o modal ao clicar fora dele.
*/

rulesModal.addEventListener(
    "click",
    function (event) {

        const rect =
            rulesModal.getBoundingClientRect();

        const outside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

        if (outside) {
            closeRules();
        }

    }
);

backgroundMusic.volume = 0.25;

function startBackgroundMusic() {

    backgroundMusic.play();

    document.removeEventListener(
        "click",
        startBackgroundMusic
    );

    document.removeEventListener(
        "keydown",
        startBackgroundMusic
    );
}

document.addEventListener(
    "click",
    startBackgroundMusic
);

document.addEventListener(
    "keydown",
    startBackgroundMusic
);


/* =====================================================
   MODAL
===================================================== */

function openRules() {

    rulesModal.showModal();

}


function closeRules() {

    rulesModal.close();

}


/* =====================================================
   CRIAR INGREDIENTES
===================================================== */

function createIngredientButtons() {

    ingredientsGrid.innerHTML = "";

    ingredients.forEach(
        function (ingredient) {

            const button =
                document.createElement("button");

            button.classList.add(
                "ingredient"
            );

            button.dataset.id =
                ingredient.id;


            button.innerHTML = `

                <span class="ingredient-emoji">
                    ${ingredient.emoji}
                </span>

                <span class="ingredient-name">
                    ${ingredient.name}
                </span>

            `;


            button.addEventListener(
                "click",
                function () {

                    selectIngredient(
                        ingredient,
                        button
                    );

                }
            );


            ingredientsGrid.appendChild(
                button
            );

        }
    );

}


/* =====================================================
   INICIAR JOGO
===================================================== */

function startGame() {

    clearTimeout(currentTimer);


    currentRound = 1;

    score = 0;

    lives = INITIAL_LIVES;

    currentRecipe = [];

    playerSequence = [];

    gameState = "waiting";



    startScreen.classList.add(
        "hidden"
    );


    endScreen.classList.add(
        "hidden"
    );


    errorOverlay.classList.add(
        "hidden"
    );


    gameScreen.classList.remove(
        "hidden"
    );


    createIngredientButtons();

    updateInterface();


    currentTimer =
        setTimeout(
            function () {

                startRound();

            },
            600
        );

}


/* =====================================================
   COMEÇAR RODADA
===================================================== */

function startRound() {

    gameState = "showing";

    playerSequence = [];

    updatePlayerSequence();

    clearErrorModes();


    currentRecipe =
        generateRecipe();


    showRecipe();


    disableIngredients();


    setStatus(
        "Lendo script mágico...",
        ""
    );


    /*
    Quanto mais avançada a rodada,
    menos tempo a receita fica visível.
    */

    const recipeTime =
        Math.max(
            1300,
            3000 -
            ((currentRound - 1) * 230)
        );


    currentTimer =
        setTimeout(
            function () {

                hideRecipe();

                gameState = "playing";

                enableIngredients();

                setStatus(
                    "Script ocultado. Execute a sequência.",
                    ""
                );

            },
            recipeTime
        );

}


/* =====================================================
   GERAR RECEITA
===================================================== */

function generateRecipe() {

    const shuffled =
        [...ingredients];


    /*
    Embaralhamento Fisher-Yates.
    */

    for (
        let i = shuffled.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            shuffled[i],
            shuffled[randomIndex]
        ] =
        [
            shuffled[randomIndex],
            shuffled[i]
        ];

    }


    return shuffled.slice(
        0,
        RECIPE_SIZE
    );

}


/* =====================================================
   MOSTRAR RECEITA
===================================================== */

function showRecipe() {

    recipeDisplay.innerHTML =
        "";


    currentRecipe.forEach(
        function (ingredient) {

            const item =
                document.createElement("div");


            item.classList.add(
                "recipe-item"
            );


            item.textContent =
                ingredient.emoji;


            recipeDisplay.appendChild(
                item
            );

        }
    );

}


/* =====================================================
   ESCONDER RECEITA
===================================================== */

function hideRecipe() {

    recipeDisplay.innerHTML =
        "";


    for (
        let i = 0;
        i < RECIPE_SIZE;
        i++
    ) {

        const mystery =
            document.createElement("div");


        mystery.classList.add(
            "recipe-item",
            "hidden-recipe"
        );


        mystery.textContent =
            "?";


        recipeDisplay.appendChild(
            mystery
        );

    }

}


/* =====================================================
   SELECIONAR INGREDIENTE
===================================================== */

function selectIngredient(
    ingredient,
    button
) {

    if (
        gameState !== "playing"
    ) {
        return;
    }


    /*
    Animação do clique.
    */

    button.classList.remove(
        "clicked"
    );

    void button.offsetWidth;

    button.classList.add(
        "clicked"
    );


    /*
    Descobre em qual posição
    da sequência estamos.
    */

    const currentIndex =
        playerSequence.length;


    /*
    Adiciona ingrediente
    ao output.
    */

    playerSequence.push(
        ingredient
    );


    updatePlayerSequence();


    /*
    Ingrediente esperado.
    */

    const expectedIngredient =
        currentRecipe[currentIndex];


    /*
    Se estiver errado.
    */

    if (
        ingredient.id !==
        expectedIngredient.id
    ) {

        wrongIngredient();

        return;
    }


    /*
    Se completou a sequência.
    */

    if (
        playerSequence.length ===
        currentRecipe.length
    ) {

        completeRecipe();

    }

}


/* =====================================================
   OUTPUT DO JOGADOR
===================================================== */

function updatePlayerSequence() {

    playerSequenceDisplay.innerHTML =
        "";


    playerSequence.forEach(
        function (ingredient) {

            const item =
                document.createElement("div");


            item.classList.add(
                "sequence-item"
            );


            item.textContent =
                ingredient.emoji;


            playerSequenceDisplay.appendChild(
                item
            );

        }
    );

}


/* =====================================================
   RECEITA COMPLETA
===================================================== */

function completeRecipe() {

    gameState =
        "success";


    disableIngredients();


    /*
    Pontuação progressiva.
    */

    const points =
        100 +
        ((currentRound - 1) * 25);


    score += points;


    cauldron.classList.add(
        "success"
    );


    setStatus(
        `✓ FEITIÇO COMPILADO // +${points} pontos`,
        "success"
    );


    updateInterface();


    /*
    Última rodada.
    */

    if (
        currentRound >=
        TOTAL_ROUNDS
    ) {

        currentTimer =
            setTimeout(
                function () {

                    finishGame(true);

                },
                1500
            );

        return;
    }


    /*
    Próxima rodada.
    */

    currentRound++;


    currentTimer =
        setTimeout(
            function () {

                cauldron.classList.remove(
                    "success"
                );


                updateInterface();


                startRound();

            },
            1500
        );

}


/* =====================================================
   ERRO
===================================================== */

function wrongIngredient() {

    gameState =
        "error";


    disableIngredients();


    lives--;


    updateInterface();


    /*
    Sorteia uma exceção.
    */

    const effect =
        getRandomError();


    showFullScreenError(
        effect
    );


    /*
    Se perdeu todas as vidas.
    */

    if (
        lives <= 0
    ) {

        currentTimer =
            setTimeout(
                function () {

                    hideErrorOverlay();

                    finishGame(false);

                },
                ERROR_DURATION
            );

        return;
    }


    /*
    Tenta novamente depois do efeito.
    */

    currentTimer =
        setTimeout(
            function () {

                hideErrorOverlay();

                startRound();

            },
            ERROR_DURATION
        );

}


/* =====================================================
   ERROS POSSÍVEIS
===================================================== */

function getRandomError() {

    const errors = [

        {
            type: "explosion",
            code: "ERROR 01",
            title: "POÇÃO OVERFLOW",
            emoji: "💥",
            description:
                "Ingrediente inesperado detectado. O caldeirão entrou em estado crítico."
        },

        {
            type: "frog",
            code: "ERROR 02",
            title: "VOCÊ VIROU UM SAPO",
            emoji: "🐸",
            description:
                "Conversão de tipo falhou. Você foi convertido para sapo."
        },

        {
            type: "ghost",
            code: "ERROR 03",
            title: "ESPÍRITO DESCONHECIDO",
            emoji: "👻",
            description:
                "Uma entidade não declarada foi encontrada no runtime mágico."
        },

        {
            type: "cat",
            code: "ERROR 04",
            title: "INTERFERENCIA FAMILIAR",
            emoji: "🐈‍⬛",
            description:
                "Seu familiar interrompeu a execução e decidiu testar a gravidade."
        }

    ];


    const randomIndex =
        Math.floor(
            Math.random() *
            errors.length
        );


    return errors[
        randomIndex
    ];

}


/* =====================================================
   MOSTRAR ERRO EM TELA CHEIA
===================================================== */

function showFullScreenError(error) {

    clearErrorModes();

    errorCode.textContent =
        error.code;

    errorTitle.textContent =
        error.title;

    errorEmoji.textContent =
        error.emoji;

    errorDescription.textContent =
        error.description;

    errorOverlay.classList.remove(
        "hidden"
    );


    switch (error.type) {

        case "explosion":

            errorOverlay.classList.add(
                "explosion-mode"
            );

            playErrorSound(
                explosionSound
            );

            break;


        case "frog":

            errorOverlay.classList.add(
                "frog-mode"
            );

            playErrorSound(
                frogSound
            );

            break;


        case "ghost":

            errorOverlay.classList.add(
                "ghost-mode"
            );

            playErrorSound(
                ghostSound
            );

            break;


        case "cat":

            errorOverlay.classList.add(
                "cat-mode"
            );

            playErrorSound(
                catSound
            );

            break;
    }
}

function playErrorSound(sound) {

    backgroundMusic.volume = 0.08;
    sound.currentTime = 0;
    
    sound.play()
        .catch(function (error) {

            console.log(
                "Não foi possível tocar o efeito:",
                error
            );

        });
}


/* =====================================================
   ESCONDER OVERLAY
===================================================== */

function hideErrorOverlay() {

    errorOverlay.classList.add(
        "hidden"
    );

    clearErrorModes();

    backgroundMusic.volume = 0.25;
}


/* =====================================================
   LIMPAR MODOS
===================================================== */

function clearErrorModes() {

    errorOverlay.classList.remove(
        "explosion-mode",
        "frog-mode",
        "ghost-mode",
        "cat-mode"
    );

}


/* =====================================================
   INTERFACE
===================================================== */

function updateInterface() {

    roundDisplay.textContent =
        currentRound;


    totalRoundsDisplay.textContent =
        TOTAL_ROUNDS;


    scoreDisplay.textContent =
        score;


    updateLives();

}


/* =====================================================
   VIDAS
===================================================== */

function updateLives() {

    let hearts =
        "";


    for (
        let i = 0;
        i < INITIAL_LIVES;
        i++
    ) {

        if (
            i < lives
        ) {

            hearts +=
                "❤️ ";

        } else {

            hearts +=
                "🖤 ";

        }

    }


    livesDisplay.textContent =
        hearts.trim();

}


/* =====================================================
   STATUS
===================================================== */

function setStatus(
    message,
    type
) {

    statusMessage.textContent =
        message;


    statusMessage.classList.remove(
        "success",
        "error"
    );


    if (type) {

        statusMessage.classList.add(
            type
        );

    }

}


/* =====================================================
   HABILITAR INGREDIENTES
===================================================== */

function enableIngredients() {

    const buttons =
        document.querySelectorAll(
            ".ingredient"
        );


    buttons.forEach(
        function (button) {

            button.disabled =
                false;

        }
    );

}


/* =====================================================
   DESABILITAR INGREDIENTES
===================================================== */

function disableIngredients() {

    const buttons =
        document.querySelectorAll(
            ".ingredient"
        );


    buttons.forEach(
        function (button) {

            button.disabled =
                true;

        }
    );

}


/* =====================================================
   FINAL DO JOGO
===================================================== */

function finishGame(won) {

    clearTimeout(
        currentTimer
    );


    gameState =
        "finished";


    gameScreen.classList.add(
        "hidden"
    );


    errorOverlay.classList.add(
        "hidden"
    );


    endScreen.classList.remove(
        "hidden"
    );


    finalScore.textContent =
        score;


    /*
    Vitória.
    */

    if (won) {

        endIcon.textContent =
            "🔮✨";


        endEyebrow.textContent =
            "SPELL COMPILED";


        endTitle.textContent =
            "Script concluído!";


        endDescription.textContent =
            "Todas as poções foram executadas corretamente. Nenhuma dimensão paralela foi aberta no processo.";

    }

    /*
    Derrota.
    */

    else {

        endIcon.textContent =
            "🐸";


        endEyebrow.textContent =
            "FATAL ERROR";


        endTitle.textContent =
            "Execução interrompida!";


        endDescription.textContent =
            "Suas três vidas chegaram a zero. O sistema mágico recomenda estudar novamente a documentação.";

    }

}