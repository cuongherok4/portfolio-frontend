// app/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingSection from '@/components/PricingSection';
import api from '@/lib/api';
import { Github, ExternalLink, ChevronDown, Award, Code2, Trophy, Mail, Linkedin } from 'lucide-react';

async function getData() {
  const [projectsRes, skillsRes, achievementsRes, competitionsRes] = await Promise.all([
    api.get('/projects?published=true'),
    api.get('/skills?published=true'),
    api.get('/achievements?published=true'),
    api.get('/competitions?published=true'),
  ]);

  const projects = projectsRes.data;
  const featuredProjects = projects.filter((p: any) => p.isFeatured);
  const skills = skillsRes.data;
  const timeline = [...achievementsRes.data, ...competitionsRes.data]
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { featuredProjects, skills, timeline };
}

export const metadata = {
  title: 'Hoàng Mạnh Cường - Full-stack Developer | Portfolio & Dịch Vụ Thiết Kế Web',
  description: 'Portfolio chuyên nghiệp của Hoàng Mạnh Cường - Full-stack Developer với 3+ năm kinh nghiệm. Chuyên Next.js, NestJS, MongoDB. Dịch vụ thiết kế website chất lượng cao, tối ưu SEO và hiệu suất.',
  keywords: 'Hoàng Mạnh Cường, full-stack developer, Next.js developer, NestJS, React developer, portfolio developer, thiết kế web, dịch vụ lập trình, website chuyên nghiệp, SEO, Hanoi developer',
  authors: [{ name: 'Hoàng Mạnh Cường' }],
  creator: 'Hoàng Mạnh Cường',
  publisher: 'Hoàng Mạnh Cường',
  openGraph: {
    title: 'Hoàng Mạnh Cường - Full-stack Developer',
    description: 'Portfolio và dịch vụ thiết kế web chuyên nghiệp. Chuyên Next.js, NestJS, MongoDB với hơn 20+ dự án thành công.',
    url: 'https://hoangmanhcuong.dev',
    siteName: 'Hoàng Mạnh Cường Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hoàng Mạnh Cường - Full-stack Developer Portfolio',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hoàng Mạnh Cường - Full-stack Developer',
    description: 'Portfolio và dịch vụ thiết kế web chuyên nghiệp',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://hoangmanhcuong.dev',
  },
};

