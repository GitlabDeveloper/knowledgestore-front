import React from 'react';
import {Provider} from 'react-redux';

import AppRouter from "../../routes/AppRouter";
import store from "../../store/store";
import {SnackbarProvider} from "notistack";

const App = () => (
    <Provider store={store}>
        <SnackbarProvider maxSnack={6}>
            <AppRouter/>
        </SnackbarProvider>
    </Provider>
);

export default App;