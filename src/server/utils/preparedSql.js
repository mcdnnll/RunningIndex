
exports.getRunCountData = `
SELECT extract(year from "date") as yr, extract(month from "date") as mnth, extract(week from "date") as wk, count(*) as rcount
FROM "Entries"
WHERE "date"
BETWEEN date_trunc('year', current_date - interval '1 year')
AND current_date
GROUP BY yr, mnth, wk
ORDER BY yr, mnth;
`;

exports.getBestRunThisYear = `
SELECT "date", max("runningIndex") as value
FROM "Entries"
WHERE "date"
BETWEEN date_trunc('year', current_date)
AND current_date
GROUP by "date"
ORDER BY value DESC
LIMIT 1;
`;

exports.getBestRunLastYear = `
SELECT "date", max("runningIndex") as value
FROM "Entries"
WHERE "date"
BETWEEN date_trunc('year', current_date - interval '1 year')
AND date_trunc('year', current_date)
GROUP by "date"
ORDER BY value DESC
LIMIT 1;
`;

exports.getBestRunThisMonth = `
SELECT "date", max("runningIndex") as value
FROM "Entries"
WHERE "date"
BETWEEN date_trunc('month', current_date)
AND current_date
GROUP by "date"
ORDER BY value, "date" DESC
LIMIT 1;
`;

exports.getBestRunLastMonth = `
SELECT "date", max("runningIndex") as value
FROM "Entries"
WHERE "date"
BETWEEN date_trunc('month', current_date - interval '1 month')
AND date_trunc('month', current_date)
GROUP by "date"
ORDER BY value, "date" DESC
LIMIT 1;
`;

exports.getBestRunThisWeek = `
SELECT "date", max("runningIndex") as value
FROM "Entries"
WHERE "date"
BETWEEN date_trunc('week', current_date)
AND current_date
GROUP by "date"
ORDER BY value, "date" DESC
LIMIT 1;
`;

exports.getBestRunLastWeek = `
SELECT "date", max("runningIndex") as value
FROM "Entries"
WHERE "date"
BETWEEN date_trunc('week', current_date - interval '1 week')
AND date_trunc('week', current_date)
GROUP by "date"
ORDER BY value, "date" DESC
LIMIT 1;
`;

exports.getAnnualMonthlyRIAverage = `
SELECT avg("runningIndex"), count(*) as count, extract(month from date) as mnth, extract(year from date) as yr
FROM "Entries"
GROUP BY mnth, yr
ORDER BY yr, mnth;
`;

exports.getMonthlyRIAverage = `
SELECT avg("runningIndex"), count(*) as count, extract(month from date) as mnth
FROM "Entries"
GROUP BY mnth
ORDER BY mnth;
`;

exports.getRIAverageByDayOfWeek = `
SELECT avg("runningIndex"), count(*) as count, extract(dow from date) as day
FROM "Entries"
GROUP BY day
ORDER BY day;
`;
