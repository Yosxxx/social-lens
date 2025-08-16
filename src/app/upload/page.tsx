'use client'
import { useState } from 'react'
import { FileUpload } from '../../components/aceternity/file-upload'
import JSZip from 'jszip'
import { toast, ToastContainer } from 'react-toastify'
import Modal from '../../components/modal'
import Link from 'next/link'

type UserData = {
    link: string
    username: string
    timestamp: string
}

export default function Upload() {
    // Modals
    const [modalOpen, setModalOpen] = useState(false)
    const [modalUsers, setModalUsers] = useState<UserData[]>([])
    const [modalTitle, setModalTitle] = useState('')

    // Upload Component
    const [files, setFiles] = useState<File[]>([])

    // Lists
    const [followingList, setFollowingList] = useState<UserData[]>([])
    const [followerList, setFollowerList] = useState<UserData[]>([])
    const [notFollowingYouBackList, setNotFollowingYouBackList] = useState<UserData[]>([])
    const [youDontFollowBackList, setYouDontFollowBackList] = useState<UserData[]>([])

    const handleReset = () => {
        setFiles([])
        setFollowingList([])
        setFollowerList([])
        setNotFollowingYouBackList([])
        setYouDontFollowBackList([])
    }

    const handleFileUpload = (uploadedFiles: File[]) => {
        setFiles(uploadedFiles)
    }

    const parseInstagramJson = (raw: any): UserData[] => {
        const userList: UserData[] = []
        const arr = Array.isArray(raw) ? raw : raw.relationships_following

        for (const eachUser of arr) {
            if (eachUser.string_list_data) {
                const user = eachUser.string_list_data[0]

                userList.push({
                    username: user.value,
                    link: user.href,
                    timestamp: String(user.timestamp)
                })
            }
        }

        return userList
    }

    const handleAnalyze = async () => {
        // Init JSZip
        const zipFile = files[0]
        const zip = new JSZip()
        const loadedZip = await zip.loadAsync(zipFile)

        // Navigation
        const followerFile = loadedZip.file('connections/followers_and_following/followers_1.json')
        const followingFile = loadedZip.file('connections/followers_and_following/following.json')

        // Error
        if (!followerFile) {
            toast.error('Follower File Missing!')
            return
        }

        if (!followingFile) {
            toast.error('Following File Missing!')
            return
        }

        // Raw
        const rawFollowers = JSON.parse(await followerFile?.async('string'))
        const rawFollowings = JSON.parse(await followingFile?.async('string'))

        // Process raw
        const processedFollowers = parseInstagramJson(rawFollowers.relationships_followers || rawFollowers)
        const processedFollowings = parseInstagramJson(rawFollowings.relationships_following || rawFollowings)

        // Set data
        setFollowerList(processedFollowers)
        setFollowingList(processedFollowings)
        setNotFollowingYouBackList(
            processedFollowings.filter((f) => !processedFollowers.some((p) => p.username === f.username))
        )
        setYouDontFollowBackList(
            processedFollowers.filter((f) => !processedFollowings.some((p) => p.username === f.username))
        )
    }

    return (
        <div className='flex-col flex h-screen justify-center items-center'>
            <ToastContainer position='top-right' autoClose={3000} />

            <div className='flex items-center flex-col justify-center w-[40vw] bg-zinc-950/80 p-10 rounded-xl max-md:w-[90vw] max-sm:py-10 max-sm:px-0'>
                <FileUpload files={files} onChange={handleFileUpload} />

                <div className='flex gap-x-5 mt-5'>
                    <button
                        className='cursor-pointer z-10 shadow-[0_4px_14px_0_rgb(16,185,129,39%)] hover:shadow-[0_6px_20px_rgba(16,185,129,23%)] hover:bg-[rgba(16,185,129,0.9)] px-8 py-2 bg-[#10b981] rounded-md text-white font-light transition duration-200 ease-linear'
                        disabled={files.length === 0}
                        onClick={handleAnalyze}
                    >
                        Analyze
                    </button>

                    <button
                        className='cursor-pointer z-10 shadow-[0_4px_14px_0_rgb(220,38,38,39%)] hover:shadow-[0_6px_20px_rgba(220,38,38,23%)] hover:bg-[rgba(220,38,38,0.9)] px-8 py-2 bg-[#dc2626] rounded-md text-white font-light transition duration-200 ease-linear'
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>

                {modalOpen && <Modal title={modalTitle} users={modalUsers} onClose={() => setModalOpen(false)} />}
                {(followingList.length > 0 || followerList.length > 0) && (
                    <div className='mt-10 flex gap-5 max-sm:gap-1 max-sm:flex-wrap justify-center '>
                        <button
                            onClick={() => {
                                setModalTitle('Followings')
                                setModalUsers(followingList)
                                setModalOpen(true)
                            }}
                            className='max-md:text-xs max-md:px-4 max-md:py-2 px-8 py-2 bg-zinc-900 z-10 text-white text-sm rounded-md font-semibold hover:bg-zinc-700 hover:shadow-lg transition duration-150 cursor-pointer'
                        >
                            Followings
                        </button>

                        <button
                            onClick={() => {
                                setModalTitle('Followers')
                                setModalUsers(followerList)
                                setModalOpen(true)
                            }}
                            className='max-md:text-xs max-md:px-4 max-md:py-2 px-8 py-2 bg-zinc-900 z-10 text-white text-sm rounded-md font-semibold hover:bg-zinc-700 hover:shadow-lg transition duration-150 cursor-pointer'
                        >
                            Followers
                        </button>

                        <button
                            onClick={() => {
                                setModalTitle('Not Following You Back')
                                setModalUsers(notFollowingYouBackList)
                                setModalOpen(true)
                            }}
                            className='max-md:text-xs max-md:px-4 max-md:py-2 px-8 py-2 bg-zinc-900 z-10 text-white text-sm rounded-md font-semibold hover:bg-zinc-700 hover:shadow-lg transition duration-150 cursor-pointer'
                        >
                            Not Following You Back🔥
                        </button>

                        <button
                            onClick={() => {
                                setModalTitle("You Don't Follow Back")
                                setModalUsers(youDontFollowBackList)
                                setModalOpen(true)
                            }}
                            className='max-md:text-xs max-md:px-4 max-md:py-2 px-8 py-2 bg-zinc-900 z-10 text-white text-sm rounded-md font-semibold hover:bg-zinc-700 hover:shadow-lg transition duration-150 cursor-pointer'
                        >
                            You Don't Follow Back
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
