import type { Metadata } from 'next'
import prisma from '@/lib/prisma'
import { getModule } from './registry'

/**
 * REUSABLE SEO CONNECTION
 *
 * One builder shared by every SEO-capable public page. Reads the PageSeo row
 * for the module id and merges it over the page's existing defaults.
 *
 * If no PageSeo row exists, or a field is blank, the previous default is kept
 * unchanged — so pages behave exactly as they do today until Super Admin
 * actually fills something in. There is no per-module branching here: the page
 * passes its module id and its own fallbacks, and the registry supplies the
 * canonical route.
 */

export interface SeoFallback {
  title: string
  description: string
}

export async function buildModuleMetadata(
  moduleId: string,
  fallback: SeoFallback
): Promise<Metadata> {
  const mod = getModule(moduleId)

  let seo: any = null
  try {
    seo = await prisma.pageSeo.findUnique({ where: { moduleId } })
  } catch {
    // Never let a metadata lookup break page rendering.
    seo = null
  }

  const value = (v: string | null | undefined) => {
    const trimmed = typeof v === 'string' ? v.trim() : ''
    return trimmed.length > 0 ? trimmed : undefined
  }

  const title = value(seo?.seoTitle) ?? fallback.title
  const description = value(seo?.seoDescription) ?? fallback.description
  const keywords = value(seo?.seoKeywords)
  const canonical = value(seo?.canonicalUrl) ?? mod?.route
  const ogTitle = value(seo?.ogTitle) ?? title
  const ogDescription = value(seo?.ogDescription) ?? description
  const ogImage = value(seo?.ogImage)

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      ...(canonical ? { url: canonical } : {}),
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  }

  if (keywords) {
    metadata.keywords = keywords.split(',').map((k) => k.trim()).filter(Boolean)
  }
  if (canonical) {
    metadata.alternates = { canonical }
  }

  return metadata
}
