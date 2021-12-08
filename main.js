const PLAYER_1 = "player1";
const PLAYER_2 = "player2";

function attack() {
    console.log(this.name + "Fight...");
}

const scorpion = {
    name: "SCORPION",
    hp: 50,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["Kunai", "Axe", "Long Sword", "Ninja Sword", "Mugai Ryu"],
    attack,
};

const kitana = {
    name: "KITANA",
    hp: 80,
    img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
    weapon: ["Steel Fans", "Flying Blade", "Glaive", "Sais"],
    attack,
};

function createPlayer(playerId, { name, hp, img }) {
    const $player = document.createElement("div");
    $player.classList.add(playerId);

    const $progressbar = document.createElement("div");
    $progressbar.classList.add("progressbar");

    const $life = document.createElement("div");
    $life.classList.add("life");
    $life.style.width = `${hp}%`;
    $progressbar.appendChild($life);

    const $name = document.createElement("div");
    $name.classList.add("name");
    $name.innerText = name;
    $progressbar.appendChild($name);

    const $character = document.createElement("div");
    $character.classList.add("character");

    const $img = document.createElement("img");
    $img.src = img;
    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    const $arenas = document.querySelector(".arenas");
    $arenas.appendChild($player);
}

createPlayer(PLAYER_1, scorpion);
createPlayer(PLAYER_2, kitana);
