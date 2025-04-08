import React from 'react'
import { useEffect, useRef } from "react"
import { BiLink, BiCalendar, BiTrash, BiEdit, BiX } from 'react-icons/bi'
import { formatDate } from '../utils/utils'

const CandidateModal = ({ candidate, isOpen, onClose, onEdit, onDelete }) => {

    const modalRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen, onClose])

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div ref={modalRef} className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-[#8a2be2] p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-bold text-white">{candidate.name}</h2>
                            <p className="text-[#e6d2ff]">{candidate.role}</p>
                        </div>
                        <button onClick={onClose} className="text-white/70 cursor-pointer hover:text-white">
                            <BiX className="h-5 w-5" />
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-3">
                        <span
                            className={`
              inline-flex px-2 py-1 text-sm font-medium rounded-md
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
                        <span className="text-sm text-[#6c757d] flex items-center">
                            <BiCalendar className="mr-1 h-4 w-4" />
                            Added {formatDate(candidate.dateAdded)}
                        </span>
                    </div>

                    <hr className="border-[#e9ecef]" />

                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-[#333333]">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {candidate.techStack.map((tech) => (
                                <span key={tech} className="inline-flex px-2 py-1 text-sm rounded-md bg-[#f8f9fa] text-[#495057]">
                                    {tech}
                                </span>
                            ))}
                            {candidate.techStack.length === 0 && (
                                <span className="text-sm text-[#6c757d]">No technologies specified</span>
                            )}
                        </div>
                    </div>

                    <hr className="border-[#e9ecef]" />

                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-[#333333]">Profiles</h4>
                        <div className="space-y-3">
                            {candidate.linkedIn && (
                                <a
                                    href={candidate.linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-sm text-[#8a2be2] hover:text-[#7b1fa2]"
                                >
                                    LinkedIn Profile
                                    <BiLink className="ml-1 h-3 w-3" />
                                </a>
                            )}

                            {candidate.github && (
                                <a
                                    href={candidate.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-sm text-[#8a2be2] hover:text-[#7b1fa2]"
                                >
                                    GitHub Profile
                                    <BiLink className="ml-1 h-3 w-3" />
                                </a>
                            )}

                            {!candidate.linkedIn && !candidate.github && (
                                <span className="text-sm text-[#6c757d]">No profiles provided</span>
                            )}
                        </div>
                    </div>
                </div>

               
                <div className="flex justify-between p-4 bg-[#f8f9fa] border-t border-[#e9ecef]">
                    <button
                        onClick={onDelete}
                        className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium rounded-md text-[#dc3545] hover:bg-[#f8d7da]"
                    >
                        <BiTrash className="mr-2 h-4 w-4" />
                        Delete
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="px-3 py-2 border cursor-pointer border-[#ced4da] rounded-md text-sm font-medium text-[#6c757d] hover:bg-[#f8f9fa]"
                        >
                            Close
                        </button>
                        <button
                            onClick={onEdit}
                            className="inline-flex cursor-pointer items-center px-3 py-2 rounded-md text-sm font-medium text-white bg-[#8a2be2] hover:bg-[#7b1fa2]"
                        >
                            <BiEdit className="mr-2 h-4 w-4" />
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CandidateModal
