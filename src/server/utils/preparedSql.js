
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
SELECT "date", "runningIndex" as value
FROM "Entries"
WHERE date_trunc('year', "date") = date_trunc('year', now())
AND "runningIndex" IN
  (SELECT  max("runningIndex") as value
  FROM "Entries"
  WHERE date_trunc('year', "date") = date_trunc('year', now())
)
ORDER BY DATE DESC
LIMIT 1;
`;

exports.getBestRunLastYear = `
SELECT "date", "runningIndex" as value
FROM "Entries"
WHERE date_trunc('year', "date") = date_trunc('year', now() - interval '1 year')
AND "runningIndex" IN
  (SELECT  max("runningIndex") as value
  FROM "Entries"
  WHERE date_trunc('year', "date") = date_trunc('year', now() - interval '1 year')
)
ORDER BY DATE DESC
LIMIT 1;
`;

exports.getBestRunThisMonth = `
SELECT "date", "runningIndex" as value
FROM "Entries"
WHERE date_trunc('month', "date") = date_trunc('month', now())
AND "runningIndex" IN
  (SELECT  max("runningIndex") as value
  FROM "Entries"
  WHERE date_trunc('month', "date") = date_trunc('month', now())
)
ORDER BY DATE DESC
LIMIT 1;
`;

exports.getBestRunLastMonth = `
SELECT "date", "runningIndex" as value
FROM "Entries"
WHERE date_trunc('month', "date") = date_trunc('month', now() - interval '1 month')
AND "runningIndex" IN
  (SELECT  max("runningIndex") as value
  FROM "Entries"
  WHERE date_trunc('month', "date") = date_trunc('month', now() - interval '1 month')
)
ORDER BY DATE DESC
LIMIT 1;
`;

exports.getBestRunThisWeek = `
SELECT "date", "runningIndex" as value
FROM "Entries"
WHERE date_trunc('week', "date") = date_trunc('week', now())
AND "runningIndex" IN
  (SELECT  max("runningIndex") as value
  FROM "Entries"
  WHERE date_trunc('week', "date") = date_trunc('week', now())
)
ORDER BY DATE DESC
LIMIT 1;
`;

exports.getBestRunLastWeek = `
SELECT "date", "runningIndex" as value
FROM "Entries"
WHERE date_trunc('week', "date") = date_trunc('week', now() - interval '1 week')
AND "runningIndex" IN
  (SELECT  max("runningIndex") as value
  FROM "Entries"
  WHERE date_trunc('week', "date") = date_trunc('week', now() - interval '1 week')
)
ORDER BY DATE DESC
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

exports.getThisMonthRIAverage = `
SELECT avg("runningIndex"), count(*) as count
FROM "Entries"
WHERE "date"
BETWEEN date_trunc('month', current_date)
AND current_date;
`;

exports.getRIAverageByDayOfWeek = `
SELECT avg("runningIndex"), count(*) as count, extract(dow from date) as day
FROM "Entries"
GROUP BY day
ORDER BY day;
`;
