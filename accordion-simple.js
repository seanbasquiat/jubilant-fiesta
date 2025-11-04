/**
 * Simple Wix Velo Accordion - Minimal Version
 *
 * SETUP:
 * 1. Create elements with these IDs:
 *    - accordionHeader1, accordionContent1
 *    - accordionHeader2, accordionContent2
 *    - accordionHeader3, accordionContent3
 *
 * 2. Copy this code to your page
 * 3. Customize the items array below
 */

// Define your accordion items
const items = [
    { header: 'accordionHeader1', content: 'accordionContent1' },
    { header: 'accordionHeader2', content: 'accordionContent2' },
    { header: 'accordionHeader3', content: 'accordionContent3' }
];

let openItem = null;

$w.onReady(function () {
    // Initialize each item
    items.forEach((item, index) => {
        const header = $w(`#${item.header}`);
        const content = $w(`#${item.content}`);

        // Initially hide all content
        content.collapse();

        // Add click handler
        header.onClick(() => {
            const isOpen = openItem === index;

            // Close currently open item
            if (openItem !== null && openItem !== index) {
                $w(`#${items[openItem].content}`).collapse();
            }

            // Toggle current item
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
