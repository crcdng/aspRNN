/* global background, createButton, createCanvas, createDiv, createElement, createImg, createInput, createSpan, fill, getURL, loadFont, ml5, random, resizeCanvas, text, textFont, textSize, windowHeight, windowWidth */

const formFields = Array(10);

const form = [
  { email: ['Email: ', () => createInput('').attribute('size', '30')] },
  { firstname: ['First name: ', () => createInput('').attribute('size', '30')] },
  { surbane: ['Last name: ', () => createInput('').attribute('size', '30')] },
  { usecase: ['Intended use case: ', () => createElement('textarea', '').attribute('rows', '4').attribute('cols', '30')] },
  { category: ['Use case category: ', () => createInput('').attribute('size', '30')] },
  { country: ['Country / Region: ', () => createInput('').attribute('size', '30')] },
  { url: ['Website URL: ', () => createInput('').attribute('size', '30')] },
  { captcha: ['', () => createCaptcha()] },
  { submit: ['', () => createButton('Submit').style('background-color', 'rgb(107, 64, 216)').style('padding', '12px 12px').style('font-size', '18px').style('font-style', 'bold').style('color', 'white')] }
];

const consoleOutput = [
  'aspRNN v0.1.0 booting up',
  'initializing',
  'creating form',
  'generating form field values',
  'prompting charRNN',
  'populating form fields',
  'contacting OpenAI API Waitlist',
  'connecting to web interface',
  'submitting form',
  'waiting for response',
  'failed!',
  'done'
];

let charRnn, consoleFont, formDiv;
let modelLoaded = false;

function preload () {
  consoleFont = loadFont('assets/SourceCodePro-SemiBold.ttf');
}

function setup () {
  const mainInterval = 30000; // ms
  const lineInterval = 2000;
  const canvas = createCanvas((windowWidth * 0.60) - 20, windowHeight - 140);
  canvas.parent('left');
  background(11);

  console.log('ml5 version:', ml5.version);

  displayExplanation();

  const url = getURL();
  const re = /\?frame/;
  if (re.test(url)) {
    console.log('static frame');
    charRnn = ml5.charRNN('models/woolf/', () => { populateForm(formFields); });
    displayConsole(consoleOutput, 0, false);
  } else {
    console.log('dynamic version');
    charRnn = ml5.charRNN('models/woolf/', () => { modelLoaded = true; return modelLoaded; });
    displayConsole(consoleOutput, lineInterval, true);
    setInterval(() => {
      displayConsole(consoleOutput, lineInterval, true);
      formDiv.remove();
    }, mainInterval);
  }
}

function generateUseCase (rnn, seed, length, temperature) {
  return rnn.generate(
    {
      seed: seed,
      length: length,
      temperature: temperature
    }
  );
}

function draw () {}

function displayExplanation () {
  const top = createDiv('aspRNN (pronounced: ‘aspiring’) represents an Artificial Intelligence that aspires to improve its own capabilities.<br> Every 30 seconds, it generates a new dataset from a CharRNN generative model and a number of wordlists.<br> The result is submitted to the OpenAI API waitlist form in order to apply for access to GPT-3.').parent('top').style('font-size', '20px').style('font-family', 'AvenirNext,Helvetica Neue,Helvetica,Arial,sans-serif').style('font-style', 'italic');
}

function displayForm (fields) {
  formDiv = createDiv().parent('right').style('font-size', '22px').style('font-family', 'AvenirNext,Helvetica Neue,Helvetica,Arial,sans-serif');
  for (const [i, field] of fields.entries()) {
    const div = createDiv().parent(formDiv);
    createSpan(Object.values(field)[0][0]).parent(div);
    formFields[i] = (Object.values(field)[0][1])().parent(div);
  }
}

