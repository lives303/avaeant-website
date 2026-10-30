const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const products = {
  creatine: {
    type: 'Performance routine',
    title: 'Creatine Monohydrate Gummies',
    description: 'A mixed berry gummy format featuring 5,000 mg of creatine monohydrate per labeled serving. Designed for adults who prefer a chewable option over powders or capsules.',
    facts: ['Mixed berry flavor', 'Sugar-free', '5,000 mg per labeled serving', 'Gummy format']
  },
  magnesium: {
    type: 'Evening routine',
    title: 'Magnesium Bisglycinate Gummies',
    description: 'A mixed berry, sugar-free gummy that combines magnesium bisglycinate with L-theanine in an approachable daily format.',
    facts: ['Magnesium bisglycinate', 'With L-theanine', 'Mixed berry flavor', 'Sugar-free']
  },
  hydrogen: {
    type: 'Hydration ritual',
    title: 'Molecular Hydrogen Water Tablets',
    description: 'Portable dissolving tablets in lemon and raspberry flavors. Add the labeled serving to water and follow all package directions.',
    facts: ['Dissolving tablets', 'Lemon flavor', 'Raspberry flavor', 'Portable tubes']
  }
};

const dialog = document.querySelector('#product-dialog');
document.querySelectorAll('[data-product]').forEach((button) => {
  button.addEventListener('click', () => {
    const product = products[button.dataset.product];
    document.querySelector('#dialog-type').textContent = product.type;
    document.querySelector('#dialog-title').textContent = product.title;
    document.querySelector('#dialog-description').textContent = product.description;
    document.querySelector('#dialog-facts').innerHTML = product.facts.map((fact) => `<span>${fact}</span>`).join('');
    dialog.showModal();
  });
});

document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
