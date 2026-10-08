import LocaleLink from './LocaleLink';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { performanceFeatures, processSteps, testCategories } from '@/data/site';
import AutoBreadcrumbs from './AutoBreadcrumbs';
import HeaderControls from './HeaderControls';
import FooterContent from './FooterContent';
import CtaBandClient from './CtaBandClient';
import { MobileCtaLink, WhatsAppLink } from './UtilityLinks';
export { ApplicationGrid, ProductGrid } from './LocalizedGrids';

export function Button({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) { return <LocaleLink href={href} className={`button ${secondary ? 'button-secondary' : ''}`}>{children}</LocaleLink>; }
export function Header() { return <HeaderControls />; }
export function Footer() { return <FooterContent />; }
export function MobileCta() { return <MobileCtaLink />; }
export function WhatsAppWidget() { return <WhatsAppLink />; }
export function Shell({ children }: { children: ReactNode }) { return <><Header/><AutoBreadcrumbs/><main>{children}</main><Footer/><MobileCta/><WhatsAppWidget/></>; }
export function Eyebrow({ children }: { children: ReactNode }) { return <p className="eyebrow">{children}</p>; }
export function SectionTitle({ eyebrow, title, text, dark = false }: { eyebrow?: string; title: string; text?: string; dark?: boolean }) { return <div className={`section-title ${dark ? 'light' : ''}`}>{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<h2>{title}</h2>{text && <p>{text}</p>}</div>; }
export function FeatureGrid() { return <div className="feature-grid">{performanceFeatures.map((f,i)=><article className="feature-card" key={f.title}><span className="feature-number">0{i+1}</span><div className="feature-icon">{['◌','⌁','▦','↗'][i]}</div><h3>{f.title}</h3><p>{f.text}</p></article>)}</div>; }
export function Process() { return <div className="process-grid">{processSteps.map((s,i)=><div className="process-step" key={s}><span>0{i+1}</span><h3>{s}</h3></div>)}</div>; }
export function TechnicalPanel() { const links=['/performance/waterproof','/performance/breathability','/performance/breathability','/performance/abrasion-resistance','/performance/stretch-recovery','/fabrics/pfc-free'];return <div className="technical-panel"><div className="technical-intro"><Eyebrow>PERFORMANCE PARAMETERS</Eyebrow><h2>Performance,<br/>defined by purpose.</h2><p>Specifications are developed around your garment, environment and target requirements.</p><Button href="/performance" secondary>Explore Performance</Button></div><div className="technical-list">{['Waterproof','Breathability','Moisture Vapor Permeability','Abrasion Resistance','Stretch & Recovery','PFC-Free DWR Options'].map((x,i)=><LocaleLink href={links[i]} key={x}><span>0{i+1}</span>{x}<span>↗</span></LocaleLink>)}</div></div>; }
export function TestingBlock() { return <section className="testing-block"><div><Eyebrow>TESTING & QUALITY</Eyebrow><h2>Evaluate against<br/>what matters.</h2><p>Technical fabrics can be evaluated against applicable requirements and agreed test methods. Share your standards or target methods during development.</p><Button href="/testing-quality" secondary>View Testing & Quality</Button></div><div className="testing-right"><div className="testing-image"><Image src="/images/lab-permeability.webp" alt="Hydrostatic pressure tester used to evaluate fabric water resistance" fill sizes="(max-width: 650px) 100vw, 45vw" quality={95} /></div><div className="test-list">{testCategories.map((x,i)=><div key={x}><span>0{i+1}</span>{x}<i>↗</i></div>)}</div></div></section>; }
export function CtaBand({ title, text }: { title?: string; text?: string }) { return <CtaBandClient title={title} text={text} />; }
export function Breadcrumbs({ parts }: { parts: { label: string; href?: string }[] }) { const schema={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:parts.map((p,i)=>({'@type':'ListItem',position:i+1,name:p.label,item:p.href?`https://www.yipaifabric.com${p.href}`:undefined}))};return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><nav className="breadcrumbs" aria-label="Breadcrumb">{parts.map((p,i)=><span key={`${p.label}-${i}`}>{i>0&&<i>/</i>}{p.href?<LocaleLink href={p.href}>{p.label}</LocaleLink>:p.label}</span>)}</nav></>; }
export function CatalogBlock() { return <section className="catalog-block"><span className="catalog-mark">YP<br/>/ 01</span><div><Eyebrow>COLLECTION RESOURCE</Eyebrow><h2>Download Outdoor<br/>Fabric Collection</h2><p>The PDF catalog can be connected here when supplied. Contact us to request current fabric information.</p></div><a className="button button-secondary" href="mailto:yipaifabric@gmail.com?subject=Outdoor%20Fabric%20Collection">Download Catalog ↗</a></section>; }
