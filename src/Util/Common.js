import { Data } from 'Data/Data';

export const IsOpen = () => {
    const timeTable = Data.timeTable;
    const currentHour = new Date().toLocaleTimeString('da-DK', { hour: '2-digit' });
    const day = new Date().toLocaleString('da-DK', { weekday: 'long' });

    let openingTime;
    let closingTime;

    for (const key of Object.keys(timeTable)) {
        if (key === day) {
            openingTime = timeTable[key].open;
            closingTime = timeTable[key].close;
        }
    }

    if (currentHour >= openingTime && currentHour <= closingTime) {
        return true;
    } else
        return false;
}