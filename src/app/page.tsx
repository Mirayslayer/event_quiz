'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const translations = {
  en: {
    header: {
      language: 'عربية'
    },
    hero: {
      title: 'Premium Sticker Printing',
      subtitle: 'High-quality stickers, labels, and custom printing solutions. Professional results with attention to detail.',
      comingSoon: 'Coming Soon',
      launchText: 'Services launch October 1, 2025',
      days: 'Days',
      hours: 'Hours', 
      minutes: 'Minutes',
      seconds: 'Seconds'
    },
    services: {
      title: 'Our Services',
      stickers: {
        title: 'Custom Stickers',
        desc: 'Vinyl, paper, and specialty stickers in any size, shape, or design.'
      },
      labels: {
        title: 'Product Labels',
        desc: 'Professional labels for products, packaging, and branding needs.'
      },
      printing: {
        title: 'Custom Printing',
        desc: 'Banners, decals, and promotional materials with precision.'
      }
    },
    features: {
      title: 'Why Choose Rasmix?',
      quality: 'High-quality materials and premium printing technology',
      speed: 'Fast turnaround times with reliable delivery',
      custom: 'Custom designs and bulk order discounts',
      durable: 'Weatherproof and durable options available'
    },
    contact: {
      title: 'Get Started',
      desc: 'Contact us for a free quote and let us help bring your vision to life.',
      email: 'Email:',
      phone: 'Phone:',
      hours: 'Hours:',
      button: 'Contact Us'
    },
    footer: {
      tagline: 'Premium Sticker Printing & Custom Solutions',
      copyright: '© 2024 Rasmix. All rights reserved.'
    }
  },
  ar: {
    header: {
      language: 'English'
    },
    hero: {
      title: 'طباعة الملصقات المميزة',
      subtitle: 'ملصقات وتسميات عالية الجودة وحلول طباعة مخصصة. نتائج احترافية مع الاهتمام بالتفاصيل.',
      comingSoon: 'قريباً',
      launchText: 'إطلاق الخدمات في 1 أكتوبر 2025',
      days: 'أيام',
      hours: 'ساعات',
      minutes: 'دقائق',
      seconds: 'ثواني'
    },
    services: {
      title: 'خدماتنا',
      stickers: {
        title: 'ملصقات مخصصة',
        desc: 'ملصقات فينيل وورق وملصقات متخصصة بأي حجم وشكل أو تصميم.'
      },
      labels: {
        title: 'تسميات المنتجات',
        desc: 'تسميات احترافية للمنتجات والتعبئة والتغليف واحتياجات العلامة التجارية.'
      },
      printing: {
        title: 'طباعة مخصصة',
        desc: 'لافتات ولصاقات ومواد ترويجية بدقة عالية.'
      }
    },
    features: {
      title: 'لماذا تختار راسميكس؟',
      quality: 'مواد عالية الجودة وتقنية طباعة مميزة',
      speed: 'أوقات تسليم سريعة مع توصيل موثوق',
      custom: 'تصاميم مخصصة وخصومات على الطلبات المجمعة',
      durable: 'خيارات مقاومة للطقس ومتينة متاحة'
    },
    contact: {
      title: 'ابدأ معنا',
      desc: 'اتصل بنا للحصول على عرض سعر مجاني ودعنا نساعدك في تحقيق رؤيتك.',
      email: 'البريد الإلكتروني:',
      phone: 'الهاتف:',
      hours: 'ساعات العمل:',
      button: 'اتصل بنا'
    },
    footer: {
      tagline: 'طباعة الملصقات المميزة والحلول المخصصة',
      copyright: '© 2024 راسميكس. جميع الحقوق محفوظة.'
    }
  }
};

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const featuresRef = useRef(null);
  const contactRef = useRef(null);

  const t = translations[language];
  
  const images = [
    '/10-ways-to-transform-your-bedroom-with-wall-art-and-posters-176932.webp',
    '/il_fullxfull.2003879302_my5h.webp',
    '/IMG_9959-2-683x1024.jpg',
    '/Sd7f7b5651f6b4758b8a23571b5ff29cfC.jpg_720x720q80.jpg'
  ];

  useEffect(() => {
    // Subtle fade-in animations only
    const fadeElements = gsap.utils.toArray('.fade-in') as Element[];
    fadeElements.forEach((element) => {
      gsap.fromTo(element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Countdown timer
    const targetDate = new Date('2025-10-01T00:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;
      
      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
      }
    };
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Mobile background slideshow
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    // Animate floating photos on desktop
    gsap.fromTo('.floating-photo-1', 
      { opacity: 0, scale: 0.8, rotation: -5 },
      { opacity: 1, scale: 1, rotation: 0, duration: 2, delay: 1.5, ease: 'elastic.out(1, 0.5)' }
    );
    gsap.fromTo('.floating-photo-2', 
      { opacity: 0, scale: 0.8, rotation: 5 },
      { opacity: 1, scale: 1, rotation: 0, duration: 2, delay: 2, ease: 'elastic.out(1, 0.5)' }
    );
    gsap.fromTo('.floating-photo-3', 
      { opacity: 0, scale: 0.8, rotation: -3 },
      { opacity: 1, scale: 1, rotation: 0, duration: 2, delay: 2.5, ease: 'elastic.out(1, 0.5)' }
    );
    gsap.fromTo('.floating-photo-4', 
      { opacity: 0, scale: 0.8, rotation: 3 },
      { opacity: 1, scale: 1, rotation: 0, duration: 2, delay: 3, ease: 'elastic.out(1, 0.5)' }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      clearInterval(countdownInterval);
      clearInterval(imageInterval);
    };
  }, [images.length]);

  return (
    <div className={`min-h-screen bg-white ${language === 'ar' ? 'rtl font-noto-arabic' : 'ltr'}`}>
      {/* Header */}
      <header className="bg-white border-b border-gray-100 fixed w-full z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="fade-in">
              <Image
                src="/RASMIX-cropped.svg"
                alt="Rasmix Logo"
                width={140}
                height={45}
                className="h-10 w-auto"
              />
            </div>
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="bg-black text-white px-6 py-2 rounded-sm hover:bg-gray-800 transition-colors duration-200 text-sm font-medium"
            >
              {t.header.language}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 overflow-hidden">

        {/* Desktop Floating Photos */}
        <div className="hidden md:block">
          {/* Photo 1 - Top Left */}
          <div className="floating-photo-1 absolute top-10 left-8 w-40 h-56 transform rotate-[-8deg] hover:rotate-[-2deg] transition-all duration-300 hover:scale-105 shadow-2xl">
            <Image
              src="/10-ways-to-transform-your-bedroom-with-wall-art-and-posters-176932.webp"
              alt="Wall art stickers"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Photo 2 - Top Right */}
          <div className="floating-photo-2 absolute top-16 right-12 w-48 h-36 transform rotate-[5deg] hover:rotate-[1deg] transition-all duration-300 hover:scale-105 shadow-2xl">
            <Image
              src="/il_fullxfull.2003879302_my5h.webp"
              alt="Custom stickers"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Photo 3 - Bottom Right */}
          <div className="floating-photo-3 absolute bottom-20 right-16 w-32 h-48 transform rotate-[-3deg] hover:rotate-[2deg] transition-all duration-300 hover:scale-105 shadow-2xl">
            <Image
              src="/IMG_9959-2-683x1024.jpg"
              alt="Product labels"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Photo 4 - Bottom Left */}
          <div className="floating-photo-4 absolute bottom-16 left-20 w-36 h-36 transform rotate-[4deg] hover:rotate-[0deg] transition-all duration-300 hover:scale-105 shadow-2xl">
            <Image
              src="/Sd7f7b5651f6b4758b8a23571b5ff29cfC.jpg_720x720q80.jpg"
              alt="Square stickers"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="text-center relative z-10">
          <h1 className="fade-in text-5xl md:text-6xl font-light text-black mb-6 tracking-tight">
            {t.hero.title}
          </h1>
          <p className="fade-in text-lg text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>
          
          {/* Countdown */}
          <div className="fade-in">
            <div className="relative bg-gray-50 rounded-sm p-8 max-w-md mx-auto border border-gray-200 overflow-hidden">
              
              {/* Mobile Background Images Behind Countdown */}
              <div className="block md:hidden absolute inset-0 z-0">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentImageIndex ? 'opacity-50' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Sticker example ${index + 1}`}
                      fill
                      className="object-cover rounded-sm"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-white/70 rounded-sm"></div>
                  </div>
                ))}
              </div>

              <div className="relative z-10">
                <h2 className="text-2xl font-medium text-black mb-2">{t.hero.comingSoon}</h2>
                <p className="text-gray-600 mb-6 text-sm">{t.hero.launchText}</p>
                
                <div id="countdown" className="grid grid-cols-4 gap-3 text-center">
                  <div>
                    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-sm p-3 shadow-sm">
                      <div className="text-2xl font-medium text-black" id="days">--</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">{t.hero.days}</div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-sm p-3 shadow-sm">
                      <div className="text-2xl font-medium text-black" id="hours">--</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">{t.hero.hours}</div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-sm p-3 shadow-sm">
                      <div className="text-2xl font-medium text-black" id="minutes">--</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">{t.hero.minutes}</div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-sm p-3 shadow-sm">
                      <div className="text-2xl font-medium text-black" id="seconds">--</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">{t.hero.seconds}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="fade-in text-3xl font-light text-black text-center mb-16">{t.services.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="fade-in bg-white p-8 border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-sm flex items-center justify-center mx-auto mb-6">
                <span className="text-xl">🏷️</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-black">{t.services.stickers.title}</h3>
              <p className="text-gray-600 leading-relaxed">{t.services.stickers.desc}</p>
            </div>
            <div className="fade-in bg-white p-8 border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-sm flex items-center justify-center mx-auto mb-6">
                <span className="text-xl">📦</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-black">{t.services.labels.title}</h3>
              <p className="text-gray-600 leading-relaxed">{t.services.labels.desc}</p>
            </div>
            <div className="fade-in bg-white p-8 border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-sm flex items-center justify-center mx-auto mb-6">
                <span className="text-xl">🎨</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-black">{t.services.printing.title}</h3>
              <p className="text-gray-600 leading-relaxed">{t.services.printing.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className={`grid lg:grid-cols-2 gap-16 items-center ${language === 'ar' ? 'lg:grid-flow-col-dense' : ''}`}>
            <div className={language === 'ar' ? 'lg:order-2' : ''}>
              <h2 className={`fade-in text-3xl font-light text-black mb-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>{t.features.title}</h2>
              <div className="space-y-6">
                <div className={`fade-in flex items-start ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                  <div className={`w-6 h-6 bg-black rounded-full flex items-center justify-center ${language === 'ar' ? 'ml-4' : 'mr-4'} mt-0.5 flex-shrink-0`}>
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">{t.features.quality}</span>
                </div>
                <div className={`fade-in flex items-start ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                  <div className={`w-6 h-6 bg-black rounded-full flex items-center justify-center ${language === 'ar' ? 'ml-4' : 'mr-4'} mt-0.5 flex-shrink-0`}>
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">{t.features.speed}</span>
                </div>
                <div className={`fade-in flex items-start ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                  <div className={`w-6 h-6 bg-black rounded-full flex items-center justify-center ${language === 'ar' ? 'ml-4' : 'mr-4'} mt-0.5 flex-shrink-0`}>
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">{t.features.custom}</span>
                </div>
                <div className={`fade-in flex items-start ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                  <div className={`w-6 h-6 bg-black rounded-full flex items-center justify-center ${language === 'ar' ? 'ml-4' : 'mr-4'} mt-0.5 flex-shrink-0`}>
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">{t.features.durable}</span>
                </div>
              </div>
            </div>
            <div ref={contactRef} className={`fade-in bg-gray-50 p-8 border border-gray-200 ${language === 'ar' ? 'lg:order-1 text-right' : ''}`}>
              <h3 className={`text-2xl font-medium text-black mb-4 ${language === 'ar' ? 'text-right' : ''}`}>{t.contact.title}</h3>
              <p className={`text-gray-600 mb-6 leading-relaxed ${language === 'ar' ? 'text-right' : ''}`}>{t.contact.desc}</p>
              <div className={`space-y-3 mb-6 text-sm ${language === 'ar' ? 'text-right' : ''}`}>
                <p className="text-gray-700"><span className="font-medium">{t.contact.email}</span> hello@rasmix.com</p>
                <p className="text-gray-700"><span className="font-medium">{t.contact.phone}</span> (555) 123-STIX</p>
                <p className="text-gray-700"><span className="font-medium">{t.contact.hours}</span> Mon-Fri 9AM-6PM</p>
              </div>
              <button className="w-full bg-black text-white py-3 rounded-sm hover:bg-gray-800 transition-colors duration-200 font-medium">
                {t.contact.button}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Image
            src="/RASMIX-cropped.svg"
            alt="Rasmix Logo"
            width={100}
            height={33}
            className="h-8 w-auto mx-auto mb-4"
          />
          <p className="text-gray-600 text-sm mb-1">{t.footer.tagline}</p>
          <p className="text-gray-400 text-xs">{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}