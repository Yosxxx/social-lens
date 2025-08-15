import { Timeline } from '@/components/aceternity/timeline'
import { LinkPreview } from './../../components/aceternity/link-preview'
import Link from 'next/link'

export default function Docs() {
    const data = [
        {
            title: 'How to download your data',
            content: (
                <div>
                    <p className='mb-8 text-xs font-normal text-neutral-200 md:text-sm dark:text-neutral-200'>
                        Navigate to your
                        <LinkPreview
                            url='https://www.instagram.com/'
                            imageSrc='/timeline/p-1.jpg'
                            isStatic
                            className='font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500'
                            height={140}
                            width={240}
                        >
                            <span> instagram account </span>
                        </LinkPreview>
                        <span>
                            → More → Settings → Account Status → Privacy Settings → Your Information and Permissions →
                            Export Your Information → Create Export → select your Instagram profile. Only tick
                            "Following" and "Follower" lists. Then set the date range to "All time" and start the
                            export. (We do not save your data; everything is processed locally on your device.)
                        </span>
                    </p>
                    <div className='grid grid-cols-2 gap-4'>
                        <img
                            src={'/timeline/1-1.jpg'}
                            alt='startup template'
                            className='h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60'
                        />
                        <img
                            src={'/timeline/1-2.jpg'}
                            alt='startup template'
                            className='h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60'
                        />
                        <img
                            src={'/timeline/1-3.jpg'}
                            alt='startup template'
                            className='h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60'
                        />
                        <img
                            src={'/timeline/1-4.jpg'}
                            alt='startup template'
                            className='h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60'
                        />
                    </div>
                </div>
            )
        },
        {
            title: 'How to upload data',
            content: (
                <div>
                    <p className='mb-8 text-xs font-normal text-neutral-200  md:text-sm dark:text-neutral-200'>
                        After you download the .zip file from Instagram, head over to the website →
                        <LinkPreview
                            url='#'
                            imageSrc='/timeline/p-2.jpg'
                            isStatic
                            className='font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500'
                            height={140}
                            width={240}
                        >
                            <span> /upload </span>
                        </LinkPreview>
                        <span>
                            or simply click the Upload button on the page. Once the file is uploaded, click the Analyze
                            button to process your data. After a short moment, the relevant buttons will appear, giving
                            you access to the different sections like Followers, Followings, and people who don't follow
                            you back. Take your time exploring each section to understand your Instagram connections
                            better.
                        </span>
                    </p>
                    <div className='grid grid-cols-2 gap-4'>
                        <img
                            src={'/timeline/2-1.jpg'}
                            alt='hero template'
                            className='h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60'
                        />
                        <img
                            src={'/timeline/2-2.jpg'}
                            alt='feature template'
                            className='h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60'
                        />
                        <img
                            src={'/timeline/2-3.jpg'}
                            alt='bento template'
                            className='h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60'
                        />
                    </div>
                </div>
            )
        },
        {
            title: 'Navigation',
            content: (
                <div>
                    <p className='mb-4 text-xs font-normal text-neutral-200  md:text-sm dark:text-neutral-200'>
                        The four main buttons show Instagram information: Followers, Followings, People who don't follow
                        you back, and People you don't follow back. You can click on a username to open that user's
                        Instagram page. <br /> <br />
                        ⚠️<strong>Be careful:</strong> repeatedly opening Instagram profiles directly from the app may
                        trigger Instagram's anti-bot mechanisms or appear suspicious, which could temporarily restrict
                        your account. Always use this feature sparingly to avoid unwanted account flags. 🚩
                    </p>
                    <div className='mb-8'>
                        <div className='flex items-center gap-2 text-xs text-neutral-200  md:text-sm dark:text-neutral-300'>
                            ✅ Followings
                        </div>
                        <div className='flex items-center gap-2 text-xs text-neutral-200  md:text-sm dark:text-neutral-300'>
                            ✅ Followers
                        </div>
                        <div className='flex items-center gap-2 text-xs text-neutral-200  md:text-sm dark:text-neutral-300'>
                            ✅ People who don't follow you back
                        </div>
                        <div className='flex items-center gap-2 text-xs text-neutral-200  md:text-sm dark:text-neutral-300'>
                            ✅ People you don't follow back
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <img
                            src={'/timeline/3-1.jpg'}
                            alt='hero template'
                            className='h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60'
                        />
                        <img
                            src={'/timeline/3-2.jpg'}
                            alt='feature template'
                            className='h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60'
                        />
                    </div>
                </div>
            )
        }
    ]

    return (
        <div className='relative w-full overflow-hidden'>
            <Timeline data={data} />
        </div>
    )
}
