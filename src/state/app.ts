import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IWeekday } from '../types'
import { getWeekdays } from '../helpers'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        weekdays: getWeekdays() as IWeekday[],
        error: undefined as string | undefined
    },
    reducers: {
        setWeekday: (state, action: PayloadAction<IWeekday>) => {
            state.weekdays = state.weekdays.map(x => x.weekday === action.payload.weekday ? action.payload : x)
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        clearError: (state) => {
            state.error = undefined
        }
    },
})

export const {
    setError,
    clearError,
    setWeekday,
} = appSlice.actions