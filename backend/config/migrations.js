const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = require('./database');

const umzug = new Umzug({
  migrations: {
    glob: './migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize }),
  context: sequelize.getQueryInterface(),
  logger: console,
});

(async () => {
  try {
    await umzug.up();
    console.log('Migrations executed successfully');
  } catch (error) {
    console.error('Migration failed', error);
  }
})();
