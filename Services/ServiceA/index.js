const { ApolloServer } = require ('apollo-server');
const { buildSubgraphSchema } = require ('@apollo/subgraph');
const { PORT, environment } = require ('./app-config.js');
const mongoose = require('mongoose');
const typeDefs = require ("./Schema/gql-type");
const resolvers = require ("./Schema/gql-resolver");
const amqp = require('amqplib/callback_api');


const env = process.env.NODE_ENV || "development";

/**
 * Mongoose Connection
**/
const options = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose
  .connect(environment[env].dbString, options)
  .then ( () => {
    console.log('MongoDB connected successfully at ' + environment[env].dbString)
  })
  .then ( () => {
    amqp.connect(environment[env].rabbitmqString, (error0, connection)=> {
      if (error0) {
        throw error0;
      }

      console.log('RabittMQ connected successfully at ' + environment[env].rabbitmqString)

      /**
      * Apollo Server
      **/
      const server = new ApolloServer({
        schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
        context: async() => ({
          publish: (msg) => {
            connection.createChannel( (error1, channel) => {
              if (error1) {
                throw error1;
              }
         
              let order = 'Orders';
              channel.assertExchange(order, 'fanout', {
                durable: false
              })

              channel.publish(order, '', Buffer.from(msg));
              console.log(" [x] Sent %s", msg);
            })
          },
        })
      });

      server.listen({ port: PORT })
        .then(({ url }) => {
            console.log(`GQL Example service A ready at url: ${url}`);
        });
    })
  })
  .catch( (err) => {
      console.error(err);
  })
