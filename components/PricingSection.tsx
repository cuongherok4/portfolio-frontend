// components/PricingSection.tsx
'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function PricingSection() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPackage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPackage]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPackage) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedPackage]);

  const packages = [
    {
      name: 'Gói Cơ Bản',
      price: '3.500.000đ',
      originalPrice: '5.000.000đ',
      features: [
        'Landing Page 1 trang',
        'Thiết kế responsive đầy đủ',
        'Tối ưu tốc độ & SEO cơ bản',
        'Tích hợp form liên hệ',
        'Hosting + Domain 1 năm miễn phí',
        'Bảo hành 3 tháng',
      ],
      popular: false,
    },
    {
      name: 'Gói Chuyên Nghiệp',
      price: '7.500.000đ',
      originalPrice: '10.000.000đ',
      features: [
        'Website đa trang (5-10 trang)',
        'Thiết kế tùy chỉnh theo yêu cầu',
        'Tối ưu SEO nâng cao',
        'Tích hợp blog/tin tức',
        'Quản trị nội dung đơn giản',
        'Tối ưu tốc độ < 2s',
        'Hosting + Domain 1 năm miễn phí',
        'Bảo hành 12 tháng',
        'Tặng 1 landing page quảng cáo',
      ],
      popular: true,
    },
    {
      name: 'Gói Doanh Nghiệp',
      price: 'Liên hệ',
      features: [
        'Website tùy chỉnh hoàn toàn',
        'Tích hợp Admin Panel',
        'Thanh toán online',
        'Kết nối API bên thứ 3',
        'SEO chuyên sâu + Analytics',
        'Bảo mật cao cấp',
        'VPS riêng + Domain trọn đời',
        'Hỗ trợ dài hạn',
        'Tư vấn chiến lược digital',
      ],
      popular: false,
    },
  ];

  const closeModal = () => {
    setSelectedPackage(null);
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: (formData.get('message') as string) || '',
      package: selectedPackage,
    };

    // Validation
    if (!data.name.trim() || !data.email.trim() || !data.phone.trim()) {
      alert('Vui lòng nhập đầy đủ Họ tên, Email và Số điện thoại!');
      setIsSubmitting(false);
      return;
    }

    try {
      await api.post('/contacts', data);
      alert('Gửi yêu cầu thành công! Tôi sẽ liên hệ bạn trong vòng 24 giờ.');
      e.currentTarget.reset();
      closeModal();
    } catch (err: any) {
      console.error('Lỗi gửi liên hệ:', err);
      alert(
        'Gửi thất bại: ' +
          (err.response?.data?.message || err.message || 'Vui lòng thử lại sau'),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pricing" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-slate-50" aria-labelledby="pricing-heading">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 text-sm font-semibold mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Dịch Vụ</span>
          </div>
          <h2 id="pricing-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Gói Dịch Vụ Thiết Kế Web
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Lựa chọn gói phù hợp với nhu cầu và ngân sách của bạn
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {packages.map((pkg, index) => (
            <article
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl ${
                pkg.popular ? 'border-2 border-purple-600 md:scale-105' : 'border border-slate-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block bg-purple-600 text-white px-4 py-1 rounded-full font-bold text-sm shadow-lg">
                    PHỔ BIẾN NHẤT
                  </span>
                </div>
              )}

              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-900 text-center">
                {pkg.name}
              </h3>

              <div className="mb-8 text-center">
                {pkg.price === 'Liên hệ' ? (
                  <p className="text-3xl sm:text-4xl font-extrabold text-purple-600">Liên hệ</p>
                ) : (
                  <>
                    <p className="text-4xl sm:text-5xl font-extrabold text-purple-600">{pkg.price}</p>
                    {pkg.originalPrice && (
                      <p className="text-lg sm:text-xl text-slate-500 line-through mt-2">
                        {pkg.originalPrice}
                      </p>
                    )}
                  </>
                )}
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-8" role="list">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-700 text-sm sm:text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPackage(pkg.name)}
                className={`w-full min-h-[48px] py-3 px-6 rounded-lg font-semibold text-base transition-colors duration-200 focus:outline-none focus:ring-4 ${
                  pkg.popular
                    ? 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-600/50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-600/50'
                }`}
                aria-label={`Chọn gói ${pkg.name}`}
              >
                Chọn gói này
              </button>
            </article>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg sm:text-xl text-slate-600 mb-6 sm:mb-8">
            Không thấy gói phù hợp? Tôi luôn sẵn sàng thiết kế giải pháp riêng cho bạn!
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center min-h-[48px] px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors duration-200 text-base sm:text-lg focus:outline-none focus:ring-4 focus:ring-purple-600/50"
            aria-label="Liên hệ để được tư vấn miễn phí"
          >
            Liên hệ tư vấn miễn phí
          </a>
        </div>
      </div>

      {/* Modal Form Liên Hệ */}
      {selectedPackage && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600"
              aria-label="Đóng hộp thoại"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 id="modal-title" className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-slate-900 pr-8">
              Yêu cầu tư vấn gói <span className="text-purple-600">{selectedPackage}</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-2">
                  Họ và tên <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="Nguyễn Văn A"
                  required
                  autoComplete="name"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition text-slate-900"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="email@example.com"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition text-slate-900"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Số điện thoại <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  placeholder="0912345678"
                  required
                  autoComplete="tel"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition text-slate-900"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-2">
                  Ghi chú thêm
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Ngân sách, yêu cầu cụ thể, thời gian mong muốn..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition text-slate-900 resize-none"
                />
              </div>

              <input type="hidden" name="package" value={selectedPackage} />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[48px] py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors duration-200 text-base sm:text-lg focus:outline-none focus:ring-4 focus:ring-purple-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={isSubmitting ? 'Đang gửi yêu cầu' : 'Gửi yêu cầu tư vấn'}
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
              </button>
            </form>

            <p className="text-sm text-slate-500 mt-4 sm:mt-6 text-center">
              Tôi sẽ liên hệ bạn trong vòng 24 giờ
            </p>
          </div>
        </div>
      )}
    </section>
  );
}