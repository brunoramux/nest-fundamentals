export const connection: Connection = {
  CONNECTION_STRING: 'mongodb://localhost:27017',
  DB: 'songs',
  DBNAME: 'songs',
};

export interface Connection {
  CONNECTION_STRING: string;
  DB: string;
  DBNAME: string;
}
