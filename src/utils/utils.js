export function formatDate(dateString) {
    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
        return "Invalid date"
    }

    // If it's today, return "Today"
    const today = new Date()
    if (date.toDateString() === today.toDateString()) {
        return "Today"
    }

    // If it's yesterday, return "Yesterday"
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday"
    }


    const daysAgo = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (daysAgo < 7) {
        return `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`
    }


    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}
