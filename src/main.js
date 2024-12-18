import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import { makeServer } from "./server.js";

makeServer();

const app = createApp(App);
app.mount('#app')
