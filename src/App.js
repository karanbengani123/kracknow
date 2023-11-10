import './App.css';
import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import AdminRouter from './components/Admin/AdminRouter';
import Login from './components/Authentication/Login';
import ForgotPassword from './components/Authentication/ForgotPassword';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './components/Redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route exact path="/" element={<Navigate to="./login" replace={true}></Navigate>}></Route>
            <Route exact path="/ForgotPassword" element={<ForgotPassword />}></Route>
          </Routes>
          <AdminRouter />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
