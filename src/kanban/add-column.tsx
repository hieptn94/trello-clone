import * as React from "react";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { ColumnType } from "./types";

type Props = {
  onAddColumn: (column: ColumnType) => void;
};

const AddColumn = ({ onAddColumn }: Props) => {
  const [value, setValue] = React.useState("");
  const [isAdd, setIsAdd] = React.useState(false);

  const cancelAdd = React.useCallback(() => {
    setIsAdd(false);
    setValue("");
  }, []);

  const addColumn = React.useCallback(() => {
    setIsAdd(false);
    setValue("");
    onAddColumn({
      id: String(Date.now()),
      title: value,
      items: [],
    });
  }, [value]);
  return !isAdd ? (
    <div
      onClick={() => setIsAdd(true)}
      className="w-72 rounded shadow bg-[#ffffff3d] p-2 cursor-pointer"
    >
      Add column
    </div>
  ) : (
    <div className="w-72 rounded shadow bg-white p-2">
      <div className="flex items-center space-x-2">
        <div className="w-full">
          <input
            value={value}
            onChange={({ target: { value } }) => setValue(value)}
            placeholder="Enter title for this column"
            className="w-full"
          />
        </div>
        <div className="flex items-center shrink-0 space-x-2">
          <CheckIcon onClick={addColumn} className="w-4 h-4 cursor-pointer" />
          <XIcon onClick={cancelAdd} className="w-4 h-4 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default AddColumn;
