export function exportToCSV(candidates, filename) {
    if (candidates.length === 0) {
        return
    }

    //CSV headers
    const headers = ["Name", "Role", "Experience", "LinkedIn", "GitHub", "Tech Stack", "Date Added"]

    const rows = candidates.map((candidate) => [
        candidate.name,
        candidate.role,
        candidate.experience,
        candidate.linkedIn,
        candidate.github,
        candidate.techStack.join(", "),
        new Date(candidate.dateAdded).toLocaleDateString(),
    ])

    const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.display = "none"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
