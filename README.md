# gitlab-scraper

"Scrapes" data from gitlab, like private and public repositories, profiles, commits, etc... It will do this once per hour by default, store the values, and add that information to express's `req.gitlab-data` object.

This is a JavaScript module, created for use with NodeJS and the [express](https://github.com/expressjs/express) module.

**Currently only works for my personal home-lab and account**

## TODO
 - [ ] code comments / jdoc
 - [ ] allow other usernames
 - [ ] access private repositories
 - [ ] access profile data
 - [ ] access commit data
 - [ ] allow public GitLab accounts

## Usage
```js
const GitLabScraper = require("./modules/gitlab-scraper/gitlab-scraper");
const express = require("express");

let app = express();

app.use(GitLabScraper({}));

app.all("*", (req, res) => {
  console.log(req.gitlab_data);
});
```
