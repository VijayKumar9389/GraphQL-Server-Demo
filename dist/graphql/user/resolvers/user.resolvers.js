"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_queries_1 = __importDefault(require("./user.queries"));
const user_mutations_1 = __importDefault(require("./user.mutations"));
const userResolvers = {
    Query: Object.assign({}, user_queries_1.default),
    Mutation: Object.assign({}, user_mutations_1.default),
};
exports.default = userResolvers;
//# sourceMappingURL=user.resolvers.js.map