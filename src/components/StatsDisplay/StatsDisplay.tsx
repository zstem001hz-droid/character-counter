import React from "react";
import type { StatsDisplayProps } from "../../types/index";

// StatsDisplay - displays real-time text statistics
// Pure display component - no state, just renders what it receives via props
// Receives stats object from CharacterCounter parent
export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  stats,
  showReadingTime = true, // defaults to showing reading time
}) => {
  console.log("StatsDisplay rendered - stats:", stats);

  // Converts decimal minutes to minutes:seconds format
  // example: 1.5 minutes becomes "1:30"
  const formatReadingTime = (minutes: number): string => {
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
      {/* Character count statistics */}
      <div
        style={{
          textAlign: "center",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          flex: 1,
        }}
      >
        <p style={{ fontSize: "12px", color: "666" }}>Characters</p>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
          {stats.characterCount}
        </p>
      </div>

      {/* Word count statistics */}
      <div
        style={{
          textAlign: "center",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          flex: 1,
        }}
      >
        <p style={{ fontSize: "12px", color: "#666" }}>Words</p>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
          {stats.wordCount}
        </p>
      </div>

      {/* Reading time stat - only renders if showReadingTime is true */}
      {showReadingTime && (
        <div
          style={{
            textAlign: "center",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            flex: 1,
          }}
        >
          <p style={{ fontSize: "12px", color: "#666" }}>Reading Time</p>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {formatReadingTime(stats.readingTime)}
          </p>
        </div>
      )}
    </div>
  );
};
