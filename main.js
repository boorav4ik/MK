const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

function finishRound(resultText) {
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

$randomButton.addEventListener("click", function () {
    function dealRandomDamage(player) {
        const randomDamage = Math.ceil(Math.random() * 20);
        player.changeHP(randomDamage);
    }

    function reduceRoundResult(accumulator, { hp }, index) {
        return accumulator + !hp * 10 ** index;
    }

    function checkRoundResult(result) {
        if (result) {
            finishRound(
                {
                    1: `${players[1].name} wins`,
                    10: `${players[0].name} wins`,
                    11: "round draw",
                }[result]
            );
        }
    }

    players.forEach(dealRandomDamage);
    checkRoundResult(players.reduce(reduceRoundResult, 0));
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
    constructor(player, { name, img, weapon }) {
        this.player = player;
        this.name = name.toUpperCase();
        this.hp = 100;
        this.img = img;
        this.weapon = weapon;

        this.attack = function () {
            console.log(this.name + "Fight...");
        };

        this.changeHP = function (damage) {
            this.hp = damage >= this.hp ? 0 : this.hp - damage;
            this.$life.style.width = this.hp + "%";
        };
    }

    get element() {
        if (this.$playerElement) return this.$playerElement;
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
        this.$playerElement = $player
        return $player;
    }
}

function appendPlayer(playerId) {
    function getRandomItemFromMap(items) {
        const name = [...items.keys()][Math.floor(Math.random() * items.size)];
        return { ...items.get(name), name };
    }

    const player = new Player(playerId, getRandomItemFromMap(characterMap));
    $arenas.appendChild(player.element);
    return player;
}

const players = [1, 2].map(appendPlayer);
