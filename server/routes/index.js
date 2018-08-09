const express = require('express');
const router = express.Router();
const riot = require('../riot');

const { asyncForEach } = require('../helpers');

/**
 * Given a region and summoner name, return a payload containing summoner
 * and match data, along with some well-formed objects with friendlier data (names/images)
 */
router.get('/summoners/:region/:username', async (req, res) => {
  // Ensure we have a summoner name and region.
  if (!req.params.username) {
    return res.status(403).json({ error: 'Please provide a summoner name.' });
  } else if (!req.params.region) {
    return res.status(403).json({ error: 'Please specify a region.' });
  }

  const region = req.params.region;
  const username = req.params.username;

  // Begin fetching data from various Riot endpoints.
  // Certain pieces will require values fetched from previous responses - such as participantId, etc.
  try {
    const summoner = await riot.getSummonerByName(region, username);
    const matchList = await riot.getMatchListsByAccountId(region, summoner.accountId, { qs: { 'endIndex': 8 } });

    // Array to hold our well-formed match history data.
    const matches = [];

    // Iterate over each match returned by matchList, and grab
    // friendly versions of champion/items/runes for use in the UI.
    await asyncForEach(matchList.matches, async (match) => {
      // Grab the detailed data for this match.
      const matchData = await riot.getMatchById(region, match.gameId);

      // Find the requesting summoner's participant ID in the match for use in other calls.
      console.log(matchData);
      const participantIdentifier = matchData.participantIdentities.find(p => p.player.accountId === summoner.accountId);

      // With the participantId found, extract the participant/stats info.
      const participant = matchData.participants.find(p => p.participantId === participantIdentifier.participantId);

      // Fetch champion data.
      const allChampions = await riot.getChampions();
      const champion = allChampions[participant.championId];

      // Fetch spells.
      const allSpells = await riot.getSpells();
      const spell1 = allSpells[participant.spell1Id];
      const spell2 = allSpells[participant.spell2Id];

      // Add items to an array for easier use in UI.
      const allItems = await riot.getItems();
      const items = [];
      items.push(allItems[participant.stats.item0]);
      items.push(allItems[participant.stats.item1]);
      items.push(allItems[participant.stats.item2]);
      items.push(allItems[participant.stats.item3]);
      items.push(allItems[participant.stats.item4]);
      items.push(allItems[participant.stats.item5]);
      items.push(allItems[participant.stats.item6]);

      // Fetch the primary perk / secondary style.
      const allRunes = await riot.getRunes();
      const primaryPerk = allRunes.find(rune => rune.id === participant.stats.perk0);
      const secondaryPerk = allRunes.find(rune => rune.runePathId === participant.stats.perkSubStyle);

      const runePaths = await riot.getRunePaths();
      const perkSubStyle = runePaths.find(path => path.id === secondaryPerk.runePathId);

      // Push all match data and normalized data to the `matches` array.
      matches.push({
        ...matchData,
        champion,
        spell1,
        spell2,
        primaryPerk,
        perkSubStyle,
        items
      });
    });

    // After fetching and gathering friendly data, return summoner/matches.
    return res.json({ summoner: summoner, matches: matches });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message ? err.message : 'An issue occurred when fetching summoner or match data. Please try again.' });
  }
});

// Catch-all 404 route.
router.use('*', (_, res) => {
  return res.status(404).json({ success: false, message: 'Invalid endpoint requested.' });
});

module.exports = router;