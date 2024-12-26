import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { AuthState, UserState } from "@/types";

const initialState = {
    loading: false,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState as AuthState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setUser: (state, action: PayloadAction<UserState | null>) => {
            if(action.payload) {
                state.user = {
                    uid: action.payload.uid,
                    email: action.payload.email
                }
            } else {
                state.user = null
            }
        },

    }
})

export const { setLoading, setUser } = authSlice.actions

export default authSlice.reducer
