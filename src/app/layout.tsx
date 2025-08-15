import './globals.css'
import { Montserrat } from 'next/font/google'
import { BackgroundBeams } from './../../components/aceternity/background-beams'
import Footer from '../../components/footer'

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={montserrat.className}>
                <BackgroundBeams />
                {children}
                <Footer />
            </body>
        </html>
    )
}
