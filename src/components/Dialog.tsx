import { ElementType, ReactNode, useRef } from 'react'

type DialogProps = {
  children: ReactNode
  Trigger: ElementType
}

function Dialog(props: DialogProps) {
  const { children, Trigger } = props
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleOpen = () => {
    dialogRef.current?.showModal()
  }

  const handleClose = () => {
    dialogRef.current?.close()
  }

  return (
    <>
      <Trigger onClick={handleOpen} />
      <dialog ref={dialogRef}>{children}</dialog>
    </>
  )
}

export default Dialog
