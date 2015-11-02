export default class TodosModel {
  constructor() {
    this.data = [
      "Learn Some GraphQL",
      "Build an app with GraphQL"
    ];
  }

  getAll() {
    return this.data.concat([]);
  }

  addItem(item, callback) {
    // sending the item for latency compensation
    setTimeout(() => {
      this.data.push(item);
      callback(this.getAll());
    }, 400);
    return this.data.concat([`adding "${item}" ...`]);
  }
}