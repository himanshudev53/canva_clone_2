import { v } from "convex/values"
import { mutation } from "./_generated/server";
import { IUser } from "@/types";

export const CreateNewUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        picture: v.string()
    },
    handler: async (ctx, args): Promise<IUser> => {
        // Check if user already exists
        const existingUser = await ctx.db
            .query("users")
            .filter(q => q.eq(q.field("email"), args.email))
            .first();

        if (existingUser) {
            return existingUser as IUser;
        }

        // Create new user and return the full object
        const userId = await ctx.db.insert("users", {
            name: args.name,
            email: args.email,
            picture: args.picture
        });

        // Fetch the complete user object
        const newUser = await ctx.db.get(userId);
        if (!newUser) {
            throw new Error("Failed to create user");
        }

        return newUser as IUser;
    }
});