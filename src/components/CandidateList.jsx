import React from 'react'
import { useEffect, useState } from "react"
import { formatDate } from '../utils/utils'
import { BiSearch, BiLink, BiCalendar } from 'react-icons/bi'
import { SlOptionsVertical } from "react-icons/sl";


const CandidateList = ({ candidates, onViewCandidate, onEditCandidate, onDeleteCandidate }) => {

    const [searchTerm, setSearchTerm] = useState("")
    const [experienceFilter, setExperienceFilter] = useState("all")
    const [techFilter, setTechFilter] = useState("all")
    const [openDropdownId, setOpenDropdownId] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const candidatesPerPage = 6

    
    const allTechStacks = candidates.reduce((acc, candidate) => {
        candidate.techStack.forEach((tech) => {
            if (!acc.includes(tech)) {
                acc.push(tech)
            }
        })
        return acc
    }, [])

    const filteredCandidates = candidates.filter((candidate) => {
        const matchesSearch =
            candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.role.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesExperience = experienceFilter === "all" || candidate.experience === experienceFilter

        const matchesTech = techFilter === "all" || candidate.techStack.includes(techFilter)

        return matchesSearch && matchesExperience && matchesTech
    })

    const indexOfLastCandidate = currentPage * candidatesPerPage
    const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage
    const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate)
    const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage)

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id)
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        window.scrollTo(0, 0)
    }

    useEffect(() => {
        const handleClickOutside = () => setOpenDropdownId(null)
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [])

    return (
        <div className="bg-white rounded-lg shadow-md">
         
            <div className="p-6 border-b border-[#e9ecef]">
                <h2 className="text-xl font-bold text-[#333333]">Candidates</h2>
                <p className="text-sm text-[#6c757d] mt-1">Manage and view all candidate profiles</p>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <div className="relative flex-1">
                        <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6c757d]" />
                        <input
                            type="text"
                            placeholder="Search candidates..."
                            className="w-full pl-10 pr-4 py-2 border border-[#ced4da] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8a2be2] focus:border-[#8a2be2]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select
                        value={experienceFilter}
                        onChange={(e) => setExperienceFilter(e.target.value)}
                        className="w-full sm:w-[180px] px-3 py-2 border border-[#ced4da] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8a2be2] focus:border-[#8a2be2]"
                    >
                        <option value="all">All Levels</option>
                        <option value="Junior">Junior</option>
                        <option value="Mid">Mid</option>
                        <option value="Senior">Senior</option>
                    </select>

                    <select
                        value={techFilter}
                        onChange={(e) => setTechFilter(e.target.value)}
                        className="w-full sm:w-[180px] px-3 py-2 border border-[#ced4da] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8a2be2] focus:border-[#8a2be2]"
                    >
                        <option value="all">All Technologies</option>
                        {allTechStacks.map((tech) => (
                            <option key={tech} value={tech}>
                                {tech}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

          
            <div className="p-6">
                {filteredCandidates.length === 0 ? (
                    <div className="text-center py-16 px-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f8f9fa] mb-4">
                            <BiSearch className="h-8 w-8 text-[#adb5bd]" />
                        </div>
                        <p className="text-lg font-medium text-[#495057]">No candidates found</p>
                        <p className="text-[#6c757d] mt-1">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentCandidates.map((candidate) => (
                                <div
                                    key={candidate.id}
                                    className="border border-[#e9ecef] rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group bg-white"
                                >
                                    
                                    <div className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-medium text-[#333333] group-hover:text-[#8a2be2] transition-colors">
                                                    {candidate.name}
                                                </h3>
                                                <p className="text-sm text-[#6c757d]">{candidate.role}</p>
                                            </div>

                                            <div className="relative">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        toggleDropdown(candidate.id)
                                                    }}
                                                    className="p-1 rounded-md hover:bg-[#f8f9fa] text-[#6c757d]"
                                                >
                                                    <SlOptionsVertical className="h-4 w-4 cursor-pointer" />
                                                    <span className="sr-only">Actions</span>
                                                </button>

                                                {openDropdownId === candidate.id && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-[#e9ecef]">
                                                        <div className="py-1">
                                                            <button
                                                                onClick={() => onViewCandidate(candidate)}
                                                                className="w-full cursor-pointer text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#f8f9fa]"
                                                            >
                                                                View Details
                                                            </button>
                                                            <button
                                                                onClick={() => onEditCandidate(candidate)}
                                                                className="w-full cursor-pointer  text-left px-4 py-2 text-sm text-[#333333] hover:bg-[#f8f9fa]"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => onDeleteCandidate(candidate.id)}
                                                                className="w-full cursor-pointer  text-left px-4 py-2 text-sm text-[#dc3545] hover:bg-[#f8f9fa]"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                   
                                    <div className="px-4 pb-2">
                                        <div className="flex items-center gap-2 text-sm text-[#6c757d] mb-3">
                                            <BiCalendar className="h-4 w-4" />
                                            <span>Added {formatDate(candidate.dateAdded)}</span>
                                        </div>

                                        <div className="flex items-center gap-2 mb-3">
                                            <span
                                                className={`
                      inline-flex px-2 py-1 text-xs font-medium rounded-md
                      ${candidate.experience === "Junior"
                                                        ? "bg-[#d1e7dd] text-[#0f5132]"
                                                        : candidate.experience === "Mid"
                                                            ? "bg-[#cfe2ff] text-[#084298]"
                                                            : "bg-[#f0e6ff] text-[#8a2be2]"
                                                    }
                    `}
                                            >
                                                {candidate.experience}
                                            </span>

                                            {candidate.github && (
                                                <a
                                                    href={candidate.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-xs text-[#6c757d] hover:text-[#8a2be2] transition-colors"
                                                >
                                                    GitHub <BiLink className="ml-1 h-3 w-3" />
                                                </a>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {candidate.techStack.slice(0, 3).map((tech) => (
                                                <span key={tech} className="inline-flex px-2 py-1 text-xs rounded-md bg-[#f8f9fa] text-[#495057]">
                                                    {tech}
                                                </span>
                                            ))}
                                            {candidate.techStack.length > 3 && (
                                                <span className="inline-flex px-2 py-1 text-xs rounded-md bg-[#f8f9fa] text-[#495057]">
                                                    +{candidate.techStack.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                   
                                    <div className="px-4 py-3 bg-[#f8f9fa] border-t border-[#e9ecef]">
                                        <button
                                            className="w-full text-sm cursor-pointer text-[#8a2be2] hover:text-[#7b1fa2] font-medium"
                                            onClick={() => onViewCandidate(candidate)}
                                        >
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-2 mt-6">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 rounded-md ${
                                        currentPage === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-[#8a2be2] hover:bg-[#f8f9fa] border border-[#e9ecef]'
                                    }`}
                                >
                                    Previous
                                </button>
                                
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`px-3 py-1 rounded-md ${
                                            currentPage === index + 1
                                                ? 'bg-[#8a2be2] text-white'
                                                : 'bg-white text-[#8a2be2] hover:bg-[#f8f9fa] border border-[#e9ecef]'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-1 rounded-md ${
                                        currentPage === totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-[#8a2be2] hover:bg-[#f8f9fa] border border-[#e9ecef]'
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default CandidateList
