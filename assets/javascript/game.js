var chosen = true;
var attGotten = true;
var hpGotten = true;
var startFunction = true;
var defenderSet = true;
var nextRound = false;
var continueFunc = true;
var defenderPlay = false;
var isHero;
var attHero;
var winCount = 0;
var victoryScreen = false;
var gameStart = false;
var soundPlaying;

var opening = new Audio("assets/audio/opening-theme.mp3")
var wildBattle = new Audio("assets/audio/vs-wildpokemon.mp3");
var wildVictory = new Audio("assets/audio/vs-wildpokemonvictory.mp3");
var trainerBattle = new Audio("assets/audio/vs-trainer.mp3")
var trainerVictory = new Audio("assets/audio/vs-trainervictory.mp3");
var gymBattle = new Audio("assets/audio/vs-gymleader.mp3");
var gymVictory = new Audio("assets/audio/vs-gymleadervictory.mp3");
var champBattle = new Audio("assets/audio/vs-champion.mp3");
var champVictory = new Audio("assets/audio/vs-championvictory.mp3");
var lost = new Audio("assets/audio/lost.mp3");

var allSongs = [opening,wildBattle,trainerBattle,gymBattle,champBattle,wildVictory,trainerVictory,gymVictory,champVictory,lost];
var musicArr = [wildBattle,trainerBattle,gymBattle,champBattle];
var musicArrVictory = [wildVictory,trainerVictory,gymVictory,champVictory];

function playSound() {
    soundPlaying = true;
    if(!gameStart) {
        opening.play();
    } else if(!victoryScreen) {
        musicArr[winCount].play();
    } else {
        musicArrVictory[winCount].play();
    }
}

function muteSound() {
    soundPlaying = false;
    if(!gameStart) {
        opening.pause();
    } else if(!victoryScreen) {
        musicArr[winCount].pause();
    } else {
        musicArrVictory[winCount].pause();
    }
}

