const { companies } = require('../sampleData.js');

const { 
	GraphQLObjectType, 
	GraphQLID, 
	GraphQLString, 
    GraphQLInt,
    GraphQLList,
	GraphQLSchema
} = require('graphql');

// Company Type
const CompanyType = new GraphQLObjectType({   //by convention Uppercase
	name: 'company',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		street: {type: GraphQLString},
        zip: {type: GraphQLInt},
        city: {type: GraphQLString},
        state: {type: GraphQLString},
        country: {type: GraphQLString},
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		company: {
			type: CompanyType,
			args: { id: {type: GraphQLID} },
			resolve(parent, args) { // here is where we want to return our data -> later here mongoose to get data from the database
				return companies.find(company => company.id === args.id);
		    }
        },
        companies: {
            type: new GraphQLList(CompanyType),
            resolve(parent, args) {
                return companies;
            }
        }
	}
});

// now we need to export the schema as a module
module.exports = new GraphQLSchema({
	query: RootQuery
})