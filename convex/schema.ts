import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        email: v.string(),
        clerkUserid: v.string(), // Use v.string() instead of v.any.toString()
        firstName: v.optional(v.string()),
        lastName: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        posts: v.optional(v.array(v.id('posts')))
    }).index('byClerkUserId', ['clerkUserid']), // Ensure the field name matches the schema
    posts: defineTable({
        title: v.string(),
        slug: v.string(), // Use v.string() instead of v.any.toString()
        excerpt: v.string(),
        content: v.string(),
        coverImageId: v.optional(v.id('_storage')),
        authorId: v.id('users'),
        liked: v.number()
    }).index('bySlug', ['slug']),
});
