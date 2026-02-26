import PortfolioRow, { Project } from "./PortfolioRow"
import StaggerText from './StaggerText'

export type Category = {
    _id: string
    title: string
    order: number
    projects: Project[]
}

// Fallback data in case CMS is not set up
const fallbackCategories: Category[] = [
    {
        _id: "cat-1",
        title: "High-End CGI Commercials",
        order: 1,
        projects: [
            { _id: "p1", title: "Automotive Precision", overview: "Photorealistic 3D rendering for automotive." },
            { _id: "p2", title: "Liquid Gold", overview: "Fluid dynamics and rigid body simulations." },
            { _id: "p3", title: "Tech Hardware", overview: "Micro-detail product visualization." },
            { _id: "p4", title: "Luxury Story", overview: "Cinematic brand storytelling." },
            { _id: "p5", title: "Zero Gravity", overview: "Weightless object simulations." },
            { _id: "p6", title: "Kinetic Motion", overview: "Complex 3D typography." },
        ]
    },
    {
        _id: "cat-2",
        title: "Immersive VFX & WebGL",
        order: 2,
        projects: [
            { _id: "p11", title: "Unreal Portal", overview: "Real-time engine environment." },
            { _id: "p12", title: "Sci-Fi Compositing", overview: "Nuke node-tree masterclass." },
            { _id: "p13", title: "Houdini Storm", overview: "Complex particle FX." },
            { _id: "p14", title: "Architectural Engine", overview: "Realtime global illumination." },
            { _id: "p15", title: "Interactive Canvas", overview: "Award-winning WebGL layout." },
            { _id: "p16", title: "Broadcast Package", overview: "Stylized motion television assets." },
        ]
    }
]

export default function Portfolio() {
    let categories = fallbackCategories

    // Use fallback if no categories found
    if (categories.length === 0) {
        categories = fallbackCategories
    }

    // Ensure projects have enough items to loop (duplicate if needed for visual effect)
    categories = categories.map(cat => {
        let projs = cat.projects || []
        if (projs.length > 0 && projs.length < 5) {
            // Duplicate to ensure the row is long enough for the infinite effect
            projs = [...projs, ...projs, ...projs]
        }
        return { ...cat, projects: projs }
    })

    // Filter out empty categories
    const activeCategories = categories.filter(cat => cat.projects?.length > 0)

    if (activeCategories.length === 0) return null

    return (
        <section id="portfolio" className="relative w-full min-h-screen py-24 z-10 overflow-hidden">
            <div className="max-w-[100vw] text-left">
                <div className="px-6 md:px-12 lg:px-24 mb-16">
                    <StaggerText
                        text="Selected Work"
                        className="text-4xl md:text-5xl font-light text-white mb-2 tracking-wide block"
                    />
                    <p className="text-white/40 text-sm font-extralight uppercase tracking-[0.3em]">Explore the archive</p>
                </div>

                <div className="flex flex-col gap-12 sm:gap-16">
                    {activeCategories.map((category, idx) => (
                        <div key={category._id} className="w-full">
                            <h3 className="px-6 md:px-12 lg:px-24 text-xl md:text-2xl font-medium tracking-wide text-white/80 mb-6 drop-shadow-md">
                                {category.title}
                            </h3>
                            <PortfolioRow
                                projects={category.projects}
                                direction={idx % 2 === 0 ? "left" : "right"}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
