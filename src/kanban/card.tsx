import * as React from "react";
import {
  PencilIcon,
  TrashIcon,
  XIcon,
  CheckIcon,
} from "@heroicons/react/solid";
import { CardType } from "./types";

type Props = {
  card: CardType;
  onDelete: (id: string) => void;
  onUpdate: (card: CardType) => void;
};

const Card = ({ card, onUpdate, onDelete }: Props) => {
  const { title, id } = card;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState(title);
  React.useEffect(() => {
    setValue(title);
  }, [title]);

  const [isEdit, setIsEdit] = React.useState(false);
  const edit = React.useCallback(() => {
    setIsEdit(true);
  }, []);
  const cancel = React.useCallback(() => {
    setIsEdit(false);
  }, []);

  React.useLayoutEffect(() => {
    if (!isEdit) {
      return;
    }
    inputRef.current?.focus();
  }, [isEdit]);

  const update = React.useCallback(() => {
    setIsEdit(false);
    onUpdate({
      ...card,
      title: value,
    });
  }, [value, card]);

  const deleteCard = React.useCallback(() => onDelete(id), [id]);
  return (
    <div className="flex items-center justify-between rounded bg-white p-2 shadow space-x-2">
      <div>
        <input
          ref={inputRef}
          value={value}
          className="disabled:bg-transparent"
          onChange={({ target: { value } }) => setValue(value)}
          disabled={!isEdit}
        />
      </div>
      <div className="flex items-center shrink-0 space-x-2">
        {!isEdit ? (
          <>
            <PencilIcon className="w-4 h-4 cursor-pointer" onClick={edit} />
            <TrashIcon
              className="w-4 h-4 cursor-pointer"
              onClick={deleteCard}
            />
          </>
        ) : (
          <>
            <CheckIcon onClick={update} className="w-4 h-4 cursor-pointer" />
            <XIcon onClick={cancel} className="w-4 h-4 cursor-pointer" />
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
