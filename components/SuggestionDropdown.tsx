export interface SuggestionItem {
  id: number;
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
            className="cursor-default hover:bg-gray-200"
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
