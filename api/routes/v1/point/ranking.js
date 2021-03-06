const router = require('express').Router();
const fieldStore = require('../../../models/v1/fieldStore.js');
const userStore = require('../../../models/v1/userStore.js');
const generateRankingWithUserNames = require('../util/generateRankingWithUserNames.js');

router.get('/', async (req, res) => {
  const bestfive = [];
  const currentUser = req.user.userId;
  // fieldの取得
  const field = await fieldStore.getData();
  // userの取得
  const users = await userStore.getUser();
  // rankingの作成
  const ranking = generateRankingWithUserNames(field, users);

  await ranking.sort((a, b) => b.points - a.points);
  for (let i = 0; i < ranking.length; i += 1) {
    if (bestfive.length < 5) {
      bestfive.push(ranking[i]);
    } else if (bestfive.length >= 5) {
      if (ranking[5].points === ranking[i].points) {
        bestfive.push(ranking[i]);
      } else {
        break;
      }
    }
  }

  const myData1 = ranking.find((v) => v.userId === currentUser);
  const myData = { points: myData1.points, userName: myData1.userName };
  const top5 = bestfive.map(({ points, userName }) => ({ points, userName }));
  const data = [{ myData, top5 }];
  res.json(data);
});
module.exports = router;
