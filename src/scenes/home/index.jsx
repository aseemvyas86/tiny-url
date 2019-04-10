import React, { Component } from "react";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
import ShortenApi from "api/ShortenApi";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      allUrls: [],
      shortenUrl: ""
    };
    this.createUrl = this.createUrl.bind(this);
  }

  createUrl() {
    const { url } = this.state;
    debugger;
    if (!this.isUrl(url)) {
      return;
    }
    ShortenApi.createShortUrl(url).then(result => {
      const { originalUrl, shortenUrl, shorten } = result;
      this.setState({
        allUrls: [
          { url: originalUrl, shortenUrl: shortenUrl, shorten: shorten }
        ]
      });
    });
  }

  isUrl(str) {
    const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      return true;
    }
    else {
      return false;
    }
  }

  copyToClipBoard(value) {
    const tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }

  render() {
    const { allUrls } = this.state;
    return (
      <div>
        <br />
        <Card border="success">
          <Card.Body>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Paste a link to shorten it!"
                aria-label="Paste a link to shorten it!"
                aria-describedby="basic-addon2"
                onChange={e => {
                  this.setState({ url: e.target.value });
                }}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.createUrl}>
                  Shorten
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Card.Body>
        </Card>
        <br />
        {allUrls && allUrls.length > 0 && (
          <div>
            <hr />
            {allUrls.map(item => {
              return (
                <Card key={item.url}>
                  <Card.Body>
                    <Card.Title>
                      <Card.Link target="_blank" href={item.url}>
                        {item.url}
                      </Card.Link>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <span>
                        {item.shortenUrl}{" "}
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => {
                            this.copyToClipBoard(item.shortenUrl);
                          }}
                        >
                          <i class="fas fa-copy" /> Copy
                        </Button>{" "}
                      </span>
                      <Card.Link
                        style={{ float: "right" }}
                        href={encodeURI(`/app/details/${item.shorten}`)}
                      >
                        <i className="fas fa-chart-bar" />
                      </Card.Link>
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
