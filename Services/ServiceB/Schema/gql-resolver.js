const GQLModel = require('./gql')

const gqlResolver = {
  GqlType: {
    __resolveReference: async (ref) => {
        return await GQLModel.findOne({ _id: ref._id });
      },
    },
  
  Query: {
    getStatus: async (parent, args) => {
      return await GQLModel.findById(args.id)
    },
    getAllStatus: async () => {
      return await GQLModel.find()
    },
  },
  Mutation: {
    clearAll: async ()=> {
      await GQLModel.deleteMany();
      console.log('All entries successfully deleted');
      return true;
    },
  }
};
module.exports = gqlResolver