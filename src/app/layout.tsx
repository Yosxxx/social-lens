'use client'
import { usePathname } from 'next/navigation'
import './globals.css'
import { Montserrat } from 'next/font/google'
import { BackgroundBeams } from '../components/aceternity/background-beams'
import Footer from '../components/footer'

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    const showBackground = pathname !== '/docs'

    return (
        <html lang='en'>
            <body className={`${montserrat.className} scroll-smooth`}>
                <div className='max-sm:hidden'>{showBackground && <BackgroundBeams />}</div>
                {children}
                <Footer />
            </body>
        </html>
    )
}
