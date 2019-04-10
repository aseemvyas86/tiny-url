import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { inject, observer } from "mobx-react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import Home from "./scenes/home";
import Error from "./error";
import Details from "./scenes/details";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container>
          <Row>
            <Col xs={12}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/details/:url" component={Details} />
                <Route component={Error} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default inject("routing")(observer(App));
