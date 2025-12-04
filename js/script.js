/* script.js
   Behavior:
   - Click or Enter on a .box toggles expansion.
   - Clicking a color button changes that box's background color.
   - Only one box expands at a time (like the example video).
*/

(function () {
  const boxes = Array.from(document.querySelectorAll('.box'));

  // Helper to collapse all boxes
  function collapseAll(except) {
    boxes.forEach(b => {
      if (b !== except) {
        b.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Toggle expand for a box
  function toggleBox(box) {
    const expanded = box.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      box.setAttribute('aria-expanded', 'false');
    } else {
      collapseAll(box);
      box.setAttribute('aria-expanded', 'true');
      // focus first option for accessibility
      const firstBtn = box.querySelector('.color-btn');
      if (firstBtn) firstBtn.focus();
    }
  }

  // Setup each box
  boxes.forEach(box => {
    // Click toggles
    box.addEventListener('click', (e) => {
      // If clicked a color button, don't toggle (let color logic run)
      if (e.target.closest('.color-btn')) return;
      toggleBox(box);
    });

    // Keyboard accessibility: Enter or Space toggles
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleBox(box);
      } else if (e.key === 'Escape') {
        box.setAttribute('aria-expanded', 'false');
      }
    });

    // Color buttons within this box
    const colorBtns = Array.from(box.querySelectorAll('.color-btn'));
    colorBtns.forEach(btn => {
      // set the small swatch color using data-color
      const color = btn.dataset.color || '#ffffff';
      btn.style.color = color; // used by ::before (currentColor)

      // When clicked -> change the box background
      btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        // Update the box background (subtle gradient keeps readability)
        box.style.background = `linear-gradient(180deg, ${color}cc, ${color}22 120%)`;
        // mark selected
        colorBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });

      // keyboard activation
      btn.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          btn.click();
        }
      });
    });
  });

  // Click outside any box collapses all (nice UX)
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.box')) {
      collapseAll(null);
    }
  });

})();
