export enum Weekdays {
    MON = 'Monday',
    TUE = 'Tuesday',
    WED = 'Wednesday',
    THU = 'Thursday',
    FRI = 'Friday',
    SAT = 'Saturday',
    SUN = 'Sunday'
}
export interface Time {
    hour: number
    minute: number
}
export interface IWeekday {
    weekday: string
    isOpen: boolean
    openTime: Time
    closeTime: Time
}