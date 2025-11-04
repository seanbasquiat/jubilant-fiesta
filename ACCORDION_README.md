# Wix Velo Collapsible Accordion Element

A fully functional, customizable accordion component for Wix websites using Velo (formerly Corvid).

## Features

- ✅ Smooth expand/collapse animations
- ✅ Single or multiple sections open at once
- ✅ Customizable icons (+/- indicators)
- ✅ Default open section option
- ✅ Programmatic API for external control
- ✅ Responsive and mobile-friendly
- ✅ Easy to customize and extend

## Quick Start

### Step 1: Set Up Elements in Wix Editor

For each accordion item, you need three elements:

1. **Header Button/Text** - The clickable header
2. **Content Container** - The collapsible content area
3. **Item Container** (optional) - A container that wraps both

#### Example Setup for 3 Accordion Items:

```
Accordion Item 1:
├── Text/Button: accordionHeader1
└── Container: accordionContent1

Accordion Item 2:
├── Text/Button: accordionHeader2
└── Container: accordionContent2

Accordion Item 3:
├── Text/Button: accordionHeader3
└── Container: accordionContent3
```

#### Detailed Instructions:

1. **Add a Text Element** for the header
   - Click "Add" → "Text"
   - Change ID to `accordionHeader1` (Properties Panel → ID)
   - Style it as a header (bold, larger font, background color, etc.)

2. **Add a Container Box** for the content
   - Click "Add" → "Box" → "Container"
   - Change ID to `accordionContent1`
   - Add your content inside (text, images, buttons, etc.)
   - Style as desired

3. **Repeat** for additional accordion items (accordionHeader2/accordionContent2, etc.)

### Step 2: Add the Code

1. **Enable Velo** (if not already enabled)
   - Click "Dev Mode" at the top of the editor
   - Or go to Tools → Velo Dev Mode

2. **Add the Code to Your Page**
   - In the Velo sidebar, locate your page (e.g., "Home" or "Page Code")
   - Copy the entire content of `accordion.js`
   - Paste it into your page code

3. **Configure Your Accordion**
   - Edit the `accordionConfig` object in the code:

```javascript
const accordionConfig = {
    items: [
        {
            id: 1,
            header: 'accordionHeader1',
            content: 'accordionContent1',
            container: 'accordionItem1'  // optional
        },
        {
            id: 2,
            header: 'accordionHeader2',
            content: 'accordionContent2',
            container: 'accordionItem2'  // optional
        }
        // Add more items as needed
    ],
    options: {
        allowMultipleOpen: false,     // Allow multiple sections open
        animationDuration: 400,       // Animation speed (ms)
        defaultOpenIndex: 0,          // First item open by default (or null)
        closeIcon: '−',               // Icon when open
        openIcon: '+',                // Icon when closed
        useIcons: true                // Show +/- icons
    }
};
```

### Step 3: Preview and Publish

1. Click **Preview** to test your accordion
2. Click sections to expand/collapse them
3. When satisfied, click **Publish**

## Configuration Options

### `allowMultipleOpen`
- **Type:** `boolean`
- **Default:** `false`
- **Description:** When `false`, opening one section automatically closes others. When `true`, multiple sections can be open simultaneously.

### `animationDuration`
- **Type:** `number` (milliseconds)
- **Default:** `400`
- **Description:** Speed of the expand/collapse animation. Lower = faster.

### `defaultOpenIndex`
- **Type:** `number | null`
- **Default:** `null`
- **Description:** Index of the accordion item to open by default (0 for first item). Set to `null` to have all sections closed initially.

### `closeIcon` / `openIcon`
- **Type:** `string`
- **Default:** `'−'` / `'+'`
- **Description:** Characters/icons displayed in the header to indicate state.

### `useIcons`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Whether to automatically add open/close icons to headers.

## Advanced Usage

### Programmatic Control

The accordion exports several functions for programmatic control:

