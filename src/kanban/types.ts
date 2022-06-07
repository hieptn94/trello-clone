export type CardType = {
  id: string;
  title: string;
};

export type ColumnType = {
  id: string;
  title: string;
  items: Array<CardType>;
};
