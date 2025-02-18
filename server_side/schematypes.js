// schemaTypes.js
import { defineType } from "sanity";

export const schemaTypes = [
  defineType({
    name: "post",
    title: "Post",
    type: "document",
    fields: [
      { name: "title", title: "Title", type: "string" },
      { name: "content", title: "Content", type: "text" },
    ],
  }),
];
