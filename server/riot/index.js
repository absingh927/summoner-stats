const rp = require('request-promise');

// Return a promisified request that will always supply the X-Riot-Token.
function api(region, endpoint, options = {}) {
  return rp(process.env.RIOT_API_URL.replace('_REGION_', region.toLowerCase()) + endpoint, {
    headers: {
      'X-Riot-Token': process.env.RIOT_API_KEY
    },
    json: true,
    ...options
  });
}

// Promises from static data that only need to be resolved once throughout server lifetime.
const champions = api(`na1`, `/static-data/v3/champions`, { qs: { locale: 'en_US', tags: 'image', dataById: true } });
const items = api(`na1`, `/static-data/v3/items`, { qs: { locale: 'en_US', tags: 'image' } });
const runes = api(`na1`, `/static-data/v3/reforged-runes`);
const runePaths = api(`na1`, `/static-data/v3/reforged-rune-paths`);
const spells = api(`na1`, `/static-data/v3/summoner-spells`, { qs: { locale: 'en_US', tags: 'image', dataById: true } });

// API methods we need to support to make application function.
module.exports.getSummonerByName = (region, username, options = {}) => api(region, `/summoner/v3/summoners/by-name/${username}`, options);
module.exports.getMatchListsByAccountId = (region, accountId, options = {}) => api(region, `/match/v3/matchlists/by-account/${accountId}`, options);
module.exports.getMatchById = (region, matchId, options = {}) => api(region, `/match/v3/matches/${matchId}`, options);

// Static data calls.
module.exports.getChampions = async () => (await champions).data;
module.exports.getItems = async () => (await items).data;
module.exports.getRunes = async () => await runes;
module.exports.getRunePaths = async () => await runePaths;
module.exports.getSpells = async () => (await spells).data;