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
                id : +action.payload.id ?? +Date.now(),
                name : action.payload.name,
                userName : action.payload.userName,
                email : action.payload.email,
                city : action.payload.city
            }

            const userFinder: number = state.userList.findIndex(user => user.id == newUser.id)

            if (userFinder === -1){
                state.userList.push(newUser)
            }
        },
        remove: (state, action) => {
            state.userList = state.userList.filter(user => user.id !== action.payload.id)
        },
        editUser: (state, action) => {
            const userFinder: number = state.userList.findIndex(user => user.id == action.payload.id)
            if (userFinder >= 0)  {
                const editedUser: IuserData = {
                    id : action.payload.id,
                    name : action.payload.name,
                    userName : state.userList[userFinder].userName,
                    email : action.payload.email,
                    city : state.userList[userFinder].city
                }
                state.userList.splice(userFinder,1,editedUser)
            }

        }

    }
})

export const {add,remove,editUser} = dataReducer.actions
export default dataReducer.reducer