import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    email: v.string(),
    clerkUserid: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    posts: v.optional(v.array(v.id('posts')))
  }).index('byClerkUserid', ['clerkUserid']),
  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImageId: v.optional(v.id('_storage')),
    authorId: v.id('users'),
    likes: v.number()
  }).index('bySlug', ['slug'])
})
