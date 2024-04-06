#!/usr/bin/env node
import inquirer from 'inquirer';
const player = {
    name: 'Player',
    health: 100,
    attack: 20,
    potions: 3,
    grenades: 3,
    guns: 1,
    gold: 0,
};
const enemies = [
    { name: 'Goblin', health: 50, attack: 10, goldReward: 20 },
    { name: 'Skeleton', health: 60, attack: 15, goldReward: 30 },
    { name: 'Orc', health: 70, attack: 20, goldReward: 40 },
];
async function startGame() {
    console.log("Welcome to the Asad's Adventure Game!\n");
    while (player.health > 0) {
        const enemy = getRandomEnemy();
        console.log(`You encountered a ${enemy.name}!`);
        while (enemy.health > 0 && player.health > 0) {
            await fightEnemy(enemy);
        }
        if (player.health > 0) {
            console.log(`You defeated the ${enemy.name}!`);
            player.gold += enemy.goldReward;
            const dropPotion = Math.random() < 0.5;
            if (dropPotion) {
                player.potions++;
                console.log(`The ${enemy.name} dropped a health potion!`);
            }
        }
        else {
            console.log('Game Over! You were defeated.');
            break;
        }
        const { continueGame } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'continueGame',
                message: 'Do you want to continue playing?',
                default: true,
            },
        ]);
        if (!continueGame) {
            console.log('Thanks for playing!');
            break;
        }
    }
}
async function fightEnemy(enemy) {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose your action:',
            choices: ['Attack', 'Use Potion', 'Throw Grenade', 'Shoot Gun'],
        },
    ]);
    if (action === 'Attack') {
        const damageDealt = Math.floor(Math.random() * player.attack);
        const damageTaken = Math.floor(Math.random() * enemy.attack);
        enemy.health -= damageDealt;
        player.health -= damageTaken;
        console.log(`You dealt ${damageDealt} damage to the ${enemy.name}!`);
        console.log(`The ${enemy.name} dealt ${damageTaken} damage to you!`);
    }
    else if (action === 'Use Potion') {
        if (player.potions > 0) {
            player.health += 30; // Using a health potion restores 30 health
            player.potions--;
            console.log('You used a health potion!');
        }
        else {
            console.log('You have no health potions!');
        }
    }
    else if (action === 'Throw Grenade') {
        if (player.grenades > 0) {
            const grenadeDamage = Math.floor(Math.random() * 50) + 50; // Grenade deals random damage between 50 to 100
            enemy.health -= grenadeDamage;
            console.log(`You threw a grenade and dealt ${grenadeDamage} damage to the ${enemy.name}!`);
            player.grenades--;
        }
        else {
            console.log('You have no grenades!');
        }
    }
    else if (action === 'Shoot Gun') {
        if (player.guns > 0) {
            const gunDamage = Math.floor(Math.random() * 30) + 30; // Gun deals random damage between 30 to 60
            enemy.health -= gunDamage;
            console.log(`You shot your gun and dealt ${gunDamage} damage to the ${enemy.name}!`);
            player.guns--;
        }
        else {
            console.log('You have no bullets left in your gun!');
        }
    }
}
function getRandomEnemy() {
    return enemies[Math.floor(Math.random() * enemies.length)];
}
startGame();
