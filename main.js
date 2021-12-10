const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

$randomButton.addEventListener("click", () => {
    function showWinner(name) {
        $arenas.appendChild(
            createElement({
                classList: ["winsTitle"],
                innerText: `${name} wins`,
            })
        );
    }

    function fightIsOver(winnerName) {
        showWinner(winnerName);
        $randomButton.disabled = true;
    }

    function randomDamage() {
        return Math.ceil(Math.random() * 20);
    }

    if (!player1.changeHP(randomDamage())) {
        fightIsOver(player2.name);
    }

    if (!player2.changeHP(randomDamage())) {
        fightIsOver(player1.name);
    }
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
    constructor(player, name) {
        const { img, weapon } = characterMap.get(name);
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
            return this.hp;
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

const player1 = new Player(1, "scorpion");
const player2 = new Player(2, "kitana");

[player1, player2].forEach((player) => {
    $arenas.appendChild(player.createPlayer());
});
