/**
 * Wix Velo Accordion - LEGACY WIX EDITOR VERSION
 *
 * This version is specifically designed for Legacy Wix Editor (Classic Editor)
 *
 * CRITICAL SETUP FOR LEGACY WIX:
 *
 * 1. HEADERS (Text or Button elements):
 *    - IDs: accordionHeader1, accordionHeader2, accordionHeader3
 *    - Position: All must have SAME "Left" value (e.g., 100px)
 *    - Spacing: Set Top values with small gaps between (e.g., 15px)
 *
 * 2. CONTENT BOXES (Box/Container elements):
 *    - IDs: accordionContent1, accordionContent2, accordionContent3
 *    - Position Mode: MUST BE SET TO "FIXED POSITION" (not Float!)
 *      * This is crucial in Legacy Wix so hidden content doesn't leave empty space
 *      * How to set: Click box → Top toolbar → Pin icon → "Fix position" OR
 *      * Right-click → Pin to Screen → Fixed Position
 *    - Position: All must have SAME "Left" value as headers
 *    - Position each content directly below its header (Top = header Top + header height)
 *    - Initial state: VISIBLE in editor (code will hide them)
 *
 * 3. VERIFY SETUP:
 *    - In Legacy Editor, manually hide a content box (eye icon)
 *    - Check if space disappears - if NO, box is in Float mode (change to Fixed!)
 *    - If YES, you're good to go!
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
        allowMultipleOpen: false,    // Allow multiple sections open at once
        defaultOpenIndex: null,      // Index to open by default (null = all closed)
        openIcon: '+',              // Icon when closed
        closeIcon: '−',             // Icon when open
        showIcons: true,            // Show +/- icons in headers
        debugMode: true             // Show detailed console logs
    }
};

// ============================================
// STATE
// ============================================

let openItems = {};

// ============================================
// INITIALIZATION
// ============================================

$w.onReady(function () {
    logDebug('=== ACCORDION FOR LEGACY WIX - STARTING ===');
    logDebug('Initializing ' + accordionConfig.items.length + ' accordion items...');

    // Run setup diagnostics
    runDiagnostics();

    // Initialize each item
    accordionConfig.items.forEach((item, index) => {
        initializeItem(item, index);
    });

    logDebug('=== ACCORDION READY ===');
    logDebug('Try clicking the headers to expand/collapse!');
});

function initializeItem(item, index) {
    try {
        logDebug('\n--- Initializing Item ' + item.id + ' ---');

        // Get elements
        const header = $w('#' + item.header);
        const content = $w('#' + item.content);

        logDebug('Header: ' + item.header);
        logDebug('Content: ' + item.content);

        // Log positions (helpful for debugging alignment)
        if (accordionConfig.options.debugMode) {
            logDebug('Header position - Left: ' + header.x + 'px, Top: ' + header.y + 'px');
            logDebug('Content position - Left: ' + content.x + 'px, Top: ' + content.y + 'px');

            // Check alignment
            if (Math.abs(header.x - content.x) > 2) {
                logDebug('⚠️  WARNING: Header and content have different Left positions!');
                logDebug('   Header Left: ' + header.x + 'px, Content Left: ' + content.x + 'px');
                logDebug('   They should be the same for proper alignment.');
            }
        }

        // Set initial state
        const shouldBeOpen = index === accordionConfig.options.defaultOpenIndex;
        openItems[item.id] = shouldBeOpen;

        // Show or hide content
        if (shouldBeOpen) {
            content.show();
            logDebug('Status: OPEN (default)');
        } else {
            content.hide();
            logDebug('Status: CLOSED');
        }

        // Update icon
        if (accordionConfig.options.showIcons) {
            updateIcon(header, shouldBeOpen);
        }

        // Add click handler
        header.onClick(() => {
            logDebug('\n=== CLICK: ' + item.header + ' ===');
            handleClick(item);
        });

        // Make header look clickable
        header.onMouseIn(() => {
            if (header.style) {
                header.style.cursor = 'pointer';
            }
        });

        logDebug('✓ Item ' + item.id + ' initialized successfully');

    } catch (error) {
        console.error('✗ ERROR initializing item ' + item.id + ':', error);
        console.error('Make sure element ID "' + item.header + '" and "' + item.content + '" exist!');
    }
}

// ============================================
// CLICK HANDLING
// ============================================

function handleClick(item) {
    const isOpen = openItems[item.id];

    logDebug('Current state: ' + (isOpen ? 'OPEN' : 'CLOSED'));

    // Close others if needed
    if (!accordionConfig.options.allowMultipleOpen && !isOpen) {
        closeAllExcept(item.id);
    }

    // Toggle this item
    if (isOpen) {
        closeItem(item);
    } else {
        openItem(item);
    }
}

function openItem(item) {
    try {
        const header = $w('#' + item.header);
        const content = $w('#' + item.content);

        logDebug('Opening item ' + item.id + '...');

        // Show content
        content.show();
        openItems[item.id] = true;

        // Update icon
        if (accordionConfig.options.showIcons) {
            updateIcon(header, true);
        }

        logDebug('✓ Item ' + item.id + ' is now OPEN');
        logDebug('  Content should be visible below the header');

    } catch (error) {
        console.error('✗ Error opening item ' + item.id + ':', error);
    }
}

function closeItem(item) {
    try {
        const header = $w('#' + item.header);
        const content = $w('#' + item.content);

        logDebug('Closing item ' + item.id + '...');

        // Hide content
        content.hide();
        openItems[item.id] = false;

        // Update icon
        if (accordionConfig.options.showIcons) {
            updateIcon(header, false);
        }

        logDebug('✓ Item ' + item.id + ' is now CLOSED');
        logDebug('  Content should be hidden (no space taken)');

    } catch (error) {
        console.error('✗ Error closing item ' + item.id + ':', error);
    }
}

function closeAllExcept(exceptId) {
    accordionConfig.items.forEach(item => {
        if (item.id !== exceptId && openItems[item.id]) {
            logDebug('Closing item ' + item.id);
            closeItem(item);
        }
    });
}

// ============================================
// ICON MANAGEMENT
// ============================================

function updateIcon(header, isOpen) {
    try {
        if (header.text !== undefined) {
            const icon = isOpen ? accordionConfig.options.closeIcon : accordionConfig.options.openIcon;

            // Remove existing icons
            let baseText = header.text
                .replace(/\s*[\+\−\-\▼\▶]\s*$/g, '')
                .trim();

            header.text = baseText + ' ' + icon;
        }
    } catch (error) {
        console.error('Error updating icon:', error);
    }
}

// ============================================
// DIAGNOSTICS (LEGACY WIX SPECIFIC)
// ============================================

function runDiagnostics() {
    if (!accordionConfig.options.debugMode) return;

    logDebug('\n=== RUNNING LEGACY WIX DIAGNOSTICS ===');

    try {
        // Check all headers are aligned
        let headerPositions = [];

        accordionConfig.items.forEach(item => {
            try {
                const header = $w('#' + item.header);
                const content = $w('#' + item.content);

                headerPositions.push({
                    id: item.id,
                    headerLeft: header.x,
                    contentLeft: content.x
                });
            } catch (e) {
                // Skip if element not found
            }
        });

        // Check alignment
        if (headerPositions.length > 1) {
            const firstHeaderLeft = headerPositions[0].headerLeft;
            const firstContentLeft = headerPositions[0].contentLeft;

            let allHeadersAligned = true;
            let allContentAligned = true;

            headerPositions.forEach(pos => {
                if (Math.abs(pos.headerLeft - firstHeaderLeft) > 2) {
                    allHeadersAligned = false;
                    logDebug('⚠️  Header ' + pos.id + ' is misaligned!');
                    logDebug('   Expected Left: ' + firstHeaderLeft + 'px, Actual: ' + pos.headerLeft + 'px');
                }

                if (Math.abs(pos.contentLeft - firstContentLeft) > 2) {
                    allContentAligned = false;
                    logDebug('⚠️  Content ' + pos.id + ' is misaligned!');
                    logDebug('   Expected Left: ' + firstContentLeft + 'px, Actual: ' + pos.contentLeft + 'px');
                }
            });

            if (allHeadersAligned && allContentAligned) {
                logDebug('✓ All elements are properly aligned');
            } else {
                logDebug('\n⚠️  ALIGNMENT ISSUES DETECTED!');
                logDebug('   Fix: In Legacy Wix Editor, select misaligned elements');
                logDebug('   and set their Left position to match the others.');
            }
        }

        logDebug('\n💡 TIP: If you see empty spaces when content is hidden,');
        logDebug('   make sure content boxes are set to FIXED POSITION mode');
        logDebug('   (not Float mode) in Legacy Wix Editor.');

    } catch (error) {
        logDebug('Could not run full diagnostics: ' + error.message);
    }

    logDebug('=== DIAGNOSTICS COMPLETE ===\n');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function logDebug(message) {
    if (accordionConfig.options.debugMode) {
        console.log(message);
    }
}

// ============================================
// PUBLIC API
// ============================================

export function openAccordionById(itemId) {
    logDebug('\nAPI: Opening item ' + itemId);
    const item = accordionConfig.items.find(i => i.id === itemId);
    if (item && !openItems[itemId]) {
        openItem(item);
    }
}

export function closeAccordionById(itemId) {
    logDebug('\nAPI: Closing item ' + itemId);
    const item = accordionConfig.items.find(i => i.id === itemId);
    if (item && openItems[itemId]) {
        closeItem(item);
    }
}

export function openAll() {
    logDebug('\nAPI: Opening all items');
    accordionConfig.items.forEach(item => {
        if (!openItems[item.id]) {
            openItem(item);
        }
    });
}

export function closeAll() {
    logDebug('\nAPI: Closing all items');
    accordionConfig.items.forEach(item => {
        if (openItems[item.id]) {
            closeItem(item);
        }
    });
}

export function getState() {
    return openItems;
}

export function showDiagnostics() {
    runDiagnostics();
}

/**
 * LEGACY WIX POSITION HELPER
 * Call this from console to see all element positions
 */
export function showPositions() {
    console.log('\n=== ELEMENT POSITIONS ===\n');

    accordionConfig.items.forEach(item => {
        try {
            const header = $w('#' + item.header);
            const content = $w('#' + item.content);

            console.log('Item ' + item.id + ':');
            console.log('  ' + item.header + ':');
            console.log('    Left: ' + header.x + 'px, Top: ' + header.y + 'px');
            console.log('    Width: ' + header.width + 'px, Height: ' + header.height + 'px');
            console.log('  ' + item.content + ':');
            console.log('    Left: ' + content.x + 'px, Top: ' + content.y + 'px');
            console.log('    Width: ' + content.width + 'px, Height: ' + content.height + 'px');
            console.log('    Hidden: ' + content.hidden);
            console.log('');
        } catch (e) {
            console.error('  Error reading item ' + item.id);
        }
    });

    console.log('=== END POSITIONS ===\n');
}
