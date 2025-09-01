import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"
export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        picture: v.string(),
        subscriptionId: v.optional(v.string())
    }),
    designs: defineTable({
        name: v.string(),
        width: v.float64(),
        height: v.float64(),
        jsonTemplate: v.optional(v.any()),
        imagePreview: v.optional(v.string()),
        uid: v.id("users"),
    })
})