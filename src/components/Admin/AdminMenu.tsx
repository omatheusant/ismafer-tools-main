import Link from 'next/link';
import { MdManageAccounts } from "react-icons/md";

export const AdminMenu = () => {
  return (
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-transparent text-lg shadow rounded-box w-[10vw]">
        <li><Link href={'/admin/dashboard'}><MdManageAccounts size={25}/>Admin</Link></li>
      </ul>
  )
}