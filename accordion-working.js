/**
 * Wix Velo Accordion - WORKING VERSION (Uses show/hide instead of expand/collapse)
 *
 * IMPORTANT SETUP:
 * 1. For EACH accordion item, create:
 *    - Text or Button element for header (e.g., "accordionHeader1")
 *    - Box (Container) element for content (e.g., "accordionContent1")
 *
 * 2. For EACH content box in Wix Editor:
 *    - Leave it VISIBLE (don't hide it manually)
 *    - Set a fixed height (e.g., 200px)
 *    - Add your content inside
 *
 * 3. Update the configuration below with your element IDs
 * 4. The code will automatically hide content boxes on load
 */

// ============================================
// CONFIGURATION - UPDATE YOUR ELEMENT IDs HERE
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
        allowMultipleOpen: false,    // Set true to allow multiple sections open
        defaultOpenIndex: null,      // Set to 0 for first item open, null for all closed
        openIcon: '+',              // Icon when closed
        closeIcon: '−'              // Icon when open (minus sign)
    }
};

// ============================================
// STATE MANAGEMENT
// ============================================

let openItems = {};

// ============================================
// INITIALIZATION
// ============================================

$w.onReady(function () {
    console.log('=== ACCORDION INITIALIZING ===');

    // Initialize each accordion item
    accordionConfig.items.forEach((item, index) => {
        initializeItem(item, index);
    });

    console.log('=== ACCORDION READY ===');
    console.log('Try clicking the accordion headers!');
});

function initializeItem(item, index) {
    try {
        console.log(`\nSetting up item ${item.id}:`);
        console.log(`  Header ID: ${item.header}`);
        console.log(`  Content ID: ${item.content}`);

        // Get the elements
        const header = $w(`#${item.header}`);
        const content = $w(`#${item.content}`);

        console.log(`  ✓ Elements found`);

        // Initialize state
        const shouldBeOpen = index === accordionConfig.options.defaultOpenIndex;
        openItems[item.id] = shouldBeOpen;

        // Set initial visibility
        if (shouldBeOpen) {
            content.show();
            console.log(`  ✓ Content shown (default open)`);
        } else {
            content.hide();
            console.log(`  ✓ Content hidden`);
        }

        // Update header icon
        updateHeaderIcon(header, shouldBeOpen);

        // Add click handler
        header.onClick(() => {
            console.log(`\n=== CLICKED: ${item.header} ===`);
            handleClick(item);
        });

        // Add hover effect
        header.onMouseIn(() => {
            if (header.style) {
                header.style.cursor = 'pointer';
            }
        });

        console.log(`  ✓ Item ${item.id} initialized successfully!`);

    } catch (error) {
        console.error(`\n✗ ERROR initializing item ${item.id}:`, error.message);
        console.error('Check that element IDs match exactly!');
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
        openItems[item.id] = true;

        // Update icon
        updateHeaderIcon(header, true);

        console.log(`  ✓ Item ${item.id} opened!`);
        console.log(`  Content should now be VISIBLE`);

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
        openItems[item.id] = false;

        // Update icon
        updateHeaderIcon(header, false);

        console.log(`  ✓ Item ${item.id} closed!`);
        console.log(`  Content should now be HIDDEN`);

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

            // Remove any existing icon and add new one
            const baseText = header.text
                .replace(/\s*\+\s*$/, '')  // Remove +
                .replace(/\s*−\s*$/, '')   // Remove −
                .replace(/\s*-\s*$/, '')   // Remove -
                .trim();

            header.text = `${baseText} ${icon}`;
            console.log(`  Icon updated: ${icon}`);
        }
    } catch (error) {
        console.error(`  Error updating icon:`, error.message);
    }
}

// ============================================
// PUBLIC API
// ============================================

export function openAccordionById(itemId) {
    console.log(`API: Opening item ${itemId}`);
    const item = accordionConfig.items.find(i => i.id === itemId);
    if (item && !openItems[itemId]) {
        openItem(item);
    }
}

export function closeAccordionById(itemId) {
    console.log(`API: Closing item ${itemId}`);
    const item = accordionConfig.items.find(i => i.id === itemId);
    if (item && openItems[itemId]) {
        closeItem(item);
    }
}

export function openAll() {
    console.log('API: Opening all items');
    accordionConfig.items.forEach(item => {
        if (!openItems[item.id]) {
            openItem(item);
        }
    });
}

export function closeAll() {
    console.log('API: Closing all items');
    accordionConfig.items.forEach(item => {
        if (openItems[item.id]) {
            closeItem(item);
        }
    });
}

export function toggleItem(itemId) {
    console.log(`API: Toggling item ${itemId}`);
    const item = accordionConfig.items.find(i => i.id === itemId);
    if (item) {
        handleClick(item);
    }
}

export function getState() {
    return openItems;
}
