import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const getHtml = async (url) => {
  // get the html as text
  const resp = await fetch(url);
  const body = await resp.text();

  // use an html parser and query for the script
  const $ = cheerio.load(body);
  const json_ld = $('script[type="application/ld+json"]');

  // get the json-ld data. it will be a child node of the <script></script> tag
  const script_text = json_ld['0']['children'][0]['data'];
  console.log(JSON.parse(script_text));
}

getHtml(process.argv[2])
  .then(() => {
    console.log('Done');})
  .catch(() => {
    console.log('Failed');
});
