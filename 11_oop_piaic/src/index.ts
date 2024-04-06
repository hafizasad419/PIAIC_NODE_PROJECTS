class Person {
    private personality: string;

    constructor() {
        this.personality = "Mystery";
    }

    askQuestion(answer: number): void {
        if (answer === 1) {
            this.personality = "Extrovert";
        } else {
            this.personality = "Introvert";
        }
    }

    getPersonality(): string {
        return this.personality;
    }
}

const person = new Person();

console.log("Type 1 if you like to talk to others, and type 2 if you prefer to keep to yourself:");

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('', (answer: string) => {
    person.askQuestion(parseInt(answer));
    console.log(`You are ${person.getPersonality()}.`);
    readline.close();
});
