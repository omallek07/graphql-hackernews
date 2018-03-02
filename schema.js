const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

//Hardcoded data
const customers = [
  {id: '1', name: 'John Doe', email: 'jdoe@gmail.com', age: 35},
  {id: '2', name: 'Steve Smith', email: 'ssmith@gmail.com', age: 50},
  {id: '3', name: 'Sarah Joe', email: 'sjoe@gmail.com', age: 20},
  {id: '4', name: 'Henry Best', email: 'hbest@gmail.com', age: 80},
]

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString}
  })
})

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  customer: {
    type: CustomerType,
    args: {
      id: {GraphQLString}
    },
    resolve(parentValue, args){
      for (let i = 0; i < customers.length; i++) {
        if (customers[i].id == args.id){
          return customers[i];
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
