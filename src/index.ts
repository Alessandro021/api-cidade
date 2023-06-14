import { server } from "./server/Server";
import "dotenv/config";
import { Knex } from "./server/database/knex";

const startServer = () => {
  server.listen(process.env.PORT || 3333, () => console.log(`SERVIDOR RODANDO NA PORTA ${process.env.PORT || 3333}`));
};

if(process.env.IS_LOCALHOST !== "true"){
  Knex.migrate.latest().then(_ => {
    startServer();
  }).catch(console.log);

} else {
  server.listen(process.env.PORT || 3333, () => console.log(`SERVIDOR RODANDO NA PORTA ${process.env.PORT || 3333}`));
}