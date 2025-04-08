import React from 'react'
import { TiUserAdd } from "react-icons/ti";
import { FaDownload } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { exportToCSV } from '../utils/export-utils';


const AppHeader = ({ activeView, setActiveView, candidates }) => {
    const handleExportCSV = () => {
        exportToCSV(candidates, "candidates")
    }
    return (
        <header className="bg-white border-b border-[#e9ecef] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#f0e6ff]">
                            <FaUsers className="h-5 w-5 text-[#8a2be2]" />
                        </div>
                        <div className="ml-2">
                            <h1 className="text-lg font-bold text-[#333333]">HR Dashboard</h1>
                            <p className="text-xs text-[#6c757d]">Candidate Management</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-4">
                        <button
                            className={`
                flex items-center gap-2 cursor-pointer px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${activeView === "dashboard" ? "bg-[#f0e6ff] text-[#8a2be2]" : "text-[#6c757d] hover:bg-[#f8f9fa]"}
              `}
                            onClick={() => setActiveView("dashboard")}
                        >
                            <MdDashboard className="h-4 w-4" />
                            <span>Dashboard</span>
                        </button>

                        <button
                            className={`
                flex items-center gap-2 px-3 cursor-pointer py-2 text-sm font-medium rounded-md transition-colors
                ${activeView === "add-candidate" ? "bg-[#f0e6ff] text-[#8a2be2]" : "text-[#6c757d] hover:bg-[#f8f9fa]"}
              `}
                            onClick={() => setActiveView("add-candidate")}
                        >
                            <TiUserAdd className="h-4 w-4" />
                            <span>Add Candidate</span>
                        </button>

                        <button
                            className=" cursor-pointer flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-[#6c757d] hover:bg-[#f8f9fa] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleExportCSV}
                            disabled={candidates?.length === 0}
                        >
                            <FaDownload className="h-4 w-4 text-[#8a2be2]" />
                            <span>Export CSV</span>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default AppHeader
