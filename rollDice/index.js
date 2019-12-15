function rollDice() {
    return Math.ceil(Math.random() * 6);
}

function flipCoin() {
    return Math.random()  > .5 ? 'Heads' : 'Tails';
}

const myName = "Roy Peled";

module.exports = {
    rollDice,
    flipCoin,
    myName
};