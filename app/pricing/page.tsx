// app/pricing/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Gói Dịch Vụ Thiết Kế Web - Hoàng Mạnh Cường',
  description: 'Các gói thiết kế website chuyên nghiệp, landing page, portfolio cá nhân với giá tốt nhất. Full-stack Developer sử dụng Next.js, NestJS.',
};

export default function PricingPage() {
  const packages = [
    {
      name: 'Gói Cơ Bản',
      price: '3.500.000',
      originalPrice: '5.000.000',
      features: [
        'Thiết kế 1 trang (Landing Page)',
        'Responsive đầy đủ (mobile + desktop)',
        'Tối ưu tốc độ & SEO cơ bản',
        'Tích hợp form liên hệ',
        'Hosting + Domain 1 năm miễn phí',
        'Bảo hành & hỗ trợ 3 tháng',
      ],
      popular: false,
    },
    {
      name: 'Gói Chuyên Nghiệp',
      price: '7.500.000',
      originalPrice: '10.000.000',
      features: [
        'Website đa trang (5-10 trang)',
        'Thiết kế hiện đại, tùy chỉnh theo yêu cầu',
        'Tối ưu SEO Onpage nâng cao',
        'Tích hợp blog/tin tức',
        'Quản trị nội dung đơn giản (CMS nhẹ)',
        'Tối ưu tốc độ loading < 2s',
        'Hosting + Domain 1 năm miễn phí',
        'Bảo hành & hỗ trợ 12 tháng',
        'Tặng thêm 1 landing page quảng cáo',
      ],
      popular: true,
    },
    {
      name: 'Gói Doanh Nghiệp',
      price: 'Liên hệ',
      originalPrice: null,
      features: [
        'Website tùy chỉnh hoàn toàn theo yêu cầu',
        'Tích hợp hệ thống quản trị (Admin Panel)',
        'Tích hợp thanh toán online',
        'API kết nối hệ thống bên thứ 3',
        'Tối ưu SEO chuyên sâu + Google Analytics',
        'Bảo mật cao cấp (SSL, firewall)',
        'Hosting VPS riêng + Domain trọn đời',
        'Hỗ trợ & bảo trì dài hạn',
        'Tư vấn chiến lược digital marketing',
      ],
      popular: false,
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Pricing */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 drop-shadow-2xl">
            Gói Dịch Vụ Thiết Kế Web
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
            Chọn gói phù hợp với nhu cầu của bạn. Tôi cam kết mang đến website chất lượng cao, hiện đại và tối ưu chuyển đổi.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl shadow-2xl p-10 text-center transition-all duration-500 hover:shadow-3xl hover:-translate-y-4 ${
                  pkg.popular ? 'border-4 border-purple-600 scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-600 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg">
                      PHỔ BIẾN NHẤT
                    </span>
                  </div>
                )}

                <h3 className="text-3xl font-bold mb-6 text-gray-800">{pkg.name}</h3>

                <div className="mb-8">
                  {pkg.price === 'Liên hệ' ? (
                    <p className="text-4xl font-extrabold text-purple-600">Liên hệ</p>
                  ) : (
                    <>
                      <p className="text-5xl font-extrabold text-purple-600">
                        {pkg.price}đ
                      </p>
                      {pkg.originalPrice && (
                        <p className="text-xl text-gray-500 line-through mt-2">
                          {pkg.originalPrice}đ
                        </p>
                      )}
                    </>
                  )}
                </div>

                <ul className="space-y-4 mb-10 text-left">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-500 text-xl mt-1">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block py-4 px-8 rounded-full font-bold text-lg transition ${
                    pkg.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Chọn gói này
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <p className="text-xl text-gray-600 mb-6">
              Bạn cần giải pháp tùy chỉnh? Tôi luôn sẵn sàng tư vấn miễn phí!
            </p>
            <a
              href="#contact"
              className="inline-block px-12 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full hover:shadow-2xl transition transform hover:scale-105 text-xl"
            >
              Liên hệ tư vấn ngay
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}