const axios = require('axios');
const cheerio = require('cheerio');

// can replace sortBy param with any one of these depending on what you need.
// const SORT_BY = [
//   "one_day_volume", // 1 day
//   "seven_day_volume", // 7 days
//   "thirty_day_volume", // 30 days
//   "total_volume", // all time
// ];

const TOP_100_PAST_24_HRS_URL = "https://opensea.io/rankings?sortBy=total_volume&chain=ethereum";

/**
 * Scrape OpenSea to get the top 100 collections for the past 24 hours, cos for some reason their API does not let you do it through that.
 * @returns the top 100 collections in the past 24 hours, their opensea slug and their logo url.
 */
async function getTop100Collections() {
  const res = await axios.get(TOP_100_PAST_24_HRS_URL)
  const { data } = res;
  const $ = cheerio.load(data);
  const nextData = JSON.parse($("#__NEXT_DATA__").html());
  const rankingsArray = nextData.props.relayCache[0][1].data.rankings.edges;
  const topFew = rankingsArray.map(({ node }) => {
    return {
      name: node.name,
      slug: node.slug,
      logo: node.logo
    }
  });
  return topFew;
}

module.exports = getTop100Collections;
