import boot from "./src/boot/index.tsx";
import { createStore } from 'redux';
import reducer from "./src/reducers/index.tsx";

const store = createStore(reducer);

const app = boot();

export default app;
