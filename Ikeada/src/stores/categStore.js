import { makeObservable, observable, action } from "mobx";
import { interfaceBackEnd } from "../providers/interfaceBackEnd";

class categStore {
  categs = [];

  #service;

  constructor(service) {
    this.#service = service;

    makeObservable(this, {
      categs: observable,
      setCategs: action,
      // addCategs: action,
      // delCateg: action,
      // updateCateg: action,
    });
  }

  async getCategs() {
    const data = await this.#service.fetchCategs();
    this.setCategs(data);
  }

  setCategs(data) {
    this.categs = data.map((el) => {
      return new Categ(el);
    });
  }
}

class Categ {
  constructor(data) {
    (this.id = data.id), (this.name = data.name);
  }
}

export const categsStore = new categStore(interfaceBackEnd);
