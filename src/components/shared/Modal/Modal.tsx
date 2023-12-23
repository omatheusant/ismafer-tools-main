import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { IoExitOutline } from 'react-icons/io5'

interface ModalProps {
  children: ReactNode,
  title: ReactNode,
  className?: any
  id: any
}

export const Modal = ({ children, title, id, ...props }: ModalProps) => {
  return (
    <>
      < button {...props} onClick={() => (document.getElementById(`${id}`) as HTMLDialogElement)!.showModal()}>{title}</button >
      <dialog id={id} className="modal">
        <div className="modal-box bg-[--bg-color] overflow-hidden">
          {children}
          <div className="modal-action">
            <form method="dialog">
              <button className="text-[--light] text-lg flex items-center gap-2">Cancelar <IoExitOutline /></button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}