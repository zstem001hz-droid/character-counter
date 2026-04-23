import type { TextInputProps } from "../../types/index";

// TextInput - controlled textarea component
// Receives onTextChange callback from parent
// Reports every keystroke up to CharacterCounter via onTextChange
export const TextInput: React.FC<TextInputProps> = ({
  onTextChange,
  placeholder = "Start typing content here...;",
  initialValue = "",
}) => {
  console.log("TextInput rendered");

  return (
    <div>
      <textarea
        defaultValue={initialValue}
        placeholder={placeholder}
        // onChange fires on every keystroke
        // event.target.value is the current textarea content
        // passes the value up to the parent via onTextChange callback
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          console.log(
            "TextInput onChange - length:",
            event.target.value.length,
          );
          onTextChange(event.target.value);
        }}
        rows={6}
        style={{ width: "100", padding: "0.5rem" }}
      />
    </div>
  );
};
