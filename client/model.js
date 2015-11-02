import GraphQLTransport from './graphql_transport';

/*
  Model responsible for querying and mutation todos
*/
export default class TodosModel {
  constructor() {
    // create a new GraphQL transport
    // you'll use this to interact with the graphql endpoint
    this.transport = new GraphQLTransport('/graphql');

    // Get the initial data from the transport (it's a promise)
    this.dataPromise = this.transport
      // invoke the GraphQL query to get all the items
      .sendQuery(`
        {items}
      `)
      .then(res => res.items);
  }

  getAll() {
    // get all the items but we clone the content inside the promise
    return this.dataPromise
      .then(items => items.concat([]));
  }

  // Add a newItem and register a callback to fire after 
  // getting response from the server
  addItem(newItem, afterAdded) {
    this.transport
      // Invoke the GraphQL query, which invoke our `addItem` mutation
      .sendQuery(`
        mutation _ {
          item: addItem(item: "${newItem}")
        }
      `)
      .then(data => data.item)
      .then(item => {
        // if success, we replace the promise by adding the newly added item
        this.dataPromise = this.getAll().then(items => items.concat([newItem]));
      }, error => {
        // if there is an error, we simply log it
        console.error('Error adding item:', error);
      })
      // delay 600ms to show changes from optimistic updates
      .then(() => {
        return new Promise(resolve => setTimeout(resolve, 600))
      })
      .then(() => {
        // trigger the afterAdded callback with the updated data promise
        afterAdded(this.getAll());
      })

    // Add the item temporary to the data array to achieve
    // optimistic updates
    return this
      .getAll()
      .then(items => {
        items.push(`Adding "${newItem}" ...`);
        return items;
      });
  }
}