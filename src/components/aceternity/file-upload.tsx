'use client'

import { cn } from '../../lib/utils'
import React from 'react'
import { motion } from 'framer-motion'
import { IconUpload } from '@tabler/icons-react'
import { useDropzone } from 'react-dropzone'

const mainVariant = {
    initial: { x: 0, y: 0 },
    animate: { x: 20, y: -20, opacity: 0.9 }
}

const secondaryVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
}

export const FileUpload = ({ files = [], onChange }: { files?: File[]; onChange?: (files: File[]) => void }) => {
    const handleFileChange = (newFiles: File[]) => {
        if (newFiles.length > 0) {
            const firstFile = newFiles[0]
            const allowedExtensions = /\.(zip|rar|7z|tar|gz)$/i
            if (!allowedExtensions.test(firstFile.name)) {
                alert('Only compressed files (.zip, .rar, .7z, .tar, .gz) are allowed.')
                return
            }
            onChange?.([firstFile])
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: false,
        accept: {
            'application/zip': ['.zip'],
            'application/x-rar-compressed': ['.rar'],
            'application/x-7z-compressed': ['.7z'],
            'application/x-tar': ['.tar'],
            'application/gzip': ['.gz']
        },
        onDrop: handleFileChange,
        onDropRejected: () => {
            alert('Invalid file type. Please upload a compressed file.')
        }
    })

    return (
        <div className='w-full' {...getRootProps()}>
            <input {...getInputProps()} />
            <motion.div
                whileHover='animate'
                className='p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden'
            >
                <div className='flex flex-col items-center justify-center'>
                    <p className='relative z-20 font-sans font-bold text-white text-base'>Upload file</p>
                    <p className='relative z-20 font-sans font-normal text-gray-400 text-base mt-2'>
                        Drag or drop your files here or click to upload
                    </p>
                    <div className='relative w-full mt-10 max-w-xl mx-auto'>
                        {files.length > 0 ? (
                            files.map((file, idx) => (
                                <motion.div
                                    key={'file' + idx}
                                    layoutId={idx === 0 ? 'file-upload' : 'file-upload-' + idx}
                                    className={cn(
                                        'relative overflow-hidden z-40 bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md',
                                        'shadow-sm border border-neutral-800'
                                    )}
                                >
                                    <div className='flex justify-between w-full items-center gap-4'>
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            layout
                                            className='text-base text-white truncate max-w-xs'
                                        >
                                            {file.name}
                                        </motion.p>
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            layout
                                            className='rounded-lg px-2 py-1 w-fit shrink-0 text-sm bg-neutral-700 text-white shadow-input'
                                        >
                                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                                        </motion.p>
                                    </div>
                                    <div className='flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-gray-400'>
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            layout
                                            className='px-1 py-0.5 rounded-md bg-neutral-700 text-white'
                                        >
                                            {file.type}
                                        </motion.p>
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout>
                                            modified {new Date(file.lastModified).toLocaleDateString()}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <>
                                <motion.div
                                    layoutId='file-upload'
                                    variants={mainVariant}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className={cn(
                                        'relative group-hover/file:shadow-2xl z-40 bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md',
                                        'shadow-[0px_10px_50px_rgba(0,0,0,0.3)]'
                                    )}
                                >
                                    {isDragActive ? (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className='text-gray-400 flex flex-col items-center'
                                        >
                                            Drop it
                                            <IconUpload className='h-4 w-4 text-gray-300' />
                                        </motion.p>
                                    ) : (
                                        <IconUpload className='h-4 w-4 text-gray-300' />
                                    )}
                                </motion.div>
                                <motion.div
                                    variants={secondaryVariant}
                                    className='absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md'
                                />
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
