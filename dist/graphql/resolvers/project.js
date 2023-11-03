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
const projectResolvers = {
    Query: {
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
    },
    Mutation: {
        createProject: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { project } = args;
                // Check if the required fields are provided
                if (!project || !project.name) {
                    throw new Error('Project name is required.');
                }
                // Step 1: Create the project first
                const createdProject = yield prisma.project.create({
                    data: {
                        name: project.name,
                        notes: project.notes,
                        surveyLink: project.surveyLink,
                    },
                });
                // Step 2: Create an array to store nested stakeholders with TractRecords
                const stakeholdersWithTractRecords = [];
                // Loop through the provided stakeholders
                for (const stakeholderArgs of project.stakeholders || []) {
                    // Create the stakeholder and associate it with the project
                    const newStakeholder = yield prisma.stakeholder.create({
                        data: Object.assign(Object.assign({}, stakeholderArgs), { projectId: createdProject.id }),
                    });
                    // Create an array to store TractRecords
                    const tractRecords = [];
                    // Loop through the provided TractRecords for this stakeholder
                    for (const tractRecordArgs of stakeholderArgs.tractRecords || []) {
                        // Create the TractRecord and associate it with the stakeholder
                        const newTractRecord = yield prisma.tractRecord.create({
                            data: Object.assign(Object.assign({}, tractRecordArgs), { stakeholderId: newStakeholder.id }),
                        });
                        tractRecords.push(newTractRecord);
                    }
                    // Push the stakeholder with TractRecords into the array
                    stakeholdersWithTractRecords.push(Object.assign(Object.assign({}, newStakeholder), { tractRecords }));
                }
                // Step 3: Return the created project with nested stakeholders and TractRecords
                return Object.assign(Object.assign({}, createdProject), { stakeholders: stakeholdersWithTractRecords });
            }
            catch (error) {
                // Handle errors and throw an internal server error
                console.error('Error creating project:', error);
                throw new Error('Internal Server Error');
            }
        }),
    },
};
exports.default = projectResolvers;
//# sourceMappingURL=project.js.map