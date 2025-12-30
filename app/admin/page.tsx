// app/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; // mình sẽ tạo sau
import api from '@/lib/api';

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

  return { projects, featuredProjects, skills, timeline };
}

export const metadata = {
  title: 'Hoàng Mạnh Cường - Full-stack Developer',
  description: 'Portfolio cá nhân của Hoàng Mạnh Cường - Full-stack Developer chuyên Next.js, NestJS, MongoDB. Xem dự án, kỹ năng và thành tích.',
  openGraph: {
    title: 'Hoàng Mạnh Cường - Full-stack Developer',
    description: 'Portfolio chuyên nghiệp với các dự án thực tế, kỹ năng lập trình và thành tích nổi bật.',
    url: 'https://yourdomain.com',
    images: '/og-image.jpg', // bạn có thể thêm ảnh OG sau
  },
};

export default async function HomePage() {
  const { featuredProjects, projects, skills, timeline } = await getData();

  return (
    <>
      <Navbar />

      {/* Hero Section - Hero hiện đại */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Hoàng Mạnh Cường
          </h1>
          <p className="text-2xl md:text-4xl font-light mb-8 opacity-90">
            Full-stack Developer
          </p>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 opacity-80">
            Đam mê xây dựng sản phẩm web chất lượng cao với Next.js, NestJS, MongoDB và các công nghệ hiện đại.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#projects"
              className="px-10 py-5 bg-white text-blue-700 font-bold rounded-full hover:bg-gray-100 transition transform hover:scale-105 shadow-2xl text-lg"
            >
              Xem Dự án
            </a>
            <a
              href="#contact"
              className="px-10 py-5 border-4 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-700 transition transform hover:scale-105 text-lg"
            >
              Liên hệ tôi
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section id="projects" className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
              Dự án Nổi bật
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredProjects.map((project: any) => (
                <div
                  key={project._id}
                  className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.thumbnailUrl || '/placeholder.jpg'}
                      alt={project.title}
                      className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">{project.title}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies?.slice(0, 6).map((tech: string) => (
                        <span key={tech} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-6">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener" className="text-gray-700 hover:text-blue-600 font-medium flex items-center gap-2">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                          GitHub
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener" className="text-green-600 hover:text-green-700 font-medium">
                          Live Demo →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills - Progress bar đẹp */}
      {skills.length > 0 && (
        <section id="skills" className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
              Kỹ năng chuyên môn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {skills.map((skill: any) => (
                <div key={skill._id} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      {skill.iconUrl && (
                        <img src={skill.iconUrl} alt={skill.name} className="w-12 h-12 object-contain rounded-lg shadow" />
                      )}
                      <h3 className="text-xl font-bold text-gray-800">{skill.name}</h3>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-10 overflow-hidden shadow-inner">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1500 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Timeline - Hành trình */}
      {timeline.length > 0 && (
        <section id="achievements" className="py-20 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
              Hành trình phát triển
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-600 h-full"></div>
              {timeline.map((item: any, index: number) => (
                <div key={item._id} className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-5/12"></div>
                  <div className="w-2/12 flex justify-center">
                    <div className="w-6 h-6 bg-white border-4 border-blue-600 rounded-full z-10 shadow-lg"></div>
                  </div>
                  <div className="w-5/12">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition">
                      <div className="text-sm text-blue-600 font-bold mb-2">
                        {new Date(item.date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long' })}
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-800">
                        {item.title || item.name}
                      </h3>
                      {item.rank && <p className="text-xl font-bold text-green-600 mb-3">{item.rank}</p>}
                      <p className="text-gray-700 leading-relaxed">{item.description}</p>
                      {(item.certificateUrl || item.prizeUrl) && (
                        <img
                          src={item.certificateUrl || item.prizeUrl}
                          alt="Chứng chỉ"
                          className="mt-6 rounded-xl shadow-lg max-w-full"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">Sẵn sàng hợp tác?</h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Tôi luôn mở lòng với các cơ hội mới. Nếu bạn cần một developer đáng tin cậy, hãy liên hệ ngay!
          </p>
          <div className="flex justify-center gap-10 text-5xl">
            <a href="mailto:cuonghm@example.com" className="hover:scale-125 transition">✉️</a>
            <a href="https://linkedin.com/in/hoangmanhcuong" target="_blank" className="hover:scale-125 transition">💼</a>
            <a href="https://github.com/hoangmanhcuong" target="_blank" className="hover:scale-125 transition">🐙</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}