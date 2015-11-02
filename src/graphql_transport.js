import fetch from 'isomorphic-fetch';

export default class GraphQLTransport {
  constructor(path = "/graphql") {
    this.path = path;
  }

  sendQuery(query, vars = {}) {
    return new Promise((resolve, error) => {
      fetch(this.path, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query,
          vars
        })
      })
      .then(res => res.json())
      .then(response => {
        if(response.errors) {
          return error(response.errors);
        }

        return resolve(response.data);
      })
      .catch(error);
    });
  }
}