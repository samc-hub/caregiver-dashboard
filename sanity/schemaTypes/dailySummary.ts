import { defineField, defineType } from "sanity";

export const dailySummary = defineType({
  name: "dailySummary",
  title: "Daily Summary",
  type: "document",
  fields: [
    defineField({
      name: "careRecipientName",
      title: "Care Recipient Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relationship",
      title: "Relationship",
      type: "string",
      description: "e.g. Mother, Father, Spouse",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "moodStatus",
      title: "Mood / Status",
      type: "string",
      options: {
        list: [
          { title: "Calm", value: "calm" },
          { title: "Restless", value: "restless" },
          { title: "Engaged", value: "engaged" },
          { title: "Sleeping", value: "sleeping" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "shortSummary",
      title: "Short Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "notesOrFlags",
      title: "Notes or Flags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "activities",
      title: "Recent Activities",
      type: "array",
      of: [
        {
          type: "object",
          name: "activity",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (r) => r.required(),
            },
            { name: "time", title: "Time", type: "string" },
            { name: "note", title: "Note", type: "string" },
          ],
          preview: {
            select: { title: "title", subtitle: "time" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "careRecipientName",
      subtitle: "relationship",
      media: "photo",
    },
  },
});
