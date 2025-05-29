import { createClient } from "gel";
import createAuth from "@gel/auth-nextjs/app";

export const client = createClient();

export const auth = createAuth(client, {
  baseUrl: "http://localhost:3000",
});