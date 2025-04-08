# HR-Candidate-Management-Dashboard


![HR Dashboard Screenshot](./src/assets/dashboard.png)

## Overview

This project is a lightweight, internal dashboard tool designed to streamline the Human Resources team's process of reviewing and managing developer candidate profiles. It provides a centralized platform to input, view, and filter candidate information, including their professional online presence (GitHub/LinkedIn), technical skills, and experience levels. This version includes a Candidate Entry Form, a Dashboard View with filtering, and **pagination** for improved handling of large datasets.

## Key Features

* **Candidate Entry Form:**
    * Form to manually add new candidates with fields for Full Name, Job Role, LinkedIn URL, GitHub URL, Experience Level (Dropdown: Junior/Mid/Senior), and Tech Stack (Multiple tag input).
    * On submission, candidate info is stored in LocalStorage and displayed in the dashboard.
* **Dashboard View:**
    * Lists all added candidates with their Name + Role, Experience, and Tech Stack tags.
    * Allows filtering of candidates by clicking on Tech Stack tags.
    * **Pagination:** Implemented to handle a large number of candidates efficiently, displaying candidates in manageable pages.
* **Tech Stack Tagging**: Tag candidates with multiple technologies
* **Toast Notifications**: User-friendly notifications using react-toastify
* **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
* **Bonus Features:**
    * Click on a candidate to open a modal with full details.
    * Allows editing or deleting a candidate.
    * Shows total candidates by experience level.
    * Allows exporting to CSV.

## Tech Stack & Tools

* **Frontend Framework:** React (Vite)
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Data Persistence:** LocalStorage
* **Styling:** Tailwind CSS

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Niyonyungu/HR-Candidate-Management-Dashboard
    ```
2.  Navigate to the project directory:
    ```bash
    cd HR-Candidate-Management-Dashboard
    ```
3.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
5.  Open your browser and navigate to the address provided by the development server (usually `http://localhost:5173`).

## Usage

1.  **Adding Candidates:** Use the "Candidate Entry Form" to input new candidate details and click "Submit". The new candidate will appear in the Dashboard View.
2.  **Viewing Candidates:** The Dashboard View displays a list of all added candidates with essential information.
3.  **Filtering by Tech Stack:** Click on a tag within a candidate's Tech Stack to filter the list and show only candidates with that specific skill.
4.  **Viewing Details:** Click on a candidate card/row to open a modal with their complete information.
5.  **Editing/Deleting:** Within the candidate details modal, you can edit the candidate's information and save the changes, or delete the candidate profile.
6.  **Experience Level Summary:** A summary of the total candidates per experience level is displayed on the dashboard.
7.  **Pagination:** Use the pagination controls (e.g., next/previous buttons or page numbers) at the bottom of the candidate list to navigate through multiple pages of candidates.
8.  **Export to CSV:** Click the "Export to CSV" button (if implemented) to download the candidate data as a CSV file.





## Author

[[Niyonyungu]](https://github.com/Niyonyungu)