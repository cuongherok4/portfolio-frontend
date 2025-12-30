// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="py-12 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-bold mb-6">Hoàng Mạnh Cường</h3>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8 text-lg">
          <a 
            href="mailto:cuongherok4@gmail.com" 
            className="flex items-center gap-3 hover:text-purple-400 transition"
          >
            <span className="text-2xl">✉️</span>
            cuongherok4@gmail.com
          </a>

          <a 
            href="tel:0336388758" 
            className="flex items-center gap-3 hover:text-purple-400 transition"
          >
            <span className="text-2xl">📞</span>
            0336 388 758
          </a>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Hoàng Mạnh Cường • Xây dựng với ❤️ bằng Next.js + NestJS
          </p>
          <p className="text-xs mt-3 opacity-60">
            Full-stack Developer | Chuyên thiết kế website chuyên nghiệp & tối ưu chuyển đổi
          </p>
        </div>
      </div>
    </footer>
  );
}