import { useEffect, useRef, useState } from 'react'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

// Edit/Delete are placeholders only — wiring them up comes with the backend.
export default function EmployeeActionsMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-label="Employee actions"
        onClick={(event) => {
          event.stopPropagation()
          setOpen((value) => !value)
        }}
        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-[#123524]"
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div
          onClick={(event) => event.stopPropagation()}
          className="absolute right-0 top-full z-10 mt-1 w-36 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
        >
          <button
            type="button"
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
          >
            <Pencil size={14} />
            Edit
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
