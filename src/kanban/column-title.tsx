import * as React from "react";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import clsx from "clsx";

type Props = {
  title: string;
  onUpdate: (title: string) => void;
};

const ColumnTitle = ({ title, onUpdate }: Props) => {
  const [value, setValue] = React.useState(title);
  const [isEdit, setIsEdit] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setValue(title);
  }, [title]);

  const cancel = React.useCallback(() => {
    setValue("");
    setIsEdit(false);
  }, []);

  const update = React.useCallback(() => {
    setValue("");
    setIsEdit(false);
    onUpdate(value);
  }, [onUpdate, value]);

  return (
    <div
      className={clsx("flex items-center justify-between p-2 space-x-2", {
        "bg-white rouded shadow": isEdit,
      })}
    >
      <div
        className="w-full"
        onClick={({ detail }) => {
          if (detail !== 2) {
            return;
          }
          setIsEdit(true);
        }}
      >
        <input
          ref={inputRef}
          value={value}
          className="disabled:bg-transparent w-full cursor-pointer"
          onChange={({ target: { value } }) => setValue(value)}
          disabled={!isEdit}
        />
      </div>
      <div className="flex items-center shrink-0 space-x-2">
        {isEdit ? (
          <>
            <CheckIcon onClick={update} className="w-4 h-4 cursor-pointer" />
            <XIcon onClick={cancel} className="w-4 h-4 cursor-pointer" />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ColumnTitle;
