/**
 * Wix Velo Collapsible Accordion - WORKING VERSION
 *
 * SETUP INSTRUCTIONS:
 * 1. In Wix Editor, add these elements for EACH accordion item:
 *    - Text or Button for header (ID: accordionHeader1, accordionHeader2, etc.)
 *    - Box (Container) for content (ID: accordionContent1, accordionContent2, etc.)
 *
 * 2. IMPORTANT: For each content box:
 *    - Make sure it's a "Box" element (not a strip or column)
 *    - Set initial height to your desired expanded height
 *    - The box will be collapsed automatically on page load
 *
 * 3. Update the CONFIGURATION section below with your element IDs
 * 4. Check browser console (F12) for debug messages
 */

// ============================================
// CONFIGURATION - UPDATE THIS
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
        allowMultipleOpen: false,    // Set to true to allow multiple sections open
        defaultOpenIndex: null,      // Set to 0 to open first item by default (or null for all closed)
        animationDuration: 400       // Animation speed in milliseconds
    }
};

// ============================================
// STATE MANAGEMENT
// ============================================

let openItems = new Set();

// ============================================
// INITIALIZATION
// ============================================

$w.onReady(function () {
    console.log('=== ACCORDION STARTING ===');
    console.log('Config:', accordionConfig);

    // Initialize each accordion item
    accordionConfig.items.forEach((item, index) => {
        initializeItem(item, index);
    });

    console.log('=== ACCORDION INITIALIZED ===');
});

function initializeItem(item, index) {
    try {
        console.log(`Initializing item ${item.id}...`);

        // Get elements
        const header = $w(`#${item.header}`);
        const content = $w(`#${item.content}`);

        console.log(`- Found header: ${item.header}`, header);
        console.log(`- Found content: ${item.content}`, content);

        // Set initial state
        const shouldBeOpen = index === accordionConfig.options.defaultOpenIndex;

        if (shouldBeOpen) {
            content.expand();
            openItems.add(item.id);
            console.log(`- Item ${item.id} set to OPEN by default`);
        } else {
            content.collapse();
            console.log(`- Item ${item.id} set to COLLAPSED by default`);
        }

        // Add click handler
        header.onClick(() => {
            console.log(`=== CLICKED: ${item.header} (ID: ${item.id}) ===`);
            handleClick(item);
        });

        // Make header look clickable
        header.onMouseIn(() => {
            if (header.style) {
                header.style.cursor = 'pointer';
            }
        });

        console.log(`✓ Item ${item.id} initialized successfully`);

    } catch (error) {
        console.error(`✗ ERROR initializing item ${item.id}:`, error);
        console.error('Make sure element IDs match exactly (case-sensitive)');
    }
}

// ============================================
// CLICK HANDLING
// ============================================

function handleClick(item) {
    const isCurrentlyOpen = openItems.has(item.id);
    console.log(`Current state: ${isCurrentlyOpen ? 'OPEN' : 'CLOSED'}`);

    // If not allowing multiple open, close all others first
    if (!accordionConfig.options.allowMultipleOpen && !isCurrentlyOpen) {
        console.log('Closing other items...');
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
        const content = $w(`#${item.content}`);

        console.log(`Opening item ${item.id}...`);
        content.expand();
        openItems.add(item.id);

        console.log(`✓ Item ${item.id} opened`);

    } catch (error) {
        console.error(`✗ ERROR opening item ${item.id}:`, error);
    }
}

function closeItem(item) {
    try {
        const content = $w(`#${item.content}`);

        console.log(`Closing item ${item.id}...`);
        content.collapse();
        openItems.delete(item.id);

        console.log(`✓ Item ${item.id} closed`);

    } catch (error) {
        console.error(`✗ ERROR closing item ${item.id}:`, error);
    }
}

function closeAllExcept(exceptId) {
    accordionConfig.items.forEach(item => {
        if (item.id !== exceptId && openItems.has(item.id)) {
            closeItem(item);
        }
    });
}

// ============================================
// PUBLIC API (Optional)
// ============================================

export function openAccordionById(itemId) {
    const item = accordionConfig.items.find(i => i.id === itemId);
    if (item && !openItems.has(itemId)) {
        openItem(item);
    }
}

export function closeAccordionById(itemId) {
    const item = accordionConfig.items.find(i => i.id === itemId);
    if (item && openItems.has(itemId)) {
        closeItem(item);
    }
}

export function openAll() {
    console.log('Opening all items...');
    accordionConfig.items.forEach(item => {
        if (!openItems.has(item.id)) {
            openItem(item);
        }
    });
}

export function closeAll() {
    console.log('Closing all items...');
    accordionConfig.items.forEach(item => {
        if (openItems.has(item.id)) {
            closeItem(item);
        }
    });
}

export function getOpenItems() {
    return Array.from(openItems);
}
