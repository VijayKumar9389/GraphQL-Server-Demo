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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTractRecords = exports.createStakeholder = void 0;
// Import necessary modules and types
const client_1 = require("@prisma/client");
// Create an instance of PrismaClient
const prisma = new client_1.PrismaClient();
// Function to create a stakeholder
const createStakeholder = (project, stakeholderArgs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract tractRecords from stakeholderArgs
        const { tractRecords } = stakeholderArgs, stakeholderData = __rest(stakeholderArgs, ["tractRecords"]);
        // Step 1: Create the stakeholder
        const newStakeholder = yield prisma.stakeholder.create({
            data: Object.assign(Object.assign({}, stakeholderData), { projectId: project.id }),
        });
        // Step 2: If tractRecords are provided, create and associate them
        if (tractRecords && tractRecords.length > 0) {
            const createdTractRecords = yield (0, exports.createTractRecords)(newStakeholder.id, tractRecords);
            // Connect the created TractRecords to the Stakeholder
            yield prisma.stakeholder.update({
                where: { id: newStakeholder.id },
                data: {
                    tractRecords: {
                        connect: createdTractRecords.map((tractRecord) => ({ id: tractRecord.id })),
                    },
                },
            });
        }
        // Return the created stakeholder
        return newStakeholder;
    }
    catch (error) {
        // Handle errors and throw an internal server error
        console.error('Error creating stakeholder:', error);
        throw new Error('Internal Server Error');
    }
});
exports.createStakeholder = createStakeholder;
// Function to create TractRecords and return them
const createTractRecords = (stakeholderId, tractRecords) => __awaiter(void 0, void 0, void 0, function* () {
    const createdTractRecords = yield Promise.all(tractRecords.map((tractRecordArgs) => __awaiter(void 0, void 0, void 0, function* () {
        const newTractRecord = yield prisma.tractRecord.create({
            data: Object.assign(Object.assign({}, tractRecordArgs), { stakeholderId }),
        });
        return newTractRecord;
    })));
    return createdTractRecords;
});
exports.createTractRecords = createTractRecords;
//# sourceMappingURL=project.service.js.map