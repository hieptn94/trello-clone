import * as React from "react";
import { XIcon, CheckIcon } from "@heroicons/react/solid";
import Card from "./card";
import ColumnTitle from "./column-title";
import { ColumnType, CardType } from "./types";

type Props = {
  column: ColumnType;
  onUpdateCard: (columnID: string, card: CardType) => void;
  onDeleteCard: (columnID: string, cardID: string) => void;
  onAddCard: (columnID: string, card: CardType) => void;
  onUpdate: (column: ColumnType) => void;
};

const Column = ({
  column,
  onDeleteCard,
  onUpdateCard,
  onAddCard,
  onUpdate,
}: Props) => {
  const { id, title, items } = column;

  const deleteCard = React.useCallback(
    (cardID: string) => onDeleteCard(id, cardID),
    [id]
  );

  const updateCard = React.useCallback(
    (card: CardType) => onUpdateCard(id, card),
    [id]
  );

  const [value, setValue] = React.useState("");
  const addCard = React.useCallback(() => {
    setValue("");
    onAddCard(id, {
      id: String(Date.now()),
      title: value,
    });
  }, [value, id]);

  const cancelAdd = React.useCallback(() => {
    setValue("");
  }, []);

  const updateTitle = React.useCallback(
    (title: string) => {
      onUpdate({
        ...column,
        title,
      });
    },
    [column, onUpdate]
  );

  return (
    <div className="w-72 rounded shadow bg-[#ebecf0] p-2 space-y-2">
      <ColumnTitle title={title} onUpdate={updateTitle} />
      {items.map((item) => (
        <Card
          key={item.id}
          card={item}
          onDelete={deleteCard}
          onUpdate={updateCard}
        />
      ))}
      <div className="flex items-center justify-between rounded bg-white p-2 shadow space-x-2">
        <div className="w-full">
          <input
            className="w-full"
            value={value}
            placeholder="Enter title for this card"
            onChange={({ target: { value } }) => setValue(value)}
          />
        </div>
        <div className="flex items-center shrink-0 space-x-2">
          <CheckIcon onClick={addCard} className="w-4 h-4 cursor-pointer" />
          <XIcon onClick={cancelAdd} className="w-4 h-4 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Column;
