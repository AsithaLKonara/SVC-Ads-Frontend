import assert from "node:assert";
import { transformDescriptionToHtml, toEmbedUrl } from "../src/utils/richText";
import { isVideoUrl, getFirstImageThumbnail } from "../src/utils/media";

console.log("🧪 Running Unit Tests for RichText & Media Utilities...\n");

// 1. Test toEmbedUrl
console.log("1️⃣ Testing toEmbedUrl...");
assert.strictEqual(
  toEmbedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
  "https://www.youtube.com/embed/dQw4w9WgXcQ"
);
assert.strictEqual(
  toEmbedUrl("https://youtu.be/dQw4w9WgXcQ"),
  "https://www.youtube.com/embed/dQw4w9WgXcQ"
);
assert.strictEqual(
  toEmbedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=45s&feature=emb_title"),
  "https://www.youtube.com/embed/dQw4w9WgXcQ"
);
assert.strictEqual(
  toEmbedUrl("https://www.youtube.com/shorts/dQw4w9WgXcQ"),
  "https://www.youtube.com/embed/dQw4w9WgXcQ"
);
assert.strictEqual(
  toEmbedUrl("https://vimeo.com/76979871"),
  "https://player.vimeo.com/video/76979871"
);
assert.strictEqual(
  toEmbedUrl("https://player.vimeo.com/video/76979871"),
  "https://player.vimeo.com/video/76979871"
);
assert.strictEqual(
  toEmbedUrl("https://vimeo.com/channels/staffpicks/76979871"),
  "https://player.vimeo.com/video/76979871"
);
assert.strictEqual(toEmbedUrl("https://example.com/property"), null);
assert.strictEqual(toEmbedUrl(""), null);
console.log("   ✅ toEmbedUrl passed all URL variations.");

// 2. Test transformDescriptionToHtml
console.log("2️⃣ Testing transformDescriptionToHtml...");

// Case A: Quill video iframe output
const quillInput = `<p>Property walkthrough below:</p><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe><p>End of description.</p>`;
const quillOutput = transformDescriptionToHtml(quillInput);
assert(quillOutput.includes("aspect-video"), "Quill iframe should be wrapped in aspect-video");
assert(quillOutput.includes('src="https://www.youtube.com/embed/dQw4w9WgXcQ"'), "Quill iframe src must be preserved cleanly");
assert(!quillOutput.includes('src="<div'), "CRITICAL: Must not contain malformed nested div inside src attribute!");
assert(quillOutput.includes("<p>Property walkthrough below:</p>"), "Text before iframe must be preserved");
assert(quillOutput.includes("<p>End of description.</p>"), "Text after iframe must be preserved");

// Case B: Standalone YouTube paragraph link
const ytParaInput = `<p>Check out our tour: <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">https://www.youtube.com/watch?v=dQw4w9WgXcQ</a></p>`;
const ytParaOutput = transformDescriptionToHtml(ytParaInput);
assert(ytParaOutput.includes("aspect-video"), "YouTube link must be transformed into aspect-video iframe");
assert(ytParaOutput.includes("https://www.youtube.com/embed/dQw4w9WgXcQ"), "Must convert to youtube embed URL");

// Case C: Multiple videos (Quill iframe + Vimeo raw URL)
const multiInput = `<h2>Tour Section</h2><iframe class="ql-video" src="https://www.youtube.com/embed/AAA11112222"></iframe><h2>Drone Tour</h2><p>https://vimeo.com/76979871</p><p>Contact agent today.</p>`;
const multiOutput = transformDescriptionToHtml(multiInput);
assert(multiOutput.includes("AAA11112222"), "First video ID must be present");
assert(multiOutput.includes("player.vimeo.com/video/76979871"), "Vimeo embed URL must be generated");
assert(!multiOutput.includes('src="<div'), "No malformed src attributes allowed");
assert(multiOutput.includes("<h2>Drone Tour</h2>"), "Surrounding headings must not be corrupted");
assert(multiOutput.includes("<p>Contact agent today.</p>"), "Surrounding paragraphs must not be swallowed");

// Case D: Plain text legacy ad (no HTML tags)
const plainInput = `Luxury Land in Galle.\n\nVideo tour: https://youtu.be/dQw4w9WgXcQ\n\nCall 0771234567.`;
const plainOutput = transformDescriptionToHtml(plainInput);
assert(plainOutput.includes("<p>Luxury Land in Galle.</p>"), "Plain text converted to paragraphs");
assert(plainOutput.includes("aspect-video"), "Video URL transformed into responsive iframe");
assert(plainOutput.includes("<p>Call 0771234567.</p>"), "Following text preserved in paragraph");
console.log("   ✅ transformDescriptionToHtml passed all edge cases.");

// 3. Test isVideoUrl
console.log("3️⃣ Testing isVideoUrl...");
assert.strictEqual(isVideoUrl("data:video/mp4;base64,AAAA"), true);
assert.strictEqual(isVideoUrl("data:video/webm;base64,BBBB"), true);
assert.strictEqual(isVideoUrl("https://cdn.example.com/tour.mp4"), true);
assert.strictEqual(isVideoUrl("https://cdn.example.com/tour.webm"), true);
assert.strictEqual(isVideoUrl("https://cdn.example.com/tour.mov?token=123"), true);
assert.strictEqual(isVideoUrl("https://cdn.example.com/tour.m4v#t=0.5"), true);
assert.strictEqual(isVideoUrl("https://cdn.example.com/image.jpg"), false);
assert.strictEqual(isVideoUrl("https://cdn.example.com/photo.png?w=500"), false);
assert.strictEqual(isVideoUrl(undefined), false);
assert.strictEqual(isVideoUrl(""), false);
console.log("   ✅ isVideoUrl passed all checks.");

// 4. Test getFirstImageThumbnail
console.log("4️⃣ Testing getFirstImageThumbnail...");
assert.strictEqual(
  getFirstImageThumbnail(["https://cdn.example.com/tour.mp4", "https://cdn.example.com/photo.jpg"]),
  "https://cdn.example.com/photo.jpg"
);
// When ONLY videos are uploaded, fallback image MUST be returned to prevent next/image crashing
assert.strictEqual(
  getFirstImageThumbnail(["https://cdn.example.com/video1.mp4", "data:video/webm;base64,123"]),
  "/images/placeholder.jpg"
);
assert.strictEqual(
  getFirstImageThumbnail([]),
  "/images/placeholder.jpg"
);
assert.strictEqual(
  getFirstImageThumbnail(undefined),
  "/images/placeholder.jpg"
);
console.log("   ✅ getFirstImageThumbnail passed all checks.");

console.log("\n🎉 ALL UNIT TESTS PASSED SUCCESSFULLY! 🎉\n");
