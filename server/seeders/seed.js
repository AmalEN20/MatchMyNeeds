const db = require('../config/connection');
const { User, Request } = require('../models');
const userSeeds = require('./userSeeds.json');
const requestSeeds = require('./RequestSeeds.json');

db.once('open', async () => {
  try {
    await Request.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < requestSeeds.length; i++) {
      const { _id, requestBy } = await Request.create(requestSeeds[i]);
      const user = await User.findOneAndUpdate(
        { email: requestBy },
        {
          $addToSet: {
            requests: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
