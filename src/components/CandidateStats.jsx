import React from 'react'
import { LuUserRound, LuUsers, LuUserCheck } from 'react-icons/lu'

const CandidateStats = ({ candidates }) => {

    const totalCandidates = candidates.length

    const juniorCount = candidates.filter((c) => c.experience === "Junior").length
    const midCount = candidates.filter((c) => c.experience === "Mid").length
    const seniorCount = candidates.filter((c) => c.experience === "Senior").length

  
    const techCount = {}
    candidates.forEach((candidate) => {
        candidate.techStack.forEach((tech) => {
            techCount[tech] = (techCount[tech] || 0) + 1
        })
    })

    let mostCommonTech = { name: "None", count: 0 }
    Object.entries(techCount).forEach(([tech, count]) => {
        if (count > mostCommonTech.count) {
            mostCommonTech = { name: tech, count }
        }
    })

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-row items-center justify-between p-4 bg-white">
                    <h3 className="text-sm font-medium text-[#333333]">Total Candidates</h3>
                    <div className="w-8 h-8 rounded-full bg-[#f0e6ff] flex items-center justify-center">
                        <LuUsers className="h-4 w-4 text-[#8a2be2]" />
                    </div>
                </div>
                <div className="p-4 pt-0">
                    <div className="text-3xl font-bold text-[#8a2be2]">{totalCandidates}</div>
                    <p className="text-xs text-[#6c757d] mt-1">
                        {totalCandidates === 0
                            ? "No candidates yet"
                            : `${totalCandidates} candidate${totalCandidates !== 1 ? "s" : ""} in the system`}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-row items-center justify-between p-4 bg-white">
                    <h3 className="text-sm font-medium text-[#333333]">Junior Developers</h3>
                    <div className="w-8 h-8 rounded-full bg-[#d1e7dd] flex items-center justify-center">
                        <LuUserRound className="h-4 w-4 text-[#0f5132]" />
                    </div>
                </div>
                <div className="p-4 pt-0">
                    <div className="text-3xl font-bold text-[#198754]">{juniorCount}</div>
                    <div className="flex items-center mt-2">
                        <div className="w-full bg-[#e9ecef] rounded-full h-2.5">
                            <div
                                className="bg-[#198754] h-2.5 rounded-full transition-all duration-500 ease-in-out"
                                style={{ width: totalCandidates ? `${(juniorCount / totalCandidates) * 100}%` : "0%" }}
                            />
                        </div>
                        <span className="text-xs text-[#6c757d] ml-2 min-w-[32px] text-right">
                            {totalCandidates ? Math.round((juniorCount / totalCandidates) * 100) : 0}%
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-row items-center justify-between p-4 bg-white">
                    <h3 className="text-sm font-medium text-[#333333]">Mid-level Developers</h3>
                    <div className="w-8 h-8 rounded-full bg-[#cfe2ff] flex items-center justify-center">
                        <LuUserCheck className="h-4 w-4 text-[#084298]" />
                    </div>
                </div>
                <div className="p-4 pt-0">
                    <div className="text-3xl font-bold text-[#0d6efd]">{midCount}</div>
                    <div className="flex items-center mt-2">
                        <div className="w-full bg-[#e9ecef] rounded-full h-2.5">
                            <div
                                className="bg-[#0d6efd] h-2.5 rounded-full transition-all duration-500 ease-in-out"
                                style={{ width: totalCandidates ? `${(midCount / totalCandidates) * 100}%` : "0%" }}
                            />
                        </div>
                        <span className="text-xs text-[#6c757d] ml-2 min-w-[32px] text-right">
                            {totalCandidates ? Math.round((midCount / totalCandidates) * 100) : 0}%
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-row items-center justify-between p-4 bg-white">
                    <h3 className="text-sm font-medium text-[#333333]">Senior Developers</h3>
                    <div className="w-8 h-8 rounded-full bg-[#f0e6ff] flex items-center justify-center">
                        <LuUserCheck className="h-4 w-4 text-[#8a2be2]" />
                    </div>
                </div>
                <div className="p-4 pt-0">
                    <div className="text-3xl font-bold text-[#8a2be2]">{seniorCount}</div>
                    <div className="flex items-center mt-2">
                        <div className="w-full bg-[#e9ecef] rounded-full h-2.5">
                            <div
                                className="bg-[#8a2be2] h-2.5 rounded-full transition-all duration-500 ease-in-out"
                                style={{ width: totalCandidates ? `${(seniorCount / totalCandidates) * 100}%` : "0%" }}
                            />
                        </div>
                        <span className="text-xs text-[#6c757d] ml-2 min-w-[32px] text-right">
                            {totalCandidates ? Math.round((seniorCount / totalCandidates) * 100) : 0}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CandidateStats