async function populateForm (fields) {
  const firstname = [ // source https://www.mother.ly/news/top-baby-names-of-the-decade
    'Noah',
    'Liam',
    'Jacob',
    'Mason',
    'William',
    'Ethan',
    'Michael',
    'Alexander',
    'James',
    'Elijah',
    'Emma',
    'Sophia',
    'Olivia',
    'Isabella',
    'Ava',
    'Mia',
    'Abigail',
    'Emily',
    'Madison',
    'Charlotte'
  ];

  const surname = // source: https://www.w3.org/2001/sw/rdb2rdf/wiki/Lists_of_generic_names_for_use_in_examples
  ['Adams',
    'Baker',
    'Clark',
    'Davis',
    'Evans',
    'Frank',
    'Ghosh',
    'Hills',
    'Irwin',
    'Jones',
    'Klein',
    'Lopez',
    'Mason',
    'Nalty',
    'Ochoa',
    'Patel',
    'Quinn',
    'Reily',
    'Smith',
    'Trott',
    'Usman',
    'Valdo',
    'White',
    'Xiang',
    'Yakub',
    'Zafar'
  ];

  const category = [ // source: https://share.hsforms.com/1Lfc7WtPLRk2ppXhPjcYY-A4sk30
    'Classification',
    'Semantic Search',
    'Data Processing',
    'Chat',
    'Question & Answer',
    'Interactive Games',
    'Summarization',
    'Content Generation',
    'Code Generation',
    'Language Translation',
    'Productivity Tools',
    'Creativity/Art',
    'General Exploration',
    'Other'
  ];

  const country = [ // source: https://textlists.info/geography/countries-of-the-world/
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'The Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo, Republic of the',
    'Congo, Democratic Republic of the',
    'Costa Rica',
    "Cote d'Ivoire",
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor (Timor-Leste)',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'The Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea, North',
    'Korea, South',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macedonia',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia, Federated States of',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar (Burma)',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States of America',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City (Holy See)',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe'
  ];

  const f = random(firstname);
  const s = random(surname);
  const email = `${f}.${s}@asprnn.test`;
  const url = 'https://www.asprnn.test';

  fields[0].attribute('value', email);
  fields[1].attribute('value', f);
  fields[2].attribute('value', s);
  const useCase = await generateUseCase(charRnn, 'I would like to apply for access to GPT-3', 77, 0.5);
  fields[3].html(useCase.sample);
  fields[4].attribute('value', random(category));
  fields[5].attribute('value', random(country));
  fields[6].attribute('value', url);
}

function createCaptcha () {
  return createImg('assets/captcha.png', 'Are you human?').style('width', '148px');
}

function displayConsole (lines, interval, dynamic) {
  background(11);
  textFont(consoleFont);
  textSize(28);
  lines.forEach((line, i) => {
    setTimeout(() => {
      if (i === 10) {
        alertConsoleLine(line, 20, 100 + 38 * i, dynamic);
      } else {
        displayConsoleLine(line, (i === 11 ? 1 : (i === 9 ? 5 : 3)), 20, 100 + 38 * i, dynamic);
      }
      if (i === 3) { displayForm(form); }
      if (i === 6 && modelLoaded) { populateForm(formFields); }
    }, (i + 1) * interval);
  });
}

function alertConsoleLine (line, x, y, dynamic) {
  const blinkInterval = dynamic ? 100 : 0;
  let visible = false;
  for (let r = 0; r < 6; r++) {
    setTimeout(() => {
      if (visible) {
        fill(253, 10, 7, 255);
      } else {
        fill(11, 11, 11, 255);
      }
      visible = !visible;
      text(line, x, y);
    }, r * blinkInterval);
  }
}

function displayConsoleLine (line, dots, x, y, dynamic) {
  const dotInterval = dynamic ? 250 : 0;
  textSize(28);
  fill(0, 102, 253, 255);
  for (let d = 1; d <= dots; d++) {
    setTimeout(() => {
      text(addDot(line, d), x, y);
    }, (d + 1) * dotInterval);
  }
}

function addDot (s, d) {
  return s + '.'.repeat(d);
}

function windowResized () {
  resizeCanvas((windowWidth * 0.60) - 20, windowHeight - 140);
  background(11);
}
