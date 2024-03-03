import { GraphQLScalarType, Kind } from "graphql";
import { DateTime } from "luxon";

export const CustomerScalars = {
    dateTimeScalar: new GraphQLScalarType({
        name: "DateTime",
        description: "Custom DateTime scalar type",
        serialize(value: DateTime) {
            return value.toISO();
        },
        parseValue(value: string) {
            return DateTime.fromISO(value);
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {
                return DateTime.fromISO(ast.value);
            }
            return null;
        },
    }),
};
