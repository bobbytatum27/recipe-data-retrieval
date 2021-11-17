import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';
import { resolvePtr } from 'dns';

const all_recipes_url = 'https://www.delicious.com.au/recipes/collections/gallery/60-healthy-dinners-you-can-cook-in-30-minutes/1vo4q819';
const recipes_url_prefix = 'https://www.delicious.com.au';
const recipes_article_links = [];

const getRecipeLinks = async (url) => {
  const resp = await fetch(url);
  const body = await resp.text();

  const $ = cheerio.load(body);
  $('div.gallery-image.text-center').each((i, e) => {
    const a_href = $(e).find('a').attr('href');
    recipes_article_links.push(recipes_url_prefix + a_href);
  });

}

const getHtml = async (url) => {
  // get the html as text
  const resp = await fetch(url);
  const body = await resp.text();

  // use an html parser and query for the script
  const $ = cheerio.load(body);
  const json_ld = $('script[type="application/ld+json"]');

  // get the json-ld data. it will be a child node of the <script></script> tag
  const script_text = json_ld['0']['children'][0]['data'];
  return JSON.parse(script_text);
}

// Only supports ImageObjects (as opposed to supporting Arrays too). See schema.org/ImageObject
const getImage = (json_ld) => {
  if (typeof(json_ld['image']) == 'object') {
    return json_ld['image'];
  }
}

// Gets recipe name
const getName = (json_ld) => {
  return json_ld['name'];
}

// const json_ld_data = getHtml(process.argv[2])
//   .then((res) => {
//     console.log('Done');
//     return res;
//   })
//   .catch(() => {
//     console.log('Failed');
// });

getRecipeLinks(all_recipes_url)
  .then(() => {
    console.log(recipes_article_links);
  })
  .then(() => {
    for (const url of recipes_article_links) {
      const json_ld = getHtml(url)
        .then((res) => {
          console.log(res);
        });
    }
  })
