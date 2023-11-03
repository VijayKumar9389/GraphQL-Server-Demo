"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// schema.ts
const graphql_tools_1 = require("graphql-tools");
const project_schema_1 = require("./project/project.schema");
const project_resolvers_1 = __importDefault(require("./project/resolvers/project-resolvers"));
const schema = (0, graphql_tools_1.makeExecutableSchema)({
    typeDefs: [project_schema_1.projectTypeDefs],
    resolvers: [project_resolvers_1.default],
});
exports.default = schema;
//# sourceMappingURL=schema.js.map