import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config';
import Schema from './schema';
import { graphql } from 'graphql';
import bodyParser from 'body-parser';

const devServer = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  setup(app) {
    app.use(bodyParser.json());
    app.use((req, res, next) => {
      if(req.url === '/graphql') {
        // Executing GraphQL query
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

devServer.listen(3000, 'localhost', (err, result) => {
  if(err) {
    throw err;
  }

  console.log('Listening at localhost:3000');
});

