const calculatePoints = (player, matchData) => {
  let points = 0;
  let runs = 0;
  let fours = 0;
  let sixes = 0;
  let ducks = 0;
  let wickets = 0;
  let bowledOrLbws = 0;
  let maidens = 0;
  let catches = 0;
  let stumpings = 0;
  let runouts = 0;
  let deliveries = 0;
  let maidenOver = false;

  for (const ball of matchData) {
    if (ball.batter === player) {
      runs += ball.batsman_run;
      if (ball.batsman_run === 4) fours += 1;
      if (ball.batsman_run === 6) sixes += 1;
      if (ball.isWicketDelivery === 1 && ball.total_run === 0) ducks += 1;
    }
    if (ball.bowler === player) {
      deliveries += 1;
      if (ball.isWicketDelivery === 1) {
        wickets += 1;
        if (ball.kind === "bowled" || ball.kind === "lbw") bowledOrLbws += 1;
      }
    }
    if (deliveries % 6 === 0 && deliveries > 0) {
      if (maidens === 0 && runs === 0) {
        maidens += 1;
        maidenOver = true;
      } else {
        maidenOver = false;
      }
    }
    if (ball.player_out === player) {
      if (ball.kind === "caught") catches += 1;
      if (ball.kind === "stumped") stumpings += 1;
      if (ball.kind === "run out") runouts += 1;
    }
  }

  points += runs;
  points += fours;
  points += sixes * 2;
  if (runs >= 30) points += 4;
  if (runs >= 50) points += 8;
  if (runs >= 100) points += 16;
  if (ducks > 0) points -= 2;

  points += wickets * 25;
  points += bowledOrLbws * 8;
  if (wickets >= 3) points += 4;
  if (wickets >= 4) points += 8;
  if (wickets >= 5) points += 16;
  if (maidenOver) points += 12;

  points += catches * 8;
  if (catches >= 3) points += 4;
  points += stumpings * 12;
  points += runouts * 6;

  return points;
};

module.exports = calculatePoints;
