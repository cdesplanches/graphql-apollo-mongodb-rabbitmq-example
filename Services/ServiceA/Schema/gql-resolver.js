const GQLModel = require('./gql')

const gqlResolver = {
  GqlType: {
    __resolveReference: async (ref) => {
        return await GQLModel.findOne({ _id: ref._id });
      },
    },
  
  Query: {
    getOrder: async (parent, args) => {
      return await GQLModel.findById(args.id)
    },
    getAllOrders: async () => {
      return await GQLModel.find()
    },
  },
  Mutation: {
    buy: async (parent, args, ctx) => {
      let order = new GQLModel(args)

      // Send a message to the RabbitMQ queue.
      ctx.publish(JSON.stringify(order));

      return await order.save()
    },

    clearOrders: async ()=> {
      await GQLModel.deleteMany();
      console.log('All entries successfully deleted');
      return true;
    },
  }
};
module.exports = gqlResolver