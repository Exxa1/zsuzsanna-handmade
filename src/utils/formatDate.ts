// Hungarian-style year-month-day, e.g. "2026.06.01.". Built manually (not via
// Intl) using the UTC getters: publishedAt is a bare "YYYY-MM-DD" date, which
// JS parses as UTC midnight — reading it back with local getters could shift
// the day depending on the build machine's timezone.
export default function formatDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}.${month}.${day}.`;
}
