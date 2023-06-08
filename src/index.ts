import { server } from "./server/Server";

server.listen(process.env.PORT || 3333, () => console.log(`SERVIDOR RODANDO NA PORTA ${process.env.PORT || 3333}`));