'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UserListPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const res = await fetch('/api/users/list');
            const data = await res.json();
            setUsers(data);
        }
        fetchUsers();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">User List</h1>
                <Link href="/users/add">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                        New User
                    </button>
                </Link>
            </div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Contact Number</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.contactNo}</td>
                            <td className="py-2 px-4 border-b">
                                <Link href={`/users/edit/${user._id}`}>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                        Edit
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
