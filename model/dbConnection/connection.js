const {MongoClient} = require('mongodb')
const state = {
  db: null
}

module.exports.connect = function(done) {
  const url = 'mongodb://0.0.0.0:27017';
  const client = new MongoClient(url)
  const dbName = 'ocean-tech';
  
  async function main() {
    try {
      await client.connect();
      console.log(`Database connected successfully to '${url}'`);
      state.db = client.db(dbName);

    } catch (error) {
      console.log(`DB Connection Error : ${error}`);
    }
  }

  main();
};

module.exports.get = ()=> {
  return state.db
}