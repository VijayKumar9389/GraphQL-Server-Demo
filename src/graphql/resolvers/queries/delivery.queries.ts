import { Stakeholder } from '@prisma/client';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const getDeliveriesWithStakeholders = async (projectId: number) => {
    try {
        const deliveriesWithStakeholders = await prisma.delivery.findMany({
            where: {projectId},
            include: {
                project: true,
                packages: {
                    include: {
                        stakeholder: true,
                    },
                },
            },
        });

        return deliveriesWithStakeholders;
    } catch (error) {
        // Handle errors appropriately
        console.error("Error retrieving deliveries with stakeholders:", error);
        throw new Error("Failed to retrieve deliveries with stakeholders");
    }
};

const deliveryQueries = {
    getDeliveriesWithStakeholders: async (parent: any, args: any, context: any) => {
        const { projectId } = args;
        const deliveries = await getDeliveriesWithStakeholders(projectId);
        return deliveries;
    },
}

export default deliveryQueries;