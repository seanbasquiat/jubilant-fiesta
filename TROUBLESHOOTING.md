# Accordion Troubleshooting Guide

## Quick Fix - Use accordion-fixed.js

I've created **accordion-fixed.js** which has extensive debugging built-in. Use this version instead!

## Steps to Fix "Boxes Do Not Open When Clicked"

### Step 1: Check Browser Console

1. Preview your Wix site
2. Press **F12** (Windows/Linux) or **Cmd+Option+I** (Mac) to open Developer Tools
3. Click the **Console** tab
4. Try clicking your accordion headers
5. Look for messages like:
   - `=== ACCORDION STARTING ===`
   - `=== CLICKED: accordionHeader1 ===`
   - Any error messages in red

### Step 2: Verify Element IDs Match EXACTLY

**Common Issue:** Element IDs in your Wix editor don't match the code configuration.

1. In Wix Editor, click on each accordion header element
2. In the Properties Panel, check the **ID** field
3. Make sure IDs match EXACTLY (case-sensitive):
   ```javascript
   const accordionConfig = {
       items: [
           {
               header: 'accordionHeader1',  // Must match Wix element ID exactly
               content: 'accordionContent1'  // Must match Wix element ID exactly
           }
       ]
   }
   ```

### Step 3: Verify Element Types

**Headers** can be:
- ✅ Text elements
- ✅ Button elements
- ❌ NOT images or shapes (unless made clickable)

**Content boxes** must be:
- ✅ Box (Container) elements
- ❌ NOT strips, columns, or other containers

### Step 4: Check Wix Editor Settings

For each **content box**:
1. Select the box in Wix Editor
2. Make sure it has an initial height (e.g., 200px)
3. Make sure it's visible in the editor
4. Don't hide it or set display:none manually

### Step 5: Test with Minimal Setup

Try this minimal test with just ONE accordion item:

```javascript
$w.onReady(function () {
    console.log('TEST: Page ready');

    try {
        const header = $w('#accordionHeader1');
        const content = $w('#accordionContent1');

        console.log('TEST: Found header:', header);
        console.log('TEST: Found content:', content);

        // Test click
        header.onClick(() => {
            console.log('TEST: Header clicked!');

            // Try to expand
            content.expand();
            console.log('TEST: Expand called');
        });

    } catch (error) {
        console.error('TEST ERROR:', error);
    }
});
```

## Common Error Messages & Solutions

### Error: "Cannot read property 'onClick' of undefined"

**Problem:** Element not found - ID mismatch

**Solution:**
- Check that element ID in Wix matches exactly
- IDs are case-sensitive: `accordionHeader1` ≠ `accordionheader1`

### Error: "expand is not a function"

**Problem:** Element is not a Box/Container

**Solution:**
- Delete the element
- Add a new **Box** from Add Panel → Container → Box
- Move your content into the box

### No errors, but nothing happens

**Problem:** Code not saved or not running on correct page

**Solution:**
1. Make sure you saved the page code (Ctrl+S or Cmd+S)
2. Make sure you're adding code to the correct page
3. Try refreshing the preview

### Click works once, then stops

**Problem:** Event handler being removed or element getting hidden

**Solution:**
- Don't use `.hide()` in your code
- Use `.collapse()` instead

## Element Setup Checklist

For EACH accordion item, verify:

- [ ] Header element exists with correct ID
- [ ] Content box element exists with correct ID
- [ ] Content box is a "Box" container (not strip/column)
- [ ] Content box has a height set (e.g., 200px)
- [ ] IDs in code match IDs in Wix editor EXACTLY
- [ ] Code is saved in the correct page
- [ ] Velo Dev Mode is enabled

## Working Example Setup

Here's a complete working example:

### In Wix Editor:

1. **Add Text Element**
   - ID: `faq1Question`
   - Text: "What is your return policy?"
   - Style: Bold, 18px, padding 15px, background #f0f0f0

2. **Add Box Container**
   - ID: `faq1Answer`
   - Height: 150px
   - Add text inside: "You can return items within 30 days..."

3. **Add Text Element**
   - ID: `faq2Question`
   - Text: "Do you ship internationally?"
   - Style: Bold, 18px, padding 15px, background #f0f0f0

4. **Add Box Container**
   - ID: `faq2Answer`
   - Height: 100px
   - Add text inside: "Yes, we ship worldwide..."

### In Page Code (use accordion-fixed.js):

```javascript
const accordionConfig = {
    items: [
        {
            id: 1,
            header: 'faq1Question',
            content: 'faq1Answer'
        },
        {
            id: 2,
            header: 'faq2Question',
            content: 'faq2Answer'
        }
    ],
    options: {
        allowMultipleOpen: false,
        defaultOpenIndex: null,
        animationDuration: 400
    }
};
```

## Still Not Working?

If you've tried everything above:

1. **Copy the entire console output** (all messages and errors)
2. **Check the element IDs** in Wix editor by clicking each element
3. **Verify element types** (header = Text/Button, content = Box)
4. **Take a screenshot** of your Wix editor showing the elements
5. **Share the console output** so I can help debug

## Alternative: Use the Simple Version

If all else fails, try **accordion-simple.js** which is only 30 lines and uses the most basic approach:

```javascript
const items = [
    { header: 'accordionHeader1', content: 'accordionContent1' },
    { header: 'accordionHeader2', content: 'accordionContent2' }
];

let openItem = null;

$w.onReady(function () {
    items.forEach((item, index) => {
        const header = $w(`#${item.header}`);
        const content = $w(`#${item.content}`);

        content.collapse();

        header.onClick(() => {
            const isOpen = openItem === index;

            if (openItem !== null && openItem !== index) {
                $w(`#${items[openItem].content}`).collapse();
            }

            if (isOpen) {
                content.collapse();
                openItem = null;
            } else {
                content.expand();
                openItem = index;
            }
        });
    });
});
```

This version has:
- No imports needed
- No animations
- Minimal code
- Easy to debug

---

## Debug Checklist

Go through this step by step:

1. [ ] Opened browser console (F12)
2. [ ] See "ACCORDION STARTING" message
3. [ ] See "initialized successfully" for each item
4. [ ] See "CLICKED" message when clicking headers
5. [ ] No red error messages in console
6. [ ] Element IDs verified to match exactly
7. [ ] Content boxes are "Box" elements
8. [ ] Code saved and preview refreshed

If ALL checkboxes are checked and it still doesn't work, there may be a conflict with other code on your page.
