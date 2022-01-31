import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Layout from "./layout";
import {Route, Routes} from "react-router-dom";
import UserList from "./pages/userList";

function App() {

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserList />} />
          {/*<Route path="*" element={<HomePage />} />*/}
        </Route>
      </Routes>
  );
}

export default App;
