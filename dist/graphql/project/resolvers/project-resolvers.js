"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// project/resolvers/projectResolvers.ts
const project_queries_1 = __importDefault(require("./project-queries"));
const project_mutations_1 = __importDefault(require("./project-mutations"));
const projectResolvers = {
    Query: Object.assign({}, project_queries_1.default),
    Mutation: Object.assign({}, project_mutations_1.default),
};
exports.default = projectResolvers;
//# sourceMappingURL=project-resolvers.js.map