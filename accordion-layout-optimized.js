/**
 * Wix Velo Accordion - Layout Optimized Version
 *
 * This version is optimized for proper spacing and alignment
 *
 * REQUIRED SETUP IN WIX EDITOR:
 *
 * For EACH accordion item:
 * 1. Header (Text or Button): accordionHeader1, accordionHeader2, etc.
 *    - Position: Left-aligned, stacked vertically
 *    - Width: 100% or fixed width
 *    - Padding: 15px
 *    - Background: Light color
 *
 * 2. Content (Box container): accordionContent1, accordionContent2, etc.
 *    - Position: Directly below corresponding header
 *    - Width: Same as header
 *    - Initial state: VISIBLE in editor (code will hide it)
 *    - Height: Set to your desired expanded height
 *
 * LAYOUT TIP:
 * - All headers should have the same X position (left alignment)
 * - Space headers vertically with equal gaps (e.g., 15px between)
 * - Content boxes go directly below their headers (no gap)
 * - When content is hidden, next header should be close to previous header
 */

// ============================================
// CONFIGURATION
// ============================================

const accordionConfig = {
    items: [
        {
            id: 1,
            header: 'accordionHeader1',
            content: 'accordionContent1'
        },
        {
            id: 2,
            header: 'accordionHeader2',
            content: 'accordionContent2'
        },
        {
            id: 3,
            header: 'accordionHeader3',
            content: 'accordionContent3'
        }
    ],

    options: {
        allowMultipleOpen: false,        // Allow multiple sections open at once
        defaultOpenIndex: null,          // Index of item to open by default (null = all closed)
        openIcon: '+',                   // Icon when closed
        closeIcon: '−',                  // Icon when open
        useAnimation: false,             // Set to true for smooth transitions (may cause layout issues)
        headerSpacing: 15,               // Spacing between headers when content is collapsed (in px)
        maintainSpace: false             // Set to true if you want space reserved for hidden content
    }
};

// ============================================
// STATE MANAGEMENT
// ============================================

let openItems = {};
let contentHeights = {};

// ============================================
// INITIALIZATION
// ============================================

$w.onReady(function () {
    console.log('=== ACCORDION (LAYOUT OPTIMIZED) INITIALIZING ===');
    console.log('Options:', accordionConfig.options);

    // Initialize each accordion item
    accordionConfig.items.forEach((item, index) => {
        initializeItem(item, index);
    });

    console.log('=== ACCORDION READY ===');
    console.log('All headers should be aligned left and evenly spaced');
});

function initializeItem(item, index) {
    try {
        console.log(`\nInitializing item ${item.id}:`);

        // Get the elements
        const header = $w(`#${item.header}`);
        const content = $w(`#${item.content}`);

        console.log(`  Header: ${item.header}`);
        console.log(`  Content: ${item.content}`);

        // Store the content's full height when visible
        contentHeights[item.id] = content.height;
        console.log(`  Content height: ${contentHeights[item.id]}px`);

        // Initialize state
        const shouldBeOpen = index === accordionConfig.options.defaultOpenIndex;
        openItems[item.id] = shouldBeOpen;

        // Set initial visibility and collapse state
        if (shouldBeOpen) {
            content.show();
            content.collapsed = false;
            console.log(`  ✓ Content shown (default open)`);
        } else {
            content.hide();
            content.collapsed = true;
            console.log(`  ✓ Content hidden`);
        }

        // Update header icon
        updateHeaderIcon(header, shouldBeOpen);

        // Add click handler
        header.onClick(() => {
            console.log(`\n=== CLICKED: ${item.header} ===`);
            handleClick(item);
        });

        // Style header for better UX
        header.onMouseIn(() => {
            if (header.style) {
                header.style.cursor = 'pointer';
            }
        });

        console.log(`  ✓ Item ${item.id} initialized successfully`);

    } catch (error) {
        console.error(`\n✗ ERROR initializing item ${item.id}:`, error.message);
        console.error('  Make sure element IDs match exactly (case-sensitive)');
    }
}

// ============================================
// CLICK HANDLING
// ============================================

function handleClick(item) {
    const isCurrentlyOpen = openItems[item.id];
    console.log(`  Current state: ${isCurrentlyOpen ? 'OPEN' : 'CLOSED'}`);

    // Close all others if allowMultipleOpen is false
    if (!accordionConfig.options.allowMultipleOpen && !isCurrentlyOpen) {
        console.log(`  Closing other items...`);
        closeAllExcept(item.id);
    }

    // Toggle this item
    if (isCurrentlyOpen) {
        closeItem(item);
    } else {
        openItem(item);
    }
}

function openItem(item) {
    try {
        const header = $w(`#${item.header}`);
        const content = $w(`#${item.content}`);

        console.log(`  Opening item ${item.id}...`);

        // Show the content
        content.show();
        content.collapsed = false;
        openItems[item.id] = true;

        // Update icon
        updateHeaderIcon(header, true);

        console.log(`  ✓ Item ${item.id} OPENED`);
        console.log(`  Content is now visible`);

    } catch (error) {
        console.error(`  ✗ Error opening item ${item.id}:`, error.message);
    }
}

