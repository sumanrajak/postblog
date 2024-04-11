export function formatInstagramTimestamp(timestamp) {
    const date = new Date(timestamp);
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight
    const formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ' ' + ampm;
    
    return `${month} ${day}, ${year} ${formattedTime}`;
}