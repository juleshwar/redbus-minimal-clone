export interface SuggestionItem {
	id: number | string;
	name: string;
}

interface SuggestionProps {
	items: SuggestionItem[];
	onClickItem: (item: SuggestionItem) => void;
}

export const SuggestionDropdown = ({ items, onClickItem }: SuggestionProps) => {
	return (
		<ul className="w-full flex flex-col">
			{items.map((item) => {
				const { id, name } = item;
				return (
					<li
						className="cursor-default px-4 py-1 hover:bg-gray-200"
						key={id}
						onClick={() => onClickItem(item)}
						onMouseDown={(event) => event.preventDefault()}
					>
						{name}
					</li>
				);
			})}
		</ul>
	);
};
