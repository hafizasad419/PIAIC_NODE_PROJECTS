#!/usr/bin/env node


import inquirer from 'inquirer';
import chalk from 'chalk';

interface Question {
    question: string;
    choices: string[];
    correctAnswer: string;
}

const questions: Question[] = [
    {
        question: 'What does HTML stand for?',
        choices: ['Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup'],
        correctAnswer: 'Hyper Text Markup Language',
    },
    {
        question: 'Which of the following is a programming language?',
        choices: ['Microsoft Word', 'Java', 'Google Chrome', 'Adobe Photoshop'],
        correctAnswer: 'Java',
    },
    {
        question: 'What does CSS stand for?',
        choices: ['Colorful Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets'],
        correctAnswer: 'Cascading Style Sheets',
    },
    {
        question: 'What is the capital of JavaScript?😂',
        choices: ['Java City', 'C-Script', 'ECMAScript', 'None of the above'],
        correctAnswer: 'None of the above',
    },
    {
        question: 'Which company developed TypeScript?',
        choices: ['Microsoft', 'Google', 'Apple', 'Facebook'],
        correctAnswer: 'Microsoft',
    },
];

async function quizApp() {
    console.log('Welcome to the SImple Quiz! By Asad Riaz  \n');

    let score = 0;

    for (const question of questions) {
        const { answer } = await inquirer.prompt([
            {
                type: 'list',
                name: 'answer',
                message: question.question,
                choices: question.choices,
            },
        ]);

        if (answer === question.correctAnswer) {
            console.log(chalk.green('Correct!'));
            score++;
        } else {
            console.log(chalk.red('Incorrect!'));
            console.log(`Correct Answer is: ${chalk.green(question.correctAnswer)}`);
        }
        console.log('\n');
    }

    console.log(`Quiz Complete! You scored ${chalk.yellow(score)} out of ${questions.length}.`);
}

quizApp();
