import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {ApiLink} from "../../../Api/ApiLink";

export interface IuserData{
    id : number,
    name : string,
    userName : string,
    email : string,
    city : string
}

const init:{userList : IuserData[]} = {
    userList : []
}

const dataReducer = createSlice({
    name: 'dataReducer',
    initialState: init,
    reducers: {
        add: (state, action) => {
            const newUser: IuserData = {
                id : +action.payload.id ?? +Date.now(),
                name : action.payload.name,
                userName : action.payload.userName,
                email : action.payload.email,
                city : action.payload.city
            }

            const userFinder: number = state.userList.findIndex(user => user.id == newUser.id)

            if (userFinder === -1){
                state.userList.push(newUser)
                newUser.id > 10 && axios.post(ApiLink,newUser)
                    .then(data => console.log(data.data))
                    .catch(err => console.log(err))
            }
        },
        remove: (state, action) => {
            state.userList = state.userList.filter(user => user.id !== action.payload.id)
            axios.delete(`${ApiLink}/${action.payload.id}`)
                .then(data => console.log(data.data))
                .catch(err => console.log(err))
        },
        editUser: (state, action) => {
            const userFinder: number = state.userList.findIndex(user => user.id == action.payload.id)
            if (userFinder >= 0)  {
                const editedUser: IuserData = {
                    id : +action.payload.id,
                    name : action.payload.name,
                    userName : state.userList[userFinder].userName,
                    email : action.payload.email,
                    city : state.userList[userFinder].city
                }
                state.userList.splice(userFinder,1,editedUser)

                axios.put(`${ApiLink}/${action.payload.id}`,editedUser)
                    .then(data => console.log(data.data))
                    .catch(err => console.log(err))
            }

        }

    }
})

export const {add,remove,editUser} = dataReducer.actions
export default dataReducer.reducer