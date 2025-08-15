'use client'

import { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

type UserData = {
    link: string
    username: string
    timestamp: string
}

type ModalProps = {
    title: string
    users: UserData[]
    onClose: () => void
}

export default function Modal({ title, users, onClose }: ModalProps) {
    const [detailed, setDetailed] = useState(false)

    return (
        <div className='fixed inset-0 bg-black/30 flex justify-center items-center z-50' onClick={onClose}>
            <div
                className='bg-zinc-950 p-10 flex flex-col gap-5 justify-center items-center text-white w-4xl h-[80vh]'
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Title */}
                <div className='text-2xl font-bold'>{title}</div>

                {/* Default / Detailed Buttons */}
                <div className='flex justify-center text-lg'>
                    <button
                        className={`p-3 cursor-pointer ${!detailed ? 'bg-zinc-500' : 'bg-zinc-800'}`}
                        onClick={() => setDetailed(false)}
                    >
                        Default
                    </button>
                    <button
                        className={`p-3 cursor-pointer ${detailed ? 'bg-zinc-500' : 'bg-zinc-800'}`}
                        onClick={() => setDetailed(true)}
                    >
                        Detailed
                    </button>
                </div>

                {/* User List */}
                <div className='flex flex-wrap gap-2 w-full overflow-auto h-[80%] min-h-[200px]'>
                    {!detailed &&
                        users.map((user) => (
                            <a
                                key={user.username}
                                href={user.link}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='bg-zinc-800 p-2 text-sm rounded-2xl hover:bg-zinc-700 break-words'
                            >
                                {user.username}
                            </a>
                        ))}

                    {detailed &&
                        users.map((user) => (
                            <div
                                key={user.username}
                                className='bg-zinc-800 p-3 rounded-lg w-full flex flex-col gap-1 hover:bg-zinc-700'
                            >
                                <div className='font-semibold'>{user.username}</div>
                                <div className='text-xs text-zinc-400'>
                                    {dayjs(Number(user.timestamp) * 1000).fromNow()}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
