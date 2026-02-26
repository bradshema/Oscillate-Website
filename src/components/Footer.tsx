import { Mail, Twitter, Linkedin, Github } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="relative w-full py-12 px-4 md:px-12 lg:px-24 z-20">
            <div className="max-w-7xl mx-auto">
                <div className="liquid-glass rounded-3xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t-emerald-500/20">

                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                            Ruganintwali Shema Arnaud Brad
                        </h3>
                        <p className="text-emerald-400 mt-3 text-xs md:text-sm tracking-[0.3em] uppercase font-extralight">
                            Available for new projects
                        </p>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <a href="mailto:hello@oscillate.dev" aria-label="Email" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors hover:scale-110 active:scale-95 text-white/70 hover:text-emerald-400 border border-white/5 shadow-lg">
                            <Mail className="w-5 h-5" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors hover:scale-110 active:scale-95 text-white/70 hover:text-emerald-400 border border-white/5 shadow-lg">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors hover:scale-110 active:scale-95 text-white/70 hover:text-emerald-400 border border-white/5 shadow-lg">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="Github" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors hover:scale-110 active:scale-95 text-white/70 hover:text-emerald-400 border border-white/5 shadow-lg">
                            <Github className="w-5 h-5" />
                        </a>
                    </div>

                </div>

                <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-white/30 text-[10px] md:text-xs tracking-[0.2em] font-extralight uppercase text-center md:text-left">
                    <p>© {new Date().getFullYear()} Ruganintwali Shema Arnaud Brad. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0 justify-center text-center">
                        <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
