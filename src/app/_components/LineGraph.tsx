"use client";

import { Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useState, FormEvent, useRef } from "react";

const CATEGORIES = [
  { key: "activityPoints", label: "Activity Points", color: "#8884d8" },
  { key: "carbs", label: "Carbs (%)", color: "#bfcc35" },
  { key: "protein", label: "Protein (%)", color: "#cc3560" },
  { key: "produce", label: "Produce (%)", color: "#279645" },
  { key: "mood", label: "Mood Rating", color: "#FF8042" },
  { key: "sleep", label: "Sleep (hrs)", color: "#00cccc" },
];

const DIET_KEYS = ["carbs", "protein", "produce"];
const EXERCISE_KEYS = ["activityPoints"];

type LineGraphProps = {
  data: {
    date: string;
    activityPoints: number;
    carbs: number;
    protein: number;
    produce: number;
    mood: number;
    sleep: number;
  }[];
};

export default function LineGraph({data}: LineGraphProps) {
    
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["activityPoints", "sleep"]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Filter data by date range
  const filteredData = data.filter((d) => {
    if (!startDate && !endDate) return true;
    const dDate = new Date(d.date).getTime();
    const sDate = startDate ? new Date(startDate).getTime() : -Infinity;
    const eDate = endDate ? new Date(endDate).getTime() : Infinity;
    return dDate >= sDate && dDate <= eDate;
  });

  // Cap data at 100 for certain keys
  const cappedData = filteredData.map(d => {
    const capped = { ...d };
    CATEGORIES.forEach(cat => {
      if (cat.key === "mood") {
        // Scale mood visually by 10x, but cap at 100
        capped[cat.key] = Math.min(d.mood * 10, 100);
      } else if (cat.key === "sleep") {
        // Scale sleep visually by 7x, but cap at 100
        capped[cat.key] = Math.min(d.sleep * 7, 100);
      } else if (typeof capped[cat.key] === "number" && capped[cat.key] > 100) {
        capped[cat.key] = 100;
      }
    });
    return capped;
  });

  // Toggle logic for grouped buttons
  const toggleGroup = (group: "diet" | "exercise") => {
    if (group === "diet") {
      const hasDiet = DIET_KEYS.every(key => selectedCategories.includes(key));
      setSelectedCategories(prev =>
        hasDiet
          ? prev.filter(key => !DIET_KEYS.includes(key))
          : [...prev, ...DIET_KEYS.filter(key => !prev.includes(key))]
      );
    } else if (group === "exercise") {
      const hasExercise = EXERCISE_KEYS.every(key => selectedCategories.includes(key));
      setSelectedCategories(prev =>
        hasExercise
          ? prev.filter(key => !EXERCISE_KEYS.includes(key))
          : [...prev, ...EXERCISE_KEYS.filter(key => !prev.includes(key))]
      );
    }
  };

  // Individual toggles for mood and sleep
  const toggleCategory = (key: string) => {
    setSelectedCategories(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  function CustomTooltip({ active, payload, label }) {
    if (!active || !payload || !payload.length) return null;
    // Find the uncapped data for this label (date)
    const uncappedDatum = filteredData.find(d => d.date === label);
    return (
      <div className="bg-white p-2 border rounded shadow">
        <div className="font-bold mb-1">{label}</div>
        {payload.map((p) => (
          <div key={p.dataKey}>
            <span style={{ color: p.color }}>●</span>{" "}
            {p.name}: {uncappedDatum ? uncappedDatum[p.dataKey] : p.value}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="pt-8">
      {/* Grouped Toggle Buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <button
          onClick={() => toggleGroup("diet")}
          className={`px-3 py-1 rounded border ${DIET_KEYS.every(key => selectedCategories.includes(key)) ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          style={{ borderColor: "#82ca9d" }}
        >
          Diet
        </button>
        <button
          onClick={() => toggleGroup("exercise")}
          className={`px-3 py-1 rounded border ${EXERCISE_KEYS.every(key => selectedCategories.includes(key)) ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          style={{ borderColor: "#8884d8" }}
        >
          Exercise
        </button>
        <button
          onClick={() => toggleCategory("mood")}
          className={`px-3 py-1 rounded border ${selectedCategories.includes("mood") ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          style={{ borderColor: "#FF8042" }}
        >
          Mood
        </button>
        <button
          onClick={() => toggleCategory("sleep")}
          className={`px-3 py-1 rounded border ${selectedCategories.includes("sleep") ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          style={{ borderColor: "#A28CFF" }}
        >
          Sleep
        </button>
      </div>
      {/* Date Range Filter */}
      <div className="flex gap-2 justify-center mb-4">
        <label>
          Start Date:{" "}
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>
        <label>
          End Date:{" "}
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>
      </div>
      <ResponsiveContainer width="100%" minHeight={400}>
        <LineChart data={cappedData}>
          <CartesianGrid />
          <XAxis dataKey="date" />
          <YAxis 
            type="number"
            domain={[0, 100]} 
            allowDataOverflow={false}
            tickFormatter={value => value >= 100 ? "100+" : value}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {/* Only show selected lines */}
          {CATEGORIES.filter(cat => selectedCategories.includes(cat.key)).map(cat => (
            <Line
              key={cat.key}
              dataKey={cat.key}
              type="monotone"
              name={cat.label}
              stroke={cat.color}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
  
}