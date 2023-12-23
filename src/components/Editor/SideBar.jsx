export const SideBar = ({children}) => {
  return (
    <div className='min-h-full bg-[--bg-color] w-[8vw] fixed left-0 top-[10vh] z-10'>
      <div className='py-5'>
        <ul className='flex flex-col justify-evenly h-[80vh] items-center'>
          {children}
        </ul>
      </div>
    </div>
  )
}

