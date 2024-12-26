import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { EmployeeState, Employee } from "@/types";

const initialState = {
    employees: [],
    loading: false,
    totalCount: 0,
    error: null
}

const employeesSlice = createSlice({
    name: 'employees',
    initialState: initialState as EmployeeState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setEmployees: (state, action: PayloadAction<Employee[] | null>) => {
            state.employees = action.payload || []
        },
        setTotalCount: (state, action: PayloadAction<number>) => {
            state.totalCount = action.payload
        },
        setError : (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        }
    }
})

export const { setLoading, setEmployees, setTotalCount, setError } = employeesSlice.actions

export default employeesSlice.reducer
