# SEO Notes

## Open Graph Banner
- Recommended: `assets/images/og-banner.jpg`
- Size: 1200 x 630 px (JPG or PNG)
- Keep file size under ~400 KB
- Safe area: avoid critical text near edges

If you add a dedicated banner at the path above, we can update all pages to use it instead of `gallery1.jpg`.

## Sitemap Submission
1. Google Search Console
   - Go to https://search.google.com/search-console
   - Add property for `https://fnydi.org.za/` (Domain or URL prefix)
   - Verify ownership (DNS TXT record recommended)
   - Submit sitemap: `https://fnydi.org.za/sitemap.xml`

2. Bing Webmaster Tools
   - Go to https://www.bing.com/webmasters/
   - Add site and verify ownership (can import from GSC)
   - Submit sitemap: `https://fnydi.org.za/sitemap.xml`

## Fetch & Index Tips
- Use the "URL Inspection" tool (GSC) to request indexing after deploys.
- Ensure robots.txt includes:
  - `Sitemap: https://fnydi.org.za/sitemap.xml`
- Avoid `noindex` on pages you want indexed.

## Social Share Preview
- Test previews:
  - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
  - Twitter Card Validator: https://cards-dev.twitter.com/validator

## Next Steps (Optional)
- Add Breadcrumb JSON-LD for deeper pages
- Add SiteNavigationElement JSON-LD on the homepage
- Create a dedicated OG banner with key message and logo
