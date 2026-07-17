import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/metadata'

// Single-page portfolio: the homepage is the primary URL. The section anchors
// (#skills, #education, …) all live under it, so only real routable pages are
// listed here — the homepage plus the standalone legal pages.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: `${siteUrl}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3
    }
  ]
}
