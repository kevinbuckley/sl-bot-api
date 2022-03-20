var fs = require('fs'); /* Put it where other modules included */

let ruleset_list = require(`../../${process.env.STRATEGIES_FOLDER}/ruleset.json`);
let priority_list = require(`../../${process.env.STRATEGIES_FOLDER}/priority.json`);
let preferred_splinters_in_order = priority_list.filter((p) => p.indexOf('.') < 0);
let preferred_ruleset_splinters_in_order = priority_list.filter((p) => p.indexOf('.') >= 0);

// if you found specific splinter / strategy file and that is allowable, return that file
// else if the rules have an ruleset rule, then return null
// else if death, return death default
// else if earth, return earth default
// else return null;
function get_strategy(request_obj) {
  let count_of_special_rules = number_of_special_rules(request_obj);

  if(count_of_special_rules === 1) {
    const ruleset_strategy = get_ruleset_strategy(request_obj);
    if(ruleset_strategy != null){
      console.log('using custom rule strategy');
      return ruleset_strategy;
    }
  }

  // didn't find a special rule strategy but there are special rules
  if(count_of_special_rules != 0) {
    console.log('passing through special');
    return null;
  }

  return get_our_base_strategy(request_obj);
}

function strategy_file_path(strategy) {
  return `./${process.env.STRATEGIES_FOLDER}/${strategy}.json`;
}
  
function get_ruleset_strategy(request_obj) {
  // 1 and only 1 custom ruleset is used
  for(p of preferred_ruleset_splinters_in_order) {
    var ruleset_in_file_name = p.split('.')[1];
    const rs = ruleset_list.find(r => r.file_name == ruleset_in_file_name);
    if(request_obj.rules.indexOf(rs.game_name) >= 0) {
      // this preferred_ruleset is in the game requirements
      return p;
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

function get_our_base_strategy(request_obj) {
  for(splinter of preferred_splinters_in_order){
    console.log(splinter);
    if(request_obj.splinters.includes(splinter)) {
      console.log('using base rule strategy');
      return splinter;
    }
  }
  console.log('passing through base');
  return null;
}

module.exports = { get_strategy, strategy_file_path };