/**
 * Gitlab account repo scraper
 * @author Thomas vanBommel
 * @since 12-14-2020
 */
const http = require("http");

class GitLabScraper {
  constructor(options){
    this.url = `http://192.168.1.200:9080/api/v4/projects`;
    this.freq = options.freq ? options.freq : 1;
  }

  update = callback => {
    let req = http.request(this.url, res => {
      let result = "";

      // add up data received from youtube
      res.on("data", chunk => { result += chunk; });

      // parse the data into a js object
      res.on("end", () => {
        console.log(`${new Date().toISOString()} : Updated GitLabScraper Data`);
        callback(null, JSON.parse(result).sort((a, b) => {
          let A = new Date(a.last_activity_at);
          let B = new Date(b.last_activity_at);

          if(A === B) return 0;
          if(A > B) return -1;
          if(A < B) return 1;
        }));
      });
    });

    req.setHeader("User-Agent", "ThomasvanBommel");

    // callback error
    req.on("error", err => { callback(err); });

    // send request
    req.end();
  };

  middleware = (req, res, next) => {
    // if it's been an hour since the last update or data is undefined
    if(typeof this.data === "undefined" ||
       Date.now() - this.last_updated > 3600000 * this.freq){
      this.update((err, data) => {
        if(err) next(err);

        this.data = data;
        req.gitlab_data = data;
        next();
      });
    }else{
      req.gitlab_data = this.data;
      next();
    }
  };
}

module.exports = options => {
  return new GitLabScraper(options).middleware;
};
