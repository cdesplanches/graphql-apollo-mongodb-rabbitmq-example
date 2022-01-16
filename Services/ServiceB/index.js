const { ApolloServer } = require ('apollo-server');
const { buildSubgraphSchema } = require ('@apollo/subgraph');
const { PORT, environment } = require ('./app-config.js');
const mongoose = require('mongoose');
const typeDefs = require ("./Schema/gql-type");
const resolvers = require ("./Schema/gql-resolver");
const amqp = require('amqplib/callback_api');
const GQLModel = require('./Schema/gql');


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

      console.log('RabbitMQ connected successfully at ' + environment[env].rabbitmqString)

      /**
      * Apollo Server
      **/
      const server = new ApolloServer({
        schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
      });

      server.listen({ port: PORT })
        .then(({ url }) => {
            console.log(`GQL Example service B ready at url: ${url}`);

            connection.createChannel(function(error1, channel) {
              if (error1) {
                throw error1;
              }
              let order = 'Orders';

              channel.assertExchange(order, 'fanout', {
                durable: false
              });
          
              channel.assertQueue('', {
                exclusive: true
              }, function(error2, q) {
                if (error2) {
                  throw error2;
                }
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                channel.bindQueue(q.queue, order, '');
          
                channel.consume(q.queue, function(msg) {
                  if(msg.content) {
                      const obj = JSON.parse( msg.content.toString());
                      console.log(" [x] %s", obj.toString());
                      console.log(obj);

                      const status = new GQLModel();
                      status.name = "#" + obj.number + " of " + obj.name + " ready to be shipped";
                      status.status = "Ordered!"
                      status.save();
                    }
                }, {
                  noAck: true
                });
              })
            })
        });
    })
  })
  .catch( (err) => {
      console.error(err);
  })
