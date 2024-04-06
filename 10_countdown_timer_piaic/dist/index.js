import { setInterval } from 'timers';
import chalk from 'chalk';
function countdownTimer(targetDate) {
    const interval = setInterval(() => {
        const currentDate = new Date();
        const remainingTime = targetDate.getTime() - currentDate.getTime();
        if (remainingTime <= 0) {
            clearInterval(interval);
            process.stdout.write(chalk.green('\nCountdown complete!\n'));
        }
        else {
            const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            const formattedDays = chalk.blue(`${days}d`);
            const formattedHours = chalk.yellow(`${hours}h`);
            const formattedMinutes = chalk.red(`${minutes}m`);
            const formattedSeconds = chalk.green(`${seconds}s`);
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(`Time Remaining: ${formattedDays} ${formattedHours} ${formattedMinutes} ${formattedSeconds}`);
        }
    }, 1000);
}
// Set your target date here (year, month (0-based), day, hour, minute, second)
const targetDate = new Date(2024, 6, 1, 12, 0, 0); // June 01, 2024, 12:00:00 PM
process.stdout.write(chalk.bold('Countdown Timer:\n'));
countdownTimer(targetDate);
