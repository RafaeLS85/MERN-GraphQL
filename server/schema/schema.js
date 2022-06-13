import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { projects, clients } from "../sampleData.js";

// client type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// project type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return clients.find((client) => client.id === parent.clientId);
      },
    },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve: () => clients,
    },
    client: {
      type: ClientType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return clients.find((client) => client.id === args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: () => projects,
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return projects.find((project) => project.id === args.id);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
});

// query example:
// {
//     client(id: "1"){
//       name,
//       email,
//       phone
//     }
// }

// {
//     clients {
//       name,
//       email,
//       phone
//     }
// }

export default schema;
