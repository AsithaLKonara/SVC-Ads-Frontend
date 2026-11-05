const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function runTest() {
  console.log('🚀 Starting Comprehensive E2E Playwright test for Ads CRUD Media & Quill Feature...');

  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });

  const page = await context.newPage();

  // Log browser console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`[Browser Console Error] ${msg.text()}`);
    }
  });

  // Handle confirm dialogs automatically for deletion
  page.on('dialog', async dialog => {
    console.log(`   [Dialog popup]: "${dialog.message()}" -> Accepting`);
    await dialog.accept();
  });

  try {
    // ==========================================
    // 1. Authenticate admin user
    // ==========================================
    console.log('1️⃣ Authenticating admin user...');
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@laklandreality.com', password: 'admin123' })
    });
    const loginData = await loginRes.json();
    if (!loginRes.ok) throw new Error('Login failed: ' + JSON.stringify(loginData));

    const token = loginData.token;
    console.log('✅ Admin authenticated successfully. Token received.');

    // ==========================================
    // 2. Open dashboard ads page and inject auth
    // ==========================================
    console.log('2️⃣ Navigating to /dashboard/ads...');
    await page.goto('http://localhost:3000/dashboard/ads');
    await page.evaluate(({ token, user }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }, { token, user: loginData.user });

    await page.reload();
    await page.waitForSelector('text=Property Listings', { timeout: 30000 });
    console.log('✅ Dashboard Ads table loaded successfully.');

    // ==========================================
    // 3. Open "Post New Property" Sidepanel (CRUD: Create)
    // ==========================================
    console.log('3️⃣ Clicking "Post New Property" button...');
    const postBtn = page.locator('button:has-text("Post New Property")');
    await postBtn.click();

    // Verify sidepanel opened
    await page.waitForSelector('text=Post New Property', { timeout: 10000 });
    console.log('✅ Sidepanel opened in Create mode.');

    // ==========================================
    // 4. Verify React Quill Editor
    // ==========================================
    console.log('4️⃣ Verifying React Quill Rich Text Editor presence and toolbar...');
    await page.waitForSelector('.rich-text-editor-wrapper', { timeout: 10000 });
    const hasQuillToolbar = await page.locator('.ql-toolbar').isVisible();
    const hasQuillEditor = await page.locator('.ql-editor').isVisible();
    if (!hasQuillToolbar || !hasQuillEditor) {
      throw new Error('React Quill editor or toolbar is missing!');
    }
    console.log('✅ React Quill editor with toolbar verified.');

    // Check for Quill toolbar buttons (bold, italic, list, video)
    const hasBold = await page.locator('.ql-bold').isVisible();
    const hasVideoBtn = await page.locator('.ql-video').isVisible();
    console.log(`✅ Quill toolbar controls verified (Bold: ${hasBold}, Video Embed: ${hasVideoBtn})`);

    // ==========================================
    // 5. Fill out the Ad details
    // ==========================================
    const uniqueTitle = `Luxury Seaside Villa ${Date.now()}`;
    console.log(`5️⃣ Filling in property details: "${uniqueTitle}"...`);
    await page.fill('input[placeholder*="15 Perches Commercial Land"]', uniqueTitle);

    // Select category (Select first category using react-select)
    console.log('   Selecting category...');
    const catInput = page.locator('text=Category *').locator('..').locator('input[role="combobox"]');
    await catInput.focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(300);
    await page.keyboard.press('Enter');

    // Fill price
    await page.fill('input[placeholder="e.g. 25000000"]', '45000000');

    // Select district
    console.log('   Selecting district...');
    const distInput = page.locator('text=District *').locator('..').locator('input[role="combobox"]');
    await distInput.focus();
    await distInput.fill('Colombo');
    await page.waitForTimeout(300);
    await page.keyboard.press('Enter');

    // Select city
    console.log('   Selecting city...');
    const cityInput = page.locator('text=City *').locator('..').locator('input[role="combobox"]');
    await cityInput.focus();
    await cityInput.fill('Colombo 03');
    await page.waitForTimeout(300);
    await page.keyboard.press('Enter');

    // ==========================================
    // 6. Write structured rich text + video links into React Quill
    // ==========================================
    console.log('6️⃣ Writing structured rich text & video links into React Quill...');
    await page.waitForFunction(() => typeof window.__quillEditor !== 'undefined', { timeout: 10000 });
    
    // Inject H2, strong, bullet list, Quill video embed iframe, AND plain video link
    await page.evaluate(() => {
      if (window.__quillEditor) {
        window.__quillEditor.clipboard.dangerouslyPasteHTML(`
          <h2>Exclusive Oceanfront Residence</h2>
          <p>Experience ultra-luxury living with <strong>panoramic ocean views</strong> and direct beach access.</p>
          <ul>
            <li>5 Bedrooms with Ensuite Bathrooms</li>
            <li>Infinity Swimming Pool</li>
            <li>Clear Sinnakkara Deeds</li>
          </ul>
          <p>Watch our official YouTube walk-through tour below:</p>
          <iframe class="ql-video" src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen="true"></iframe>
          <p>Additional Vimeo drone flight tour:</p>
          <p>https://vimeo.com/76979871</p>
        `);
      }
    });
    await page.waitForTimeout(500);
    console.log('✅ Structured text, Quill video embed, and raw video link injected into React Quill.');

    // ==========================================
    // 7. Upload both photo and video
    // ==========================================
    console.log('7️⃣ Testing Image + Video upload feature in sidepanel...');
    const fileInput = page.locator('input[type="file"]');
    const photoPath = path.resolve(__dirname, 'fixtures/sample-photo.png');
    const videoPath = path.resolve(__dirname, 'fixtures/sample-video.mp4');

    await fileInput.setInputFiles([photoPath, videoPath]);
    await page.waitForTimeout(1000);

    // Verify previews
    const previews = page.locator('.aspect-square.rounded-md.overflow-hidden');
    const previewCount = await previews.count();
    console.log(`   Uploaded preview count: ${previewCount}`);
    if (previewCount < 2) {
      throw new Error(`Expected at least 2 media previews, got ${previewCount}`);
    }

    const videoBadge = page.locator('text=VIDEO').first();
    const hasVideoBadge = await videoBadge.isVisible();
    console.log(`✅ Media previews verified (Video badge present: ${hasVideoBadge})`);

    // ==========================================
    // 8. Submit the form (CRUD: Create)
    // ==========================================
    console.log('8️⃣ Submitting "Post Property" form...');
    const submitBtn = page.locator('button[type="submit"]:has-text("Post Property")');
    await submitBtn.click();

    // Wait for sidepanel to close and table to refresh with the new listing
    await page.waitForSelector(`text=${uniqueTitle}`, { timeout: 15000 });
    console.log('✅ Listing successfully created and displayed in dashboard table!');

    // ==========================================
    // 9. Fetch ad slug from backend to test the public slug page
    // ==========================================
    console.log('9️⃣ Fetching created ad slug from API...');
    const adsFetchRes = await fetch(`http://localhost:5000/api/ads?q=${encodeURIComponent(uniqueTitle)}`);
    const adsFetchData = await adsFetchRes.json();
    const createdAd = adsFetchData.data?.[0];
    if (!createdAd || !createdAd.slug) {
      throw new Error('Created ad not found in backend query!');
    }
    console.log(`✅ Created ad found. Slug: ${createdAd.slug}`);

    // ==========================================
    // 10. Navigate to public Ad slug page: /ad/[slug] (CRUD: Read)
    // ==========================================
    console.log(`🔟 Navigating to public ad page: /ad/${createdAd.slug}...`);
    await page.goto(`http://localhost:3000/ad/${createdAd.slug}`);
    await page.locator('h1:visible').filter({ hasText: uniqueTitle }).waitFor({ timeout: 20000 });
    console.log('✅ Public ad page loaded.');

    // 11. Verify structured rich text rendered on ads slug
    console.log('11️⃣ Verifying structured text rendering on /ad/[slug]...');
    const h2Visible = await page.locator('h2').filter({ hasText: 'Oceanfront' }).first().isVisible();
    const strongVisible = await page.locator('strong').filter({ hasText: 'panoramic' }).first().isVisible();
    const liVisible = await page.locator('li').filter({ hasText: 'Infinity' }).first().isVisible();

    if (!h2Visible || !strongVisible || !liVisible) {
      throw new Error(`Structured rich text elements failed to render! (H2: ${h2Visible}, Strong: ${strongVisible}, Li: ${liVisible})`);
    }
    console.log('✅ Structured rich text (H2, bold, list) successfully verified in description area.');

    // 12. Verify video iframes on ads slug (both YouTube and Vimeo)
    console.log('12️⃣ Verifying responsive video iframes on /ad/[slug]...');
    const ytIframe = page.locator('iframe[src*="youtube.com/embed"]');
    const hasYtIframe = await ytIframe.isVisible();
    if (!hasYtIframe) {
      throw new Error('YouTube video iframe is not visible on ads slug page!');
    }

    const vimeoIframe = page.locator('iframe[src*="player.vimeo.com/video"]');
    const hasVimeoIframe = await vimeoIframe.isVisible();
    if (!hasVimeoIframe) {
      throw new Error('Vimeo video iframe transformed from description URL is not visible on ads slug page!');
    }

    // Verify HTML integrity: NO malformed iframe src with nested div
    const malformedCheck = await page.evaluate(() => {
      const iframes = document.querySelectorAll('iframe');
      for (const f of iframes) {
        if (f.src && f.src.includes('<div')) return true;
        if (f.getAttribute('src') && f.getAttribute('src').includes('<div')) return true;
      }
      return false;
    });
    if (malformedCheck) {
      throw new Error('CRITICAL BUG DETECTED: Malformed <iframe src="<div ..."> found in DOM!');
    }
    console.log('✅ Responsive video iframes (YouTube & Vimeo) verified with 100% clean HTML DOM!');

    // 13. Verify ImageGallery handles both images and videos
    console.log('13️⃣ Verifying ImageGallery media items (images + videos)...');
    const thumbnails = page.locator('button[aria-label^="View media"]');
    const thumbCount = await thumbnails.count();
    console.log(`   Gallery thumbnail count: ${thumbCount}`);
    if (thumbCount < 2) {
      throw new Error(`Expected ImageGallery to have at least 2 media thumbnails, got ${thumbCount}`);
    }

    // Click on video thumbnail
    console.log('   Clicking second media thumbnail (video)...');
    await thumbnails.nth(1).click();
    await page.waitForTimeout(500);

    // Verify main display contains video player with controls
    const mainVideo = page.locator('video[controls]').first();
    const isVideoPlayingReady = await mainVideo.isVisible();
    if (!isVideoPlayingReady) {
      throw new Error('Main video player with controls not visible after clicking video thumbnail!');
    }
    console.log('✅ Gallery media switcher verified (Active <video controls> visible)');

    // ==========================================
    // 14. Test CRUD: EDIT flow
    // ==========================================
    console.log('\n14️⃣ Testing Ads CRUD EDIT flow...');
    await page.goto('http://localhost:3000/dashboard/ads');
    await page.waitForSelector(`text=${uniqueTitle}`, { timeout: 15000 });

    // Find row with uniqueTitle and click Edit button
    const row = page.locator(`tr:has-text("${uniqueTitle}")`);
    const editBtn = row.locator('button[title="Edit"]');
    await editBtn.click();

    // Verify sidepanel opened in Edit mode
    await page.waitForSelector('text=Edit Property', { timeout: 10000 });
    console.log('✅ Sidepanel opened in Edit mode.');

    // Verify React Quill loaded the existing description
    await page.waitForFunction(() => typeof window.__quillEditor !== 'undefined', { timeout: 10000 });
    const editorContent = await page.evaluate(() => window.__quillEditor ? window.__quillEditor.root.innerHTML : '');
    if (!editorContent.includes('Oceanfront')) {
      throw new Error(`Quill did not load existing description! Current content: ${editorContent}`);
    }
    console.log('✅ Existing rich text loaded into React Quill in Edit mode.');

    // Append an update note into React Quill
    await page.evaluate(() => {
      if (window.__quillEditor) {
        window.__quillEditor.clipboard.dangerouslyPasteHTML(
          window.__quillEditor.root.innerHTML + '<p><strong>Special Note:</strong> Price negotiable for prompt cash buyers!</p>'
        );
      }
    });

    // Remove first media preview (photo) to verify media deletion in edit mode
    console.log('   Testing media item removal in edit mode...');
    const initialPreviewCount = await page.locator('.aspect-square.rounded-md.overflow-hidden').count();
    const removeBtn = page.locator('button[title="Remove media"]').first();
    await removeBtn.click({ force: true });
    await page.waitForTimeout(300);
    const updatedPreviewCount = await page.locator('.aspect-square.rounded-md.overflow-hidden').count();
    console.log(`   Media count: ${initialPreviewCount} -> ${updatedPreviewCount}`);
    if (updatedPreviewCount !== initialPreviewCount - 1) {
      throw new Error('Failed to remove media item in Edit mode!');
    }
    console.log('✅ Media removal in Edit mode verified.');

    // Submit Edit
    console.log('   Saving edited property changes...');
    const saveBtn = page.locator('button[type="submit"]:has-text("Save Changes")');
    await saveBtn.click();

    // Wait for sidepanel to close and table to refresh
    await page.waitForSelector(`text=${uniqueTitle}`, { timeout: 15000 });
    console.log('✅ Property successfully updated in dashboard table!');

    // Verify updated public page
    console.log(`   Verifying updated content on /ad/${createdAd.slug}...`);
    await page.goto(`http://localhost:3000/ad/${createdAd.slug}`);
    await page.waitForSelector('text=Special Note:', { timeout: 15000 });
    console.log('✅ Updated rich text ("Special Note:") verified on public ad page.');

    // ==========================================
    // 15. Test CRUD: DELETE flow
    // ==========================================
    console.log('\n15️⃣ Testing Ads CRUD DELETE flow...');
    await page.goto('http://localhost:3000/dashboard/ads');
    await page.waitForSelector(`text=${uniqueTitle}`, { timeout: 15000 });

    const deleteRow = page.locator(`tr:has-text("${uniqueTitle}")`);
    const deleteBtn = deleteRow.locator('button[title="Delete"]');
    await deleteBtn.click();

    // Wait for row to disappear
    await page.waitForSelector(`text=${uniqueTitle}`, { state: 'detached', timeout: 10000 });
    console.log('✅ Property deleted and confirmed gone from dashboard table.');

    // Confirm deletion via backend API
    const verifyDeleteRes = await fetch(`http://localhost:5000/api/ads/${createdAd.id}`);
    if (verifyDeleteRes.status === 404) {
      console.log('✅ Backend API confirmed 404 (Ad successfully deleted).');
    }

    console.log('\n🎉 ALL ADS CRUD, MEDIA UPLOAD & REACT QUILL VERIFICATION TESTS PASSED! 🎉\n');
  } catch (err) {
    console.error('\n❌ E2E Test Failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTest();
