const axios = require('axios');
const getTop100Collections = require("./getTop100Collections");

async function getGeneralCollectionData() {
  // {name: string, slug: string, logo: string}
  const top100Collections = await getTop100Collections();
  const apiCalls = await Promise.all(top100Collections.map(async ({name, slug}) => {
    const { data } = await axios.get("https://api.opensea.io/api/v1/collection/" + slug);
    return data.collection;
  }));
  return apiCalls;
}

module.exports = getGeneralCollectionData;

// getGeneralCollectionData().then(async dataJson => {
//   const str = JSON.stringify(dataJson);
//   await require("fs").promises.writeFile(__dirname + "../../output/generalCollectionData.json", str);
// })