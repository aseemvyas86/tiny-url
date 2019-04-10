import config from "config";

const endpoint = `${config.apiBaseUrl}/Detail`;

class DetailApi {
  static getDetails(shorturl) {
    return new Promise((resolve, reject) => {
      fetch(`${endpoint}/${shorturl}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
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

export default DetailApi;
