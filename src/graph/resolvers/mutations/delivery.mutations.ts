import {DeliveryInput} from "../../models/delivery.models";
import {Delivery, Package, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const deliveryMutations = {

    createDeliveryAndPackage: async (parent: any, args: { deliveryInput: DeliveryInput }, context: any): Promise<Delivery> => {
        const { date, status, projectId, packages } = args.deliveryInput;

        // Create a new Delivery
        const delivery: Delivery = await prisma.delivery.create({
            data: {
                date,
                status,
                projectId,
            },
        });

        // Create a new Package and connect it to the Delivery
        const createdPackage: Package = await prisma.package.create({
            data: {
                deliveryId: delivery.id,
                stakeholderId: packages[0].stakeholderId, // Assuming you have only one package
            },
        });

        // Update the Delivery to associate it with the created Package
        await prisma.delivery.update({
            where: { id: delivery.id },
            data: {
                packages: {
                    connect: { id: createdPackage.id },
                },
            },
        });

        // Update the Stakeholder to associate it with the created Package
        await prisma.stakeholder.update({
            where: { id: packages[0].stakeholderId },
            data: {
                package: {
                    connect: { id: createdPackage.id },
                },
            },
        });

        // Return the created Delivery
        return delivery;
    },
}

export default deliveryMutations;