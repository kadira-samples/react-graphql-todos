import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config';
import Schema from './schema';
import { graphql } from 'graphql';
import bodyParser from 'body-parser';

const {NODE_ENV} = process.env;
const IS_PRODUCTION = NODE_ENV === "production";

// Configure webpck dev server
const devServer = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: !IS_PRODUCTION,
  compress: IS_PRODUCTION,
  historyApiFallback: true,
  // Hook into the internal express app and add our middlewares
  setup(app) {
    // We pass GraphQL information as JSON. So, we need a JSON parser
    app.use(bodyParser.json());
    // Some how adding a route does not work here.
    // We need to add a middleware to process GraphQL queries
    app.use((req, res, next) => {
      if(req.url === '/graphql' && req.method === "POST") {
        // Executing the GraphQL query
        const {query, vars} = req.body;
        graphql(Schema, query, null, vars).then(result => {
          res.send(result);
        });
      } else {
        next();
      }
    });
  }
});

devServer.listen(3000, (err, result) => {
  if(err) {
    throw err;
  }

  console.log('Listening at localhost:3000');
});

