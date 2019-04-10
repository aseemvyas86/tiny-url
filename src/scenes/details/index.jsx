import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";
import DetailApi from "api/DetailApi";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalUrl: "",
      shortenUrl: "",
      count: 0,
      details: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { url } = this.props.match.params;

    DetailApi.getDetails(url).then(result => {
      if (result) {
        const { shortenUrl, originalUrl, details } = result;
        const count = details.length;
        this.setState({
          details,
          originalUrl,
          shortenUrl,
          count
        });
      }
    });
  }

  render() {
    const { shortenUrl, originalUrl, details, count } = this.state;
    const {} = this.props.match.params;
    return (
      <div>
        <br />
        <Card>
          <Card.Body>
            <Card.Title>{`${window.location.origin}/${shortenUrl}`}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {originalUrl}
              <Card.Link style={{ float: "right" }}>
                {count} <i className="fas fa-chart-bar" />
              </Card.Link>
            </Card.Subtitle>
          </Card.Body>
        </Card>
        <br />
        {details && details.length > 0 && (
          <Card>
            <Card.Body>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Timestamp</th>
                    <th>Agent</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map(item => {
                    return (
                      <tr>
                        <td>{item.ipAddress}</td>
                        <td>{JSON.stringify(item.timeStamp)}</td>
                        <td>{item.deviceDetails}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}

export default Details;
