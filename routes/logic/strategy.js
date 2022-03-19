var fs = require('fs'); /* Put it where other modules included */

var rules_to_exclude = [
    { 'game_name': 'Broken Arrows', 'file_name': 'broken_arrows'} ,       // no ranged
    { 'game_name': 'Even Stevens', 'file_name': 'evenstevens'} ,        // Only even mana cards can be used
    { 'game_name': 'Keep Your Distance', 'file_name': 'keepyourdistance'} ,  // Monsters with Melee attack type can't be used.
    { 'game_name': 'Little League', 'file_name': 'littleleague'} ,       // You can only use Monsters and Summoners with 4 or less mana.
    { 'game_name': 'Lost Legendaries', 'file_name': 'lostlegendaries'} ,    // Legendary Monsters can't be used. Legendary Summoners are still available though.
    { 'game_name': 'Lost Magic', 'file_name': 'lostmagic'} ,          // Magical Monsters can't be used
    { 'game_name': 'Odd Ones Out', 'file_name': 'oddonesout'} ,       // Only odd mana cards can be used
    { 'game_name': 'Rise of the Commons', 'file_name': 'riseofthecommons'} , // Only Common and Rare Monsters may be used in battles
    { 'game_name': 'Taking Sides',  'file_name': 'takingsides'} ,       // Neutral Monsters may not be used in battles.
    { 'game_name': 'Up Close & Personal', 'file_name': 'upcloseandpersonal'}  // Only Monsters with Melee attack may be used in battles.
  ] 
  
  const preferred_splinters_in_order = ['death', 'earth'];
  
  // if you found specific splinter / strategy file and that is allowable, return that file
  // else if the rules have an rules_to_exclude rule, then return null
  // else if death, return death default
  // else if earth, return earth default
  // else return null;
  function get_strategy(request_obj) {
    let count_of_special_rules = number_of_special_rules(request_obj);

    if(count_of_special_rules === 1) {
      const ruleset_strategy = get_ruleset_strategy(request_obj);
      if(ruleset_strategy != null){
        return ruleset_strategy;
      }
    }

    // didn't find a special rule strategy but there are special rules
    if(count_of_special_rules != 0) {
      return null;
    }
    return get_our_base_strategy(request_obj);
  }

  function strategy_file_path(strategy) {
    return `${process.env.STRATEGIES_FOLDER}/${strategy}.json`;
  }

    
  function get_ruleset_strategy(request_obj) {
    // 1 and only 1 custom ruleset is used


    for(let splinter_idx = 0 ; splinter_idx < preferred_splinters_in_order.length; splinter_idx++){
      for(let rules_idx = 0 ; rules_idx < rules_to_exclude.length; rules_idx++){
        const strategy_file = strategy_file_path()

      }
    }
    return null;
  }

  function number_of_special_rules(request_obj) {
    let count = 0;
    for(i = 0; i < rules_to_exclude.length; i++){
      if(request_obj.rules.indexOf(rules_to_exclude[i].game_name) >= 0)
        count++;
    }
    return count;
  }
  
  function get_our_base_strategy(request_obj) {
    for(let i = 0 ; i < preferred_splinters_in_order.length; i++){
      if(request_obj.splinters.includes(preferred_splinters_in_order[i])) {
        return preferred_splinters_in_order[i];
      }
    }
    return null;
  }



  module.exports = { get_strategy, strategy_file_path };