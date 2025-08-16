export default function Footer() {
    return (
        <footer className='text-white'>
            {/* Center: Credits */}
            <div className='text-center border-t border-zinc-700 py-5'>
                <p>
                    Built by <span className='font-bold'>Yosua</span>
                </p>
                <p className='mt-2 max-md:text-xs'>“Obsessed with follows, blind to reality.”</p>
                <p className='mt-1 italic text-zinc-400 max-md:text-xs'>
                    vibecoded with ChatGPT-5, aceternity-ui, and next.js
                </p>
            </div>
        </footer>
    )
}
