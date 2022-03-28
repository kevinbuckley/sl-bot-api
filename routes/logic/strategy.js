var fs = require('fs'); /* Put it where other modules included */

let ruleset_list = require(`../../${process.env.STRATEGIES_FOLDER}/ruleset.json`);
let priority_list = require(`../../${process.env.STRATEGIES_FOLDER}/priority.json`);

function get_strategy(request_obj) {

  // try for quest first 
  if(typeof request_obj.quest === 'object') {
    const quest_priority_list = priority_list.filter(p => p.indexOf(request_obj.quest.splinter) === 0); // starts with that splinter
    const quest_priority = get_strategy_with_priority(request_obj, quest_priority_list);
    if(quest_priority != null) {
      return quest_priority;
    }
  }

  return get_strategy_with_priority(request_obj, priority_list);
}


// if you found specific splinter / strategy file and that is allowable, return that file
// else if the rules have an ruleset rule, then return null
// else if death, return death default
// else if earth, return earth default
// else return null;
function get_strategy_with_priority(request_obj, priority) {
  priority_filter_by_mana = priority.filter((p) => {
    var strategy = get_cards_to_play(p, request_obj.mana);
    return strategy != null;
  });
  let preferred_splinters_in_order = priority_filter_by_mana.filter((p) => p.indexOf('.') < 0);
  let preferred_ruleset_splinters_in_order = priority_filter_by_mana.filter((p) => p.indexOf('.') >= 0);

  let count_of_special_rules = number_of_special_rules(request_obj);

  // found one special rule, see if we have a custom strategy for it
  if(count_of_special_rules === 1) {
    const ruleset_strategy = get_ruleset_strategy(request_obj, preferred_ruleset_splinters_in_order);
    if(ruleset_strategy != null){
      return ruleset_strategy;
    }
  }

  // didn't find a special rule strategy but there are special rules
  if(count_of_special_rules != 0) {
    return null;
  }

  return get_our_base_strategy(request_obj, preferred_splinters_in_order);

}


function strategy_file_path(strategy) {
  return `./${process.env.STRATEGIES_FOLDER}/${strategy}.json`;
}
  
function get_ruleset_strategy(request_obj, preferred_ruleset_splinters_in_order) {
  // 1 and only 1 custom ruleset is used
  for(p of preferred_ruleset_splinters_in_order) {
    var splinter = p.split('.')[0];
    if(request_obj.splinters.includes(splinter)) {
      var ruleset_in_file_name = p.split('.')[1];
      const rs = ruleset_list.find(r => r.file_name == ruleset_in_file_name);
      if(request_obj.rules.indexOf(rs.game_name) >= 0) {
        // this preferred_ruleset is in the game requirements
        return p;
      }
    }
  }
  return null;
}

function number_of_special_rules(request_obj) {
  let count = 0;
  for(i = 0; i < ruleset_list.length; i++){
    if(request_obj.rules.indexOf(ruleset_list[i].game_name) >= 0)
      count++;
  }
  return count;
}

function get_our_base_strategy(request_obj, preferred_splinters_in_order) {
  for(splinter of preferred_splinters_in_order){
    console.log(splinter);
    if(request_obj.splinters.includes(splinter)) {
      return splinter;
    }
  }
  return null;
}

function get_cards_to_play(strategy, mana) {
  const strategy_file = strategy_file_path(strategy);
  var cards_to_play = JSON.parse(fs.readFileSync(strategy_file, 'utf8')); 

  if(mana > cards_to_play[cards_to_play.length - 1].mana) {
    return cards_to_play[cards_to_play.length - 1];
  }
  return cards_to_play.find(c => c.mana === mana);
}


module.exports = { get_strategy, get_cards_to_play };