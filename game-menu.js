/* Keep the menu clear of controls without resizing or moving a game. */
(() => {
  'use strict';
  const link = document.getElementById('game-menu-link');
  if (!link) return;

  const blockers = [
    'button', 'input', 'select', 'textarea', 'label', 'a', '[role="button"]',
    '.top-controls', '.topBar', '.bottomBar', '.controller', '.max-container',
    '.pedal', '.lever', '.knob', '.reset', '.thumb-container', '.unit',
    '.value.dropzone', '.draggable-tile', '.dial', '.label', '.maxRow', '.progress', '.subtitle', '.sub'
  ].join(',');

  // A menu tap must not also reach a game's global touch/drag/keyboard handler.
  // Keep the link's native navigation and accessibility behavior.
  ['pointerdown', 'pointerup', 'pointermove', 'mousedown', 'mouseup',
    'touchstart', 'touchend', 'touchmove', 'click', 'keydown', 'keyup'].forEach(type => {
    link.addEventListener(type, event => event.stopPropagation());
  });

  function placeMenu() {
    const viewport = window.visualViewport;
    const scale = Math.max(1, 1 / (viewport ? viewport.scale : 1));
    // Older games intentionally lack a viewport meta tag. Keep their layout,
    // but compensate for the initial mobile scale on this one link.
    link.style.transform = `scale(${scale})`;
    const style = getComputedStyle(link);
    const safe = side => parseFloat(style.getPropertyValue(`--menu-safe-${side}`)) || 0;
    const gap = 10 * scale;
    const padding = 6 * scale;
    const width = 78 * scale;
    const height = 44 * scale;
    const left = (viewport ? viewport.offsetLeft : 0) + safe('left') + gap;
    const top = (viewport ? viewport.offsetTop : 0) + safe('top') + gap;
    const right = (viewport ? viewport.offsetLeft + viewport.width : document.documentElement.clientWidth) - safe('right') - gap - width;
    const bottom = (viewport ? viewport.offsetTop + viewport.height : document.documentElement.clientHeight) - safe('bottom') - gap - height;
    const rectangles = [];

    function addRect(rect) {
      if (rect.width > 0 && rect.height > 0 && rect.bottom > top && rect.top < bottom + height) rectangles.push(rect);
    }
    document.querySelectorAll(blockers).forEach(element => {
      if (element === link || link.contains(element)) return;
      const css = getComputedStyle(element);
      if (css.display !== 'none' && css.visibility !== 'hidden') addRect(element.getBoundingClientRect());
    });
    // Protect heading text, rather than the unused full width of a heading.
    document.querySelectorAll('h1, h2, h3').forEach(element => {
      if (getComputedStyle(element).visibility === 'hidden') return;
      const range = document.createRange();
      range.selectNodeContents(element);
      Array.from(range.getClientRects()).forEach(addRect);
    });

    const xs = link.dataset.menuSide === 'right' ? [right, left] : [left, right];
    const ys = [top, ...rectangles.map(rect => rect.bottom + padding)].filter(y => y >= top && y <= bottom);
    ys.sort((a, b) => a - b);
    ys.push(Math.max(top, bottom));
    let best = null;
    for (const y of ys) {
      for (const x of xs) {
        let overlap = 0;
        for (const rect of rectangles) {
          const dx = Math.max(0, Math.min(x + width + padding, rect.right) - Math.max(x - padding, rect.left));
          const dy = Math.max(0, Math.min(y + height + padding, rect.bottom) - Math.max(y - padding, rect.top));
          overlap += dx * dy;
        }
        if (!best || overlap < best.overlap) best = { x, y, overlap };
        if (!overlap) break;
      }
      if (best && !best.overlap) break;
    }
    link.style.left = `${Math.max(left, best.x)}px`;
    link.style.top = `${best.y}px`;
    link.style.right = 'auto';
  }

  let pending = false;
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; placeMenu(); });
  }
  placeMenu();
  window.addEventListener('load', schedule);
  window.addEventListener('resize', schedule);
  window.addEventListener('scroll', schedule, { passive: true });
  document.addEventListener('scroll', schedule, { passive: true, capture: true });
  document.addEventListener('click', schedule);
  document.addEventListener('change', schedule);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', schedule);
    window.visualViewport.addEventListener('scroll', schedule);
  }
  if (document.fonts) document.fonts.ready.then(schedule);
  if (window.ResizeObserver) {
    const observer = new ResizeObserver(schedule);
    document.querySelectorAll('.top-controls, .topBar, .bottomBar, .controller, header').forEach(element => observer.observe(element));
  }
})();
