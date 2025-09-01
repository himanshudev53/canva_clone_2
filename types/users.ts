import { Id } from "@/convex/_generated/dataModel";

export interface IUser {
    _id: Id<"users">;
    _creationTime: number;
    subscriptionId?: string | undefined;
    name: string;
    email: string;
    picture: string;
}