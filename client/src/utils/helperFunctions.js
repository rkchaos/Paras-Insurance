const toFormattedDate = (timestamp) => {
    const formattedDate = new Date(Date.parse(timestamp))
    const date = formattedDate.getDate();
    const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthsArray[formattedDate.getMonth()];
    const year = formattedDate.getFullYear();

    return `${date} ${month}, ${year}`;
}

const toFormattedTime = (timestamp) => {
    const date = new Date(Date.parse(timestamp))

    const hours24 = date.getHours();
    const minutes = date.getMinutes();

    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 || 12;

    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export {
    toFormattedDate,
    toFormattedTime
};