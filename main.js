const PLAYER_1 = "player1";
const PLAYER_2 = "player2";

const $arenas = document.querySelector(".arenas");

const characterMap = new Map([
    [
        "scorpion",
        {
            img: "assets/scorpion.gif",
            weapon: ["Kunai", "Axe", "Long Sword", "Ninja Sword", "Mugai Ryu"],
        },
    ],
    [
        "kitana",
        {
            img: "assets/kitana.gif",
            weapon: ["Steel Fans", "Flying Blade", "Glaive", "Sais"],
        },
    ],
    [
        "liukang",
        {
            img: "assets/liukang.gif",
            weapon: ["Dragon Sword", "Nunchaku", "Houan Chains"],
        },
    ],
    [
        "sonya",
        {
            img: "assets/sonya.gif",
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
            img: "assets/subzero.gif",
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

class Player {
    constructor(name, hp) {
        const { img, weapon } = characterMap.get(name);
        this.name = name.toUpperCase();
        this.hp = hp;
        this.img = img;
        this.weapon = weapon;

        this.attack = function () {
            console.log(this.name + "Fight...");
        };

        this.createPlayer = function (playerId) {
            const $player = document.createElement("div");
            $player.classList.add(playerId);

            const $progressbar = document.createElement("div");
            $progressbar.classList.add("progressbar");

            const $life = document.createElement("div");
            $life.classList.add("life");
            $life.style.width = `${this.hp}%`;
            $progressbar.appendChild($life);

            const $name = document.createElement("div");
            $name.classList.add("name");
            $name.innerText = this.name;
            $progressbar.appendChild($name);

            const $character = document.createElement("div");
            $character.classList.add("character");

            const $img = document.createElement("img");
            $img.src = this.img;
            $character.appendChild($img);

            $player.appendChild($progressbar);
            $player.appendChild($character);

            return $player;
        };
    }
}

const player1 = new Player("scorpion", 50);
$arenas.appendChild(player1.createPlayer(PLAYER_1));

const player2 = new Player("kitana", 80);
$arenas.appendChild(player2.createPlayer(PLAYER_2));

