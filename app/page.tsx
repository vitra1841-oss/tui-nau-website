import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Menu } from '@/components/menu'
import { Gallery } from '@/components/gallery'
import { Visit } from '@/components/visit'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Visit />
      <Contact />
      <SiteFooter />
    </>
  )
}
