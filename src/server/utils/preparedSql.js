
// -- Get run count from Dec 2014
// select count(*) from "Entries"
// where extract(month from "date") = 12
// and extract(year from "date") = 2014;

// SELECT * FROM "Entries"
// WHERE "date"
// BETWEEN (now() - interval '1 week')
// AND now()

// Count of all runs for this week

exports.getThisWeekRunCount = `
SELECT count(*) FROM "Entries"
WHERE "date"
BETWEEN date_trunc('week', current_date)
AND current_date;
`;

// Count of all runs for last week
exports.getLastWeekRunCount = `
SELECT count(*) FROM "Entries"
WHERE "date"
BETWEEN date_trunc('week', current_date - interval '1 week')
AND date_trunc('week', current_date);
`;

// Count of all runs for this month
exports.getThisMonthRunCount = `
SELECT count(*) FROM "Entries"
WHERE "date"
BETWEEN date_trunc('month', current_date)
AND current_date;
`;

// Count of all runs for last month
exports.getLastMonthRunCount = `
SELECT count(*) FROM "Entries"
WHERE "date"
BETWEEN date_trunc('month', current_date - interval '1 month')
AND date_trunc('month', current_date);
`;

// Count of all runs for this year
exports.getThisYearRunCount = `
SELECT count(*) FROM "Entries"
WHERE "date"
BETWEEN date_trunc('year', current_date)
AND current_date;
`;

// Count of all runs for last year
exports.getLastYearRunCount = `
SELECT count(*) FROM "Entries"
WHERE "date"
BETWEEN date_trunc('year', current_date - interval '1 year')
AND date_trunc('year', current_date);
`;

exports.getMonthlyRunCount = `
SELECT extract(month from "date") as w, count(*) as c
FROM "Entries"
WHERE "date"
BETWEEN date_trunc('month', current_date - interval '1 month')
AND date_trunc('month', current_date)
GROUP BY w
ORDER BY w;
`;

exports.getRunCountData = `
SELECT extract(year from "date") as yr, extract(month from "date") as mnth, extract(week from "date") as wk, count(*) as rcount
FROM "Entries"
WHERE "date"
BETWEEN date_trunc('year', current_date - interval '1 year')
AND current_date
GROUP BY yr, mnth, wk
ORDER BY yr, mnth;
`;

exports.getBestRunData = `
SELECT extract(year from "date") as yr, extract(month from "date") as mnth, extract(week from "date") as wk, max("runningIndex") as bestRI, "date" as runDate
FROM "Entries"
WHERE "date"
BETWEEN date_trunc('year', current_date - interval '1 year')
AND current_date
GROUP BY yr, mnth, wk, runDate
ORDER BY yr, mnth, wk;
`;
