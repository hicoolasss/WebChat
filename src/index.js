import React, { createContext } from 'react';
import { BrowserRouter} from "react-router-dom";
import { createRoot } from 'react-dom/client';
import App from './App';
import Store from "./store/store";

export const store = new Store();

export const Context = createContext({
    store,
});

const root = document.getElementById('root');
const reactRoot = createRoot(root);

reactRoot.render(
    <Context.Provider value={{ store }}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Context.Provider>
);

