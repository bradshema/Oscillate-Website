import PortfolioRow, { Project } from "./PortfolioRow"

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
        title: "High-End Advertisements",
        order: 1,
        projects: [
            { _id: "p1", title: "Project Alpha", overview: "Premium 3D rendering for automotive." },
            { _id: "p2", title: "Project Beta", overview: "Fluid dynamics in motion design." },
            { _id: "p3", title: "Project Gamma", overview: "Tech hardware visualization." },
            { _id: "p4", title: "Project Delta", overview: "Luxury brand storytelling." },
            { _id: "p5", title: "Project Epsilon", overview: "Weightless interfaces." },
            { _id: "p6", title: "Project Zeta", overview: "Kinetic typography." },
        ]
    },
    {
        _id: "cat-2",
        title: "Immersive Web Experiences",
        order: 2,
        projects: [
            { _id: "p11", title: "Web GL Portal", overview: "Creative coding experiment." },
            { _id: "p12", title: "Fintech Dashboard", overview: "Dark mode data visualization." },
            { _id: "p13", title: "E-Commerce Reimagined", overview: "3D product configurator." },
            { _id: "p14", title: "Architectural Walkthrough", overview: "Realtime rendering." },
            { _id: "p15", title: "Interactive Portfolio", overview: "Award winning layout." },
            { _id: "p16", title: "Mobile App Concept", overview: "Smooth micro-interactions." },
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
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">Selected Work</h2>
                    <p className="text-white/50 text-lg uppercase tracking-widest text-sm">Explore the archive</p>
                </div>

                <div className="flex flex-col gap-12 sm:gap-16">
                    {activeCategories.map((category, idx) => (
                        <div key={category._id} className="w-full">
                            <h3 className="px-6 md:px-12 lg:px-24 text-2xl font-semibold text-white/90 mb-6 drop-shadow-md">
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
