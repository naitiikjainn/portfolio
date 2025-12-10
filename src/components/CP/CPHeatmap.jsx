import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function CPHeatmap({ username }) {
  const [values, setValues] = useState([]);
  const [stats, setStats] = useState(null);

  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://codeforces.com/api/user.status?handle=${username}&from=1&count=10000`
        );
        const data = await res.json();

        if (data.status !== "OK") return;

        const mp = {};

        data.result.forEach((s) => {
          if (s.verdict === "OK") {
            const d = new Date(s.creationTimeSeconds * 1000);
            const key = formatDate(d);
            mp[key] = (mp[key] || 0) + 1;
          }
        });

        const vals = Object.keys(mp).map((date) => ({
          date,
          count: mp[date],
        }));

        setValues(vals);

        // -------------------------------
        //          ANALYTICS PART
        // -------------------------------
        const totalSolved = vals.reduce((a, b) => a + b.count, 0);
        const activeDays = vals.length;
        const avg = (totalSolved / activeDays).toFixed(2);

        // most active day
        const mostActive = vals.reduce((max, v) =>
          v.count > max.count ? v : max
        );

        // best month
        const monthMap = {};
        vals.forEach((v) => {
          const m = v.date.slice(0, 7); // YYYY-MM
          monthMap[m] = (monthMap[m] || 0) + v.count;
        });

        const bestMonth = Object.entries(monthMap).sort(
          (a, b) => b[1] - a[1]
        )[0];

        // longest streak
        let streak = 0,
          bestStreak = 0;
        const datesSet = new Set(vals.map((v) => v.date));

        let cur = new Date(startDate);
        while (cur <= endDate) {
          const key = formatDate(cur);
          if (datesSet.has(key)) streak++;
          else streak = 0;
          bestStreak = Math.max(bestStreak, streak);
          cur.setDate(cur.getDate() + 1);
        }

        setStats({
          totalSolved,
          activeDays,
          avg,
          mostActive,
          bestMonth,
          bestStreak,
        });
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [username]);

  const classForValue = (v) => {
    if (!v || v.count === 0) return "cf-empty";
    if (v.count < 2) return "cf-1";
    if (v.count < 5) return "cf-2";
    if (v.count < 10) return "cf-3";
    return "cf-4";
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Heatmap */}
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={values}
        gutterSize={4}
        classForValue={classForValue}
      />

      {/* Insights Section */}
      {stats && (
        <div className="cp-stats">

          <p>🔥 <strong>Total Problems:</strong> {stats.totalSolved}</p>
          <p>🟣 <strong>Active Days:</strong> {stats.activeDays}</p>
          <p>📅 <strong>Most Active Day:</strong> {stats.mostActive.date} ({stats.mostActive.count} problems)</p>
          {/* <p>🏆 <strong>Best Month:</strong> {stats.bestMonth[0]} ({stats.bestMonth[1]} problems)</p> */}
          <p>🔥 <strong>Longest Streak:</strong> {stats.bestStreak} days</p>
          {/* <p>📈 <strong>Average per Active Day:</strong> {stats.avg}</p> */}
        </div>
      )}
    </div>
  );
}

export default CPHeatmap;
