import inquirer from 'inquirer';

class Student {
    name: string;
    id: number;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.name = name;
        this.id = this.generateID();
        this.courses = [];
        this.balance = 0;
    }

    generateID(): number {
        return Math.floor(10000 + Math.random() * 90000);
    }

    enroll(course: string): void {
        this.courses.push(course);
    }

    viewBalance(): void {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }

    payTuition(amount: number): void {
        this.balance -= amount;
        console.log(`Payment of $${amount} received from ${this.name}`);
    }

    showStatus(): void {
        console.log(`Student Name: ${this.name}`);
        console.log(`Student ID: ${this.id}`);
        console.log(`Courses Enrolled: ${this.courses.join(', ')}`);
        console.log(`Balance: $${this.balance}`);
    }
}

const students: Student[] = [];

function addStudent(): void {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter student name:'
        }
    ]).then((answers: { name: string }) => {
        const student = new Student(answers.name);
        students.push(student);
        console.log(`Student ${answers.name} added with ID ${student.id}`);
        mainMenu();
    });
}

function enrollStudent(): void {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter student ID:'
        },
        {
            type: 'input',
            name: 'course',
            message: 'Enter course name:'
        }
    ]).then((answers: { id: string; course: string }) => {
        const student = students.find(student => student.id === parseInt(answers.id));
        if (student) {
            student.enroll(answers.course);
            console.log(`Student ${student.name} enrolled in ${answers.course}`);
        } else {
            console.log(`Student with ID ${answers.id} not found`);
        }
        mainMenu();
    });
}

function viewBalance(): void {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter student ID:'
        }
    ]).then((answers: { id: string }) => {
        const student = students.find(student => student.id === parseInt(answers.id));
        if (student) {
            student.viewBalance();
        } else {
            console.log(`Student with ID ${answers.id} not found`);
        }
        mainMenu();
    });
}

function payTuition(): void {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter student ID:'
        },
        {
            type: 'input',
            name: 'amount',
            message: 'Enter amount to pay:'
        }
    ]).then((answers: { id: string; amount: string }) => {
        const student = students.find(student => student.id === parseInt(answers.id));
        if (student) {
            student.payTuition(parseFloat(answers.amount));
        } else {
            console.log(`Student with ID ${answers.id} not found`);
        }
        mainMenu();
    });
}

function showStatus(): void {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter student ID:'
        }
    ]).then((answers: { id: string }) => {
        const student = students.find(student => student.id === parseInt(answers.id));
        if (student) {
            student.showStatus();
        } else {
            console.log(`Student with ID ${answers.id} not found`);
        }
        mainMenu();
    });
}

function mainMenu(): void {
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Choose an option:',
            choices: [
                'Add Student',
                'Enroll Student',
                'View Balance',
                'Pay Tuition',
                'Show Status',
                'Exit'
            ]
        }
    ]).then((answers: { option: string }) => {
        switch (answers.option) {
            case 'Add Student':
                addStudent();
                break;
            case 'Enroll Student':
                enrollStudent();
                break;
            case 'View Balance':
                viewBalance();
                break;
            case 'Pay Tuition':
                payTuition();
                break;
            case 'Show Status':
                showStatus();
                break;
            case 'Exit':
                console.log('Exiting...');
                break;
        }
    });
}

console.log('Welcome to the Student Management System');
mainMenu();
