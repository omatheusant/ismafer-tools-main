import prisma from '@/lib/prisma';
import axios from 'axios';
import { useState } from 'react';

export default function GetUsers () {
  const [users, setUsers] = useState([])

    axios.get('/api/users')
    .then((res) => setUsers(res.data))
    .catch((error) => {
      console.log(error.message)
    })

    return users
}