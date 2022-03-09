var express = require('express');
var axios = require('axios');
const { route } = require('express/lib/application');
const req = require('express/lib/request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*res
{
  "play_for_quest": "False",
  "summoner_id": "437",
  "summoner_wins": "0,680000",
  "monster_1_id": "388",
  "monster_1_wins": "0,680000",
  "monster_2_id": "425",
  "monster_2_wins": "0,680000",
  "monster_3_id": "384",
  "monster_3_wins": "0,680000",
  "monster_4_id": "385",
  "monster_4_wins": "0,680000",
  "monster_5_id": "174",
  "monster_5_wins": "0,680000",
  "monster_6_id": "190",
  "monster_6_wins": "0,680000",
  "color": "water",
  "teamRank": 2
}


*/

var default_response = 
{
  "play_for_quest": "False",
  "summoner_id": "438", //Thadius Brood
  "summoner_wins": "0,680000",  // just display
  "monster_1_id": "",
  "monster_1_wins": "0,680000",  // just display
  "monster_2_id": "",
  "monster_2_wins": "0,680000",  // just display
  "monster_3_id": "",
  "monster_3_wins": "0,680000",  // just display
  "monster_4_id": "",
  "monster_4_wins": "0,680000",  // just display
  "monster_5_id": "",
  "monster_5_wins": "0,680000",  // just display
  "monster_6_id": "",
  "monster_6_wins": "0,680000",  // just display
  "color": "death",
  "teamRank": 2   // just display
};

var cards_to_play = [
  { mana: 15, cards: [361,	366,	131,	91,	352	]},
  { mana: 16, cards: [361,	366,	131,	352,	364	]},
  { mana: 17, cards: [361,	366,	131,	352,	358	]},
  { mana: 18, cards: [361,	366,	131,	352,	91,	358]},
  { mana: 19, cards: [361,	366,	131,	352,	358,	364]},
  { mana: 20, cards: [361,	366,	91,	352,	364,	358]},
  { mana: 21, cards: [361,	366,	352,	358,	364,	427]},
  { mana: 22, cards: [361,	91,	352,	358,	427,	364]},
  { mana: 23, cards: [361,	355,	366,	352,	358,	364]},
  { mana: 24, cards: [361,	355,	91,	352,	364,	358]},
  { mana: 25, cards: [361,	366,	362,	352,	364,	358]},
  { mana: 26, cards: [361,	362,	91,	352,	358,	364]},
  { mana: 27, cards: [361,	362,	352,	427,	358,	364]},
  { mana: 28, cards: [361,	365,	91,	352,	358,	364]},
  { mana: 29, cards: [361,	365,	352,	427,	358,	364]},
  { mana: 30, cards: [361,	365,	352,	359,	358,	364]},
  { mana: 31, cards: [361,	365,	355,	352,	358,	364]},
  { mana: 32, cards: [361,	365,	357,	352,	358,	364]},
  { mana: 33, cards: [432,	365,	359,	352,	358,	364]},
  { mana: 34, cards: [432,	355,	365,	352,	358,	364]},
  { mana: 35, cards: [432,	365,	357,	352,	358,	364]},
  { mana: 36, cards: [432,	365,	362,	352,	358,	364]},
  { mana: 37, cards: [432,	365,	350,	352,	358,	364]},
  { mana: 38, cards: [432,	355,	365,	350,	364,	352]},
  { mana: 39, cards: [432,	355,	365,	350,	358,	352]},
  { mana: 40, cards: [432,	365,	362,	350,	364,	352]},
];


router.post('/get_team', async function(req, res, next) {
// 
//  res.json(req.body);
console.log(JSON.stringify(req.body));
  if(req.body.splinters.includes('death') ) {
    console.log('in death');
    var cards_by_mana = cards_to_play.find(c => c.mana === req.body.mana);
    if(!!cards_by_mana) {
      console.log('found mana ' + req.body.mana);
      if(found_all_cards(cards_by_mana, JSON.parse(req.body.myCardsV2))) {
        console.log('found all cards ' + JSON.stringify(cards_by_mana));
        const result = get_filled_response(cards_by_mana);
        console.log(JSON.stringify(result));
        res.json(result);
        return;
      }
    }
  }

  await passThruCall(req.body, res);
});

function get_filled_response(cards_by_mana) {
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
