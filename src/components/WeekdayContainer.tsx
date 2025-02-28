import React from 'react';
import { Weekdays, IWeekday, Time } from '../types';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControlLabel, Checkbox } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from "../state"
import { setWeekday, setError } from '../state/app';
import { getWeekday } from '../helpers'

interface WeekdayContainerProps {
    weekday: keyof typeof Weekdays;
}

const WeekdayContainer: React.FC<WeekdayContainerProps> = ({ weekday }) => {

    const dispatch = useAppDispatch()
    const weekdayName = Weekdays[weekday as keyof typeof Weekdays]
    const currentTime = useSelector((state: RootState) =>
        state.app.weekdays.find((x: IWeekday) => x.weekday === weekday) ?? getWeekday(weekday))

    const handleTimeChange = (field: 'openTime' | 'closeTime', newValue: Dayjs | null) => {

        if (!newValue) return;

        const newTime: Time = {
            hour: newValue.hour(),
            minute: newValue.minute(),
        };

        if (field === 'openTime' && (newTime.hour > currentTime.closeTime.hour || (newTime.hour === currentTime.closeTime.hour && newTime.minute >= currentTime.closeTime.minute))) {
            dispatch(setError('Open time must be earlier than close time'));
            return;
        }

        if (field === 'closeTime' && (newTime.hour < currentTime.openTime.hour || (newTime.hour === currentTime.openTime.hour && newTime.minute <= currentTime.openTime.minute))) {
            dispatch(setError('Close time must be later than open time'));
            return;
        }

        dispatch(setWeekday({ ...currentTime, [field]: { hour: newTime.hour, minute: newTime.minute } }));
    };

    const handleSetOpen = (checked: boolean) => {
        dispatch(setWeekday(checked ? { ...currentTime, isOpen: checked } : getWeekday(weekday)))
    }

    return (
        <Grid container direction="row" spacing={1} sx={{ minWidth: 'auto', mt: 1, ml: 1, mr: 1, border: '1px solid lightgrey', borderRadius: 1 }}>
            <FormControlLabel
                data-testid={`${weekday}-Form`}
                sx={{ minWidth: 150, ml: 1 }}
                label={weekdayName}
                control={<Checkbox
                    data-testid={`${weekday}-isOpen`}
                    checked={currentTime.isOpen}
                    onChange={(e, checked) => handleSetOpen(checked)} />}
            />
            {currentTime.isOpen ?
                <Grid sx={{ mt: 1, mb: 1, mr: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            data-testid={`${weekday}-openTime`}
                            label="Open"
                            sx={{ ml: 1, mb: 1 }}
                            format="hh:mm a"
                            value={dayjs().hour(currentTime.openTime.hour).minute(currentTime.openTime.minute)}
                            onChange={(value) => handleTimeChange('openTime', value)}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            data-testid={`${weekday}-closeTime`}
                            label="Close"
                            sx={{ ml: 1 }}
                            format="hh:mm a"
                            value={dayjs().hour(currentTime.closeTime.hour).minute(currentTime.closeTime.minute)}
                            onChange={(value) => handleTimeChange('closeTime', value)}
                        />
                    </LocalizationProvider>
                </Grid> : <></>
            }
        </Grid>
    )
}

export default WeekdayContainer