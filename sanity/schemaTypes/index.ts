import { type SchemaTypeDefinition } from "sanity";

import { dailySummary } from "./dailySummary";
import { blogPost } from "./blogPost";
import { resourceCategory } from "./resourceCategory";
import { resource } from "./resource";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [dailySummary, blogPost, resourceCategory, resource],
};
