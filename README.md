# Gemography

Gemography Backend Coding Challenge Solution

## Challenge Description

- Develop a REST microservice that list the languages used by the 100 trending public repos on GitHub.
- For every language, you need to calculate the attributes below:
  - Number of repos using this language.
  - The list of repos using the language.

## How to get Trending Repos from Github

- Fetching trending repositories simply translates to fetching the most starred repos created in the last 30 days ( from now ). To do that, you'll need to call the following endpoint: `https://api.github.com/search/repositories?q=created:>{date}&sort=stars&order=desc` and replace date with a `YYYY-MM-DD` date format.

- The JSON data from Github will be paginated. To get the `Second` page, you have to add `&page=2` to the end of your API request: `https://api.github.com/search/repositories?q=created:>{date}&sort=stars&order=desc&page=2`, to get the `Third` page, you have to add `&page=3`.

## How to start project

1. git clone `https://github.com/moatazgad/gemography.git`
2. cd `gemography`
3. run `npm install` to install project dependencies.
4. run `npm start` to start project.
5. Go to `http://localhost:3000/date` replace date with a `YYYY-MM-DD` date format.
