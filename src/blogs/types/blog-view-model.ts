// Blog's view-model to return via API.
export type BlogViewModel = {
    id: string;
    name: string;
    description: string,
    websiteUrl: string,
    createdAt: Date,
    isMembership: boolean,
};
