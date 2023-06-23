import { classNames } from "@/util/classNames";
import { ChangeEvent, FocusEvent, useState } from "react";
import { SuggestionDropdown, SuggestionItem } from "./SuggestionDropdown";

interface Props {
  label?: string;
  value: string;
  onChangeText: (newText: string) => void;
  suggestions: Suggestion[];
}

export interface Suggestion {
  id: number;
  name: string;
}

const InputWithAutosuggestion = (props: Props) => {
  const { label, value, onChangeText: onChangeText, suggestions } = props;
  const [showSuggestions, setShowSuggestions] = useState(false);

  const onClickSuggestionHandler = (item: SuggestionItem) => {
    onChangeText(item.name);
    setShowSuggestions(false);
  };

  const onChangeTextHandler = ({
    currentTarget,
  }: ChangeEvent<HTMLInputElement>) => {
    onChangeText(currentTarget.value);
    setShowSuggestions(true);
  };

  const onBlurHandler = () => {
    setShowSuggestions(false);
  };

  return (
    <>
      <div className="flex relative" onBlur={onBlurHandler}>
        <div className="flex">
          <label className="">
            <span>{label}</span>
          </label>
          <input type="text" value={value} onChange={onChangeTextHandler} />
        </div>
        <div
          className={classNames([
            "border border-blue-600",
            "absolute top-full",
            !showSuggestions && "hidden",
          ])}
        >
          <SuggestionDropdown
            items={suggestions}
            onClickItem={onClickSuggestionHandler}
          />
        </div>
      </div>
    </>
  );
};

export { InputWithAutosuggestion };
