/**
 * Search and filtering helpers for the regulatory snapshot.
 * Pure functions so filtering is testable without DOM or network access.
 */
export function filterUpdates(items, { status = "all", topic = "all", query = "" } = {}) {
  const term = String(query ?? "").trim().toLocaleLowerCase("en");
  return items.filter((item) => {
    if (status !== "all" && item.status !== status) return false;
    if (topic !== "all" && item.topic !== topic) return false;
    if (!term) return true;
    const searchable = [
      item.title, item.code, item.topic, item.summary,
      item.why, item.action, item.note, item.period
    ].join(" ").toLocaleLowerCase("en");
    return searchable.includes(term);
  });
}
export function countByStatus(items) {
  return items.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] ?? 0) + 1;
    return acc;
  }, { all: items.length, issued:0, draft:0, legislation:0, baseline:0 });
}
export function validateUpdates(items, sources, statusInfo) {
  const errors = [];
  const idSet = new Set();
  const sourceIds = new Set(sources.map(source => source.id));
  for (const item of items) {
    if (!item.id || idSet.has(item.id)) errors.push("Duplicate or missing ID: "+item.id);
    idSet.add(item.id);
    if (!statusInfo[item.status]) errors.push("Unknown status: "+item.id);
    if (!item.title || !item.summary || !item.action || !item.note || !item.sourceIds?.length) errors.push("Missing content: "+item.id);
    for (const id of item.sourceIds ?? []) if (!sourceIds.has(id)) errors.push("Missing source: "+item.id+" -> "+id);
  }
  for (const source of sources) {
    if (!/^https:\/\//.test(source.url)) errors.push("Non-HTTPS link: "+source.id);
  }
  return errors;
}
