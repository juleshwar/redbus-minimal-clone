import { classNames } from "@/util/classNames";
import { ChangeEvent, FocusEvent, useState } from "react";
import { SuggestionDropdown, SuggestionItem } from "./SuggestionDropdown";

interface Props {
	label?: string;
	value: string;
	onChangeText: (newText: string) => void;
	suggestions: SuggestionItem[];
	isRequired?: boolean;
	isError?: boolean;
	errorMessage?: string;
}

const InputWithAutosuggestion = (props: Props) => {
	const {
		label,
		value,
		onChangeText: onChangeText,
		suggestions,
		isRequired = false,
		isError = false,
		errorMessage,
	} = props;
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [isInputInFocus, setIsInputInFocus] = useState(false);

	// Check if the current text is valid. i.e if the text exists in the Suggestions

	const onClickSuggestionHandler = (item: SuggestionItem) => {
		onChangeText(item.name);
		setShowSuggestions(false);
	};

	const onChangeTextHandler = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
		onChangeText(currentTarget.value);
		setShowSuggestions(true);
	};

	const onBlurHandler = () => {
		setShowSuggestions(false);
	};

	return (
		<>
			<div className="flex relative" onBlur={onBlurHandler}>
				<div className="relative">
					<label
						className={classNames([
							"absolute left-0",
							"pointer-events-none",
							"transition-all",
							value.length || isInputInFocus ? "text-gray-500 bottom-full text-sm" : "bottom-0",
						])}
					>
						<span>{label}</span>
					</label>
					<input
						type="text"
						value={value}
						onChange={onChangeTextHandler}
						onBlur={() => setIsInputInFocus(false)}
						onFocus={() => setIsInputInFocus(true)}
						required={isRequired}
						className={classNames([isError && "border border-red-600"])}
					/>
					{isError && errorMessage && (
						<span className="absolute top-full left-0 text-xs text-red-600">{errorMessage}</span>
					)}
				</div>
				<div className={classNames(["border border-blue-600", "absolute top-full", !showSuggestions && "hidden"])}>
					<SuggestionDropdown items={suggestions} onClickItem={onClickSuggestionHandler} />
				</div>
			</div>
		</>
	);
};

export { InputWithAutosuggestion };
