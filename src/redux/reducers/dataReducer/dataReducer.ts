import {createSlice} from "@reduxjs/toolkit";

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
                id : action.payload.id || state.userList.length+1,
                name : action.payload.name,
                userName : action.payload.userName,
                email : action.payload.email,
                city : action.payload.city
            }

            if (!state.userList[newUser.id - 1]){
                state.userList.push(newUser)
            }
        },
        remove: (state, action) => {
            state.userList = state.userList.filter(user => user.id !== action.payload.id)
        },
        editUser: (state, action) => {
            const userFinder: number = state.userList.findIndex(user => user.id === action.payload.id)

            userFinder >= 0 && (
                state.userList[userFinder] = {...state.userList[userFinder] , name : action.payload.name , email : action.payload.email}
            )
        }

    }
})

export const {add,remove,editUser} = dataReducer.actions
export default dataReducer.reducer