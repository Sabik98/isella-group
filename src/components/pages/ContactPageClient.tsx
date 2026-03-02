'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactPageClient() {
  const t = useTranslations();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // For now, show success state (API integration can be added later)
    setStatus('success');
    setFormData({ name: '', email: '', phone: '', message: '' });
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-isella-blue pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/80">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-lg text-gray-700 mb-12 max-w-3xl">
            {t('contact.description')}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-isella-orange focus:border-transparent outline-none transition-shadow"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-isella-orange focus:border-transparent outline-none transition-shadow"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t('contact.form.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-isella-orange focus:border-transparent outline-none transition-shadow"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-isella-orange focus:border-transparent outline-none transition-shadow resize-vertical"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-isella-orange text-white font-semibold px-8 py-4 rounded-lg hover:bg-isella-orange-dark transition-colors text-lg"
                >
                  {t('contact.form.submit')}
                </button>

                {status === 'success' && (
                  <p className="text-green-600 font-medium text-center">
                    {t('contact.form.success')}
                  </p>
                )}

                {status === 'error' && (
                  <p className="text-red-600 font-medium text-center">
                    {t('contact.form.error')}
                  </p>
                )}
              </form>
            </div>

            {/* Office Cards */}
            <div className="space-y-8">
              {/* Germany Office */}
              <div className="bg-isella-gray rounded-xl p-8">
                <h3 className="text-xl font-bold text-isella-blue mb-4 flex items-center gap-2">
                  <span className="text-2xl" role="img" aria-label="Germany">
                    🇩🇪
                  </span>
                  {t('contact.offices.germany.title')}
                </h3>
                <p className="font-semibold text-gray-800 mb-4">
                  {t('contact.offices.germany.company')}
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-isella-orange" />
                    <span>{t('contact.offices.germany.address')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5 shrink-0 text-isella-orange" />
                    <a
                      href={`tel:${t('contact.offices.germany.phone').replace(/\s/g, '')}`}
                      className="hover:text-isella-orange transition-colors"
                    >
                      {t('contact.offices.germany.phone')}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-5 h-5 shrink-0 text-isella-orange" />
                    <a
                      href={`mailto:${t('contact.offices.germany.email')}`}
                      className="hover:text-isella-orange transition-colors"
                    >
                      {t('contact.offices.germany.email')}
                    </a>
                  </div>
                </div>
              </div>

              {/* Poland Office */}
              <div className="bg-isella-gray rounded-xl p-8">
                <h3 className="text-xl font-bold text-isella-blue mb-4 flex items-center gap-2">
                  <span className="text-2xl" role="img" aria-label="Poland">
                    🇵🇱
                  </span>
                  {t('contact.offices.poland.title')}
                </h3>
                <p className="font-semibold text-gray-800 mb-4">
                  {t('contact.offices.poland.company')}
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-isella-orange" />
                    <span>{t('contact.offices.poland.address')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5 shrink-0 text-isella-orange" />
                    <a
                      href={`tel:${t('contact.offices.poland.phone').replace(/\s/g, '')}`}
                      className="hover:text-isella-orange transition-colors"
                    >
                      {t('contact.offices.poland.phone')}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-5 h-5 shrink-0 text-isella-orange" />
                    <a
                      href={`mailto:${t('contact.offices.poland.email')}`}
                      className="hover:text-isella-orange transition-colors"
                    >
                      {t('contact.offices.poland.email')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
