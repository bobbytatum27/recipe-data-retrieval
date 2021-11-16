# Overview
Simple script to get json-ld data, intended to get recipe data from a given URL.

# Prereqs
1. Clone this repo.
2. `npm install`

# Usage
`node scrape.mjs <url>`
- If <url> does not contain json-ld data, nothing will be printed.

# Word of Caution
Sometimes the html will have several scripts of json-ld. This script will only find one occurence of a json-ld script,
rather than all occurences.
