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

function createElement({
    tag = "div",
    classList,
    styleSheet,
    innerText,
    src,
    children,
}) {
    const $element = document.createElement(tag);

    if (Array.isArray(classList) && classList.length > 0) {
        classList.forEach((className) => $element.classList.add(className));
    }

    if (styleSheet) {
        for (const [key, value] of Object.entries(styleSheet)) {
            $element.style[key] = value;
        }
    }

    if (innerText) {
        $element.innerText = innerText;
    }

    if (Array.isArray(children)) {
        children.forEach((child) => $element.appendChild(createElement(child)));
    }

    if (src) {
        $element.src = src;
    }

    return $element;
}

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

        this.createPlayer = function () {
            const $player = createElement({
                classList: ["player" + this.player],
                children: [
                    {
                        classList: ["progressbar"],
                        children: [
                            {
                                classList: ["life"],
                                styleSheet: { width: this.hp + "%" },
                            },
                            { classList: ["name"], innerText: this.name },
                        ],
                    },
                    {
                        classList: ["character"],
                        children: [{ tag: "img", src: this.img }],
                    },
                ],
            });

            return $player;
        };
    }
}

const player1 = new Player("scorpion", 50);
$arenas.appendChild(player1.createPlayer(PLAYER_1));

const player2 = new Player("kitana", 80);
$arenas.appendChild(player2.createPlayer(PLAYER_2));

