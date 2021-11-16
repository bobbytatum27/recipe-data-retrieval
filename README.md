# Overview
Simple script to get json-ld data, intended to get recipe data from a given URL.

# Prereqs
1. Clone this repo.
2. `npm install`

# Usage
`node scrape.mjs <url>`
- If the url's html does not contain json-ld data, this script will not print anything interesting.

# Word of Caution
Sometimes the html will have several scripts of json-ld. This script will only find one occurence of a json-ld script,
rather than all occurences.
