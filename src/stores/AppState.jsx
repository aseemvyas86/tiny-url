import { extendObservable } from "mobx";

class AppState {
  constructor() {
    extendObservable(this, {
      history: null,
      language: "en"
    });
  }
}

const singleton = new AppState();
export default singleton;
