const faker = require('faker');
const jsonfile = require('jsonfile');

const numCompanies = 10;

const cData = [];

faker.seed(1000);

for (let i = 0; i < numCompanies; i++) {
    const name = faker.internet.userName();
    const companyInfo = { name }
    cData.push(companyInfo);
}

const cFile = 'vysae.json';

jsonfile.writeFileSync(cFile, cData, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('data created successfully');
  }
});
