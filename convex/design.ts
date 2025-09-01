import { v } from "convex/values"
import { mutation, query } from "./_generated/server";

export const CreateNewDesign = mutation({
    args: {
        name: v.string(),
        height: v.number(),
        width: v.number(),
        uid: v.id("users"),
    },
    handler: async (ctx, args) => {
        console.log({ args })
        const result = await ctx.db.insert("designs", {
            name: args.name,
            height: args.height,
            width: args.width,
            uid: args.uid
        })
        return result
    }
})

export const GetDesignById = query({
    args: {
        id: v.id("designs")
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.get(args.id);
        return result
    }
})
export const SaveDesign = mutation({
    args: {
        id: v.id("designs"),
        jsonDesign: v.any()
    },
    handler: async (ctx, args_0) => {
        const result = await ctx.db.patch(args_0.id, {
            jsonTemplate: args_0.jsonDesign
        })
        return result
    },
})
export const UpdateDesignName = mutation({
    args: {
        id: v.id("designs"),
        name: v.string()
    },
    handler: async (ctx, args_0) => {
        const result = await ctx.db.patch(args_0.id, {
            name: args_0.name
        })
        return result
    },
})

export const GetDesignBuUserId = query({
    args: {
        uid: v.id("users")
    },
    handler: async (ctx, args_0) => {
        const result = await ctx.db.query("designs").filter(q => q.eq(q.field("uid"), args_0.uid)).collect();
        return result
    },
})