function closeItem(item) {
    try {
        const header = $w(`#${item.header}`);
        const content = $w(`#${item.content}`);

        console.log(`  Closing item ${item.id}...`);

        // Hide the content
        content.hide();
        content.collapsed = true;
        openItems[item.id] = false;

        // Update icon
        updateHeaderIcon(header, false);

        console.log(`  ✓ Item ${item.id} CLOSED`);
        console.log(`  Content is now hidden`);

    } catch (error) {
        console.error(`  ✗ Error closing item ${item.id}:`, error.message);
    }
}

function closeAllExcept(exceptId) {
    accordionConfig.items.forEach(item => {
        if (item.id !== exceptId && openItems[item.id]) {
            console.log(`  Closing item ${item.id}`);
            closeItem(item);
        }
    });
}

// ============================================
// ICON MANAGEMENT
// ============================================

function updateHeaderIcon(header, isOpen) {
    try {
        // Only update if header has text property
        if (header.text !== undefined) {
            const icon = isOpen ? accordionConfig.options.closeIcon : accordionConfig.options.openIcon;

            // Remove any existing icons and add new one
            let baseText = header.text
                .replace(/\s*\+\s*$/, '')
                .replace(/\s*−\s*$/, '')
                .replace(/\s*-\s*$/, '')
                .replace(/\s*\▼\s*$/, '')
                .replace(/\s*\▶\s*$/, '')
                .trim();

            header.text = `${baseText} ${icon}`;
        }
    } catch (error) {
        console.error(`  Error updating icon:`, error.message);
    }
}

// ============================================
// LAYOUT HELPER FUNCTIONS
// ============================================

/**
 * Check and log current layout positions
 * Useful for debugging alignment issues
 */
export function debugLayout() {
    console.log('\n=== LAYOUT DEBUG ===');

    accordionConfig.items.forEach(item => {
        try {
            const header = $w(`#${item.header}`);
            const content = $w(`#${item.content}`);

            console.log(`\nItem ${item.id}:`);
            console.log(`  Header X: ${header.x}px, Y: ${header.y}px, Width: ${header.width}px, Height: ${header.height}px`);
            console.log(`  Content X: ${content.x}px, Y: ${content.y}px, Width: ${content.width}px, Height: ${content.height}px`);
            console.log(`  Content visible: ${!content.hidden}, collapsed: ${content.collapsed}`);
        } catch (error) {
            console.error(`  Error getting layout for item ${item.id}:`, error.message);
        }
    });

    console.log('\n=== Layout Debug Tips ===');
    console.log('- All headers should have same X position for left alignment');
    console.log('- Content should be hidden when closed (visible: false)');
    console.log('- Check Y positions for proper vertical spacing');
}

/**
 * Reset all alignment to left
 * Call this if elements become misaligned
 */
export function alignAllLeft() {
    console.log('\n=== ALIGNING ALL ELEMENTS LEFT ===');

    let minX = 999999;

    // Find the leftmost position
    accordionConfig.items.forEach(item => {
        try {
            const header = $w(`#${item.header}`);
            if (header.x < minX) minX = header.x;
        } catch (error) {
            // Skip if element not found
        }
    });

    console.log(`Aligning to X position: ${minX}px`);

    // Align all headers and content to that position
    accordionConfig.items.forEach(item => {
        try {
            const header = $w(`#${item.header}`);
            const content = $w(`#${item.content}`);

            header.x = minX;
            content.x = minX;

            console.log(`  ✓ Aligned item ${item.id}`);
        } catch (error) {
            console.error(`  ✗ Error aligning item ${item.id}:`, error.message);
        }
    });

    console.log('=== ALIGNMENT COMPLETE ===');
}

// ============================================
// PUBLIC API
// ============================================

export function openAccordionById(itemId) {
    console.log(`\nAPI: Opening item ${itemId}`);
    const item = accordionConfig.items.find(i => i.id === itemId);
    if (item && !openItems[itemId]) {
        openItem(item);
    }
}

export function closeAccordionById(itemId) {
    console.log(`\nAPI: Closing item ${itemId}`);
    const item = accordionConfig.items.find(i => i.id === itemId);
    if (item && openItems[itemId]) {
        closeItem(item);
    }
}

export function openAll() {
    console.log('\nAPI: Opening all items');
    accordionConfig.items.forEach(item => {
        if (!openItems[item.id]) {
            openItem(item);
        }
    });
}

export function closeAll() {
    console.log('\nAPI: Closing all items');
    accordionConfig.items.forEach(item => {
        if (openItems[item.id]) {
            closeItem(item);
        }
    });
}

export function toggleItem(itemId) {
    console.log(`\nAPI: Toggling item ${itemId}`);
    const item = accordionConfig.items.find(i => i.id === itemId);
    if (item) {
        handleClick(item);
    }
}

export function getState() {
    return {
        openItems: openItems,
        contentHeights: contentHeights
    };
}
