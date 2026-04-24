import { useState } from "react";
import type { CharacterCounterProps, TextStats } from "../../types/index";
import { TextInput } from "../TextInput/TextInput";
import { StatsDisplay } from "../StatsDisplay/StatsDisplay";

// CharacterCounter - parent/container component
// Owns all state and passes data down to child components
// Composes TextInput and StatsDisplay together
export const CharacterCounter: React.FC<CharacterCounterProps> = ({
  minWords,
  maxWords,
  targetReadingTime,
}) => {
  // TextStats typed state - holds all three statistics
  // Initial values are all 0 - empty input has no characters words, or reading time
  const [stats, setStats] = useState<TextStats>({
    characterCount: 0,
    wordCount: 0,
    readingTime: 0,
  });

  console.log("CharacterCounter rendered - stats:", stats);

  // calculateStats - computes all three statistics from raw text
  // Called every time the user types into the onTextChange callback
  const calculateStats = (text: string): TextStats => {
    // CharacterCount - total characters including spaces
    const characterCount = text.length;

    // WordCount - split on whitespace and filter empty strings
    // .filter(Boolean) removes empty strings from the array
    const wordCount =
      text.trim() === "" ? 0 : text.trim().split(/\s+/).filter(Boolean).length;

    // readingTime - average adult reads 200 words per minute
    const readingTime = wordCount / 200;

    console.log("calculateStats:", { characterCount, wordCount, readingTime });

    return { characterCount, wordCount, readingTime };
  };

  // handleTextChange - called by TextInput on every keystroke
  // calculates new stats and update state
  // triggers a re-render with updated stats passed to StatsDisplay
  const handleTextChange = (text: string) => {
    const newState = calculateStats(text);
    setStats(newStats);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Character Counter</h1>

      {/* TextInput receives handleTextChange as the onTextChange callback */}
      <TextInput
        onTextChange={handleTextChange}
        placeholder="Start typing your content here..."
      />

      {/* StatusDisplay receives current stats from state */}
      <StatsDisplay stats={stats} showReadingTime={true} />

      {/* Optional word count goal indicators - only render if props provided */}
      {minWords && (
        <p style={{ marginTop: "0.5rem", fontSize: "13px", color: "#666" }}>
          Min: {minWords} words
          {stats.wordCount >= minWords
            ? " ✅"
            : ` (${minWords - stats.wordCount} more needed)`}
        </p>
      )}

      {maxWords && (
        <p
          style={{
            fontSize: "13px",
            color: stats.wordCount > maxWords ? "red" : "#666",
          }}
        >
          Max: {maxWords} words
          {stats.wordCount > maxWords
            ? ` (${stats.wordCount - maxWords} over limit)`
            : " ✅"}
        </p>
      )}
    </div>
  );
};
