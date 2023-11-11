export interface DeliveryInput {
    date: string;
    status: string;
    projectId: number;
    packages: PackageInput[];
}

// Input type for creating a Package object
export interface PackageInput {
    deliveryId: number; // Add deliveryId
    stakeholderId: number;
}
