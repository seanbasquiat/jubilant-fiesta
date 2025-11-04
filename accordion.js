/**
 * Wix Velo Collapsible Accordion Element
 *
 * This code creates a fully functional collapsible accordion on your Wix page.
 *
 * SETUP INSTRUCTIONS:
 * 1. In Wix Editor, add the following elements for each accordion item:
 *    - Container Box (e.g., "accordionItem1")
 *    - Button or Text element for the header (e.g., "accordionHeader1")
 *    - Container Box for the content (e.g., "accordionContent1")
 *
 * 2. Configure the accordion items in the CONFIGURATION section below
 * 3. Copy this code to your page's code panel (Page Code section)
 */

import wixWindow from 'wix-window';
import wixAnimations from 'wix-animations';

// ============================================
// CONFIGURATION - Customize your accordion here
// ============================================

const accordionConfig = {
    // Define your accordion items here
    items: [
        {
            id: 1,
            header: 'accordionHeader1',      // ID of the header button/text
            content: 'accordionContent1',     // ID of the content container
            container: 'accordionItem1'       // ID of the entire item container (optional)
        },
        {
            id: 2,
            header: 'accordionHeader2',
            content: 'accordionContent2',
            container: 'accordionItem2'
        },
        {
            id: 3,
            header: 'accordionHeader3',
            content: 'accordionContent3',
            container: 'accordionItem3'
        }
        // Add more items as needed
    ],

    // Options
    options: {
        allowMultipleOpen: false,         // Allow multiple sections open at once
        animationDuration: 400,           // Animation duration in milliseconds
        defaultOpenIndex: null,           // Index of item to open by default (null = all closed)
        closeIcon: '−',                   // Icon when section is open
        openIcon: '+',                    // Icon when section is closed
        useIcons: true                    // Add +/- icons to headers
    }
};

// ============================================
// ACCORDION STATE MANAGEMENT
// ============================================

let accordionState = {};

// Initialize state for each accordion item
accordionConfig.items.forEach((item, index) => {
    accordionState[item.id] = {
        isOpen: index === accordionConfig.options.defaultOpenIndex,
        initialHeight: null
    };
});

// ============================================
// PAGE LOAD - Initialize Accordion
// ============================================

$w.onReady(function () {
    console.log('Accordion initializing...');

    // Initialize each accordion item
    accordionConfig.items.forEach((item, index) => {
        initializeAccordionItem(item, index);
    });

    console.log('Accordion initialized successfully');
});

// ============================================
// INITIALIZATION FUNCTIONS
// ============================================

/**
 * Initialize a single accordion item
 */
function initializeAccordionItem(item, index) {
    try {
        const header = $w(`#${item.header}`);
        const content = $w(`#${item.content}`);

        // Store the initial content height
        accordionState[item.id].initialHeight = content.height;

        // Set initial state
        if (accordionState[item.id].isOpen) {
            content.show();
            content.expand();
            if (accordionConfig.options.useIcons) {
                updateHeaderIcon(header, true);
            }
        } else {
            content.collapse();
            setTimeout(() => content.hide(), 50);
            if (accordionConfig.options.useIcons) {
                updateHeaderIcon(header, false);
            }
        }

        // Add click handler
        header.onClick(() => toggleAccordion(item.id));

        // Add hover effects (optional)
        header.onMouseIn(() => {
            header.style.cursor = 'pointer';
        });

        console.log(`Accordion item ${item.id} initialized`);

    } catch (error) {
        console.error(`Error initializing accordion item ${item.id}:`, error);
    }
}

/**
 * Update header icon based on open/closed state
 */
function updateHeaderIcon(header, isOpen) {
    try {
        const icon = isOpen ?
            accordionConfig.options.closeIcon :
            accordionConfig.options.openIcon;

        // If header has text property, append icon
        if (header.text !== undefined) {
            const baseText = header.text.replace(/\s*[+−]\s*$/, '');
            header.text = `${baseText} ${icon}`;
        }
    } catch (error) {
        console.error('Error updating header icon:', error);
    }
}

// ============================================
// ACCORDION TOGGLE FUNCTIONS
// ============================================

/**
 * Toggle accordion item open/closed
 */
function toggleAccordion(itemId) {
    const item = accordionConfig.items.find(i => i.id === itemId);
    if (!item) return;

    const isCurrentlyOpen = accordionState[itemId].isOpen;

    // If not allowing multiple open, close all others
    if (!accordionConfig.options.allowMultipleOpen && !isCurrentlyOpen) {
        closeAllAccordions(itemId);
    }

    // Toggle this accordion
    if (isCurrentlyOpen) {
        closeAccordion(item);
    } else {
        openAccordion(item);
    }
}

/**
 * Open an accordion item with animation
 */
function openAccordion(item) {
    const content = $w(`#${item.content}`);
    const header = $w(`#${item.header}`);

    accordionState[item.id].isOpen = true;

    // Show and animate
    content.show();

    wixAnimations.timeline()
        .add(content, {
            duration: accordionConfig.options.animationDuration,
            height: accordionState[item.id].initialHeight || content.height,
            opacity: 1
        })
        .play();

    // Update icon
    if (accordionConfig.options.useIcons) {
        updateHeaderIcon(header, true);
    }

    console.log(`Accordion ${item.id} opened`);
}

/**
 * Close an accordion item with animation
 */
function closeAccordion(item) {
    const content = $w(`#${item.content}`);
    const header = $w(`#${item.header}`);

    accordionState[item.id].isOpen = false;

    // Animate and hide
    wixAnimations.timeline()
        .add(content, {
            duration: accordionConfig.options.animationDuration,
            height: 0,
            opacity: 0
        })
        .play()
        .then(() => {
            content.hide();
        });

    // Update icon
    if (accordionConfig.options.useIcons) {
        updateHeaderIcon(header, false);
    }

    console.log(`Accordion ${item.id} closed`);
}

/**
 * Close all accordion items except the specified one
 */
function closeAllAccordions(exceptId) {
    accordionConfig.items.forEach(item => {
        if (item.id !== exceptId && accordionState[item.id].isOpen) {
            closeAccordion(item);
        }
    });
}

// ============================================
// PUBLIC API (Optional - for programmatic control)
// ============================================

/**
 * Open a specific accordion item by ID
 */
export function openAccordionById(itemId) {
    const item = accordionConfig.items.find(i => i.id === itemId);
    if (item && !accordionState[itemId].isOpen) {
        toggleAccordion(itemId);
    }
}

/**
 * Close a specific accordion item by ID
 */
export function closeAccordionById(itemId) {
    const item = accordionConfig.items.find(i => i.id === itemId);
    if (item && accordionState[itemId].isOpen) {
        toggleAccordion(itemId);
    }
}

/**
 * Get the current state of all accordion items
 */
export function getAccordionState() {
    return accordionState;
}

/**
 * Open all accordion items
 */
export function openAll() {
    accordionConfig.items.forEach(item => {
        if (!accordionState[item.id].isOpen) {
            openAccordion(item);
        }
    });
}

/**
 * Close all accordion items
 */
export function closeAll() {
    accordionConfig.items.forEach(item => {
        if (accordionState[item.id].isOpen) {
            closeAccordion(item);
        }
    });
}
