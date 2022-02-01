import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Layout from "./layout";
import {Route, Routes} from "react-router-dom";
import UserList from "./pages/userList";
import EditUser from "./pages/editUser";
import {useDispatch} from "react-redux";
import axios from "axios";
import {ApiLink} from "./Api/ApiLink";
import {add} from "./redux/reducers/dataReducer/dataReducer";

function App() {

    const dispatch = useDispatch()

    useEffect(()=>{
        axios.get(ApiLink)
            .then(data => data.data.map((user : any) => dispatch(add({
                id : user.id ,
                name : user.name,
                email : user.email ,
                city : user.address.city,
                userName : user.username
            }))))
            .catch(err => console.log(err))
    },[])

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserList />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Route>
      </Routes>
  );
}

export default App;
