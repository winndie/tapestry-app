import React from 'react';
import { RootState, useAppDispatch } from "./state";
import { clearError } from './state/app';
import { useSelector } from 'react-redux';
import { Weekdays } from './types';
import WeekdayContainer from './components/WeekdayContainer';
import { Dialog, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
function App() {

    const dispatch = useAppDispatch()
    const { weekdays, error } = useSelector((state: RootState) => state.app)

    return (
        <>
            <Grid container direction='column'>
                {
                    weekdays.map(x => (<WeekdayContainer key={x.weekday} weekday={x.weekday as keyof typeof Weekdays} />))
                }
            </Grid>
            <Dialog open={typeof error === 'string'} onClose={() => dispatch(clearError())}>
                <Alert severity='error'>{error}</Alert>
            </Dialog>
        </>
    )
}

export default App
