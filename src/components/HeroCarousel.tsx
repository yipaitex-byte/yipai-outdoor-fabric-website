'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import LocaleLink from './LocaleLink';
import { useI18n } from '@/i18n/client';

const slides = [
  { image: '/images/hero-fabric.webp', alt: 'Close-up of a technical outdoor fabric', eyebrow: 'PERFORMANCE MATERIALS', title: <>Performance<br />Outdoor Fabrics</>, copy: 'Engineered outdoor fabrics for ski wear, hiking apparel, shell jackets and technical clothing.' },
  { image: '/images/process-dyeing.webp', alt: 'Textile production equipment in a bright workshop', eyebrow: 'TEXTILE PRODUCTION', title: <>From Yarn<br />to Fabric</>, copy: 'Explore the processes behind fabric formation and functional finishing.' },
  { images: ['/images/lab-hydrostatic.webp', '/images/lab-uv.webp', '/images/lab-moisture-permeability.webp', '/images/lab-abrasion.webp', '/images/lab-tensile-strength.webp', '/images/lab-spectrometer.webp'], alt: 'YIPAI fabric testing laboratory equipment', eyebrow: 'TESTING & QUALITY', title: <>Tested for<br />Performance</>, copy: 'Discuss applicable test methods and target requirements with our team.' },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const { messages } = useI18n();
  const localizedSlides = messages.home.hero.slides;
  useEffect(() => {
    const timer = window.setInterval(() => setActive(current => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);
  return <section className="hero hero-carousel" aria-label="YIPAI Textile highlights">
    {slides.map((item, index) => 'images' in item && item.images ? <div key={`slide-${index}`} className={`hero-slide-collage ${index === active ? 'is-active' : ''}`} role="img" aria-label={item.alt}>{item.images.map((image, imageIndex) => <div key={image} className={`hero-slide-tile hero-slide-tile-${imageIndex + 1}`} aria-hidden="true" style={{ backgroundImage: `url(${image})` }} />)}</div> : <Image key={item.image} src={item.image} alt={item.alt} fill priority={index === 0} sizes="100vw" quality={95} className={`hero-slide-image ${index === active ? 'is-active' : ''}`} />)}
    <div className="hero-inner" key={active}>
      <p className="eyebrow">{localizedSlides[active].eyebrow} / SUZHOU, CHINA</p>
      <h1>{localizedSlides[active].title.split('|').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1>
      <p className="hero-sub">{messages.home.hero.pillars}</p>
      <p className="hero-copy">{localizedSlides[active].copy}</p>
      <div className="hero-actions"><LocaleLink className="button" href="/fabrics">{messages.home.hero.primary} ↗</LocaleLink><LocaleLink className="button button-secondary" href="/request-sample">{messages.home.hero.secondary} ↗</LocaleLink></div>
    </div>
    <div className="hero-controls" aria-label="Choose hero slide">{slides.map((item, index) => <button key={`control-${index}`} type="button" className={index === active ? 'active' : ''} onClick={() => setActive(index)} aria-label={`Show slide ${index + 1}`} aria-pressed={index === active}><span>0{index + 1}</span></button>)}</div>
    <span className="hero-meta">YIPAI TEXTILE / PERFORMANCE MATERIALS</span>
  </section>;
}
