function ShellacInit() {
  const codeSelector = 'mjx-container[role="application"][data-shellac]';
  const nav = '[role="application"][data-shellac],[role="tree"],[role="group"],[role="treeitem"]';
  function isCodeBlock(el) {
    return el.matches(codeSelector);
  }

  function click(snippet, e) {
    const clicked = e.target.closest(nav);
    if (snippet.contains(clicked)) {
      const prev = snippet.querySelector('[tabindex="0"][role="tree"],[tabindex="0"][role="group"],[tabindex="0"][role="treeitem"]');
      if (prev) {
        prev.removeAttribute("tabindex");
      }
      clicked.setAttribute("tabindex", "0");
      clicked.focus();
      e.preventDefault();
    }
  }

  function move(e) {
    
    function nextFocus() {
      function nextSibling(el) {
        const sib = el.nextElementSibling;
        if (sib) {
	  if (sib.matches(nav)) {
            return sib;
	  } else {
            const sibChild = sib.querySelector(nav);
            return sibChild ?? nextSibling(sib);
	  }
        } else {
	  if (!isCodeBlock(el) && !el.parentElement.matches(nav)) {
            return nextSibling(el.parentElement);
	  } else {
            return null;
	  }
        }
      }

      function prevSibling(el) {
        const sib = el.previousElementSibling;
        if (sib) {
	  if (sib.matches(nav)) {
            return sib;
	  } else {
            const sibChild = sib.querySelector(nav);
            return sibChild ?? prevSibling(sib);
	  }
        } else {
	  if (!isCodeBlock(el) && !el.parentElement.matches(nav)) {
            return prevSibling(el.parentElement);
	  } else {
            return null;
	  }
        }
      }

      switch (event.key) {
      case "ArrowDown":
        e.preventDefault();
        return e.target.querySelector(nav);
      case "ArrowUp":
        e.preventDefault();
        return e.target.parentElement.closest(nav);
      case "ArrowLeft":
        e.preventDefault();
        return prevSibling(e.target);
      case "ArrowRight":
        e.preventDefault();
        return nextSibling(e.target);
      default:
        return;
      }
    }

    const next = nextFocus();

    if (next) {
      e.target.removeAttribute("tabindex");
      next.setAttribute("tabindex", "0");
      next.focus();
    }
  }

  const codeSnippets = document.querySelectorAll(codeSelector);
  codeSnippets.forEach((snippet) => {
    snippet.addEventListener('keydown', move);
    snippet.addEventListener('click', (e) => click(snippet, e));
  });
}
document.addEventListener('DOMContentLoaded', ShellacInit);
