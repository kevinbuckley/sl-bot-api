var fs = require('fs'); /* Put it where other modules included */
let priority_list = require(`./kbux-strategies/priority.json`);


for(var priority of priority_list) {
    load(priority);
}



function load(strategy) {
    const strategy_file = `./kbux-strategies/${strategy}.json`;
    var cards_to_play = JSON.parse(fs.readFileSync(strategy_file, 'utf8')); 
    for(let hand of cards_to_play) {
        if(hand.cards.length != ([...new Set(hand.cards)]).length) {
            console.log(`found dup in ${strategy} at mana ${hand.mana}`);
        }
    }

}

