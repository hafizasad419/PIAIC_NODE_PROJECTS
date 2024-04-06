import inquirer from 'inquirer';
// Define the Customer class
class Customer {
    name;
    address;
    accountNumber;
    constructor(name, address, accountNumber) {
        this.name = name;
        this.address = address;
        this.accountNumber = accountNumber;
    }
}
// Implement the BankAccount interface
class MyBankAccount {
    accountNumber;
    balance;
    transactions;
    constructor(accountNumber, initialBalance = 0) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.transactions = [];
    }
    debit(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            this.transactions.push(`Debit: -$${amount}`);
            console.log(`Debit successful. Balance: $${this.balance}`);
        }
        else {
            console.log("Insufficient funds. Debit transaction canceled.");
        }
    }
    credit(amount) {
        this.balance += amount;
        this.transactions.push(`Credit: +$${amount}`);
        console.log(`Credit successful. Balance: $${this.balance}`);
    }
    displayBalance() {
        console.log(`Account Balance: $${this.balance}`);
    }
}
// Prompt the user for actions using inquirer
function promptAction(account) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Credit', 'Debit', 'Display Balance', 'Exit']
        }
    ]).then((answers) => {
        switch (answers.action) {
            case 'Credit':
                inquirer.prompt([
                    {
                        type: 'number',
                        name: 'amount',
                        message: 'Enter amount to credit:'
                    }
                ]).then((creditAnswer) => {
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
                ]).then((debitAnswer) => {
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
// Test the code
const customer1 = new Customer("John Doe", "123 Main St", "123456");
const account1 = new MyBankAccount("123456", 1000);
promptAction(account1);
