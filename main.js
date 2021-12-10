const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

function fightIsOver(resultText) {
    function showResult() {
        $arenas.appendChild(
            createElement({
                classList: ["resultTitle"],
                innerText: resultText,
            })
        );
    }
    showResult(resultText);
    $randomButton.disabled = true;
}

$randomButton.addEventListener("click", () => {
    function dealRandomDamage(player) {
        function randomDamage() {
            return Math.ceil(Math.random() * 20);
        }
        player.changeHP(randomDamage());
    }

    function fightReducer(accumulator, { hp }, index) {
        return accumulator + !hp * 10 ** index;
    }

    function checkRoundResult(result) {
        switch (result) {
            case 11:
                fightIsOver("round draw");
                break;
            case 10:
                fightIsOver(`${players[0].name} wins`);
                break;
            case 1:
                fightIsOver(`${players[1].name} wins`);
                break;
            default:
                break;
        }
    }

    players.forEach(dealRandomDamage);
    checkRoundResult(players.reduce(fightReducer, 0));
});

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
    constructor(player, name, { img, weapon }) {
        this.player = player;
        this.name = name.toUpperCase();
        this.hp = 100;
        this.img = img;
        this.weapon = weapon;

        this.attack = function () {
            console.log(this.name + "Fight...");
        };

        this.changeHP = function (damage) {
            if (damage >= this.hp) {
                this.hp = 0;
            } else {
                this.hp -= damage;
            }
            this.$life.style.width = this.hp + "%";
        };

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

            this.$life = $player.firstChild.firstChild;
            return $player;
        };
    }
}

function appendPlayer(playerId) {
    function getRandomCharacter(characters) {
        return [...characters.keys()][
            Math.floor(Math.random() * characters.size)
        ];
    }
    const character = getRandomCharacter(characterMap);
    const player = new Player(playerId, character, characterMap.get(character));

    $arenas.appendChild(player.createPlayer());

    return player;
}

const players = [1, 2].map(appendPlayer);
