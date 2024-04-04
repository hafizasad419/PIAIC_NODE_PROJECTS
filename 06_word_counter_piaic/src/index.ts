#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let answer = await inquirer.prompt([
    {
        name: "paragraph",
        type: "input",
        message: "Enter a paragraph to count it's words"

    },
])

let wordCount = (answer.paragraph.trim()).length;
// console.log(paragraphLength);


console.log(`Your Pararaph Contains ${chalk.green(wordCount)} Words. `);
