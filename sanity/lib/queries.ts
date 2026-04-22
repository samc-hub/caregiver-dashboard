import { defineQuery } from "groq";

export const dailySummaryQuery = defineQuery(`
  *[_type == "dailySummary" && _id == "dailySummary"][0]{
    careRecipientName,
    relationship,
    photo,
    moodStatus,
    shortSummary,
    notesOrFlags,
    activities[]{ title, time, note }
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    author,
    publishedAt,
    featuredImage,
    excerpt
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    author,
    publishedAt,
    featuredImage,
    excerpt,
    body
  }
`);

export const postSlugsQuery = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)][].slug.current
`);

export const resourcesByCategoryQuery = defineQuery(`
  *[_type == "resourceCategory"] | order(title asc){
    _id,
    title,
    "slug": slug.current,
    description,
    "resources": *[_type == "resource" && references(^._id)] | order(title asc){
      _id,
      title,
      shortDescription,
      thumbnail,
      externalUrl
    }
  }
`);
