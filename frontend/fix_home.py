import sys
import re

def main():
    try:
        with open('src/pages/public/Home.tsx', 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print("Error: Could not find Home.tsx")
        sys.exit(1)

    # 1. Imports
    if "import { ScrollReveal }" not in content:
        content = content.replace(
            "import { ArrowRight, MessageCircle } from 'lucide-react';",
            "import { ArrowRight, ChevronRight, Code, Cpu, LineChart, Globe, Zap, Users, MessageCircle } from 'lucide-react';\nimport { ScrollReveal } from '../../components/ui/ScrollReveal';"
        )

    # 2. Update variables
    content = content.replace(
        "const displayServices = services.length > 0 ? services : defaultServices;\n  const displayProjects = projects.length > 0 ? projects : defaultProjectsList;\n  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;",
        "const displayServices = services;\n  const displayProjects = projects;\n  const displayTestimonials = testimonials;"
    )

    # 3. Fix Tech Stack
    old_tech_stack = """  {/* TECH STACK MARQUEE */}
  <section className="py-8 border-y border-[#1B2B44]/30 bg-[#060C16] overflow-hidden relative z-10 flex items-center">
    <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex animate-marquee whitespace-nowrap gap-12 sm:gap-20 px-8 items-center opacity-60 hover:opacity-100 transition-opacity duration-500">
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#00A3FF]">React</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#3178C6]">TypeScript</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#339933]">Node.js</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#E34F26]">HTML5</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#1572B6]">CSS3</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#3776AB]">Python</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#00E599]">Flutter</span>
        {/* Repeat for seamless loop */}
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#00A3FF]">React</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#3178C6]">TypeScript</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#339933]">Node.js</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#E34F26]">HTML5</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#1572B6]">CSS3</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#3776AB]">Python</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#00E599]">Flutter</span>
      </div>
    </div>
  </section>"""

    new_tech_stack = """  {/* TECH STACK */}
  <section className="py-8 border-y border-[#1B2B44]/30 bg-[#060C16] overflow-hidden relative z-10 flex items-center">
    <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="flex animate-marquee whitespace-nowrap gap-12 sm:gap-20 px-8 items-center opacity-90 w-full min-w-max mx-auto justify-center">
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#00A3FF]">React</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#3178C6]">TypeScript</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#339933]">Node.js</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#E34F26]">HTML5</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#1572B6]">CSS3</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#3776AB]">Python</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#00E599]">Flutter</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#00A3FF]">React</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#3178C6]">TypeScript</span>
        <span className="font-mono font-bold text-xl sm:text-2xl text-[#339933]">Node.js</span>
      </div>
    </div>
  </section>"""
    content = content.replace(old_tech_stack, new_tech_stack)


    # 4. Refactor Services into Bento Grid and wrap in ScrollReveal
    old_services = """  <section className="py-16 sm:py-24 relative z-10 border-t border-[#1B2B44]/30 bg-[#0A1220]/30">
  <div className="max-w-7xl mx-auto px-4 text-center space-y-8 sm:space-y-12">
  <div className="space-y-3">
  <h2 className="text-3xl sm:text-4xl font-bold">Customized Services For Your Success</h2>
  <p className="text-[#A9B4C5] font-medium text-sm">Empowering Innovation through unparalleled software development expertise</p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {loading ? (
          [1, 2, 3, 4].map(i => (
            <div key={i} className="group relative rounded-2xl overflow-hidden bg-[#0A1220] border border-[#1B2B44]/50 flex flex-col sm:flex-row text-left">
              <Skeleton className="w-full sm:w-2/5 aspect-video sm:aspect-auto" />
              <div className="p-6 sm:w-3/5 flex flex-col justify-center space-y-3">
                <Skeleton variant="text" width="60%" height="24px" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="80%" />
              </div>
            </div>
          ))
        ) : displayServices.slice(0, 4).map((s: any, idx: number) => (
  <div key={idx} className="group relative rounded-2xl overflow-hidden bg-[#0A1220] border border-[#1B2B44]/50 flex flex-col sm:flex-row text-left">
  {s.cover_image && (
  <div className="w-full sm:w-2/5 aspect-video sm:aspect-auto overflow-hidden bg-[#08111F]">
  <img src={s.cover_image} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
  </div>
  )}
  <div className="p-6 sm:w-3/5 flex flex-col justify-center">
  <h3 className="text-lg font-bold text-white mb-2" style={{ color: accentHex }}>{s.title}</h3>
  <p className="text-[#A9B4C5] text-sm leading-relaxed line-clamp-3">{s.short_description || s.description || s.summary}</p>
  </div>
  </div>
  ))}
  </div>
  </div>
  </section>"""

    new_services = """  <section className="py-16 sm:py-24 relative z-10 border-t border-[#1B2B44]/30 bg-[#0A1220]/30">
  <ScrollReveal className="max-w-7xl mx-auto px-4 text-center space-y-8 sm:space-y-12">
  <div className="space-y-3">
  <h2 className="text-3xl sm:text-4xl font-bold">Customized Services For Your Success</h2>
  <p className="text-[#A9B4C5] font-medium text-sm">Empowering Innovation through unparalleled software development expertise</p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
  {loading ? (
          [1, 2, 3, 4].map(i => (
            <div key={i} className="group relative rounded-3xl overflow-hidden bg-[#0A1220] border border-[#1B2B44]/50 flex flex-col min-h-[300px]">
              <Skeleton className="w-full h-48" />
              <div className="p-8 space-y-3 flex-1">
                <Skeleton variant="text" width="60%" height="24px" />
                <Skeleton variant="text" width="100%" />
              </div>
            </div>
          ))
        ) : displayServices.slice(0, 4).map((s: any, idx: number) => (
  <div key={idx} className={`group relative rounded-3xl overflow-hidden bg-[#0A1220] border border-[#1B2B44]/50 flex flex-col ${idx === 0 || idx === 3 ? 'md:col-span-2 md:flex-row' : 'md:col-span-1'} hover:border-[#00E599]/30 transition-colors`}>
  {s.cover_image && (
  <div className={`w-full ${idx === 0 || idx === 3 ? 'md:w-1/2 h-48 md:h-auto' : 'h-48'} overflow-hidden bg-[#08111F] relative`}>
  <img src={s.cover_image} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
  <div className="absolute inset-0 bg-black/20" />
  </div>
  )}
  <div className={`p-8 sm:p-10 flex flex-col justify-center ${idx === 0 || idx === 3 ? 'md:w-1/2' : 'flex-1'} relative z-10`}>
  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3" style={{ color: accentHex }}>{s.title}</h3>
  <p className="text-[#A9B4C5] text-sm sm:text-base leading-relaxed">{s.short_description || s.description || s.summary}</p>
  </div>
  </div>
  ))}
  </div>
  </ScrollReveal>
  </section>"""
    
    content = content.replace(old_services, new_services)

    # 5. Wrap other sections in ScrollReveal using regex to ensure exact wrappers
    content = re.sub(
        r'<section className="py-10 sm:py-12 border-y border-\[#1B2B44\]/30 relative z-10 bg-\[#060C16\]">\s*<div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 sm:gap-8 text-center">',
        '<section className="py-10 sm:py-12 border-y border-[#1B2B44]/30 relative z-10 bg-[#060C16]">\n  <ScrollReveal className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 sm:gap-8 text-center">',
        content
    )
    content = content.replace(
        '  </div>\n  </section>\n\n  {/* CORE VALUES */}',
        '  </ScrollReveal>\n  </section>\n\n  {/* CORE VALUES */}'
    )

    content = re.sub(
        r'<section className="py-16 sm:py-24 relative z-10 max-w-7xl mx-auto px-4 space-y-8 sm:space-y-12 text-center">',
        '<section className="py-16 sm:py-24 relative z-10 text-center">\n  <ScrollReveal className="max-w-7xl mx-auto px-4 space-y-8 sm:space-y-12">',
        content
    )
    content = content.replace(
        '  </div>\n  </section>\n\n  {/* COMMUNITY BANNER */}',
        '  </ScrollReveal>\n  </section>\n\n  {/* COMMUNITY BANNER */}'
    )

    content = re.sub(
        r'<section className="py-10 sm:py-12 relative z-10 max-w-4xl mx-auto px-4">\s*<div className="bg-\[#0A1220\] border border-\[#1B2B44\]/50 rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-2xl relative overflow-hidden">',
        '<section className="py-10 sm:py-12 relative z-10 max-w-4xl mx-auto px-4">\n  <ScrollReveal className="bg-[#0A1220] border border-[#1B2B44]/50 rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-2xl relative overflow-hidden">',
        content
    )
    content = content.replace(
        '  </div>\n  </section>\n\n  {/* TESTIMONIALS */}',
        '  </ScrollReveal>\n  </section>\n\n  {/* TESTIMONIALS */}'
    )

    content = re.sub(
        r'<section className="py-16 sm:py-24 relative z-10 max-w-7xl mx-auto px-4 space-y-8 sm:space-y-12">',
        '<section className="py-16 sm:py-24 relative z-10 max-w-7xl mx-auto px-4">\n  <ScrollReveal className="space-y-8 sm:space-y-12">',
        content
    )
    content = content.replace(
        '  </div>\n  </section>\n\n  {/* LATEST WORK */}',
        '  </ScrollReveal>\n  </section>\n\n  {/* LATEST WORK */}'
    )

    content = re.sub(
        r'<section className="py-16 sm:py-24 border-t border-\[#1B2B44\]/30 relative z-10">\s*<div className="max-w-7xl mx-auto px-4 space-y-8 sm:space-y-12">',
        '<section className="py-16 sm:py-24 border-t border-[#1B2B44]/30 relative z-10">\n  <ScrollReveal className="max-w-7xl mx-auto px-4 space-y-8 sm:space-y-12">',
        content
    )
    content = content.replace(
        '  </div>\n  </section>\n  </div>\n  );\n};',
        '  </ScrollReveal>\n  </section>\n  </div>\n  );\n};'
    )

    with open('src/pages/public/Home.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Successfully edited Home.tsx!")

if __name__ == '__main__':
    main()
