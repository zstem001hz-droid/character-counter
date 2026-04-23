// TextInput component props reports changes to parent
export interface TextInputProps {
    onTextChange: (text: string) => void;
    placeholder?: string;
    initialValue?: string;
}

// TextStats - state shape of statistics object - state type for CharacterCounter
export interfce TextStats {
    characterCount: number;
    wordCount: number;
    readingTime: number; // in minutes
}

// StatsDisplayProps component - receives textStats object from parent
export interface StatsDisplayProps {
    stats: TextStats;
    showReadingTime?: boolean;
}

// CharacterCounterProps defines props for the parent CharacterCounter component
// All props optional - component works with defaults if none provided
export interface CharacterCounterProps {
    minWords?: number;
    maxWords?: number;
    targetReadingTime?: number; // in minutes
}
