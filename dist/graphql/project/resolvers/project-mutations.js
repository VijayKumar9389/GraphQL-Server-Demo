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
const project_service_1 = require("../services/project.service");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const projectMutations = {
    createProject: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { project } = args;
            const { prisma } = context;
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
            const createdStakeholders = yield Promise.all(project.stakeholders.map((stakeholderArgs) => __awaiter(void 0, void 0, void 0, function* () {
                const newStakeholder = yield (0, project_service_1.createStakeholder)(createdProject, stakeholderArgs);
                // If there are TractRecords, create them and associate with the Stakeholder
                if (stakeholderArgs.tractRecords && stakeholderArgs.tractRecords.length > 0) {
                    const createdTractRecords = yield (0, project_service_1.createTractRecords)(newStakeholder.id, stakeholderArgs.tractRecords);
                    // Add the created TractRecords to the Stakeholder
                    yield prisma.stakeholder.update({
                        where: { id: newStakeholder.id },
                        data: {
                            tractRecords: {
                                connect: createdTractRecords.map((tractRecord) => ({ id: tractRecord.id })),
                            },
                        },
                    });
                }
                return newStakeholder;
            })));
            // Return the created project with associated stakeholders
            return Object.assign(Object.assign({}, createdProject), { stakeholders: createdStakeholders });
        }
        catch (error) {
            // Handle errors and throw an internal server error
            console.error('Error creating project:', error);
            throw new Error('Internal Server Error');
        }
    }),
};
exports.default = projectMutations;
//# sourceMappingURL=project-mutations.js.map