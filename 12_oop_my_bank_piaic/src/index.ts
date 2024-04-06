import inquirer from 'inquirer';

// Customer class
class Customer {
    name: string;
    address: string;
    accountNumber: string;

    constructor(name: string, address: string, accountNumber: string) {
        this.name = name;
        this.address = address;
        this.accountNumber = accountNumber;
    }
}

// BankAccount interface
interface BankAccount {
    accountNumber: string;
    balance: number;
    transactions: string[];

    debit(amount: number): void;
    credit(amount: number): void;
    displayBalance(): void;
}

// Implementing the BankAccount interface
class MyBankAccount implements BankAccount {
    accountNumber: string;
    balance: number;
    transactions: string[];

    constructor(accountNumber: string, initialBalance: number = 0) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.transactions = [];
    }

    debit(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            this.transactions.push(`Debit: -$${amount}`);
            console.log(`Debit successful. Balance: $${this.balance}`);
        } else {
            console.log("Insufficient funds. Debit transaction canceled.");
        }
    }

    credit(amount: number): void {
        this.balance += amount;
        this.transactions.push(`Credit: +$${amount}`);
        console.log(`Credit successful. Balance: $${this.balance}`);
    }

    displayBalance(): void {
        console.log(`Account Balance: $${this.balance}`);
    }
}

// Prompting the user for actions using inquirer
function promptAction(account: MyBankAccount): void {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Credit', 'Debit', 'Display Balance', 'Exit']
        }
    ]).then((answers: { action: string }) => {
        switch (answers.action) {
            case 'Credit':
                inquirer.prompt([
                    {
                        type: 'number',
                        name: 'amount',
                        message: 'Enter amount to credit:'
                    }
                ]).then((creditAnswer: { amount: number }) => {
                    account.credit(creditAnswer.amount);
                    promptAction(account);
                });
                break;
            case 'Debit':
                inquirer.prompt([
                    {
                        type: 'number',
                        name: 'amount',
                        message: 'Enter amount to debit:'
                    }
                ]).then((debitAnswer: { amount: number }) => {
                    account.debit(debitAnswer.amount);
                    promptAction(account);
                });
                break;
            case 'Display Balance':
                account.displayBalance();
                promptAction(account);
                break;
            case 'Exit':
                console.log('Thank you for using the bank application!');
                break;
        }
    });
}

// Testing the code
const customer1 = new Customer("Asad Riaz", "123 Main St", "123456");
const account1 = new MyBankAccount("123456", 1000);

console.log("Customer Name:", customer1.name);
promptAction(account1);
