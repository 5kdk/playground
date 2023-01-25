const days = ['일', '월', '화', '수', '목', '금', '토'];

/** @type {(dateSting: string) => string} */
const getDay = dateString => days[new Date(dateString).getDay()] + '요일';

export default getDay;
