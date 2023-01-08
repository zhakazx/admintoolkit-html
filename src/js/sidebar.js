const sidebar = {
  wrapper: document.querySelector('.wrapper'),
  sidebar: document.querySelector('.sidebar'),
  sidebarMenu: document.querySelector('.sidebar-menu'),
  sidebarToggle: document.querySelector('.sidebar-toggle'),

  init() {
    this.initMenuItems();
    this.initSidebarToggle();
    this.initWrapper();
    this.initOverlay();
    this.handleWindowResize();
    this.initSidebarHover();
  },

  initMenuItems() {
    const menuItems = this.sidebarMenu.querySelectorAll('.sidebar-menu-item');

    menuItems.forEach((menuItem) => {
      const parent = menuItem.parentElement;
      const submenu = parent.querySelector('.sidebar-submenu');
      const arrow = menuItem.querySelector('.sidebar-menu-item--arrow');

      if (submenu) {
        menuItem.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleHeight(submenu, submenu.scrollHeight);
          arrow.classList.toggle('rotate');
        });
      }

      if (submenu && menuItem.classList.contains('active')) {
        this.toggleHeight(submenu, submenu.scrollHeight);
        arrow.classList.toggle('rotate');
      }
    });
  },

  toggleHeight(element, height) {
    if (element.style.height === '0px' || element.style.height === '') {
      element.style.height = `${height}px`;
    } else {
      element.style.height = '0px';
    }
  },

  initSidebarToggle() {
    this.sidebarToggle.addEventListener('click', (e) => {
      this.toggleSidebar();
    });
  },

  toggleSidebar() {
    const windowWidth = window.innerWidth;

    if (windowWidth < 1024) {
      this.sidebar.classList.toggle('expanded');
      document.querySelector('.sidebar-overlay').classList.toggle('active');
    } else {
      this.sidebar.classList.toggle('collapsed');
      this.wrapper.classList.toggle('expanded');
    }
  },

  initWrapper() {
    if (this.sidebar.classList.contains('collapsed')) {
      this.wrapper.classList.add('expanded');
    } else {
      this.wrapper.classList.remove('expanded');
    }
  },

  initOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('sidebar-overlay');
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
      this.sidebar.classList.remove('expanded');
      overlay.classList.remove('active');
    });
  },

  handleWindowResize() {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1024) {
        this.sidebar.classList.remove('collapsed');
        this.wrapper.classList.remove('expanded');
      } else {
        this.sidebar.classList.remove('expanded');
      }
    });
  },

  initSidebarHover() {
    this.sidebar.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1024) {
        this.sidebar.classList.add('hovered');
      }
    });

    this.sidebar.addEventListener('mouseleave', () => {
      if (window.innerWidth > 1024) {
        this.sidebar.classList.remove('hovered');
      }
    });
  },
};

export default sidebar;
