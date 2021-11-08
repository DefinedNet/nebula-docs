export class Toggler {
  constructor(buttonSelector) {
    this.isOpen = false;
    this.timeoutId = null;
    this.toggleButton = document.querySelector(buttonSelector);
    const menuId = this.toggleButton.getAttribute("aria-controls");
    this.menu = document.querySelector(`#${menuId}`);
    document.addEventListener("click", this.handleNavToggle.bind(this));
  }

  handleNavToggle(e) {
    if (this.toggleButton.contains(e.target)) {
      this.toggleOpen();
    } else if (this.isOpen && !this.menu.contains(event.target)) {
      this.closeMenu();
    }
  }

  toggleOpen() {
    if (!this.isOpen) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  openMenu() {
    this.isOpen = true;
    clearTimeout(this.timeoutId);
    this.toggleButton.setAttribute("aria-expanded", "true");
    this.menu.classList.remove("collapse");
    this.menu.classList.add("collapsing", "show");
    this.menu.style.height = `${this.menu.scrollHeight}px`;
    this.timeoutId = setTimeout(() => {
      this.menu.style.height = "";
      this.menu.classList.remove("collapsing");
      this.menu.classList.add("collapse");
    }, 250);
  }

  closeMenu() {
    this.isOpen = false;
    clearTimeout(this.timeoutId);
    this.toggleButton.setAttribute("aria-expanded", "false");
    this.menu.style.height = `${this.menu.getBoundingClientRect().height}px`;
    // Cause reflow
    this.menu.offsetHeight;
    this.menu.classList.remove("show", "collapse");
    this.menu.classList.add("collapsing");
    this.menu.style.height = "";
    this.timeoutId = setTimeout(() => {
      this.menu.classList.remove("collapsing");
      this.menu.classList.add("collapse");
    }, 250);
  }
}
