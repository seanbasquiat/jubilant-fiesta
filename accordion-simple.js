/**
 * Simple Wix Velo Accordion - Minimal Version with Debug Logging
 *
 * SETUP:
 * 1. Create elements with these IDs:
 *    - accordionHeader1, accordionContent1
 *    - accordionHeader2, accordionContent2
 *    - accordionHeader3, accordionContent3
 *
 * 2. Elements MUST be:
 *    - Headers: Text or Button elements
 *    - Content: Box (Container) elements
 *
 * 3. Copy this code to your page
 * 4. Customize the items array below
 * 5. Press F12 in preview to see debug messages
 */

// Define your accordion items - UPDATE THESE IDs TO MATCH YOUR ELEMENTS
const items = [
    { header: 'accordionHeader1', content: 'accordionContent1' },
    { header: 'accordionHeader2', content: 'accordionContent2' },
    { header: 'accordionHeader3', content: 'accordionContent3' }
];

let openItem = null;

$w.onReady(function () {
    console.log('Simple Accordion: Starting...');

    // Initialize each item
    items.forEach((item, index) => {
        try {
            console.log(`Setting up item ${index + 1}: ${item.header} / ${item.content}`);

            const header = $w(`#${item.header}`);
            const content = $w(`#${item.content}`);

            console.log(`  - Found elements for item ${index + 1}`);

            // Initially collapse all content
            content.collapse();

            // Add click handler
            header.onClick(() => {
                console.log(`Clicked: ${item.header} (item ${index + 1})`);

                const isOpen = openItem === index;

                // Close currently open item
                if (openItem !== null && openItem !== index) {
                    console.log(`  - Closing previously open item ${openItem + 1}`);
                    $w(`#${items[openItem].content}`).collapse();
                }

                // Toggle current item
                if (isOpen) {
                    console.log(`  - Closing item ${index + 1}`);
                    content.collapse();
                    openItem = null;
                } else {
                    console.log(`  - Opening item ${index + 1}`);
                    content.expand();
                    openItem = index;
                }
            });

            console.log(`✓ Item ${index + 1} initialized successfully`);

        } catch (error) {
            console.error(`✗ ERROR setting up item ${index + 1}:`, error);
            console.error('  Check that element IDs match exactly (case-sensitive)');
        }
    });

    console.log('Simple Accordion: Ready!');
});
