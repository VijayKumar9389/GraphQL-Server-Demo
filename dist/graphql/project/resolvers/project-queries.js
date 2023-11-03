"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const projectQueries = {
    projects: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allProjects = yield context.prisma.project.findMany();
            console.log('All Projects:', allProjects);
            return allProjects;
        }
        catch (error) {
            console.error(`Error fetching projects: ${error.message}`);
            throw error;
        }
    }),
    getProjectWithStakeholders: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { projectId } = args;
            // Use Prisma to fetch the project by projectId along with its related Stakeholders and Tract Records
            const project = yield context.prisma.project.findUnique({
                where: {
                    id: projectId,
                },
                include: {
                    stakeholders: {
                        include: {
                            tractRecords: true,
                        },
                    },
                },
            });
            if (!project) {
                throw new Error(`Project with id ${projectId} not found.`);
            }
            return project;
        }
        catch (error) {
            console.error(`Error fetching project with stakeholders: ${error.message}`);
            throw error;
        }
    }),
    getStakeholdersByProjectAndTractNumber: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { projectId, tractNumber } = args;
            // Use Prisma to fetch the stakeholders associated with the given project and tract number
            const stakeholders = yield context.prisma.stakeholder.findMany({
                where: {
                    project: {
                        id: projectId,
                    },
                    tractRecords: {
                        some: {
                            tract: tractNumber,
                        },
                    },
                },
                include: {
                    tractRecords: true,
                },
            });
            return stakeholders;
        }
        catch (error) {
            console.error(`Error fetching stakeholders: ${error.message}`);
            throw error;
        }
    }),
};
exports.default = projectQueries;
//# sourceMappingURL=project-queries.js.map