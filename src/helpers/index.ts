import { IWeekday, Weekdays, Time } from '../types';

export const getWeekday = (day: string): IWeekday => ({
    weekday: day,
    isOpen: false,
    openTime: { hour: 0, minute: 0 } as Time,
    closeTime: { hour: 0, minute: 0 } as Time
}) as IWeekday;

export const getWeekdays = (): IWeekday[] =>
    Object.keys(Weekdays).map(x => getWeekday(x)) as IWeekday[];
