import type { StructureResolver } from "sanity/structure";

const SINGLETON_TYPES = new Set(["dailySummary"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Daily Summary")
        .id("dailySummary")
        .child(
          S.document().schemaType("dailySummary").documentId("dailySummary"),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETON_TYPES.has(item.getId() ?? ""),
      ),
    ]);
