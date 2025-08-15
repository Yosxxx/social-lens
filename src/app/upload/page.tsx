'use client'
import { useState } from 'react'
import { FileUpload } from './../../../components/aceternity/file-upload'

export default function Upload() {
    const [files, setFiles] = useState<File[]>([])

    const handleReset = () => {
        setFiles([])
    }

    const handleFileUpload = (uploadedFiles: File[]) => {
        setFiles(uploadedFiles)
        console.log(uploadedFiles)
    }

    return (
        <div className='flex-col flex h-screen justify-center items-center'>
            <div className='flex items-center flex-col justify-center bg-black p-20 rounded-xl'>
                <FileUpload files={files} onChange={handleFileUpload} />

                <div className='flex gap-x-5 mt-5'>
                    <button
                        className='cursor-pointer z-10 shadow-[0_4px_14px_0_rgb(16,185,129,39%)] hover:shadow-[0_6px_20px_rgba(16,185,129,23%)] hover:bg-[rgba(16,185,129,0.9)] px-8 py-2 bg-[#10b981] rounded-md text-white font-light transition duration-200 ease-linear'
                        disabled={files.length === 0}
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
            </div>
        </div>
    )
}