```javascript
// In another part of your page code or a button click handler:

// Open a specific accordion by ID
openAccordionById(2);

// Close a specific accordion by ID
closeAccordionById(1);

// Open all accordions
openAll();

// Close all accordions
closeAll();

// Get current state
const state = getAccordionState();
console.log(state);
```

### Example: Button Controls

```javascript
// Add buttons with IDs: openAllBtn, closeAllBtn

$w('#openAllBtn').onClick(() => {
    openAll();
});

$w('#closeAllBtn').onClick(() => {
    closeAll();
});
```

## Styling Tips

### Header Styling
- Add background color for better visibility
- Use padding for clickable area
- Consider hover effects (change opacity/color)
- Make sure cursor changes to pointer (handled automatically)

### Content Styling
- Add padding inside content containers
- Use consistent spacing
- Consider borders or shadows to separate items
- Ensure content is readable when expanded

### Recommended CSS (via Wix Styles)
```
Header Element:
- Background: Light gray (#f5f5f5)
- Padding: 15px
- Font: Bold, 16px
- Border: 1px solid #ddd

Content Container:
- Background: White
- Padding: 20px
- Border: 1px solid #ddd (left, right, bottom only)
- Min-height: 0 (important for animation)
```

## Troubleshooting

### Accordion Not Working?

1. **Check Element IDs** - Ensure all IDs in the config match your Wix elements exactly (case-sensitive)
2. **Enable Velo Dev Mode** - Make sure Velo is enabled on your site
3. **Check Console** - Open browser console (F12) to see error messages
4. **Verify Element Types** - Headers should be clickable (Text/Button), content should be containers

### Animation Looks Choppy?

1. **Reduce Content Complexity** - Too many nested elements can slow animations
2. **Adjust Duration** - Increase `animationDuration` for smoother appearance
3. **Use Containers** - Always use Container boxes for content, not Strips

### Icons Not Showing?

1. **Check `useIcons`** - Make sure it's set to `true`
2. **Text Element** - Icons only work with Text elements (not Buttons)
3. **Font Support** - Try different icons (↓, ▼, ◀, ▶) if current ones don't display

### Heights Not Correct?

1. **Set Fixed Heights** - Initially, content containers should have a fixed height
2. **Content Visibility** - Make sure content elements are visible in the editor
3. **Nested Elements** - Check that nested elements have proper heights set

## Customization Examples

### Example 1: FAQ Accordion

```javascript
const accordionConfig = {
    items: [
        {
            id: 1,
            header: 'faqQuestion1',
            content: 'faqAnswer1'
        },
        {
            id: 2,
            header: 'faqQuestion2',
            content: 'faqAnswer2'
        }
    ],
    options: {
        allowMultipleOpen: false,
        animationDuration: 300,
        defaultOpenIndex: null,
        closeIcon: '▲',
        openIcon: '▼',
        useIcons: true
    }
};
```

### Example 2: Multi-Open Sections

```javascript
const accordionConfig = {
    items: [
        {
            id: 1,
            header: 'section1Header',
            content: 'section1Content'
        },
        {
            id: 2,
            header: 'section2Header',
            content: 'section2Content'
        }
    ],
    options: {
        allowMultipleOpen: true,  // Allow multiple sections open
        animationDuration: 500,
        defaultOpenIndex: 0,      // First item open by default
        closeIcon: '−',
        openIcon: '+',
        useIcons: true
    }
};
```

### Example 3: No Icons, Fast Animation

```javascript
const accordionConfig = {
    items: [
        // ... your items
    ],
    options: {
        allowMultipleOpen: false,
        animationDuration: 200,    // Fast animation
        defaultOpenIndex: null,
        useIcons: false            // No icons
    }
};
```

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Support

For issues or questions:
1. Check the Wix Velo documentation: https://www.wix.com/velo/reference
2. Check browser console for errors
3. Verify all element IDs are correct
4. Test in preview mode before publishing

## License

This code is provided as-is for use in Wix websites. Feel free to modify and customize for your needs.

---

**Happy Coding!** 🎉

For more Wix Velo resources, visit: https://www.wix.com/velo/reference/api-overview/introduction
