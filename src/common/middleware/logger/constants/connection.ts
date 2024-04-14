export const connection: Connection = {
  CONNECTION_STRING:
    'postgresql://postgres:jooaogbriel17@localhost:/udemy-course',
  DB: 'postgres',
  DB_NAME: 'udemy_course',
};
export type Connection = {
  CONNECTION_STRING: string;
  DB: string;
  DB_NAME: string;
};
