import { createSlice } from '@reduxjs/toolkit';
import { useState, useEffect } from 'react';
import React from 'react';


 const userSlice = createSlice({
    name:'users',
    initialState : {value : []},
    reducers: {
        addUser: (state, action) => {
            state.value.push(action.payload)
        },
        
        editUser: (state, action) => {
            state.value.map((user) => {
                if (user.id === action.payload.id) {
                  user.username = action.payload.username;
                }
              })
        },

        deleteUser: (state, action) => {
          state.value = state.value.filter((user) => user.id !== action.payload.id);
        },
        setInitialState: (state, action) => {
            state.value = action.payload
        }
    }
 })

 export const {addUser, editUser, deleteUser, setInitialState} = userSlice.actions;
 export default userSlice.reducer;
 




