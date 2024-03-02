//temporary mock

export const mockResolvers = {
    Query: {
        // Mocking a query to return a list of users
        users: () => [
            { id: "1", username: "JohnDoe", email: "john@example.com" },
            { id: "2", username: "JaneDoe", email: "jane@example.com" },
        ],
    },
    Mutation: {
        // Mocking a mutation to add a new user
        addUser: (_, { username, email }) => {
            const newUser = {
                id: Date.now().toString(), // Mocking a unique ID generation
                username,
                email,
            };
            // In a real app, you would save this to the database
            return newUser;
        },
    },
};

export const resolvers = [mockResolvers];
