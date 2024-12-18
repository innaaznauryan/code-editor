/// <reference types="vite/client" />

declare module './server.js' {
    import { createServer, Model } from "miragejs";
    export function makeServer(): void;
}