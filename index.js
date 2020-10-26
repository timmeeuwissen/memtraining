const readline = require("readline");
const { start } = require("repl");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const size = 6;
const wait = 2000;

let currCheck = [];
let proceed = true;
let outcome = {
    right: 0,
    wrong: 0
}

validate = (input) => currCheck.reverse().join(' ') === input
newRnd = (length) => {
    currCheck = Array.from({length}, () => Math.floor(Math.random() * 9));
}
sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

show = async (range) => {
    for (const val of range) {
        process.stdout.write(`${val}      `)
        await sleep(wait)
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
    }
}

askQuestion = async () => 
    new Promise(resolve => {
        rl.question("What's the answer? ", answer => {
            if (validate(answer)) {
                outcome.right++
            }
            else {
                outcome.wrong++
            }
            resolve()
        });
    })

run = async () => {
    console.log(`We are going to show you ${size} numbers. After that, you respond the numbers in backward order. CTRL-C to quit`)
    await sleep(2000)
    console.log('here we go')
    while (proceed) {
        newRnd(size);
        // console.log(currCheck)
        await show(currCheck);
        await askQuestion();
    }
}

run()

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    console.log(outcome)
    process.exit(0);
});
