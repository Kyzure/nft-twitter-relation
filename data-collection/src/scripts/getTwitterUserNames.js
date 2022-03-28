const getGeneralCollectionData = require("./getGeneralCollectionData");

async function getTwitterUserNames() {
  const collectionData = await getGeneralCollectionData();
  return collectionData.map(c => c.twitter_username).filter(Boolean);
}

module.exports = getTwitterUserNames();
