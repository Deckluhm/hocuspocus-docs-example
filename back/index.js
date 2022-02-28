import express from "express";
import expressWebsockets from "express-ws";
import { Server } from "@hocuspocus/server";
import { Logger } from "@hocuspocus/extension-logger";

const server = Server.configure({
  extensions: [new Logger()],
});
const { app } = expressWebsockets(express());

app.ws("/:document", (websocket, request) => {
  server.handleConnection(websocket, request, request.params.document);
});

app.listen(1234, () => console.log("Listening on http://localhost:1234"));
