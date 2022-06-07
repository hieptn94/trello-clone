import * as React from "react";
import { AddColumn, CardType, Column, ColumnType } from "../kanban";

const Home = () => {
  const [columns, setColumns] = React.useState<Array<ColumnType>>([
    {
      id: String(Date.now()),
      title: "Title",
      items: [
        {
          id: String(Date.now()),
          title: "Task 1",
        },
      ],
    },
  ]);

  const deleteCard = React.useCallback(
    (columnID: string, cardID: string) =>
      setColumns((columns) =>
        columns.map((column) => {
          if (column.id !== columnID) {
            return column;
          }
          return {
            ...column,
            items: column.items.filter(({ id }) => id !== cardID),
          };
        })
      ),
    []
  );

  const updateCard = React.useCallback(
    (columnID: string, card: CardType) =>
      setColumns((columns) =>
        columns.map((column) => {
          if (column.id !== columnID) {
            return column;
          }
          return {
            ...column,
            items: column.items.map((item) =>
              item.id === card.id ? card : item
            ),
          };
        })
      ),
    []
  );

  const addCard = React.useCallback(
    (columnID: string, card: CardType) =>
      setColumns((columns) =>
        columns.map((column) => {
          if (column.id !== columnID) {
            return column;
          }
          return {
            ...column,
            items: [...column.items, card],
          };
        })
      ),
    []
  );

  const addColumn = React.useCallback(
    (column: ColumnType) => setColumns((columns) => [...columns, column]),
    []
  );

  const updateColumn = React.useCallback(
    (column: ColumnType) =>
      setColumns((columns) =>
        columns.map((currentColumn) =>
          column.id === currentColumn.id ? column : currentColumn
        )
      ),
    []
  );
  return (
    <div className="w-full h-screen flex flex-col">
      <header className="w-full h-16 shrink-0 bg-[#05090F]"></header>
      <main className="w-full h-full bg-slate-300">
        <div className="w-full h-full flex p-2 space-x-2 overflow-auto">
          {columns.map((column) => (
            <div key={column.id}>
              <Column
                column={column}
                onDeleteCard={deleteCard}
                onUpdateCard={updateCard}
                onAddCard={addCard}
                onUpdate={updateColumn}
              />
            </div>
          ))}
          <div>
            <AddColumn onAddColumn={addColumn} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
