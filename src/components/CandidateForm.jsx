import React from 'react'
import { useState, useEffect } from "react"
import { MdCancel } from "react-icons/md";


const CandidateForm = ({ onAddCandidate, onUpdateCandidate, candidate, isEditMode, onCancel }) => {

    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [linkedIn, setLinkedIn] = useState("")
    const [github, setGithub] = useState("")
    const [experience, setExperience] = useState("Junior")
    const [techStack, setTechStack] = useState([])
    const [techInput, setTechInput] = useState("")

    useEffect(() => {
        if (candidate && isEditMode) {
            setName(candidate.name)
            setRole(candidate.role)
            setLinkedIn(candidate.linkedIn)
            setGithub(candidate.github)
            setExperience(candidate.experience)
            setTechStack(candidate.techStack)
        }
    }, [candidate, isEditMode])

    const handleSubmit = (e) => {
        e.preventDefault()

        const newCandidate = {
            id: isEditMode && candidate ? candidate.id : Date.now().toString(),
            name,
            role,
            linkedIn,
            github,
            experience,
            techStack,
            dateAdded: isEditMode && candidate ? candidate.dateAdded : new Date().toISOString(),
        }

        if (isEditMode) {
            onUpdateCandidate(newCandidate)
        } else {
            onAddCandidate(newCandidate)
        }

        resetForm()
    }

    const resetForm = () => {
        setName("")
        setRole("")
        setLinkedIn("")
        setGithub("")
        setExperience("Junior")
        setTechStack([])
        setTechInput("")
    }

    const handleAddTech = (e) => {
        if (e.key === "Enter" && techInput.trim() !== "") {
            e.preventDefault()
            if (!techStack.includes(techInput.trim())) {
                setTechStack([...techStack, techInput.trim()])
            }
            setTechInput("")
        }
    }

    const handleRemoveTech = (tech) => {
        setTechStack(techStack.filter((t) => t !== tech))
    }

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
           
            <div className="bg-[#8a2be2] px-6 py-4">
                <h2 className="text-xl font-bold text-white">{isEditMode ? "Edit Candidate" : "Add New Candidate"}</h2>
                <p className="text-[#e6d2ff] text-sm mt-1">
                    {isEditMode
                        ? "Update the candidate's information in the system"
                        : "Enter the candidate's details to add them to the system"}
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-[#333333]">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                required
                                className="w-full px-3 py-2 border border-[#ced4da] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8a2be2] focus:border-[#8a2be2]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="role" className="block text-sm font-medium text-[#333333]">
                                Job Role / Position
                            </label>
                            <input
                                id="role"
                                type="text"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder="Frontend Developer"
                                required
                                className="w-full px-3 py-2 border border-[#ced4da] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8a2be2] focus:border-[#8a2be2]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="linkedin" className="block text-sm font-medium text-[#333333]">
                                LinkedIn URL
                            </label>
                            <input
                                id="linkedin"
                                type="url"
                                value={linkedIn}
                                onChange={(e) => setLinkedIn(e.target.value)}
                                placeholder="https://linkedin.com/in/username"
                                className="w-full px-3 py-2 border border-[#ced4da] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8a2be2] focus:border-[#8a2be2]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="github" className="block text-sm font-medium text-[#333333]">
                                GitHub URL
                            </label>
                            <input
                                id="github"
                                type="url"
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                                placeholder="https://github.com/username"
                                className="w-full px-3 py-2 border border-[#ced4da] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8a2be2] focus:border-[#8a2be2]"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="experience" className="block text-sm font-medium text-[#333333]">
                            Experience Level
                        </label>
                        <select
                            id="experience"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className="w-full px-3 py-2 border border-[#ced4da] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8a2be2] focus:border-[#8a2be2]"
                        >
                            <option value="Junior">Junior</option>
                            <option value="Mid">Mid</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="tech-stack" className="block text-sm font-medium text-[#333333]">
                            Tech Stack
                        </label>
                        <div className="flex flex-wrap gap-2 mb-3 min-h-[40px] p-2 bg-[#f8f9fa] rounded-md border border-[#ced4da]">
                            {techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm bg-[#f0e6ff] text-[#8a2be2]"
                                >
                                    {tech}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTech(tech)}
                                        className="ml-1 rounded-full hover:bg-[#e6d2ff] p-0.5"
                                    >
                                        <MdCancel className="h-3 w-3" />
                                        <span className="sr-only">Remove {tech}</span>
                                    </button>
                                </span>
                            ))}
                            {techStack.length === 0 && <span className="text-sm text-[#6c757d]">No technologies added yet</span>}
                        </div>
                        <input
                            id="tech-stack"
                            type="text"
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            onKeyDown={handleAddTech}
                            placeholder="Type a technology and press Enter (e.g. React)"
                            className="w-full px-3 py-2 border border-[#ced4da] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8a2be2] focus:border-[#8a2be2]"
                        />
                        <p className="text-xs text-[#6c757d] mt-1">Press Enter to add multiple technologies</p>
                    </div>
                </div>


                <div className="flex justify-between py-4 px-6 bg-[#f8f9fa] border-t border-[#e9ecef]">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border cursor-pointer border-[#ced4da] rounded-md shadow-sm text-sm font-medium text-[#6c757d] bg-white hover:bg-[#f8f9fa] focus:outline-none focus:ring-2 focus:ring-[#8a2be2]"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-md cursor-pointer shadow-sm text-sm font-medium text-white bg-[#8a2be2] hover:bg-[#7b1fa2] focus:outline-none focus:ring-2 focus:ring-[#8a2be2]"
                    >
                        {isEditMode ? "Update Candidate" : "Add Candidate"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CandidateForm