$(document).ready(function() {

    var ash = {
        name: "Ash",
        hp: 120,
        att: 8,
        counterAtt: 8,
        imgSrc: "assets/images/ash-ketchum.png",
        id: "#ash",
        value: 0,
    }

    var gary = {
        name: "Gary",
        hp: 100,
        att: 5,
        counterAtt: 5,
        imgSrc: "assets/images/gary-oak.png",
        id: "#gary",
        value: 1
    }

    var misty = {
        name: "Misty",
        hp: 150,
        att: 20,
        counterAtt: 20,
        imgSrc: "assets/images/misty.png",
        id: "#misty",
        value: 2
    }

    var brock = {
        name: "Brock",
        hp: 180,
        att: 25,
        counterAtt: 25,
        imgSrc: "assets/images/brock.jpg",
        id: "#brock",
        value: 3
    }

    var characters = [ash, gary, misty, brock];
    var myHP;
    var defender;
    var hero;
    var num;
    var powerHero;
    var powerDefender;
    var heroHP;
    var defenderHP;

    $(".heroes").on("click", function() {
        if (startFunction) {
            if (chosen) {
                chosen = false;
                myHP = $(this).attr("hp");
                if(myHP == 120) {
                    hero = characters[0];
                    powerHero = characters[0].att;
                    $("#contain").empty();
                    $("#contain").append("<p>Hero chosen: " + hero.name + "!</p>");

                    var image = $("<img>").attr("src",hero.imgSrc).addClass("newImg");
                    $("#heroName").append("<h2>" + hero.name + "</h2>");
                    $("#hero").append(image);

                    heroHP = myHP;
                    $("#heroHPTally").html("<p>" + myHP + "/" + myHP + "</p>");
                } else if(myHP == 100) {
                    hero = characters[1];
                    powerHero = characters[1].att;
                    $("#contain").empty();
                    $("#contain").append("<p>Hero chosen: " + hero.name + "!</p>");

                    var image = $("<img>").attr("src",hero.imgSrc).addClass("newImg");
                    $("#heroName").append("<h2>" + hero.name + "</h2>");
                    $("#hero").append(image);

                    heroHP = myHP;
                    $("#heroHPTally").append("<p>" + myHP + "/" + myHP + "</p>");
                } else if(myHP == 150) {
                    hero = characters[2];
                    powerHero = characters[2].att;
                    $("#contain").empty();
                    $("#contain").append("<p>Hero chosen: " + hero.name + "!</p>");

                    var image = $("<img>").attr("src",hero.imgSrc).addClass("newImg");
                    $("#heroName").append("<h2>" + hero.name + "</h2>");
                    $("#hero").append(image);

                    heroHP = myHP;
                    $("#heroHPTally").append("<p>" + myHP + "/" + myHP + "</p>");
                } else if(myHP == 180) {
                    hero = characters[3];
                    powerHero = characters[3].att;
                    $("#contain").empty();
                    $("#contain").append("<p>Hero chosen: " + hero.name + "!</p>");

                    heroHP = myHP; 
                    $("#heroHPTally").append("<p>" + myHP + "/" + myHP + "</p>");

                    var image = $("<img>").attr("src",hero.imgSrc).addClass("newImg");
                    $("#heroName").append("<h2>" + hero.name + "</h2>");
                    $("#hero").append(image);
                }
                setPlayingField();
            }
        }
    });

    $("#attBtn").on("click", function() {
        if (startFunction && defenderPlay) {
            //Setting Att/HP
            if (hpGotten) {
                defenderHP = parseInt(defender.hp);
                hpGotten = false;
            }
            if (attGotten) {
                powerDefender = defender.counterAtt;
                attGotten = false;
            }

            //Attack Phase
            $("#contain").empty();
            defenderHP -= powerHero;
            $("#contain").append("<p>Hero did " + powerHero + "damage!</p>");
            powerHero += parseInt(hero.att);

            if(defenderHP > 0) {
                heroHP -= powerDefender;
                $("#contain").append("<p>Defender did " + powerDefender + "damage!</p>");
            } else {
                victoryReset();
            }

            $("#heroHPTally").html("<p>" + heroHP + "/" + myHP + "</p>");

            if(defenderHP > 0) {
                $("#defHPTally").html("<p>" + defenderHP + "/" + defender.hp + "</p>");
            } else {
                $("#defHPTally").html("<p>" + defenderHP + "/" + defender.hp + "</p>");
            }

            if(heroHP <= 0) {
                gameOver();
            }
        }
    });

    function setPlayingField() {
        if (startFunction) {
            for(var i = 0; i < characters.length; i++) {
                if(!(characters[i] === hero)) {
                    var imgSource = characters[i].imgSrc;
                    var newID = characters[i].name.toString() + i.toString();
                    var players = $("<img>").attr("src",imgSource).addClass("enemies").attr("value",i).attr("id",newID);
                    $(characters[i].id).remove();
                    $("#enemies").append(players);
                }
            }
            chooseDefender();
        }
    }

    function chooseDefender() {
        $(".enemies").on("click", function() {
            gameStart = true;
            victoryScreen = false;

            if(soundPlaying) {
                playSound();
            } else {
                opening.pause();
                muteSound();
            }
            if(defenderSet) {
                num = $(this).attr("value");
                defender = characters[num];
                var imgSource = characters[parseInt(num)].imgSrc;
                var players = $("<img>").attr("src",imgSource).addClass("enemies newImg");
                $("#" + characters[num].name + num).remove();
                $("#defender").append(players);
                $("#defHPTally").empty();
                $("#defHPTally").append("<p>" + defender.hp + "/" + defender.hp + "</p>");

                $("#defName").html(characters[parseInt(num)].name);

                if(nextRound) {
                    $("#contain").empty();
                }
                $("#contain").append("<p>Defender chosen: " + defender.name + "!</p>");

                defenderSet = false;

                defenderPlay = true;
            }
        });
    }

    function victoryReset() {
        victoryScreen = true;
        if(soundPlaying) {
            playSound();
        } else {
            opening.pause();
            muteSound();
        }
        if(!(winCount === 2)) {
            winCount++;
            $("#contain").empty();
            $("#contain").append("<p>The defender has di--er I mean </p>" + "<p>fainted! Choose another.</p>");
            $("#defName").empty();
            $("#defender").empty();
            $("#defenderHPTally").empty();
            $("#defHPTally").empty();
            defenderSet = true;
            nextRound = true;
            hpGotten = true;
            attGotten = true;
            continueFunc = true;
            defenderPlay = false;
            chooseDefender();
        } else {
            everyoneDies();
        }
    }

    function gameOver() {
        startFunction = false;
        if(soundPlaying) {
            playSound();
        } else {
            opening.pause();
            muteSound();
        }
        $("#contain").empty();
        $("#contain").append("<p>You lose!</p>");
    }

    function everyoneDies() {
        $("#defName").empty();
        $("#defender").empty();
        $("#contain").empty();
        $("#contain").append("<p>You win!</p>");
    }

    $("#bagBtn").on("click", function() {
        $("#contain").empty();
        $("#contain").append("<p>Oak's words echoed...No.</p>");
    });

    $("#runBtn").on("click", function() {
        $("#contain").empty();
        $("#contain").append("<p>Nice try.</p>");
    });

    $("#pkmnBtn").on("click", function() {
        $("#contain").empty();
        $("#contain").append("<p>Nope.</p>");
    });

    function playSound() {
        muteSound();
        soundPlaying = true;
        if(!startFunction) {
            lost.play();
        } else if(!gameStart) {
            opening.play();
        } else if(!victoryScreen) {
            musicArr[winCount].play();
        } else {
            musicArrVictory[winCount].play();
        }
    }

    function muteSound() {
        soundPlaying = false;
        for(var i = 0; i < allSongs.length; i++) {
            allSongs[i].pause();
        }
    }

});