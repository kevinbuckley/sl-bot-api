var express = require('express');
var axios = require('axios');
const { route } = require('express/lib/application');
const req = require('express/lib/request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*req 
{
  "mana": 50,
  "rules": "Equal Opportunity|Up Close & Personal",
  "splinters": [
    "water",
    "earth",
    "dragon"
  ],
  "myCardsV2": [{"card_detail_id":"356","level":"7","gold":true},{"card_detail_id":"397","level":"6","gold":true},{"card_detail_id":"399","level":"6","gold":true},{"card_detail_id":"440","level":"6","gold":true},{"card_detail_id":"368","level":"5","gold":true},{"card_detail_id":"369","level":"5","gold":true},{"card_detail_id":"370","level":"5","gold":true},{"card_detail_id":"382","level":"5","gold":true},{"card_detail_id":"383","level":"5","gold":true},{"card_detail_id":"385","level":"5","gold":true},{"card_detail_id":"395","level":"5","gold":true},{"card_detail_id":"396","level":"5","gold":true},{"card_detail_id":"398","level":"5","gold":true},{"card_detail_id":"425","level":"5","gold":true},{"card_detail_id":"353","level":"4","gold":true},{"card_detail_id":"354","level":"4","gold":true},{"card_detail_id":"359","level":"4","gold":true},{"card_detail_id":"371","level":"4","gold":true},{"card_detail_id":"372","level":"4","gold":true},{"card_detail_id":"332","level":"3","gold":true},{"card_detail_id":"367","level":"3","gold":true},{"card_detail_id":"381","level":"3","gold":true},{"card_detail_id":"384","level":"3","gold":true},{"card_detail_id":"409","level":"3","gold":true},{"card_detail_id":"410","level":"3","gold":true},{"card_detail_id":"411","level":"3","gold":true},{"card_detail_id":"412","level":"3","gold":true},{"card_detail_id":"413","level":"3","gold":true},{"card_detail_id":"423","level":"3","gold":true},{"card_detail_id":"424","level":"3","gold":true},{"card_detail_id":"426","level":"3","gold":true},{"card_detail_id":"56","level":"2","gold":true},{"card_detail_id":"112","level":"2","gold":true},{"card_detail_id":"358","level":"2","gold":true},{"card_detail_id":"373","level":"2","gold":true},{"card_detail_id":"386","level":"2","gold":true},{"card_detail_id":"387","level":"2","gold":true},{"card_detail_id":"388","level":"2","gold":true},{"card_detail_id":"389","level":"2","gold":true},{"card_detail_id":"390","level":"2","gold":true},{"card_detail_id":"405","level":"2","gold":true},{"card_detail_id":"414","level":"2","gold":true},{"card_detail_id":"415","level":"2","gold":true},{"card_detail_id":"416","level":"2","gold":true},{"card_detail_id":"417","level":"2","gold":true},{"card_detail_id":"427","level":"2","gold":true},{"card_detail_id":"429","level":"2","gold":true},{"card_detail_id":"16","level":"8","gold":false},{"card_detail_id":"38","level":"8","gold":false},{"card_detail_id":"337","level":"8","gold":false},{"card_detail_id":"340","level":"8","gold":false},{"card_detail_id":"341","level":"8","gold":false},{"card_detail_id":"349","level":"8","gold":false},{"card_detail_id":"350","level":"8","gold":false},{"card_detail_id":"355","level":"8","gold":false},{"card_detail_id":"357","level":"8","gold":false},{"card_detail_id":"374","level":"6","gold":false},{"card_detail_id":"403","level":"6","gold":false},{"card_detail_id":"428","level":"6","gold":false},{"card_detail_id":"438","level":"6","gold":false},{"card_detail_id":"441","level":"6","gold":false},{"card_detail_id":"361","level":"5","gold":false},{"card_detail_id":"400","level":"5","gold":false},{"card_detail_id":"401","level":"5","gold":false},{"card_detail_id":"402","level":"5","gold":false},{"card_detail_id":"437","level":"5","gold":false},{"card_detail_id":"439","level":"5","gold":false},{"card_detail_id":"362","level":"4","gold":false},{"card_detail_id":"364","level":"4","gold":false},{"card_detail_id":"375","level":"4","gold":false},{"card_detail_id":"419","level":"4","gold":false},{"card_detail_id":"47","level":"3","gold":false},{"card_detail_id":"342","level":"3","gold":false},{"card_detail_id":"348","level":"3","gold":false},{"card_detail_id":"352","level":"3","gold":false},{"card_detail_id":"365","level":"3","gold":false},{"card_detail_id":"378","level":"3","gold":false},{"card_detail_id":"391","level":"3","gold":false},{"card_detail_id":"404","level":"3","gold":false},{"card_detail_id":"408","level":"3","gold":false},{"card_detail_id":"421","level":"3","gold":false},{"card_detail_id":"431","level":"3","gold":false},{"card_detail_id":"432","level":"3","gold":false},{"card_detail_id":"447","level":"3","gold":false},{"card_detail_id":"2","level":"2","gold":false},{"card_detail_id":"3","level":"2","gold":false},{"card_detail_id":"24","level":"2","gold":false},{"card_detail_id":"135","level":"2","gold":false},{"card_detail_id":"136","level":"2","gold":false},{"card_detail_id":"148","level":"2","gold":false},{"card_detail_id":"149","level":"2","gold":false},{"card_detail_id":"242","level":"2","gold":false},{"card_detail_id":"284","level":"2","gold":false},{"card_detail_id":"293","level":"2","gold":false},{"card_detail_id":"339","level":"2","gold":false},{"card_detail_id":"343","level":"2","gold":false},{"card_detail_id":"376","level":"2","gold":false},{"card_detail_id":"377","level":"2","gold":false},{"card_detail_id":"392","level":"2","gold":false},{"card_detail_id":"393","level":"2","gold":false},{"card_detail_id":"406","level":"2","gold":false},{"card_detail_id":"420","level":"2","gold":false},{"card_detail_id":"422","level":"2","gold":false},{"card_detail_id":"430","level":"2","gold":false},{"card_detail_id":"434","level":"2","gold":false},{"card_detail_id":"444","level":"2","gold":false},{"card_detail_id":"446","level":"2","gold":false},{"card_detail_id":"4","level":"1","gold":false},{"card_detail_id":"14","level":"1","gold":false},{"card_detail_id":"20","level":"1","gold":false},{"card_detail_id":"23","level":"1","gold":false},{"card_detail_id":"25","level":"1","gold":false},{"card_detail_id":"26","level":"1","gold":false},{"card_detail_id":"34","level":"1","gold":false},{"card_detail_id":"37","level":"1","gold":false},{"card_detail_id":"43","level":"1","gold":false},{"card_detail_id":"48","level":"1","gold":false},{"card_detail_id":"60","level":"1","gold":false},{"card_detail_id":"91","level":"1","gold":false},{"card_detail_id":"98","level":"1","gold":false},{"card_detail_id":"103","level":"1","gold":false},{"card_detail_id":"131","level":"1","gold":false},{"card_detail_id":"137","level":"1","gold":false},{"card_detail_id":"138","level":"1","gold":false},{"card_detail_id":"139","level":"1","gold":false},{"card_detail_id":"140","level":"1","gold":false},{"card_detail_id":"143","level":"1","gold":false},{"card_detail_id":"146","level":"1","gold":false},{"card_detail_id":"150","level":"1","gold":false},{"card_detail_id":"154","level":"1","gold":false},{"card_detail_id":"157","level":"1","gold":false},{"card_detail_id":"158","level":"1","gold":false},{"card_detail_id":"159","level":"1","gold":false},{"card_detail_id":"160","level":"1","gold":false},{"card_detail_id":"161","level":"1","gold":false},{"card_detail_id":"162","level":"1","gold":false},{"card_detail_id":"163","level":"1","gold":false},{"card_detail_id":"168","level":"1","gold":false},{"card_detail_id":"169","level":"1","gold":false},{"card_detail_id":"170","level":"1","gold":false},{"card_detail_id":"171","level":"1","gold":false},{"card_detail_id":"178","level":"1","gold":false},{"card_detail_id":"180","level":"1","gold":false},{"card_detail_id":"181","level":"1","gold":false},{"card_detail_id":"182","level":"1","gold":false},{"card_detail_id":"184","level":"1","gold":false},{"card_detail_id":"185","level":"1","gold":false},{"card_detail_id":"188","level":"1","gold":false},{"card_detail_id":"189","level":"1","gold":false},{"card_detail_id":"190","level":"1","gold":false},{"card_detail_id":"191","level":"1","gold":false},{"card_detail_id":"192","level":"1","gold":false},{"card_detail_id":"193","level":"1","gold":false},{"card_detail_id":"194","level":"1","gold":false},{"card_detail_id":"195","level":"1","gold":false},{"card_detail_id":"196","level":"1","gold":false},{"card_detail_id":"199","level":"1","gold":false},{"card_detail_id":"201","level":"1","gold":false},{"card_detail_id":"206","level":"1","gold":false},{"card_detail_id":"213","level":"1","gold":false},{"card_detail_id":"214","level":"1","gold":false},{"card_detail_id":"217","level":"1","gold":false},{"card_detail_id":"222","level":"1","gold":false},{"card_detail_id":"225","level":"1","gold":false},{"card_detail_id":"229","level":"1","gold":false},{"card_detail_id":"233","level":"1","gold":false},{"card_detail_id":"237","level":"1","gold":false},{"card_detail_id":"246","level":"1","gold":false},{"card_detail_id":"248","level":"1","gold":false},{"card_detail_id":"258","level":"1","gold":false},{"card_detail_id":"262","level":"1","gold":false},{"card_detail_id":"266","level":"1","gold":false},{"card_detail_id":"268","level":"1","gold":false},{"card_detail_id":"272","level":"1","gold":false},{"card_detail_id":"274","level":"1","gold":false},{"card_detail_id":"280","level":"1","gold":false},{"card_detail_id":"281","level":"1","gold":false},{"card_detail_id":"283","level":"1","gold":false},{"card_detail_id":"285","level":"1","gold":false},{"card_detail_id":"287","level":"1","gold":false},{"card_detail_id":"289","level":"1","gold":false},{"card_detail_id":"295","level":"1","gold":false},{"card_detail_id":"299","level":"1","gold":false},{"card_detail_id":"300","level":"1","gold":false},{"card_detail_id":"305","level":"1","gold":false},{"card_detail_id":"306","level":"1","gold":false},{"card_detail_id":"307","level":"1","gold":false},{"card_detail_id":"308","level":"1","gold":false},{"card_detail_id":"312","level":"1","gold":false},{"card_detail_id":"318","level":"1","gold":false},{"card_detail_id":"323","level":"1","gold":false},{"card_detail_id":"325","level":"1","gold":false},{"card_detail_id":"331","level":"1","gold":false},{"card_detail_id":"333","level":"1","gold":false},{"card_detail_id":"334","level":"1","gold":false},{"card_detail_id":"335","level":"1","gold":false},{"card_detail_id":"336","level":"1","gold":false},{"card_detail_id":"338","level":"1","gold":false},{"card_detail_id":"344","level":"1","gold":false},{"card_detail_id":"345","level":"1","gold":false},{"card_detail_id":"346","level":"1","gold":false},{"card_detail_id":"347","level":"1","gold":false},{"card_detail_id":"351","level":"1","gold":false},{"card_detail_id":"360","level":"1","gold":false},{"card_detail_id":"363","level":"1","gold":false},{"card_detail_id":"366","level":"1","gold":false},{"card_detail_id":"379","level":"1","gold":false},{"card_detail_id":"380","level":"1","gold":false},{"card_detail_id":"394","level":"1","gold":false},{"card_detail_id":"407","level":"1","gold":false},{"card_detail_id":"418","level":"1","gold":false},{"card_detail_id":"435","level":"1","gold":false},{"card_detail_id":"443","level":"1","gold":false},{"card_detail_id":"445","level":"1","gold":false},{"card_detail_id":"448","level":"1","gold":false},{"card_detail_id":"167","level":"1","gold":false},{"card_detail_id":"172","level":"1","gold":false},{"card_detail_id":"173","level":"1","gold":false},{"card_detail_id":"174","level":"1","gold":false},{"card_detail_id":"179","level":"1","gold":false},{"card_detail_id":"183","level":"1","gold":false},{"card_detail_id":"147","level":"1","gold":false},{"card_detail_id":"151","level":"1","gold":false},{"card_detail_id":"152","level":"1","gold":false},{"card_detail_id":"156","level":"1","gold":false},{"card_detail_id":"141","level":"1","gold":false},{"card_detail_id":"145","level":"1","gold":false},{"card_detail_id":"224","level":"1","gold":false},{"card_detail_id":"","level":"1","gold":false}],
  "quest": ""
}
*/
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
{mana: 15, cards: [361,	366,	131,	91,	352,	]},
{mana: 16, cards: [361,	366,	131,	352,	364	]},
{mana: 17, cards: [361,	366,	131,	352,	358	]},
{mana: 18, cards: [361,	366,	131,	352,	91,	358]},
{mana: 19, cards: [361,	366,	131,	352,	358,	364]},
{mana: 20, cards: [361,	366,	91,	352,	364,	358]},
{mana: 21, cards: [361,	366,	352,	358,	364,	427]},
{mana: 22, cards: [361,	91,	352,	358,	427,	364]},
{mana: 23, cards: [361,	355,	366,	352,	358,	364]},
{mana: 24, cards: [361,	355,	91,	352,	364,	358]},
{mana: 25, cards: [361,	366,	362,	352,	364,	358]},
{mana: 26, cards: [361,	362,	91,	352,	358,	364]}
];


router.post('/get_team', async function(req, res, next) {
// 
//  res.json(req.body);
  if(req.body.splinters.includes('death') ) {
    console.log('in death');
    var cards_by_mana = cards_to_play.find(c => c.mana === req.body.mana);
    if(!!cards_by_mana) {
      console.log('found mana ' + req.body.mana);
      if(found_all_cards(cards_by_mana, req.body.myCardsV2)) {
        console.log('found all cards ' + cards_by_mana);
        const result = get_filled_response(cards_by_mana);
        res.json(result);
        return;
      }
    }
  }

 // await passThruCall(req.body, res);
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
