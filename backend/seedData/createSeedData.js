const faker = require('faker');
const jsonfile = require('jsonfile');
const uuidv4 = require('uuid/v4');

const numCompanies = 2;
const numShareholders = 2;

const vData = [];
const companies = [];

faker.seed(1000);

// create Companies
for (let i = 0; i < numCompanies; i++) {
    const id = uuidv4()
    const PK = `Company-${id}`
    const SK = `Company-${id}`

    const company = {
        PK, SK
    }
    companies.push(company);
    vData.push(company)
}

// create Shareholders
for (let i = 0; i < numShareholders; i++) {
    const id = uuidv4()
    const PK = `Shareholder-${id}`
    const SK = `Shareholder-${id}`

    const shareholder = {
        PK, SK
    }
    vData.push(shareholder)

    // add to company
    const company = companies[Math.round(Math.random()*(numCompanies-1))]
    const cShareholder = {
        PK: company.PK,
        SK: shareholder.SK
    }
    vData.push(cShareholder)
}

const vFile = 'vysae.json';

jsonfile.writeFileSync(vFile, vData, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('data created successfully');
  }
});
