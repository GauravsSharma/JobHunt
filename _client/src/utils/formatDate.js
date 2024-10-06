export function formatReadableDateWithFullMonth(isoDateString,fullMonth) {
    const date = new Date(isoDateString);
    const options = {
        day: '2-digit',   // Two digits for the day (e.g., 06)
        month: fullMonth?"long":"2-digit",    // Full month name (e.g., September)
        year: 'numeric'   // Full numeric year (e.g., 2024)
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date); // 'en-GB' for day/month/year order
}