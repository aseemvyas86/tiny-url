import config from "config";

const endpoint = `${config.apiBaseUrl}/Create`;

class ShortenApi {
  static createShortUrl(longUrl) {
    return new Promise((resolve, reject) => {
      fetch(`${endpoint}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(longUrl)
      })
        .then(response => {
          return response.json();
        })
        .then(obj => {
          resolve(obj);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default ShortenApi;
