const faker = require('faker');
const jsonfile = require('jsonfile');
const uuidv4 = require('uuid/v4');

const numCompanies = 2;
const numShareholders = numCompanies*2;
const numMeetings = numCompanies*4;
const numAgreements = numMeetings*6;
const numVotes = numAgreements*10;

const vData = [];
const companies = [];
const shareholders = [];
const meetings = [];
const agreements = [];
const votes = []

const agreementTypes = [
    'Aumento o reducción de capital',
    'Autorización a administradores para que se dediquen a actividad inmersa en el objecto social',
    'Autorización a administradores para que se dediquen a actividad inmersa en el objeto social',
    'Exclusión y separación de socios',
    'Cambio de domicilio',
    'Supresión o limitación del derecho de prederencia en aumentos de capital',
    'Modificación estructural',
    'Cesión global de activo y pasivo',
]

faker.seed(1000);


function addTo(type, obj) {
  let i = 0; toAdd = {};
  switch(type) {
  case "company":
    i = Math.round(Math.random()*(numCompanies-1));
    toAdd = {...obj, PK: companies[i].PK}
    break;
  case "meeting":
    i = Math.round(Math.random()*(numMeetings-1));
    toAdd = {...obj, PK: meetings[i].PK}
    break;
  case "agreement":
    i = Math.round(Math.random()*(numAgreements-1));
    toAdd = {...obj, PK: agreements[i].PK}
    break;
  default:
    break;
  }
  vData.push(toAdd)
}

// create Companies
for (let i = 0; i < numCompanies; i++) {
    const id = uuidv4();
    const PK = `Company-${id}`;
    const SK = `Company-${id}`;
    const name = faker.company.companyName();

    const company = {
        PK, SK, name
    };
    companies.push(company);
    vData.push(company);
};

// create Shareholders
for (let i = 0; i < numShareholders; i++) {
    const id = uuidv4()
    const PK = `Shareholder-${id}`
    const SK = `Shareholder-${id}`
    const name = faker.name.findName()

    const shareholder = {
        PK, SK, name
    }
    shareholders.push(shareholder)
    vData.push(shareholder)

    // add to n companies randomly
    const n = Math.round(Math.random()*(numCompanies-1));
    for(let j=0; j<n; j++) {
        addTo('company', shareholder)
    }
}

// create Meetings
for (let i = 0; i < numMeetings; i++) {
  const id = uuidv4()
  const PK = `Meeting-${id}`
  const SK = `Meeting-${id}`

  const meeting = {
    PK,
    SK,
    start: faker.date.recent(),
    end: faker.date.future()
  }

  vData.push(meeting)
  meetings.push(meeting)

  addTo('company', meeting)
}


// // create/attach Agreements
for (let i = 0; i < numAgreements; i++) {
    const id = uuidv4()
    const PK = `Agreement-${id}`
    const SK = `Agreement-${id}`

    const agreement = {
      PK,
      SK,
      name: faker.random.arrayElement(agreementTypes)
    }
    agreements.push(agreement)
    addTo('meeting', agreement)
}

// create/attach Votes
for (let i = 0; i < numVotes; i++) {
  const id = uuidv4()
  const PK = `Vote-${id}`
  const SK = `Vote-${id}`


  const vote = {
    PK,
    SK,
    result: faker.random.number({ min: -1, max: 1 })
  }
  votes.push(vote)
  addTo('agreement', vote)
}

const vFile = 'vysae.json';

jsonfile.writeFileSync(vFile, vData, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('data created successfully');
  }
});
