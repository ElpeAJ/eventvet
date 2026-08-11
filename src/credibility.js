 /**
 * Credibility Dashboard Interactivity Controller
 */
document.addEventListener('DOMContentLoaded', () => {
  const dropdownContainers = Array.from(document.querySelectorAll('.dropdown'));
  const filterFormContainer = document.getElementById('filter-form');

  /**
   * Universal clean state modifier. Removes active configurations from panel items.
   */
  function closeAllDropdownPanels() {
    dropdownContainers.forEach(container => {
      container.classList.remove('open');
      const interactiveButton = container.querySelector('.dropdown-toggle');
      if (interactiveButton) {
        interactiveButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Bind mouse-driven dynamic visibility toggles directly onto selection buttons
  dropdownContainers.forEach(container => {
    const triggerButton = container.querySelector('.dropdown-toggle');
    if (!triggerButton) return;

    triggerButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Restricts bubbling anomalies down to document root level
      
      const panelCurrentlyActive = container.classList.contains('open');
      
      // Clear out alternate selection overlays first to prevent side-by-side overlaps
      closeAllDropdownPanels();

      if (!panelCurrentlyActive) {
        container.classList.add('open');
        triggerButton.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Track field state alterations. Form auto-submits metrics when flags switch.
  if (filterFormContainer) {
    filterFormContainer.querySelectorAll('input').forEach(inputField => {
      inputField.addEventListener('change', () => {
        console.log("Filter parameters altered. Fetching query matches...");
        // filterFormContainer.submit(); // Toggle operational when database endpoints open
      });
    });
  }

  // Dismiss target overlays when a click drops outside the filter list panel grid
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown')) {
      closeAllDropdownPanels();
    }
  });

  // Keyboard accessibility hook: Instantly flush open selections via the Escape bind
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAllDropdownPanels();
    }
  });
});

  