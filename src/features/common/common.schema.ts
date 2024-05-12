import gql from "graphql-tag";

export const commonTypeDefs = gql`
    type CommonDeleteResponse {
        code: Int!
        success: Boolean!
        message: String
    }
`;
