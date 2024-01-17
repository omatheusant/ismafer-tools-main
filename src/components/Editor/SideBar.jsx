export const SideBar = ({children}) => {
  return (
    <div className='h-screen bg-[--bg-color] w-[8vw] fixed left-0 top-[10vh] z-10'>
      <div className='py-[3vh]'>
        <ul className='flex flex-col justify-evenly h-[80vh] items-center'>
          {children}
        </ul>
      </div>
    </div>
  )
}

