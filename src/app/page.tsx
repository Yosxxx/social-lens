import Link from 'next/link'
import { ContainerTextFlip } from '../components/aceternity/container-text-flip'

export default function Home() {
    return (
        <div className='flex-col gap-y-5 flex h-screen justify-center items-center'>
            <div className='text-white text-center text-4xl z-10'>
                <div className='font-light'>
                    Behind every follow is a story. <br />
                    Some are real, most are not.
                </div>
                <span>
                    Every profile is a <ContainerTextFlip words={['loyal', 'fake', 'ghost', 'watcher', 'true']} />
                </span>
            </div>

            <div className='flex gap-x-5 text-white'>
                <Link href={'/docs'} className='p-[3px] relative'>
                    <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg' />
                    <div className='px-8 py-2 bg-black rounded-[6px] relative group transition duration-150 hover:bg-transparent'>
                        Docs
                    </div>
                </Link>

                <Link
                    href={'#'}
                    className='px-6 py-2 flex items-center z-10 bg-black text-zinc-500 rounded-lg cursor-not-allowed select-none'
                >
                    Search by username
                </Link>

                <Link
                    href={'/upload'}
                    className='px-6 py-2 flex items-center z-10 bg-black text-white rounded-lg transform hover:-translate-y-1 transition duration-200 border-2 border-transparent hover:border-zinc-600'
                >
                    Upload
                </Link>
            </div>
        </div>
    )
}
