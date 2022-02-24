import sublinks from './data.js';

const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.close-btn');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const sidebar = document.querySelector('.sidebar-links');
const linkBtns = [...document.querySelectorAll('.link-btn')];
const submenu = document.querySelector('.submenu');
const hero = document.querySelector('.hero');
const nav = document.querySelector('.nav');

// Show Sidebar
toggleBtn.addEventListener('click', () => {
  sidebarWrapper.classList.add('show');
});

// Hide Sidebar
closeBtn.addEventListener('click', () => {
  sidebarWrapper.classList.remove('show');
});

// console.log(sublinks);

// Set Sidebar
sidebar.innerHTML = sublinks
  .map((item) => {
    const { page, links } = item;
    return `<article>
  <h4>${page}</h4>
  <div class="sidebar-sublinks">
  ${links
    .map((link) => {
      const { label, icon, url } = link;
      return `<a href="${url}">
      <i class="${icon}"></i>
      ${label}</a>`;
    })
    .join('')}
  </div>
  </article>`;
  })
  .join('');

linkBtns.forEach((btn) => {
  btn.addEventListener('mouseover', function (e) {
    const text = e.currentTarget.textContent;
    const tempBtn = e.currentTarget.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;

    const tempPage = sublinks.find(({ page }) => {
      if (page === text) {
        return page;
      }
    });
    if (tempPage) {
      const { page, links } = tempPage;
      submenu.classList.add('show');
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;

      let columns = 'col-2';
      if (links.length === 3) {
        columns = 'col-3';
      }
      if (links.length > 3) {
        columns = 'col-4';
      }

      submenu.innerHTML = `
      <section>
      <h4>${page}</h4>
      <div class="submenu-center ${columns}">
      ${links
        .map((link) => {
          const { label, icon, url } = link;
          return `<a href="${url}">
          <i class="${icon}"></i>
          ${label}
          </a>
          `;
        })
        .join('')}
      </div>
      </section>
      `;
    }
  });
});

nav.addEventListener('mouseover', function (e) {
  if (!e.target.classList.contains('link-btn')) {
    submenu.classList.remove('show');
  }
});

hero.addEventListener('mouseover', function (e) {
  submenu.classList.remove('show');
});
