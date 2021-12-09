const PLAYER_1 = "player1";
const PLAYER_2 = "player2";

const characterMap = new Map([
    [
        "scorpion",
        {
            img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
            weapon: ["Kunai", "Axe", "Long Sword", "Ninja Sword", "Mugai Ryu"],
        },
    ],
    [
        "kitana",
        {
            img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
            weapon: ["Steel Fans", "Flying Blade", "Glaive", "Sais"],
        },
    ],
    [
        "liukang",
        {
            img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
            weapon: ["Dragon Sword", "Nunchaku", "Houan Chains"],
        },
    ],
    [
        "sonya",
        {
            img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
            weapon: [
                "Energy Bracelets",
                "Wind Blade",
                "Kali Sticks",
                "Garrote Wire",
                "Grenades ",
                "Drone",
                "Turret",
            ],
        },
    ],
    [
        "subzero",
        {
            img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
            weapon: [
                "Ice Scepter",
                "Kori Blade",
                "Cybernetic Weapons",
                "Ice Daggers",
                "Ice Hammer",
                "Ice Pollaxe",
            ],
        },
    ],
]);

class Character {
    constructor(name, hp) {
        const { img, weapon } = characterMap.get(name);
        this.name = name.toUpperCase();
        this.hp = hp;
        this.img = img;
        this.weapon = weapon;
        this.attack = function () {
            console.log(this.name + "Fight...");
        };
    }
}

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

const scorpion = new Character("scorpion", 50);
createPlayer(PLAYER_1, scorpion);

const kitana = new Character("kitana", 80);
createPlayer(PLAYER_2, kitana);