export default async function HomePage() {
  const { featuredProjects, skills, timeline } = await getData();

  return (
    <>
      <Navbar />

      {/* Hero Section - Màu sắc tối giản, sang trọng */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-[blob_7s_infinite]"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-[blob_7s_infinite_2s]"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-[blob_7s_infinite_4s]"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Badge - Màu accent nhẹ nhàng */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 backdrop-blur-sm rounded-full text-emerald-400 text-sm font-medium mb-8 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            Available for work
          </div>

          {/* Heading - Font hierarchy rõ ràng */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 text-white tracking-tight">
            Hoàng Mạnh Cường
          </h1>
          
          <p className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-300 mb-6 tracking-wide">
            Full-stack Developer
          </p>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Chuyên xây dựng ứng dụng web với <span className="text-blue-400 font-medium">Next.js</span>, <span className="text-purple-400 font-medium">NestJS</span> và <span className="text-green-400 font-medium">MongoDB</span>
          </p>

          {/* CTA Buttons - Contrast tốt */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a 
              href="#projects" 
              className="group px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-600/50 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                Xem Dự Án
                <ChevronDown className="group-hover:translate-y-1 transition-transform" size={20} />
              </span>
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 border-2 border-slate-600 text-slate-300 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-400 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              Liên Hệ
            </a>
          </div>

          {/* Stats - Màu nhẹ nhàng */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="text-4xl font-bold text-blue-400 mb-1">{featuredProjects.length}+</div>
              <div className="text-sm text-slate-400 font-medium">Dự án</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="text-4xl font-bold text-purple-400 mb-1">{skills.length}+</div>
              <div className="text-sm text-slate-400 font-medium">Kỹ năng</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="text-4xl font-bold text-emerald-400 mb-1">{timeline.length}+</div>
              <div className="text-sm text-slate-400 font-medium">Thành tích</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={28} className="text-slate-500" />
        </div>
      </section>

      {/* Projects Section - Nền sáng, text đậm nét */}
      {featuredProjects.length > 0 && (
        <section id="projects" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-semibold mb-6">
                <Code2 size={18} />
                Portfolio
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                Dự Án Nổi Bật
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
                Những dự án thực tế được xây dựng với công nghệ hiện đại
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project: any) => (
                <article 
                  key={project._id} 
                  className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden aspect-video bg-slate-100">
                    {project.demoVideoUrl ? (
                      <video 
                        controls 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        poster={project.thumbnailUrl}
                      >
                        <source src={project.demoVideoUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <img 
                        src={project.thumbnailUrl || '/placeholder.jpg'} 
                        alt={`${project.title} - Dự án của Hoàng Mạnh Cường`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies?.slice(0, 4).map((tech: string) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 4 && (
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-slate-100">
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
                          aria-label={`Xem mã nguồn ${project.title} trên GitHub`}
                        >
                          <Github size={18} />
                          Code
                        </a>
                      )}
                      {project.liveLink && (
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors ml-auto"
                          aria-label={`Xem demo trực tiếp ${project.title}`}
                        >
                          Demo
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section - Nền nhẹ */}
      {skills.length > 0 && (
        <section id="skills" className="py-24 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full text-purple-600 text-sm font-semibold mb-6">
                <Award size={18} />
                Kỹ Năng
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                Công Nghệ & Kỹ Năng
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
                Stack công nghệ tôi sử dụng hàng ngày
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill: any) => (
                <div 
                  key={skill._id} 
                  className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {skill.iconUrl && (
                      <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-lg group-hover:scale-110 transition-transform">
                        <img 
                          src={skill.iconUrl} 
                          alt={`${skill.name} icon`}
                          className="w-8 h-8 object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-slate-900">{skill.name}</h3>
                        <span className="text-xl font-bold text-purple-600">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Timeline Section */}
      {timeline.length > 0 && (
        <section id="achievements" className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-emerald-600 text-sm font-semibold mb-6">
                <Trophy size={18} />
                Thành Tích
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                Hành Trình Phát Triển
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
                Những mốc quan trọng trong sự nghiệp
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-slate-200 h-full"></div>
              
              {timeline.map((item: any, index: number) => (
                <div 
                  key={item._id} 
                  className="relative flex flex-col md:flex-row items-center mb-12 last:mb-0"
                >
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:order-2 md:pl-8'}`}>
                    <div className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 p-6">
                      <time className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold mb-3">
                        {new Date(item.date).toLocaleDateString('vi-VN', { 
                          year: 'numeric', 
                          month: 'long'
                        })}
                      </time>
                      
                      <h3 className="text-xl font-bold mb-2 text-slate-900">
                        {item.title || item.name}
                      </h3>
                      
                      {item.rank && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-sm font-bold mb-3">
                          <Trophy size={14} />
                          {item.rank}
                        </div>
                      )}
                      
                      <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                        {item.description}
                      </p>
                      
                      {(item.certificateUrl || item.prizeUrl) && (
                        <img 
                          src={item.certificateUrl || item.prizeUrl} 
                          alt={`Chứng nhận ${item.title || item.name}`}
                          className="rounded-lg border border-slate-200 max-w-full h-auto hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:flex w-2/12 justify-center relative my-4 md:my-0">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  </div>

                  <div className={`hidden md:block w-5/12 ${index % 2 === 0 ? 'md:order-2' : ''}`}></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      <PricingSection />

      {/* Contact Section - Màu đậm, contrast cao */}
      <section id="contact" className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-[blob_7s_infinite]"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-[blob_7s_infinite_2s]"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Bắt Đầu Dự Án Của Bạn
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Sẵn sàng hợp tác trong các dự án thú vị. Liên hệ ngay để trao đổi ý tưởng!
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a 
              href="mailto:cuonghm@example.com" 
              className="group flex items-center gap-3 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 border border-slate-700"
              aria-label="Gửi email cho Hoàng Mạnh Cường"
            >
              <Mail className="group-hover:scale-110 transition-transform" size={20} />
              <span className="font-medium">Email</span>
            </a>
            <a 
              href="https://linkedin.com/in/hoangmanhcuong" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 border border-slate-700"
              aria-label="Kết nối với Hoàng Mạnh Cường trên LinkedIn"
            >
              <Linkedin className="group-hover:scale-110 transition-transform" size={20} />
              <span className="font-medium">LinkedIn</span>
            </a>
            <a 
              href="https://github.com/hoangmanhcuong" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 border border-slate-700"
              aria-label="Xem GitHub của Hoàng Mạnh Cường"
            >
              <Github className="group-hover:scale-110 transition-transform" size={20} />
              <span className="font-medium">GitHub</span>
            </a>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-500/10 backdrop-blur-sm rounded-full border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-sm font-medium text-emerald-400">Trả lời trong 24h</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}