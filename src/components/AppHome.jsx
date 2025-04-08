import React from 'react'
import { useState, useEffect } from 'react'
import AppHeader from './AppHeader'
import CandidateForm from './CandidateForm'
import CandidateList from './CandidateList'
import CandidateStats from './CandidateStats'
import CandidateModal from './CandidateModal'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const AppHome = () => {

  const [candidates, setCandidates] = useState([])
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [activeView, setActiveView] = useState("dashboard")

  useEffect(() => {
    const storedCandidates = localStorage.getItem("candidates")
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates))
    }
  }, [])


  const saveCandidates = (updatedCandidates) => {
    setCandidates(updatedCandidates)
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates))
  }

  const handleAddCandidate = (candidate) => {
    const newCandidates = [...candidates, { ...candidate, id: Date.now().toString() }]
    saveCandidates(newCandidates)
    toast.success(`${candidate.name} has been added successfully.`)
    setActiveView("dashboard")
  }

  const handleEditCandidate = (candidate) => {
    setSelectedCandidate(candidate)
    setIsEditMode(true)
    setActiveView("add-candidate")
  }

  const handleUpdateCandidate = (updatedCandidate) => {
    const newCandidates = candidates.map((c) => (c.id === updatedCandidate.id ? updatedCandidate : c))
    saveCandidates(newCandidates)
    setSelectedCandidate(null)
    setIsEditMode(false)
    toast.success(`${updatedCandidate.name}'s information has been updated.`)
    setActiveView("dashboard")
  }

  const handleDeleteCandidate = (id) => {
    const newCandidates = candidates.filter((c) => c.id !== id)
    saveCandidates(newCandidates)
    setIsModalOpen(false)
    toast.success("The candidate has been removed from the system.")
  }

  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCandidate(null)
  }

  const handleCancelEdit = () => {
    setSelectedCandidate(null)
    setIsEditMode(false)
    setActiveView("dashboard")
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <ToastContainer position="top-center" />
      <AppHeader activeView={activeView} setActiveView={setActiveView} candidates={candidates} />

      <main className="p-4 md:p-8">
        {activeView === "dashboard" ? (
          <div className="space-y-8 max-w-7xl mx-auto">
            <CandidateStats candidates={candidates} />
            <CandidateList
              candidates={candidates}
              onViewCandidate={handleViewCandidate}
              onEditCandidate={handleEditCandidate}
              onDeleteCandidate={handleDeleteCandidate}
            />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <CandidateForm
              onAddCandidate={handleAddCandidate}
              onUpdateCandidate={handleUpdateCandidate}
              candidate={selectedCandidate}
              isEditMode={isEditMode}
              onCancel={handleCancelEdit}
            />
          </div>
        )}
      </main>

      {isModalOpen && selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onEdit={() => {
            handleCloseModal()
            handleEditCandidate(selectedCandidate)
          }}
          onDelete={() => handleDeleteCandidate(selectedCandidate.id)}
        />
      )}

    </div>
  )
}

export default AppHome
