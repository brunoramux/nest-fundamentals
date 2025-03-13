export default () => ({
  port: parseInt(process.env.PORT),
  secret: process.env.SECRET,
  db_host: process.env.DB_HOST,
  db_port: parseInt(process.env.DB_PORT),
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
});
