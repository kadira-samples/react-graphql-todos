import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

// In memory data store
const TodoStore = [
  "Learn some GraphQL",
  "Build a sample app"
];

// Root level queries
const TodosQuery = new GraphQLObjectType({
  name: "TodosQuery",
  fields: () => ({
    items: {
      type: new GraphQLList(GraphQLString),
      description: "List of todo items",
      resolve() {
        // close and send
        return TodoStore.concat([]);
      }
    }
  })
});

// Mutations
const TodosMutations = new GraphQLObjectType({
  name: 'TodosMutations',
  fields: () => ({
    addItem: {
      type: GraphQLString,
      description: "Add a new todo item",
      args: {
        item: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, {item}) {
        if(TodoStore.length >= 10) {
          // Remove the third time by keeping the first two
          TodoStore.splice(2, 1);
        }
        
        TodoStore.push(item);
        return item;
      }
    }
  })
});

// Schema
const TodosSchema = new GraphQLSchema({
  name: "TodosSchema",
  query: TodosQuery,
  mutation: TodosMutations
});

export default TodosSchema;