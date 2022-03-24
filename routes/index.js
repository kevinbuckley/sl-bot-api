var express = require('express');
var axios = require('axios');
const { route } = require('express/lib/application');
const req = require('express/lib/request');
var router = express.Router();
var fs = require('fs'); /* Put it where other modules included */
const { get_strategy, strategy_file_path } = require('./logic/strategy.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// if we have a custom strategy 
//      AND we have the cards it specifies 
//      AND the mana request is one we have a strategy for, 
//      THEN use it
// else, pass thru
router.post('/get_team', async function(req, res, next) {

  console.log(JSON.stringify(req.body));
  const strategy = get_strategy(req.body);
  if(strategy != null) {
   
    console.log(`using ${strategy} strategy`);
    var cards_by_mana = get_cards_to_play(strategy, req.body.mana);
   
    if(!!cards_by_mana) {
      console.log('found mana ' + req.body.mana);
   
      if(found_all_cards(cards_by_mana, JSON.parse(req.body.myCardsV2))) {
        console.log('found all cards ' + JSON.stringify(cards_by_mana));
        const result = get_filled_response(strategy.split('.')[0], cards_by_mana);
        console.log(JSON.stringify(result));
        res.json(result);
        return;
      }
    }
  }
  await passThruCall(req.body, res);
});

function get_cards_to_play(strategy, mana) {
  const strategy_file = strategy_file_path(strategy);
  console.log(`loading strategy ${strategy_file}`);
  var cards_to_play = JSON.parse(fs.readFileSync(strategy_file, 'utf8')); 

  if(mana > cards_to_play[cards_to_play.length - 1].mana) {
    return cards_to_play[cards_to_play.length - 1];
  }
  return cards_to_play.find(c => c.mana === mana);
}

function get_filled_response(splinter, cards_by_mana) {

  var default_response = 
  {
    "play_for_quest": "False",
    "summoner_id": cards_by_mana.summoner.toString(), 
    "summoner_wins": "0,680000",  // just display
    "monster_1_id": "",
    "monster_1_wins": "0,680000",  
    "monster_2_id": "",
    "monster_2_wins": "0,680000",  
    "monster_3_id": "",
    "monster_3_wins": "0,680000",  
    "monster_4_id": "",
    "monster_4_wins": "0,680000",  
    "monster_5_id": "",
    "monster_5_wins": "0,680000",  
    "monster_6_id": "",
    "monster_6_wins": "0,680000",
    "color": splinter,
    "teamRank": 2,
    card_settings: "https://discord.gg/sr3Cvhn54a",
  };
  for(i = 0; i < cards_by_mana.cards.length; i++) {
    default_response[`monster_${i+1}_id`] = cards_by_mana.cards[i].toString();
  }
  return default_response;
}

function found_all_cards(cards_by_mana, myCardsV2) {
  for(i = 0; i < cards_by_mana.cards.length; i++) {
    var card = myCardsV2.find(m => parseInt(m.card_detail_id) == cards_by_mana.cards[i]);
    if(!card) return false;
  }
  return true;
}

async function passThruCall(request_obj, res) {

  await axios.post('http://lostvoid.xyz/v2/get_team', request_obj)
  .then(function (response) {
    console.log(response.data);
    res.json(response.data);
  })
  .catch(function (error) {
    console.log(error);
    res.json('error');
  });
}

module.exports = router;
