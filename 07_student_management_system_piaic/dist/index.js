import inquirer from 'inquirer';
class Student {
    name;
    id;
    courses;
    balance;
    constructor(name) {
        this.name = name;
        this.id = this.generateID();
        this.courses = [];
        this.balance = 0;
    }
    generateID() {
        return Math.floor(10000 + Math.random() * 90000);
    }
    enroll(course) {
        this.courses.push(course);
    }
    viewBalance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    payTuition(amount) {
        this.balance -= amount;
        console.log(`Payment of $${amount} received from ${this.name}`);
    }
    showStatus() {
        console.log(`Student Name: ${this.name}`);
        console.log(`Student ID: ${this.id}`);
        console.log(`Courses Enrolled: ${this.courses.join(', ')}`);
        console.log(`Balance: $${this.balance}`);
    }
}
const students = [];
function addStudent() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter student name:'
        }
    ]).then((answers) => {
        const student = new Student(answers.name);
        students.push(student);
        console.log(`Student ${answers.name} added with ID ${student.id}`);
        mainMenu();
    });
}
function enrollStudent() {
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
    ]).then((answers) => {
        const student = students.find(student => student.id === parseInt(answers.id));
        if (student) {
            student.enroll(answers.course);
            console.log(`Student ${student.name} enrolled in ${answers.course}`);
        }
        else {
            console.log(`Student with ID ${answers.id} not found`);
        }
        mainMenu();
    });
}
function viewBalance() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter student ID:'
        }
    ]).then((answers) => {
        const student = students.find(student => student.id === parseInt(answers.id));
        if (student) {
            student.viewBalance();
        }
        else {
            console.log(`Student with ID ${answers.id} not found`);
        }
        mainMenu();
    });
}
function payTuition() {
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
    ]).then((answers) => {
        const student = students.find(student => student.id === parseInt(answers.id));
        if (student) {
            student.payTuition(parseFloat(answers.amount));
        }
        else {
            console.log(`Student with ID ${answers.id} not found`);
        }
        mainMenu();
    });
}
function showStatus() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter student ID:'
        }
    ]).then((answers) => {
        const student = students.find(student => student.id === parseInt(answers.id));
        if (student) {
            student.showStatus();
        }
        else {
            console.log(`Student with ID ${answers.id} not found`);
        }
        mainMenu();
    });
}
function mainMenu() {
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
    ]).then((answers) => {
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
