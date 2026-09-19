import prisma from '@/lib/prisma'
import { listSeoModules } from '@/lib/cms/registry'
import { updatePageSeo } from '@/app/actions/cms'

/**
 * SEO CONNECTION
 *
 * Driven entirely by the module registry: one form per module where
 * supportsSeo is true. Registering a new SEO-capable module adds its form here
 * automatically. Modules that render no page of their own (Navigation, Product
 * Slider) never appear, so no SEO field is editable for a page that ignores it.
 */
export default async function SeoAdminPage() {
  const modules = listSeoModules()
  const rows = await prisma.pageSeo.findMany()
  const byModule = new Map(rows.map((r: any) => [r.moduleId, r]))

  async function handleSave(moduleId: string, formData: FormData) {
    'use server'
    await updatePageSeo(moduleId, {
      seoTitle: (formData.get('seoTitle') as string) || null,
      seoDescription: (formData.get('seoDescription') as string) || null,
      seoKeywords: (formData.get('seoKeywords') as string) || null,
      canonicalUrl: (formData.get('canonicalUrl') as string) || null,
      ogTitle: (formData.get('ogTitle') as string) || null,
      ogDescription: (formData.get('ogDescription') as string) || null,
      ogImage: (formData.get('ogImage') as string) || null,
    })
  }

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>SEO Settings</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Search engine and social sharing metadata per page. Leave a field blank to keep the
          page&apos;s existing default. Nothing here changes how a page looks.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        {modules.map((mod) => {
          const seo: any = byModule.get(mod.id) || {}
          return (
            <div key={mod.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{mod.label}</h2>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                  {mod.pageLabel} &middot; {mod.route}
                </span>
              </div>

              <form action={handleSave.bind(null, mod.id)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '700px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>SEO Title</label>
                  <input type="text" name="seoTitle" defaultValue={seo.seoTitle || ''} style={fieldStyle} placeholder="Leave blank to use the page default" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>SEO Description</label>
                  <textarea name="seoDescription" defaultValue={seo.seoDescription || ''} rows={3} style={{ ...fieldStyle, resize: 'vertical' }} placeholder="Leave blank to use the page default"></textarea>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>SEO Keywords</label>
                  <input type="text" name="seoKeywords" defaultValue={seo.seoKeywords || ''} style={fieldStyle} placeholder="motor rewinding, electrical repair, rajkot" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Canonical URL</label>
                  <input type="text" name="canonicalUrl" defaultValue={seo.canonicalUrl || ''} style={fieldStyle} placeholder={mod.route} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>OG Title</label>
                  <input type="text" name="ogTitle" defaultValue={seo.ogTitle || ''} style={fieldStyle} placeholder="Defaults to SEO Title" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>OG Description</label>
                  <textarea name="ogDescription" defaultValue={seo.ogDescription || ''} rows={2} style={{ ...fieldStyle, resize: 'vertical' }} placeholder="Defaults to SEO Description"></textarea>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>OG Image</label>
                  <input type="text" name="ogImage" defaultValue={seo.ogImage || ''} style={fieldStyle} placeholder="/images/og/home.jpg or https://..." />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
                  Save SEO
                </button>
              </form>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const fieldStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid var(--color-border)',
  borderRadius: '4px',
  fontFamily: 'inherit'
}
