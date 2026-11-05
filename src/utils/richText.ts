/**
 * Transforms description text or HTML to ensure video links are rendered as responsive iframes
 * and Quill-generated HTML is properly structured and safe.
 */

export function toEmbedUrl(url?: string): string | null {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();

  // YouTube: watch, embed, shorts, youtu.be
  const ytMatch = trimmed.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  // Vimeo: standard, player, channels, groups
  const vimeoMatch = trimmed.match(
    /(?:https?:\/\/)?(?:www\.|player\.)?vimeo\.com\/(?:video\/|channels\/(?:\w+\/)?|groups\/[^\/]+\/videos\/|album\/(?:\d+\/)?video\/|)(\d+)/i
  );
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return null;
}

export function createResponsiveIframe(embedUrl: string, title = "Property Video"): string {
  return `<div class="my-4 aspect-video w-full overflow-hidden rounded-xl border border-border bg-black shadow-sm"><iframe src="${embedUrl}" title="${title}" class="h-full w-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
}

export function transformDescriptionToHtml(description: string): string {
  if (!description) return "";

  let html = description.trim();

  // 1. If description doesn't contain HTML tags, convert plain text newlines into paragraphs
  const hasHtml = /<\/?[a-z][\s\S]*>/i.test(html);
  if (!hasHtml) {
    const paragraphs = html
      .split(/\r?\n+/)
      .map(p => p.trim())
      .filter(Boolean)
      .map(p => `<p>${p}</p>`);
    html = paragraphs.join("");
  }

  const tokens: { id: string; content: string }[] = [];
  const addToken = (content: string) => {
    const id = `__SVC_MEDIA_IFRAME_TOKEN_${tokens.length}__`;
    tokens.push({ id, content });
    return id;
  };

  // 2. Protect and normalize existing <iframe ...></iframe> tags (including Quill ql-video)
  html = html.replace(/<iframe\b([^>]*)src=["']([^"']+)["']([^>]*)>\s*<\/iframe>/gi, (match, before, src, after) => {
    if (before.includes("h-full") || after.includes("h-full")) {
      return addToken(match);
    }
    const embedUrl = toEmbedUrl(src) || src;
    return addToken(createResponsiveIframe(embedUrl));
  });

  // 3. Transform standalone <p> tags wrapping video URLs or <a> links
  html = html.replace(/<p>\s*(?:<a[^>]*href=["']([^"']+)["'][^>]*>.*?<\/a>|(https?:\/\/[^\s<]+))\s*<\/p>/gi, (match, linkHref, plainUrl) => {
    const url = linkHref || plainUrl;
    const embedUrl = toEmbedUrl(url);
    if (embedUrl) {
      return addToken(createResponsiveIframe(embedUrl));
    }
    return match;
  });

  // 4. Transform standalone <a href="videoUrl">...</a>
  html = html.replace(/<a[^>]*href=["']([^"']+)["'][^>]*>(?:https?:\/\/[^<]+)?<\/a>/gi, (match, href) => {
    const embedUrl = toEmbedUrl(href);
    if (embedUrl) {
      return addToken(createResponsiveIframe(embedUrl));
    }
    return match;
  });

  // 5. Transform standalone video URLs in text nodes (avoiding HTML attributes)
  const parts = html.split(/(<[^>]+>)/g);
  for (let i = 0; i < parts.length; i++) {
    // If it's a text node (not an HTML tag)
    if (!parts[i].startsWith("<")) {
      const urlRegex = /(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/|vimeo\.com\/(?:video\/)?)[a-zA-Z0-9_\-\/]+)/gi;
      parts[i] = parts[i].replace(urlRegex, (matchedUrl) => {
        const embedUrl = toEmbedUrl(matchedUrl);
        if (embedUrl) {
          return addToken(createResponsiveIframe(embedUrl));
        }
        return matchedUrl;
      });
    }
  }
  html = parts.join("");

  // 6. Restore tokens
  tokens.forEach(({ id, content }) => {
    html = html.split(id).join(content);
  });

  // 7. Ensure no <div> is nested inside a <p> tag (which creates invalid HTML)
  html = html.replace(/<p>([\s\S]*?)(<div class="my-4 aspect-video[\s\S]*?<\/div>)([\s\S]*?)<\/p>/gi, (match, before, div, after) => {
    const pBefore = before.trim() ? `<p>${before.trim()}</p>` : "";
    const pAfter = after.trim() ? `<p>${after.trim()}</p>` : "";
    return `${pBefore}${div}${pAfter}`;
  });

  return html;
}

