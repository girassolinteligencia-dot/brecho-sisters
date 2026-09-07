/**
 * 🌸 BRECHÓ SISTERS - CORE APP JAVASCRIPT
 * Mobile-First, Geolocalização (Raio 2km), Rotas Google Maps, WhatsApp e Painel Admin
 */

// ============================================================================
// DADOS INICIAIS & ESTADO DO APP
// ============================================================================

const DEFAULT_CONFIG = {
  whatsapp: '5511987654321',
  address: 'Rua das Rosas, 350 - Bairro das Flores, São Paulo - SP',
  lat: -23.550520,
  lng: -46.633308,
  radiusKm: 2.0,
  deliveryFee: 5.00,
  pixKey: 'sisters.brecho@exemplo.com.br',
  pixName: 'Ana & Clara Brechó Sisters',
  adminPasswordHash: '112bca87455d673dba92c8b7b838d519ee6ce35dbf5e6537d953b4ff3cc7e3ec', // sisters123
  videoUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=85',
  welcomeMsg: 'Oi, bem-vindo ao Brechó Sisters! 💕 Todas as nossas pecinhas, tênis e brinquedos são higienizados com carinho e prontos para novas histórias. Escolha na sacolinha e fale com a gente no WhatsApp! 🎀',
  deliveryRules: '🌸 Entregamos com motinho com todo carinho nas redondezas (raio de até 2km do nosso brechó) por taxa fixa de apenas R$ 5,00!\n🏡 Se preferir retirar pessoalmente, a retirada é 100% gratuita com horário combinado pelo WhatsApp.\n✨ Acima do raio de 2km, consulte frete especial diretamente com as Sisters no WhatsApp.',
  faq: [
    { id: 'faq-1', question: '🧺 As pecinhas são higienizadas?', answer: 'Sim! Cada roupitcha passa por lavagem com sabão neutro hipoalergênico e vaporização antes de ir para a vitrine. Os calçados e brinquedos também são higienizados com carinho e cheirinho de amor.' },
    { id: 'faq-2', question: '🛵 Como funciona a entrega e o raio de 2km?', answer: 'Entregamos com motinho com taxa fixa de apenas R$ 5,00 para bairros a até 2km do nosso brechó! Se preferir, a retirada no local é 100% gratuita com horário combinado.' },
    { id: 'faq-3', question: '💳 Quais são as formas de pagamento?', answer: 'Trabalhamos com PIX direto para a chave oficial das Sisters ou pagamento em dinheiro na entrega/retirada. Você confere tudo certinho antes de pagar!' },
    { id: 'faq-4', question: '🏷️ As peças são novas ou usadas?', answer: 'Trabalhamos com achadinhos selecionados a dedo: peças novas com etiqueta, peças usadas apenas 1 vez (para ensaios/festas) e peças em ótimo estado de conservação sem nenhuma avaria.' }
  ],
  stories: {
    welcome: {
      id: 'welcome',
      title: 'Oi, bem-vindo ao Brechó Sisters! 💕',
      text: 'Todas as nossas pecinhas, tênis e brinquedos são higienizados com carinho e prontos para novas histórias. Escolha na sacolinha e fale com a gente no WhatsApp! 🎀',
      media: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=85'
    },
    care: {
      id: 'care',
      title: 'Higienização com Cheirinho de Amor 🧼',
      text: 'Cada roupitcha que entra no nosso brechó é cuidadosamente lavada com sabão hipoalergênico e passada a vapor. É pegar e já vestir nas crianças!',
      media: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=85'
    },
    delivery: {
      id: 'delivery',
      title: 'Entregamos na sua Porta (Raio até 2km) 🛵',
      text: 'Mora pertinho da gente? Entregamos com taxa fixa de R$ 5,00 no raio de até 2km. Se preferir, pode retirar com a gente gratuitamente!',
      media: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=85'
    },
    garimpo: {
      id: 'garimpo',
      title: 'Achadinhos Únicos da Semana ✨',
      text: 'Temos Carter’s, Hering, Nike, Klin e brinquedos educativos. Como cada peça é única, se você amou, garanta rápido na sacolinha!',
      media: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85'
    }
  }
};

const DEFAULT_PRODUCTS = [
  {
    id: 'prod-01',
    name: "Vestido Floral Rodado Carter's",
    category: 'roupas',
    size: 'Tam 4 anos',
    price: 38.00,
    condition: 'usado-1x',
    conditionLabel: '✨ Usado 1 vez',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=600&q=80'
    ],
    desc: 'Vestidinho 100% algodão super macio com forro leve e estampa floral delicada. Usado apenas em um aniversário!',
    status: 'disponivel'
  },
  {
    id: 'prod-02',
    name: 'Tênis Nike Revolution Infantil Velcro',
    category: 'calcados',
    size: 'Tam 26',
    price: 55.00,
    condition: 'otimo',
    conditionLabel: '💕 Em Ótimo Estado',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80'
    ],
    desc: 'Solado flexível antiderrapante e fechamento prático em velcro para a própria criança calçar com autonomia.',
    status: 'disponivel'
  },
  {
    id: 'prod-03',
    name: 'Ursinho Pelúcia Macia Anti-alérgico',
    category: 'brinquedos',
    size: '30 cm',
    price: 28.00,
    condition: 'novo',
    conditionLabel: '🏷️ Novo com Etiqueta',
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80'
    ],
    desc: 'Pelúcia higienizada, hipoalergênica e lavável. Nunca usada, ainda na embalagem original.',
    status: 'disponivel'
  },
  {
    id: 'prod-04',
    name: 'Jardineira Jeans Moletom Hering Kids',
    category: 'roupas',
    size: 'Tam 6 anos',
    price: 42.00,
    condition: 'otimo',
    conditionLabel: '💕 Em Ótimo Estado',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=600&q=80'
    ],
    desc: 'Jeans com toque de moletom super confortável que estica e não aperta na hora de brincar no parque!',
    status: 'disponivel'
  },
  {
    id: 'prod-05',
    name: 'Kit Blocos de Montar Fazendinha',
    category: 'brinquedos',
    size: '48 peças',
    price: 34.00,
    condition: 'otimo',
    conditionLabel: '💕 Em Ótimo Estado',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80'
    ],
    desc: 'Blocos grandes seguros para crianças a partir de 2 anos. Estimula a criatividade e a coordenação motora.',
    status: 'disponivel'
  },
  {
    id: 'prod-06',
    name: 'Mochilinha Infantil Unicórnio Candy',
    category: 'acessorios',
    size: 'Pequena',
    price: 25.00,
    condition: 'usado-1x',
    conditionLabel: '✨ Usado 1 vez',
    image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=600&q=80'
    ],
    desc: 'Mochila com alças acolchoadas em tons pastéis de arco-íris. Ideal para passeios e escolinha.',
    status: 'disponivel'
  }
];

const DEFAULT_ANALYTICS = {
  visits: 142,
  searches: {
    'vestido': 28,
    'tênis': 24,
    'tam 4': 19,
    'brinquedo': 15,
    'jardineira': 12,
    'mochila': 9
  },
  orders: [
    {
      id: 'PED-1021',
      date: '05/09/2026 14:30',
      items: ["Vestido Floral Rodado Carter's"],
      itemsIds: ['prod-01'],
      subtotal: 38.00,
      deliveryFee: 5.00,
      total: 43.00,
      type: 'delivery',
      address: 'Rua das Camélias, 88 - Jd. Flores (2.1 km)',
      status: 'concluido'
    },
    {
      id: 'PED-1022',
      date: '06/09/2026 10:15',
      items: ['Kit Blocos de Montar Fazendinha', 'Mochilinha Infantil Unicórnio Candy'],
      itemsIds: ['prod-05', 'prod-06'],
      subtotal: 59.00,
      deliveryFee: 0.00,
      total: 59.00,
      type: 'pickup',
      address: 'Retirada no Brechó',
      status: 'pendente'
    }
  ]
};

// Gerenciamento de Estado no LocalStorage
const AppStorage = {
  getConfig() {
    const data = localStorage.getItem('brecho_sisters_config');
    let cfg = data ? { ...DEFAULT_CONFIG, ...JSON.parse(data) } : { ...DEFAULT_CONFIG };
    if (cfg.radiusKm === 5 || cfg.radiusKm === 5.0) {
      cfg.radiusKm = 2.0;
      localStorage.setItem('brecho_sisters_config', JSON.stringify(cfg));
    }
    if (cfg.deliveryRules && cfg.deliveryRules.includes('5km')) {
      cfg.deliveryRules = cfg.deliveryRules.replace(/5km/g, '2km');
      localStorage.setItem('brecho_sisters_config', JSON.stringify(cfg));
    }
    if (!cfg.faq || !Array.isArray(cfg.faq) || cfg.faq.length === 0) {
      cfg.faq = [...DEFAULT_CONFIG.faq];
      localStorage.setItem('brecho_sisters_config', JSON.stringify(cfg));
    }
    if (!cfg.stories || typeof cfg.stories !== 'object' || Object.keys(cfg.stories).length === 0) {
      cfg.stories = { ...DEFAULT_CONFIG.stories };
      localStorage.setItem('brecho_sisters_config', JSON.stringify(cfg));
    }
    return cfg;
  },
  saveConfig(cfg) {
    localStorage.setItem('brecho_sisters_config', JSON.stringify(cfg));
  },
  getProducts() {
    const data = localStorage.getItem('brecho_sisters_products');
    let prods = data ? JSON.parse(data) : DEFAULT_PRODUCTS;
    return prods.map(p => {
      if (!p.images || !Array.isArray(p.images) || p.images.length === 0) {
        p.images = [p.image || 'icon.svg'];
      }
      p.image = p.images[0];
      return p;
    });
  },
  saveProducts(prods) {
    localStorage.setItem('brecho_sisters_products', JSON.stringify(prods));
  },
  getCart() {
    const data = localStorage.getItem('brecho_sisters_cart');
    return data ? JSON.parse(data) : [];
  },
  saveCart(cart) {
    localStorage.setItem('brecho_sisters_cart', JSON.stringify(cart));
  },
  getAnalytics() {
    const data = localStorage.getItem('brecho_sisters_analytics');
    return data ? JSON.parse(data) : DEFAULT_ANALYTICS;
  },
  saveAnalytics(ana) {
    localStorage.setItem('brecho_sisters_analytics', JSON.stringify(ana));
  },
  getFavorites() {
    const data = localStorage.getItem('brecho_sisters_favorites');
    return data ? JSON.parse(data) : [];
  },
  saveFavorites(favs) {
    localStorage.setItem('brecho_sisters_favorites', JSON.stringify(favs));
  },
  getCustomer() {
    const data = localStorage.getItem('brecho_sisters_customer');
    return data ? JSON.parse(data) : {};
  },
  saveCustomer(cust) {
    localStorage.setItem('brecho_sisters_customer', JSON.stringify(cust));
  }
};

async function sha256Hex(str) {
  try {
    const enc = new TextEncoder().encode(str);
    const buf = await crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    return str;
  }
}

let appConfig = AppStorage.getConfig();
let productsList = AppStorage.getProducts();
let cartItems = AppStorage.getCart();
let favoritesList = AppStorage.getFavorites();
let analyticsData = AppStorage.getAnalytics();

// Estado atual de entrega/geolocalização e perfil salvo do cliente
const initialCustomer = AppStorage.getCustomer();
let currentDeliveryOption = initialCustomer.deliveryOption || 'pickup';
let customerCoords = initialCustomer.coords || null;
let calculatedDistanceKm = null;
let isWithinRadius = false;
let customerAddressText = initialCustomer.addressText || '';

// ============================================================================
// GERENCIADOR DE HISTÓRICO MOBILE (BOTÃO VOLTAR DO CELULAR / SWIPE / POPSTATE)
// ============================================================================
const ModalHistoryManager = {
  stack: [],
  isProgrammaticBack: false,
  push(modalId) {
    this.stack = this.stack.filter(m => m !== modalId);
    this.stack.push(modalId);
    history.pushState({ modalId, timestamp: Date.now() }, '');
  },
  close(modalId, fromPopstate = false) {
    this.stack = this.stack.filter(m => m !== modalId);
    if (!fromPopstate && history.state && history.state.modalId === modalId) {
      this.isProgrammaticBack = true;
      history.back();
    }
  },
  handlePopState(e) {
    if (this.isProgrammaticBack) {
      this.isProgrammaticBack = false;
      return;
    }
    if (this.stack.length > 0) {
      const topModalId = this.stack.pop();
      if (topModalId === 'modal-cart') closeCartModal(true);
      else if (topModalId === 'modal-product-details') closeDetailsModal(true);
      else if (topModalId === 'modal-favorites') closeFavoritesModal(true);
      else if (topModalId === 'modal-help-center') closeHelpCenterModal(true);
      else if (topModalId === 'modal-delivery-rules') closeDeliveryRulesModal(true);
      else if (topModalId === 'modal-story-view') closeStory(true);
      else if (topModalId === 'modal-cropper-view' && typeof CropperStudio !== 'undefined') CropperStudio.close(true);
      else if (topModalId === 'modal-admin') closeAdminModal(true);
    }
  }
};
window.addEventListener('popstate', (e) => ModalHistoryManager.handlePopState(e));

function setupModalOverlayClicks() {
  const overlays = [
    { id: 'modal-product-details', closer: () => closeDetailsModal() },
    { id: 'modal-cart', closer: () => closeCartModal() },
    { id: 'modal-admin', closer: () => closeAdminModal() },
    { id: 'modal-favorites', closer: () => closeFavoritesModal() },
    { id: 'modal-help-center', closer: () => closeHelpCenterModal() },
    { id: 'modal-delivery-rules', closer: () => closeDeliveryRulesModal() },
    { id: 'modal-story-view', closer: () => closeStory() }
  ];

  overlays.forEach(({ id, closer }) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', (e) => {
        if (e.target === el) {
          closer();
        }
      });
    }
  });
}

// ============================================================================
// AUTO-SAVE & RESTAURAÇÃO CONTÍNUA DOS DADOS DA CLIENTE (NOME, TEL, ENDEREÇO)
// ============================================================================
function autoSaveCustomerForm() {
  const cust = {
    name: (document.getElementById('cust-name')?.value || '').trim(),
    phone: (document.getElementById('cust-phone')?.value || '').trim(),
    cpf: (document.getElementById('cust-cpf')?.value || '').trim(),
    cep: (document.getElementById('cust-cep')?.value || '').trim(),
    street: (document.getElementById('cust-street')?.value || '').trim(),
    number: (document.getElementById('cust-number')?.value || '').trim(),
    complement: (document.getElementById('cust-complement')?.value || '').trim(),
    bairro: (document.getElementById('cust-bairro')?.value || '').trim(),
    deliveryOption: currentDeliveryOption,
    coords: customerCoords,
    addressText: customerAddressText
  };
  AppStorage.saveCustomer(cust);
}

function restoreCustomerForm() {
  const cust = AppStorage.getCustomer();
  if (!cust || Object.keys(cust).length === 0) return;

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el && val && !el.value) el.value = val;
  };

  setVal('cust-name', cust.name);
  setVal('cust-phone', cust.phone);
  setVal('cust-cpf', cust.cpf);
  setVal('cust-cep', cust.cep);
  setVal('cust-street', cust.street);
  setVal('cust-number', cust.number);
  setVal('cust-complement', cust.complement);
  setVal('cust-bairro', cust.bairro);

  if (cust.coords && !customerCoords) {
    customerCoords = cust.coords;
  }
  if (cust.addressText && !customerAddressText) {
    customerAddressText = cust.addressText;
  }
}

// ============================================================================
// INICIALIZAÇÃO & EVENT LISTENERS
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  renderProducts();
  updateCartBadges();
  setupEventListeners();
  setupModalOverlayClicks();
  restoreCustomerForm();
  selectDeliveryOption(currentDeliveryOption);
});

function initUI() {
  document.getElementById('header-radius-km').textContent = `${appConfig.radiusKm}km`;
  document.querySelectorAll('.calc-radius-label').forEach(el => {
    el.textContent = `${appConfig.radiusKm}km`;
  });
  document.getElementById('pickup-address-text').textContent = appConfig.address;
  
  // Link de rota para o endereço das vendedoras
  const pickupLink = document.getElementById('link-pickup-route');
  if (pickupLink) {
    pickupLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(appConfig.address)}`;
  }

  // Link direto do WhatsApp na Central de Ajuda
  const waLink = document.getElementById('link-direct-whatsapp');
  if (waLink) {
    const cleanPhone = (appConfig.whatsapp || '5511987654321').replace(/\D/g, '');
    waLink.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá Sisters! Estou visitando o Brechó e gostaria de tirar uma dúvida sobre as pecinhas 💕')}`;
  }

  // Renderiza perguntas e respostas dinâmicas (FAQ)
  renderFAQ();

  // Sincroniza foto/capa do vídeo de boas-vindas na Central de Dúvidas
  const welcomeMedia = (appConfig.stories && appConfig.stories.welcome && appConfig.stories.welcome.media) || appConfig.videoUrl;
  const helpImg = document.getElementById('help-video-media-img');
  if (helpImg && welcomeMedia && !isVideoMedia(welcomeMedia)) {
    helpImg.src = welcomeMedia;
  }
  const helpCaptionTitle = document.getElementById('help-caption-title');
  if (helpCaptionTitle && appConfig.stories && appConfig.stories.welcome) {
    helpCaptionTitle.textContent = appConfig.stories.welcome.title;
  }
  const helpCaptionText = document.getElementById('help-caption-text');
  if (helpCaptionText) {
    helpCaptionText.textContent = appConfig.welcomeMsg || (appConfig.stories && appConfig.stories.welcome && appConfig.stories.welcome.text);
  }

  updateFavBadges();
}

function setupEventListeners() {
  // Incrementa visita na sessão atual (se ainda não visitou)
  if (!sessionStorage.getItem('brecho_session_visited')) {
    analyticsData.visits = (analyticsData.visits || 0) + 1;
    AppStorage.saveAnalytics(analyticsData);
    sessionStorage.setItem('brecho_session_visited', 'true');
  }

  // Busca com registro de consultas no Analytics dos Pais
  const searchInput = document.getElementById('search-input');
  let searchDebounce = null;
  searchInput.addEventListener('input', (e) => {
    const val = e.target.value.trim().toLowerCase();
    renderProducts(getActiveCategory(), val);

    if (val.length >= 3) {
      if (searchDebounce) clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        if (!analyticsData.searches) analyticsData.searches = {};
        analyticsData.searches[val] = (analyticsData.searches[val] || 0) + 1;
        AppStorage.saveAnalytics(analyticsData);
      }, 1200);
    }
  });

  // Filtros de Categoria
  const categoryPills = document.querySelectorAll('.category-pill');
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-cat');
      renderProducts(cat, searchInput.value.trim().toLowerCase());
    });
  });

  // ==========================================================================
  // TOQUE SECRETO NO LOGO PARA ACESSO À GESTÃO / ADMIN
  // ==========================================================================
  const brandLogo = document.getElementById('btn-brand-home');
  let secretClickCount = 0;
  let secretTimer = null;
  let longPressTimer = null;

  function triggerSecretAdmin() {
    showToast('Acesso Secreto das Sisters! 🌸', '🔐');
    if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
    openAdminModal();
  }

  brandLogo.addEventListener('click', (e) => {
    secretClickCount++;
    if (secretTimer) clearTimeout(secretTimer);

    if (secretClickCount >= 3) {
      // 3 toques rápidos consecutivos!
      secretClickCount = 0;
      triggerSecretAdmin();
    } else {
      // Clique normal do cliente: rola para o topo e reseta vitrine
      secretTimer = setTimeout(() => {
        if (secretClickCount === 1) {
          resetCategoryFilter();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        secretClickCount = 0;
      }, 350);
    }
  });

  // Long press (segurar por 1.5s no celular)
  brandLogo.addEventListener('touchstart', () => {
    longPressTimer = setTimeout(() => {
      triggerSecretAdmin();
    }, 1500);
  }, { passive: true });

  brandLogo.addEventListener('touchend', () => {
    if (longPressTimer) clearTimeout(longPressTimer);
  }, { passive: true });

  // Suporte a hash #admin na URL
  if (window.location.hash === '#admin') {
    setTimeout(openAdminModal, 400);
  }
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#admin') openAdminModal();
  });

  // Banner de Entrega & Botão de Regras (Abre o Modal Exclusivo de Regras)
  const bannerDelivery = document.getElementById('btn-banner-delivery');
  if (bannerDelivery) {
    bannerDelivery.addEventListener('click', () => {
      openDeliveryRulesModal();
    });
  }
  const btnTriggerRules = document.getElementById('btn-trigger-rules');
  if (btnTriggerRules) {
    btnTriggerRules.addEventListener('click', (e) => {
      e.stopPropagation();
      openDeliveryRulesModal();
    });
  }

  // Botão Dúvidas / WhatsApp no Header
  const btnHelpHeader = document.getElementById('btn-open-help-header');
  if (btnHelpHeader) {
    btnHelpHeader.addEventListener('click', openHelpCenterModal);
  }

  // Botões do Modal de Dúvidas
  const btnCloseHelp = document.getElementById('btn-close-help');
  if (btnCloseHelp) btnCloseHelp.addEventListener('click', closeHelpCenterModal);

  const btnPlayHelpVideo = document.getElementById('btn-play-help-video');
  if (btnPlayHelpVideo) {
    btnPlayHelpVideo.addEventListener('click', openSistersWelcomeVideo);
  }

  // Botões de Compartilhar / Indicar
  const btnShareShopAction = document.getElementById('btn-share-shop-action');
  if (btnShareShopAction) btnShareShopAction.addEventListener('click', shareShop);

  const btnCartShare = document.getElementById('btn-cart-share');
  if (btnCartShare) btnCartShare.addEventListener('click', shareShop);

  // Botões do Modal de Regras de Entrega
  const btnCloseRules = document.getElementById('btn-close-rules');
  if (btnCloseRules) btnCloseRules.addEventListener('click', closeDeliveryRulesModal);

  const btnRulesGotIt = document.getElementById('btn-rules-got-it');
  if (btnRulesGotIt) btnRulesGotIt.addEventListener('click', closeDeliveryRulesModal);

  // Botões de Favoritos
  const navFavs = document.getElementById('nav-favs');
  if (navFavs) navFavs.addEventListener('click', openFavoritesModal);

  // Helper para registro seguro de eventos
  const safeOn = (id, event, handler) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, handler);
  };

  const btnCloseFavs = document.getElementById('btn-close-favs');
  if (btnCloseFavs) btnCloseFavs.addEventListener('click', closeFavoritesModal);

  // Botão de Abrir Sacola
  safeOn('nav-cart', 'click', openCartModal);

  // Botões de Fechar Modais
  safeOn('btn-close-details', 'click', closeDetailsModal);
  safeOn('btn-close-cart', 'click', closeCartModal);
  safeOn('btn-close-admin', 'click', closeAdminModal);

  // Navegação da Bottom Bar (4 Botões do Cliente)
  safeOn('nav-home', 'click', () => {
    setActiveBottomNav('nav-home');
    resetCategoryFilter();
    closeAllModais();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  safeOn('nav-cats', 'click', () => {
    setActiveBottomNav('nav-cats');
    closeAllModais();
    const navCats = document.getElementById('categories-nav');
    if (navCats) navCats.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const sInput = document.getElementById('search-input');
    if (sInput) sInput.focus();
    showToast('Escolha uma categoria ou busque sua peça! 🔍', '✨');
  });

  // Botão "Ver Vitrine" no carrinho vazio
  safeOn('btn-start-shopping', 'click', () => {
    closeCartModal();
    resetCategoryFilter();
  });

  // Escolha de Retirada vs Entrega
  safeOn('opt-pickup', 'click', () => selectDeliveryOption('pickup'));
  safeOn('opt-delivery', 'click', () => selectDeliveryOption('delivery'));

  // Geolocalização no Carrinho
  safeOn('btn-geo-locate', 'click', handleGPSLocation);
  safeOn('btn-calc-address', 'click', handleAddressGeocode);

  // Suporte a pressionar Enter nos campos de endereço para calcular
  ['cust-cep', 'cust-street', 'cust-number', 'cust-bairro', 'cust-complement'].forEach(fId => {
    safeOn(fId, 'keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddressGeocode();
      }
    });
  });

  // Inicialização das Máscaras e Eventos da Compradora
  setupInputMasks();

  // Botão Concluir no WhatsApp
  safeOn('btn-submit-whatsapp', 'click', submitOrderViaWhatsApp);

  // Admin Events
  setupAdminEvents();

  // PWA Banner Events
  setupPwaBannerEvents();

  // Suporte a abrir peça compartilhada via link (?piece=ID)
  const urlParams = new URLSearchParams(window.location.search);
  const sharedPieceId = urlParams.get('piece');
  if (sharedPieceId) {
    setTimeout(() => {
      openProductDetails(sharedPieceId);
    }, 500);
  }
}

// ============================================================================
// MÁSCARAS DE ENTRADA & VIACEP (EXPERIÊNCIA SEM ERROS)
// ============================================================================

function setupInputMasks() {
  const phoneInput = document.getElementById('cust-phone');
  const cepInput = document.getElementById('cust-cep');
  const cpfInput = document.getElementById('cust-cpf');

  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 10) {
        // (11) 99999-9999
        e.target.value = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
      } else if (v.length > 6) {
        // (11) 9999-9999
        e.target.value = `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
      } else if (v.length > 2) {
        e.target.value = `(${v.slice(0, 2)}) ${v.slice(2)}`;
      } else if (v.length > 0) {
        e.target.value = `(${v}`;
      } else {
        e.target.value = '';
      }
    });
  }

  if (cepInput) {
    cepInput.addEventListener('input', async (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 8) v = v.slice(0, 8);
      if (v.length > 5) {
        e.target.value = `${v.slice(0, 5)}-${v.slice(5)}`;
      } else {
        e.target.value = v;
      }

      // Ao completar 8 dígitos, consulta ViaCEP automaticamente
      if (v.length === 8) {
        showToast('Buscando endereço pelo CEP...', '📮');
        try {
          const res = await fetch(`https://viacep.com.br/ws/${v}/json/`);
          const data = await res.json();
          if (!data.erro) {
            document.getElementById('cust-street').value = data.logradouro || '';
            document.getElementById('cust-bairro').value = data.bairro || '';
            document.getElementById('cust-number').focus();
            autoSaveCustomerForm();
            showToast('Endereço preenchido! Digite o número da casa.', '✨');
          } else {
            showToast('CEP não encontrado. Digite a rua manualmente.', '⚠️');
          }
        } catch (err) {
          console.log('Erro ViaCEP', err);
        }
      }
    });
  }

  if (cpfInput) {
    cpfInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 9) {
        e.target.value = `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
      } else if (v.length > 6) {
        e.target.value = `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
      } else if (v.length > 3) {
        e.target.value = `${v.slice(0, 3)}.${v.slice(3)}`;
      } else {
        e.target.value = v;
      }
    });
  }

  // Ouvintes para auto-save de todos os campos de cliente em tempo real
  ['cust-name', 'cust-phone', 'cust-cpf', 'cust-cep', 'cust-street', 'cust-number', 'cust-bairro', 'cust-complement'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', autoSaveCustomerForm);
      el.addEventListener('change', autoSaveCustomerForm);
    }
  });
}

function getActiveCategory() {
  const activePill = document.querySelector('.category-pill.active');
  return activePill ? activePill.getAttribute('data-cat') : 'todas';
}

function selectCategory(cat) {
  const pills = document.querySelectorAll('.category-pill');
  pills.forEach(p => {
    if (p.getAttribute('data-cat') === cat) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });
  renderProducts(cat);
}

function resetCategoryFilter() {
  selectCategory('todas');
  document.getElementById('search-input').value = '';
}

function setActiveBottomNav(id) {
  document.querySelectorAll('.nav-item-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function closeAllModais() {
  closeDetailsModal(true);
  closeCartModal(true);
  closeAdminModal(true);
  if (typeof closeStory === 'function') closeStory(true);
  if (typeof closeDeliveryRulesModal === 'function') closeDeliveryRulesModal(true);
  if (typeof closeFavoritesModal === 'function') closeFavoritesModal(true);
  if (typeof closeHelpCenterModal === 'function') closeHelpCenterModal(true);
  if (typeof CropperStudio !== 'undefined' && CropperStudio.close) CropperStudio.close(true);

  while (ModalHistoryManager.stack.length > 0) {
    ModalHistoryManager.stack.pop();
    if (history.state && history.state.modalId) {
      ModalHistoryManager.isProgrammaticBack = true;
      history.back();
    }
  }
}

// ============================================================================
// RENDERIZAÇÃO DA VITRINE DE PRODUTOS
// ============================================================================

function renderProducts(category = 'todas', query = '') {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('products-count');
  grid.innerHTML = '';

  let filtered = productsList.filter(p => {
    const matchCat = category === 'todas' || p.category === category;
    const matchQuery = !query || 
      p.name.toLowerCase().includes(query) || 
      p.size.toLowerCase().includes(query) ||
      (p.desc && p.desc.toLowerCase().includes(query));
    return matchCat && matchQuery;
  });

  countEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'peça' : 'peças'}`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-box" style="grid-column: 1 / -1;">
        <div class="empty-icon">🔍</div>
        <h4 class="empty-title">Nenhum achadinho encontrado!</h4>
        <p class="empty-desc">Tente buscar por outro termo ou escolha outra categoria fofa.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(prod => {
    const isSold = prod.status === 'vendido';
    const isReserved = prod.status === 'reservado';
    const inCart = cartItems.some(item => item.id === prod.id);
    const isFav = favoritesList.includes(prod.id);

    const card = document.createElement('article');
    card.className = `product-card ${isSold ? 'vendido' : ''}`;

    let conditionBadge = '';
    if (prod.condition === 'novo') {
      conditionBadge = `<span class="badge-condition novo">🏷️ Novo c/ Tag</span>`;
    } else if (prod.condition === 'usado-1x') {
      conditionBadge = `<span class="badge-condition usado-1x">✨ Usado 1x</span>`;
    } else {
      conditionBadge = `<span class="badge-condition otimo">💕 Muito Amor</span>`;
    }

    let statusOverlay = '';
    if (isSold) {
      statusOverlay = `<div class="badge-status-sold">VENDIDO 💕</div>`;
    } else if (isReserved) {
      statusOverlay = `<div class="badge-status-sold" style="background: rgba(243, 156, 18, 0.85)">RESERVADO ✨</div>`;
    }

    card.innerHTML = `
      <div class="product-thumb-wrap" onclick="openProductDetails('${prod.id}')">
        <img src="${prod.image}" alt="${prod.name}" class="product-thumb" loading="lazy" onerror="this.src='icon.svg'">
        <button type="button" class="btn-fav-card ${isFav ? 'favorited' : ''}" onclick="event.stopPropagation(); toggleFavorite('${prod.id}')" title="${isFav ? 'Remover dos favoritos' : 'Favoritar peça'}">
          ${isFav ? '❤️' : '🤍'}
        </button>
        ${conditionBadge}
        <span class="badge-size">${prod.size}</span>
        ${statusOverlay}
      </div>
      <div class="product-info">
        <span class="product-category-text">${formatCategory(prod.category)}</span>
        <h3 class="product-title" onclick="openProductDetails('${prod.id}')">${prod.name}</h3>
        <div class="price-row">
          <span class="price-currency">R$</span>
          <span class="price-val">${prod.price.toFixed(2).replace('.', ',')}</span>
        </div>
        ${!isSold ? `
          <button class="btn-add-cart ${inCart ? 'added' : ''}" onclick="toggleCart('${prod.id}')">
            ${inCart ? '✓ Na Sacola 💕' : '+ Quero Levar! 🛍️'}
          </button>
        ` : `
          <button class="btn-add-cart" style="background: #E2E8F0; color: #718096; cursor: not-allowed;" disabled>
            Já foi vendido
          </button>
        `}
      </div>
    `;

    grid.appendChild(card);
  });
}

function formatCategory(cat) {
  const map = {
    roupas: '👗 Roupitchas',
    calcados: '👟 Calçados',
    brinquedos: '🧸 Brinquedos',
    acessorios: '🎒 Acessórios'
  };
  return map[cat] || cat;
}

// ============================================================================
// MODAL DE DETALHES DO PRODUTO COM LÂMINAS DE VIDRO (GLASS SLIDER - ATÉ 4 FOTOS)
// ============================================================================

let currentGalleryIndex = 0;
let currentGalleryImages = [];

function updateGlassSlides() {
  const container = document.getElementById('glass-gallery-container');
  if (!container) return;
  const slides = container.querySelectorAll('.glass-slide');
  const dots = container.querySelectorAll('.glass-dot');
  const counterNum = document.getElementById('glass-current-num');

  if (counterNum) counterNum.textContent = (currentGalleryIndex + 1);

  slides.forEach((slide, idx) => {
    slide.classList.remove('active', 'prev', 'next');
    if (idx === currentGalleryIndex) {
      slide.classList.add('active');
    } else if (idx < currentGalleryIndex) {
      slide.classList.add('prev');
    } else {
      slide.classList.add('next');
    }
  });

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentGalleryIndex);
  });
}

function nextGlassSlide() {
  if (currentGalleryImages.length <= 1) return;
  currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
  updateGlassSlides();
}

function prevGlassSlide() {
  if (currentGalleryImages.length <= 1) return;
  currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
  updateGlassSlides();
}

function goToGlassSlide(index) {
  if (index >= 0 && index < currentGalleryImages.length) {
    currentGalleryIndex = index;
    updateGlassSlides();
  }
}

function attachGlassGalleryTouchGestures() {
  const stage = document.getElementById('glass-gallery-stage');
  if (!stage) return;
  let startX = 0;

  stage.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length === 1) {
      startX = e.touches[0].clientX;
    }
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches.length === 1) {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 35) {
        if (diff > 0) {
          nextGlassSlide();
        } else {
          prevGlassSlide();
        }
      }
    }
  }, { passive: true });
}

window.nextGlassSlide = nextGlassSlide;
window.prevGlassSlide = prevGlassSlide;
window.goToGlassSlide = goToGlassSlide;

function openProductDetails(id) {
  const prod = productsList.find(p => p.id === id);
  if (!prod) return;

  const modal = document.getElementById('modal-product-details');
  const body = document.getElementById('modal-detail-body');
  const title = document.getElementById('modal-detail-title');

  title.textContent = prod.name;
  const inCart = cartItems.some(i => i.id === prod.id);
  const isSold = prod.status === 'vendido';

  // Array de até 4 fotos com fallback para prod.image
  let images = Array.isArray(prod.images) && prod.images.length > 0 ? prod.images : [prod.image || 'icon.svg'];
  images = images.slice(0, 4);

  currentGalleryImages = images;
  currentGalleryIndex = 0;

  const hasMultiple = images.length > 1;

  let slidesHtml = '';
  images.forEach((imgSrc, idx) => {
    let stateClass = '';
    if (idx === 0) stateClass = 'active';
    else if (idx === 1) stateClass = 'next';

    slidesHtml += `
      <div class="glass-slide ${stateClass}" data-slide-index="${idx}" onclick="nextGlassSlide()" title="${hasMultiple ? 'Toque para ver próxima foto' : ''}">
        <img src="${imgSrc}" alt="${prod.name} - Foto ${idx + 1}" onerror="this.src='icon.svg'">
      </div>
    `;
  });

  let dotsHtml = '';
  if (hasMultiple) {
    dotsHtml = `
      <div class="glass-dots-bar">
        ${images.map((_, idx) => `
          <div class="glass-dot ${idx === 0 ? 'active' : ''}" onclick="event.stopPropagation(); goToGlassSlide(${idx})" title="Foto ${idx + 1}"></div>
        `).join('')}
      </div>
    `;
  }

  const galleryHtml = `
    <div class="glass-gallery-container" id="glass-gallery-container">
      <div class="glass-gallery-stage" id="glass-gallery-stage">
        ${slidesHtml}
      </div>

      ${hasMultiple ? `
        <div class="glass-counter-pill" id="glass-counter-pill">
          📸 <span id="glass-current-num">1</span> de ${images.length}
        </div>
        <button type="button" class="btn-glass-nav prev" onclick="event.stopPropagation(); prevGlassSlide()" aria-label="Foto anterior" title="Foto anterior">‹</button>
        <button type="button" class="btn-glass-nav next" onclick="event.stopPropagation(); nextGlassSlide()" aria-label="Próxima foto" title="Próxima foto">›</button>
        ${dotsHtml}
      ` : ''}

      <span style="position: absolute; bottom: 10px; right: 10px; background: rgba(255,255,255,0.92); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); padding: 4px 10px; border-radius: var(--radius-sm); font-weight: 800; font-size: 0.85rem; z-index: 4; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
        ${prod.size}
      </span>
    </div>
  `;

  body.innerHTML = `
    ${galleryHtml}

    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
      <span style="font-size: 0.85rem; font-weight: 700; color: #636E72;">${formatCategory(prod.category)}</span>
      <span style="font-size: 0.82rem; font-weight: 800; background: var(--pastel-yellow); color: #856404; padding: 4px 10px; border-radius: var(--radius-full);">
        ${prod.conditionLabel || 'Ótimo estado'}
      </span>
    </div>

    <p style="font-size: 0.95rem; color: #2D3436; margin-bottom: 16px; line-height: 1.45;">
      ${prod.desc || 'Peça cheia de carinho, lavada e pronta para encantar novamente!'}
    </p>

    <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #FDFBF7; border-radius: var(--radius-md); border: 1px solid var(--border-soft); margin-bottom: 16px;">
      <span style="font-size: 0.9rem; font-weight: 700; color: var(--text-muted);">Valor Especial:</span>
      <span style="font-family: 'Fredoka', cursive; font-size: 1.6rem; color: #FF477E; font-weight: 700;">
        R$ ${prod.price.toFixed(2).replace('.', ',')}
      </span>
    </div>

    ${!isSold ? `
      <button class="btn-whatsapp-submit" style="background: var(--pastel-pink); color: #7B112D;" onclick="toggleCart('${prod.id}'); closeDetailsModal();">
        ${inCart ? 'Remover da Sacola ✕' : 'Adicionar na Minha Sacola 🛍️'}
      </button>
    ` : `
      <button class="btn-whatsapp-submit" style="background: #CBD5E0; color: #718096; cursor: not-allowed;" disabled>
        Esta peça já encontrou um novo lar 💕
      </button>
    `}

    <button type="button" class="btn-share-piece-detail" onclick="sharePiece('${prod.id}')">
      <span>↗️</span> Mostrar essa peça para uma amiga
    </button>
  `;

  modal.classList.add('active');
  ModalHistoryManager.push('modal-product-details');

  if (hasMultiple) {
    attachGlassGalleryTouchGestures();
  }
}

function closeDetailsModal(fromPopstate = false) {
  const modal = document.getElementById('modal-product-details');
  if (modal) modal.classList.remove('active');
  ModalHistoryManager.close('modal-product-details', fromPopstate);
}

// ============================================================================
// GERENCIAMENTO DA SACOLA DE COMPRAS
// ============================================================================

function toggleCart(id) {
  const prod = productsList.find(p => p.id === id);
  if (!prod) return;

  const index = cartItems.findIndex(i => i.id === id);
  if (index > -1) {
    cartItems.splice(index, 1);
    showToast('Peça removida da sacolinha', '🗑️');
  } else {
    cartItems.push(prod);
    showToast(`"${prod.name}" está na sacolinha!`, '💖');
    if (typeof triggerPwaBannerSmoothly === 'function') {
      setTimeout(triggerPwaBannerSmoothly, 1800);
    }
  }

  AppStorage.saveCart(cartItems);
  updateCartBadges();
  renderProducts(getActiveCategory(), document.getElementById('search-input').value.trim().toLowerCase());
  if (document.getElementById('modal-cart').classList.contains('active')) {
    renderCartModal();
  }
}

function removeFromCart(id) {
  cartItems = cartItems.filter(i => i.id !== id);
  AppStorage.saveCart(cartItems);
  updateCartBadges();
  renderProducts(getActiveCategory(), document.getElementById('search-input').value.trim().toLowerCase());
  renderCartModal();
  showToast('Peça removida da sacola', '🗑️');
}

function updateCartBadges() {
  const count = cartItems.length;
  const headerBadge = document.getElementById('cart-badge-count');
  const bottomBadge = document.getElementById('bottom-cart-badge');

  if (headerBadge) headerBadge.textContent = count;
  if (bottomBadge) {
    bottomBadge.textContent = count;
    bottomBadge.style.display = count > 0 ? 'flex' : 'none';
  }
}

function openCartModal() {
  restoreCustomerForm();
  renderCartModal();
  document.getElementById('modal-cart').classList.add('active');
  setActiveBottomNav('nav-cart');
  ModalHistoryManager.push('modal-cart');
}

function closeCartModal(fromPopstate = false) {
  const modal = document.getElementById('modal-cart');
  if (modal) modal.classList.remove('active');
  setActiveBottomNav('nav-home');
  ModalHistoryManager.close('modal-cart', fromPopstate);
}

function renderCartModal() {
  const list = document.getElementById('cart-items-list');
  const wrap = document.getElementById('cart-content-wrap');
  const empty = document.getElementById('cart-empty-state');
  const noticeEl = document.getElementById('cart-unavailable-notice');
  const btnSubmit = document.getElementById('btn-submit-whatsapp');

  if (cartItems.length === 0) {
    wrap.style.display = 'none';
    empty.style.display = 'block';
    if (noticeEl) noticeEl.style.display = 'none';
    return;
  }

  wrap.style.display = 'block';
  empty.style.display = 'none';
  list.innerHTML = '';

  let subtotal = 0;
  let hasUnavailable = false;
  let availableCount = 0;

  cartItems.forEach(item => {
    // Revalidação em tempo real de estoque único de brechó
    const liveProd = productsList.find(p => p.id === item.id);
    const isUnavailable = liveProd && (liveProd.status === 'vendido' || liveProd.status === 'reservado');

    if (!isUnavailable) {
      subtotal += item.price;
      availableCount++;
    } else {
      hasUnavailable = true;
    }

    const row = document.createElement('div');
    row.className = `cart-item-row ${isUnavailable ? 'item-unavailable' : ''}`;
    row.innerHTML = `
      <div style="position: relative; width: 64px; height: 64px; flex-shrink: 0;">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='icon.svg'" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-sm); ${isUnavailable ? 'filter: grayscale(80%) opacity(0.55);' : ''}">
        ${isUnavailable ? `<span style="position: absolute; bottom: 2px; left: 2px; background: #E53E3E; color: #FFF; font-size: 0.58rem; font-weight: 800; padding: 2px 4px; border-radius: 4px; text-transform: uppercase;">${liveProd.status === 'reservado' ? 'Reservado' : 'Esgotado'}</span>` : ''}
      </div>
      <div class="cart-item-details" style="${isUnavailable ? 'opacity: 0.6;' : ''}">
        <h4 class="cart-item-name" style="${isUnavailable ? 'text-decoration: line-through; color: #718096;' : ''}">${item.name}</h4>
        <span class="cart-item-meta">${item.size} • ${formatCategory(item.category)}</span>
        <div class="cart-item-price" style="${isUnavailable ? 'text-decoration: line-through; color: #A0AEC0;' : ''}">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
        ${isUnavailable ? `<div style="font-size: 0.72rem; color: #E53E3E; font-weight: 700; margin-top: 2px;">⚠️ Peça já vendida p/ outra cliente</div>` : ''}
      </div>
      <button class="btn-remove-cart" onclick="removeFromCart('${item.id}')" title="Remover">
        ✕
      </button>
    `;
    list.appendChild(row);
  });

  if (noticeEl) {
    noticeEl.style.display = hasUnavailable ? 'block' : 'none';
  }

  // Desativa botão se todas as peças estiverem esgotadas
  if (btnSubmit) {
    if (availableCount === 0) {
      btnSubmit.style.opacity = '0.5';
      btnSubmit.style.pointerEvents = 'none';
      btnSubmit.title = 'Todas as peças na sacola já foram vendidas';
    } else {
      btnSubmit.style.opacity = '1';
      btnSubmit.style.pointerEvents = 'auto';
      btnSubmit.title = '';
    }
  }

  // Atualiza totais considerando apenas peças disponíveis
  document.getElementById('cart-subtotal-val').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;

  const deliveryLine = document.getElementById('delivery-tax-line');
  const deliveryVal = document.getElementById('cart-delivery-val');
  const totalVal = document.getElementById('cart-total-val');

  let finalTotal = subtotal;

  if (currentDeliveryOption === 'delivery' && isWithinRadius && availableCount > 0) {
    deliveryLine.style.display = 'flex';
    deliveryVal.textContent = `R$ ${appConfig.deliveryFee.toFixed(2).replace('.', ',')}`;
    finalTotal += appConfig.deliveryFee;
  } else {
    deliveryLine.style.display = 'none';
  }

  totalVal.textContent = `R$ ${finalTotal.toFixed(2).replace('.', ',')}`;
}

// ============================================================================
// GEOLOCALIZAÇÃO & CÁLCULO DE DISTÂNCIA / ROTAS (RAIO 2KM)
// ============================================================================

function selectDeliveryOption(type) {
  currentDeliveryOption = type;
  const optPickup = document.getElementById('opt-pickup');
  const optDelivery = document.getElementById('opt-delivery');
  const boxPickup = document.getElementById('details-pickup-box');
  const boxDelivery = document.getElementById('details-delivery-box');

  if (type === 'pickup') {
    optPickup.classList.add('active');
    optDelivery.classList.remove('active');
    boxPickup.style.display = 'block';
    boxDelivery.style.display = 'none';
  } else {
    optPickup.classList.remove('active');
    optDelivery.classList.add('active');
    boxPickup.style.display = 'none';
    boxDelivery.style.display = 'block';
  }

  renderCartModal();
}

/**
 * Fórmula de Haversine: Calcula distância geodésica em quilômetros
 */
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Captura GPS do smartphone
 */
function handleGPSLocation() {
  const btn = document.getElementById('btn-geo-locate');
  const origText = btn.innerHTML;

  if (!navigator.geolocation) {
    alert('Seu navegador não suporta GPS. Digite o endereço no campo abaixo.');
    return;
  }

  btn.innerHTML = '⌛ Buscando localização no GPS...';
  btn.style.opacity = '0.7';

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      btn.innerHTML = origText;
      btn.style.opacity = '1';

      customerCoords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };

      // Tenta geocodificação reversa via OpenStreetMap Nominatim (gratuito)
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${customerCoords.lat}&lon=${customerCoords.lng}`);
        const data = await res.json();
        if (data && data.display_name) {
          customerAddressText = data.display_name.split(',').slice(0, 3).join(',');
          document.getElementById('input-customer-address').value = customerAddressText;
        }
      } catch (err) {
        customerAddressText = `Localização via GPS (${customerCoords.lat.toFixed(4)}, ${customerCoords.lng.toFixed(4)})`;
        document.getElementById('input-customer-address').value = customerAddressText;
      }

      evaluateCustomerDistance();
    },
    (err) => {
      btn.innerHTML = origText;
      btn.style.opacity = '1';
      showToast('Por favor, digite seu endereço manualmente no campo.', '⚠️');
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
}

/**
 * Geocodifica endereço digitado via Nominatim OpenStreetMap
 */
async function handleAddressGeocode() {
  const street = document.getElementById('cust-street').value.trim();
  const number = document.getElementById('cust-number').value.trim();
  const bairro = document.getElementById('cust-bairro').value.trim();
  const cep = document.getElementById('cust-cep').value.trim();

  if (!street || !number) {
    showToast('Preencha a Rua e o Número para calcular a entrega.', '⚠️');
    return;
  }

  customerAddressText = `${street}, ${number} - ${bairro || ''} ${cep ? '(CEP: ' + cep + ')' : ''}`.trim();
  const fullQuery = `${street}, ${number}, ${bairro || ''}, São Paulo, Brasil`;

  showToast('Calculando distância nas redondezas...', '🗺️');

  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullQuery)}&limit=1`);
    const data = await res.json();
    if (data && data.length > 0) {
      customerCoords = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
      evaluateCustomerDistance();
    } else {
      // Fallback geográfico
      customerCoords = {
        lat: appConfig.lat + 0.015,
        lng: appConfig.lng + 0.015
      };
      evaluateCustomerDistance();
    }
  } catch (e) {
    customerCoords = {
      lat: appConfig.lat + 0.018,
      lng: appConfig.lng + 0.018
    };
    evaluateCustomerDistance();
  }
}

/**
 * Avalia se o cliente está dentro do raio de 2km e gera rota
 */
function evaluateCustomerDistance() {
  if (!customerCoords) return;

  calculatedDistanceKm = calculateHaversineDistance(
    appConfig.lat,
    appConfig.lng,
    customerCoords.lat,
    customerCoords.lng
  );

  const badge = document.getElementById('distance-result-badge');
  badge.style.display = 'flex';

  const routeUrl = `https://www.google.com/maps/dir/?api=1&origin=${appConfig.lat},${appConfig.lng}&destination=${customerCoords.lat},${customerCoords.lng}`;

  if (calculatedDistanceKm <= appConfig.radiusKm) {
    isWithinRadius = true;
    badge.className = 'distance-result-badge in-range';
    badge.innerHTML = `
      <div>🛵 <strong>Eba! Você está a ${calculatedDistanceKm.toFixed(1)} km de nós.</strong></div>
      <div style="font-size: 0.78rem;">Entregamos na sua casa com taxa de R$ ${appConfig.deliveryFee.toFixed(2).replace('.', ',')}!</div>
      <a href="${routeUrl}" target="_blank" class="route-link-btn">🗺️ Ver Rota no Google Maps</a>
    `;
  } else {
    isWithinRadius = false;
    badge.className = 'distance-result-badge out-range';
    badge.innerHTML = `
      <div>📍 <strong>Você está a ${calculatedDistanceKm.toFixed(1)} km de nós.</strong></div>
      <div style="font-size: 0.78rem;">Nosso raio de entrega nas redondezas é de até ${appConfig.radiusKm} km. Você pode optar por retirar grátis no brechó ou combinar no WhatsApp! 💕</div>
      <a href="${routeUrl}" target="_blank" class="route-link-btn">🗺️ Ver Distância no Mapa</a>
    `;
  }

  renderCartModal();
}

// ============================================================================
// CONCLUIR PEDIDO E FORMATAR MENSAGEM DO WHATSAPP (wa.me)
// ============================================================================

function submitOrderViaWhatsApp() {
  if (cartItems.length === 0) {
    showToast('Adicione pelo menos uma peça na sacola!', '🛍️');
    return;
  }

  // Filtra apenas peças disponíveis no momento do fechamento
  const availableItems = cartItems.filter(item => {
    const live = productsList.find(p => p.id === item.id);
    return !live || (live.status !== 'vendido' && live.status !== 'reservado');
  });

  if (availableItems.length === 0) {
    showToast('Todas as peças da sacolinha já foram vendidas! Escolha outras na vitrine.', '⚠️');
    return;
  }

  const custName = document.getElementById('cust-name').value.trim();
  const custPhone = document.getElementById('cust-phone').value.trim();
  const custCpf = document.getElementById('cust-cpf').value.trim();
  const complement = document.getElementById('cust-complement') ? document.getElementById('cust-complement').value.trim() : '';

  if (!custName) {
    showToast('Por favor, digite seu nome.', '⚠️');
    document.getElementById('cust-name').focus();
    return;
  }

  if (!custPhone || custPhone.replace(/\D/g, '').length < 10) {
    showToast('Digite seu WhatsApp com DDD para contato.', '⚠️');
    document.getElementById('cust-phone').focus();
    return;
  }

  if (currentDeliveryOption === 'delivery') {
    const street = document.getElementById('cust-street').value.trim();
    const number = document.getElementById('cust-number').value.trim();
    if (!street || !number) {
      showToast('Preencha Rua e Número para a entrega.', '⚠️');
      document.getElementById('cust-street').focus();
      return;
    }
    const bairro = document.getElementById('cust-bairro').value.trim();
    const cep = document.getElementById('cust-cep').value.trim();
    customerAddressText = `${street}, ${number}${complement ? ' (' + complement + ')' : ''} - ${bairro || ''} ${cep ? '[CEP: ' + cep + ']' : ''}`.trim();
  }

  // Salva dados cadastrais da cliente para compras futuras
  autoSaveCustomerForm();

  let subtotal = availableItems.reduce((acc, item) => acc + item.price, 0);
  let total = subtotal;

  let msg = `🌸 *Olá meninas do Brechó Sisters!* 💖\n\n`;
  msg += `Meu nome é *${custName}* e separei estas pecinhas na minha sacolinha:\n\n`;

  availableItems.forEach((item) => {
    msg += `• *${item.name}* (${item.size}) - R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
  });

  msg += `\n💰 *Subtotal das peças:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;

  if (currentDeliveryOption === 'pickup') {
    msg += `📍 *Modalidade:* 🏡 Vou retirar na casa das Sisters!\n`;
    msg += `🗺️ *Endereço do Brechó:* ${appConfig.address}\n`;
  } else {
    total += isWithinRadius ? appConfig.deliveryFee : 0;
    msg += `📍 *Modalidade:* 🛵 Desejo receber em casa!\n`;
    msg += `🏠 *Meu Endereço:* ${customerAddressText}\n`;
    
    if (calculatedDistanceKm) {
      msg += `📏 *Distância calculada:* ${calculatedDistanceKm.toFixed(1)} km de vocês\n`;
      msg += `🛵 *Taxa de Entrega:* R$ ${appConfig.deliveryFee.toFixed(2).replace('.', ',')}\n`;
    }

    if (customerCoords) {
      const routeUrl = `https://www.google.com/maps/dir/?api=1&origin=${appConfig.lat},${appConfig.lng}&destination=${customerCoords.lat},${customerCoords.lng}`;
      msg += `🗺️ *Link da Rota no Maps:* ${routeUrl}\n`;
    }
  }

  msg += `\n👤 *Dados da Compradora:*\n`;
  msg += `• Nome: ${custName}\n`;
  msg += `• WhatsApp: ${custPhone}\n`;
  if (custCpf) msg += `• CPF: ${custCpf}\n`;

  msg += `\n✨ *VALOR TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;

  if (appConfig.pixKey) {
    msg += `🔑 *Chave PIX:* ${appConfig.pixKey} (${appConfig.pixName})\n\n`;
  }

  msg += `As peças ainda estão disponíveis? Como podemos combinar? Muito obrigada! 🥰`;

  // Registra o pedido detalhado no histórico dos pais
  const newOrder = {
    id: 'PED-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    customerName: custName,
    customerPhone: custPhone,
    customerCpf: custCpf || '-',
    items: availableItems.map(i => `${i.name} (${i.size})`),
    itemsIds: availableItems.map(i => i.id),
    subtotal: subtotal,
    deliveryFee: currentDeliveryOption === 'delivery' && isWithinRadius ? appConfig.deliveryFee : 0,
    total: total,
    type: currentDeliveryOption,
    address: currentDeliveryOption === 'delivery' ? customerAddressText : 'Retirada no Brechó',
    status: 'pendente'
  };

  analyticsData.orders.unshift(newOrder);
  AppStorage.saveAnalytics(analyticsData);

  // Esvazia sacola e preserva cadastro da cliente
  cartItems = [];
  AppStorage.saveCart(cartItems);
  updateCartBadges();
  renderProducts(getActiveCategory(), (document.getElementById('search-input')?.value || '').trim().toLowerCase());
  closeCartModal();
  showToast('Pedido enviado para o WhatsApp! A sacolinha foi esvaziada.', '🎉');

  const cleanPhone = appConfig.whatsapp.replace(/\D/g, '');
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;

  window.open(url, '_blank');
}

// ============================================================================
// PAINEL ADMINISTRATIVO & DASHBOARD DOS PAIS
// ============================================================================

function openAdminModal() {
  document.getElementById('modal-admin').classList.add('active');
  ModalHistoryManager.push('modal-admin');
}

function closeAdminModal(fromPopstate = false) {
  const modal = document.getElementById('modal-admin');
  if (modal) modal.classList.remove('active');
  setActiveBottomNav('nav-home');
  ModalHistoryManager.close('modal-admin', fromPopstate);
}

function setupAdminEvents() {
  const safeOn = (id, event, handler) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, handler);
  };

  // Login com verificação SHA-256 criptografada
  safeOn('btn-admin-login', 'click', async () => {
    const passInput = document.getElementById('admin-password-input');
    const pass = passInput ? passInput.value.trim() : '';
    const inputHash = await sha256Hex(pass);
    const expectedHash = appConfig.adminPasswordHash || '112bca87455d673dba92c8b7b838d519ee6ce35dbf5e6537d953b4ff3cc7e3ec';
    if (inputHash === expectedHash || (appConfig.adminPassword && pass === appConfig.adminPassword)) {
      const loginView = document.getElementById('admin-login-view');
      const dashView = document.getElementById('admin-dashboard-view');
      if (loginView) loginView.style.display = 'none';
      if (dashView) dashView.style.display = 'block';
      loadAdminData();
    } else {
      alert('Senha incorreta das Sisters!');
    }
  });

  // Alternar abas do Admin (Pais, Pedidos, Produtos, Config, FAQ, Stories)
  const tabBtns = [
    { btn: 'tab-btn-parents', content: 'admin-tab-parents-content' },
    { btn: 'tab-btn-orders', content: 'admin-tab-orders-content' },
    { btn: 'tab-btn-products', content: 'admin-tab-products-content' },
    { btn: 'tab-btn-config', content: 'admin-tab-config-content' },
    { btn: 'tab-btn-faq', content: 'admin-tab-faq-content' },
    { btn: 'tab-btn-stories', content: 'admin-tab-stories-content' }
  ];

  tabBtns.forEach(({ btn, content }) => {
    const btnEl = document.getElementById(btn);
    if (!btnEl) return;
    btnEl.addEventListener('click', () => {
      tabBtns.forEach(t => {
        const b = document.getElementById(t.btn);
        const c = document.getElementById(t.content);
        if (b) b.classList.remove('active');
        if (c) c.style.display = 'none';
      });
      btnEl.classList.add('active');
      const cEl = document.getElementById(content);
      if (cEl) cEl.style.display = 'block';
      if (btn === 'tab-btn-parents') renderParentsDashboard();
      if (btn === 'tab-btn-orders') renderOrdersList();
      if (btn === 'tab-btn-faq') renderAdminFAQList();
      if (btn === 'tab-btn-stories') renderAdminStoriesList();
    });
  });

  // Exportar Relatório CSV
  safeOn('btn-export-sales-csv', 'click', exportOrdersCSV);

  // Mostrar form de adicionar produto
  safeOn('btn-show-add-product', 'click', () => {
    const form = document.getElementById('form-product');
    if (form) form.reset();
    const pId = document.getElementById('prod-form-id');
    if (pId) pId.value = '';
    const title = document.getElementById('form-product-title');
    if (title) title.textContent = 'Cadastrar Nova Peça 🎀';
    adminFormPhotos = [];
    renderAdminPhotosGrid();
    if (form) form.style.display = 'block';
  });

  safeOn('btn-cancel-product', 'click', () => {
    const form = document.getElementById('form-product');
    if (form) form.style.display = 'none';
  });

  // Upload e Inserção de Fotos da Peça (Até 4 fotos)
  safeOn('btn-add-img-url', 'click', addAdminPhotoFromUrl);
  safeOn('prod-form-img-file', 'change', handleAdminPhotoFile);

  // Submissão do formulário de produto
  safeOn('form-product', 'submit', (e) => {
    e.preventDefault();
    saveProductFromForm();
  });

  // Submissão do formulário de configuração
  safeOn('form-config', 'submit', (e) => {
    e.preventDefault();
    saveConfigFromForm();
  });

  // Alterar Senha de Gestão
  safeOn('btn-change-admin-pwd', 'click', changeAdminPassword);

  // Pré-visualizar vídeo configurado
  safeOn('btn-preview-video-cfg', 'click', () => {
    const vUrl = document.getElementById('cfg-video-url').value.trim();
    if (!vUrl) {
      alert('Preencha a URL do vídeo/foto primeiro.');
      return;
    }
    openStoryPreviewDirect('Vídeo de Boas-Vindas', document.getElementById('cfg-welcome-msg').value, vUrl);
  });

  // Eventos de FAQ no Admin
  safeOn('btn-show-add-faq', 'click', () => {
    const form = document.getElementById('form-faq');
    if (form) form.reset();
    const idEl = document.getElementById('faq-form-id');
    if (idEl) idEl.value = '';
    const titleEl = document.getElementById('form-faq-title');
    if (titleEl) titleEl.textContent = 'Nova Dúvida 💬';
    if (form) form.style.display = 'block';
  });

  safeOn('btn-cancel-faq', 'click', () => {
    const form = document.getElementById('form-faq');
    if (form) form.style.display = 'none';
  });

  safeOn('form-faq', 'submit', (e) => {
    e.preventDefault();
    saveFAQFromForm();
  });

  // Eventos de Stories no Admin
  safeOn('btn-cancel-story', 'click', () => {
    const form = document.getElementById('form-story');
    if (form) form.style.display = 'none';
  });

  safeOn('btn-test-story-media', 'click', () => {
    const media = document.getElementById('story-form-media').value.trim();
    const title = document.getElementById('story-form-title').value.trim() || 'Teste de Story';
    const text = document.getElementById('story-form-text').value.trim() || 'Prévia do story...';
    if (!media) {
      alert('Digite o link da mídia primeiro.');
      return;
    }
    openStoryPreviewDirect(title, text, media);
  });

  safeOn('form-story', 'submit', (e) => {
    e.preventDefault();
    saveStoryFromForm();
  });

  // Alternar som no Player de Story
  safeOn('btn-story-sound', 'click', toggleStorySound);

  // Buscar coordenadas do endereço da vendedora automaticamente
  safeOn('btn-get-seller-coords', 'click', async () => {
    const addrInput = document.getElementById('cfg-address');
    const address = addrInput ? addrInput.value.trim() : '';
    if (!address) {
      alert('Digite o endereço primeiro.');
      return;
    }
    showToast('Buscando coordenadas no mapa...', '🗺️');
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`);
      const data = await res.json();
      if (data && data.length > 0) {
        document.getElementById('cfg-lat').value = parseFloat(data[0].lat).toFixed(6);
        document.getElementById('cfg-lng').value = parseFloat(data[0].lon).toFixed(6);
        showToast('Coordenadas encontradas com sucesso!', '✨');
      } else {
        alert('Não encontramos as coordenadas exatas deste endereço. Você pode preencher manualmente.');
      }
    } catch (err) {
      alert('Erro ao buscar coordenadas. Preencha manualmente.');
    }
  });
}

function loadAdminData() {
  // Ativa a aba de Peças como padrão
  const prodTab = document.getElementById('tab-btn-products');
  if (prodTab) prodTab.click();

  renderParentsDashboard();
  renderOrdersList();
  renderAdminProductsList();
  renderAdminFAQList();
  renderAdminStoriesList();

  // Carrega campos de configuração
  document.getElementById('cfg-whatsapp').value = appConfig.whatsapp || '';
  document.getElementById('cfg-address').value = appConfig.address || '';
  document.getElementById('cfg-lat').value = appConfig.lat || '';
  document.getElementById('cfg-lng').value = appConfig.lng || '';
  document.getElementById('cfg-radius-km').value = appConfig.radiusKm || 2.0;
  document.getElementById('cfg-delivery-fee').value = appConfig.deliveryFee || 5.00;
  document.getElementById('cfg-pix-key').value = appConfig.pixKey || '';
  document.getElementById('cfg-pix-name').value = appConfig.pixName || '';

  const cfgVideo = document.getElementById('cfg-video-url');
  if (cfgVideo) cfgVideo.value = appConfig.videoUrl || '';

  const cfgWelcome = document.getElementById('cfg-welcome-msg');
  if (cfgWelcome) cfgWelcome.value = appConfig.welcomeMsg || '';

  const cfgRules = document.getElementById('cfg-delivery-rules');
  if (cfgRules) cfgRules.value = appConfig.deliveryRules || '';
}

// ============================================================================
// DASHBOARD DOS PAIS & ANALYTICS
// ============================================================================

function renderParentsDashboard() {
  const orders = analyticsData.orders || [];

  // Cálculos financeiros
  const completedOrders = orders.filter(o => o.status === 'concluido');
  const pendingOrders = orders.filter(o => o.status === 'pendente');

  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.total, 0);
  const pendingRevenue = pendingOrders.reduce((sum, o) => sum + o.total, 0);

  const soldCount = productsList.filter(p => p.status === 'vendido').length;

  document.getElementById('kpi-total-revenue').textContent = `R$ ${totalRevenue.toFixed(2).replace('.', ',')}`;
  document.getElementById('kpi-revenue-sub').textContent = `${soldCount} peças vendidas`;

  document.getElementById('kpi-pending-revenue').textContent = `R$ ${pendingRevenue.toFixed(2).replace('.', ',')}`;
  document.getElementById('kpi-pending-sub').textContent = `${pendingOrders.length} ${pendingOrders.length === 1 ? 'pedido aberto' : 'pedidos abertos'}`;

  document.getElementById('kpi-total-visits').textContent = analyticsData.visits || 0;

  const totalSearches = Object.values(analyticsData.searches || {}).reduce((a, b) => a + b, 0);
  document.getElementById('kpi-total-searches').textContent = totalSearches;

  // Distribuição por Categoria
  const categoryTotals = { roupas: 0, calcados: 0, brinquedos: 0, acessorios: 0 };
  productsList.forEach(p => {
    if (p.status === 'vendido' && categoryTotals[p.category] !== undefined) {
      categoryTotals[p.category] += p.price;
    }
  });

  const catSum = Object.values(categoryTotals).reduce((a, b) => a + b, 0) || 1;

  ['roupas', 'calcados', 'brinquedos', 'acessorios'].forEach(cat => {
    const val = categoryTotals[cat] || 0;
    const pct = Math.round((val / catSum) * 100);
    const barEl = document.getElementById(`bar-fill-${cat}`);
    const labelEl = document.getElementById(`bar-val-${cat}`);
    if (barEl) barEl.style.width = `${pct}%`;
    if (labelEl) labelEl.textContent = `R$ ${val.toFixed(2).replace('.', ',')} (${pct}%)`;
  });

  // Nuvem de Termos Buscados
  const tagsContainer = document.getElementById('search-tags-list');
  tagsContainer.innerHTML = '';
  const sortedSearches = Object.entries(analyticsData.searches || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  if (sortedSearches.length === 0) {
    tagsContainer.innerHTML = '<span style="font-size: 0.78rem; color: #A0AEC0;">Nenhuma busca registrada ainda.</span>';
  } else {
    sortedSearches.forEach(([term, count]) => {
      const tag = document.createElement('span');
      tag.className = 'search-tag-pill';
      tag.innerHTML = `"${term}" <span class="search-tag-count">${count}x</span>`;
      tagsContainer.appendChild(tag);
    });
  }
}

function renderOrdersList() {
  const container = document.getElementById('admin-orders-list');
  const badge = document.getElementById('orders-count-badge');
  const orders = analyticsData.orders || [];

  badge.textContent = `${orders.length} ${orders.length === 1 ? 'pedido' : 'pedidos'}`;
  container.innerHTML = '';

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="empty-state-box" style="padding: 20px 0;">
        <div class="empty-icon">📋</div>
        <h4 class="empty-title">Nenhum pedido ainda!</h4>
        <p class="empty-desc">Assim que os clientes concluírem a sacolinha via WhatsApp, os pedidos aparecerão aqui.</p>
      </div>
    `;
    return;
  }

  orders.forEach(order => {
    const isDone = order.status === 'concluido';
    const cleanPhone = (order.customerPhone || '').replace(/\D/g, '');
    const waLink = cleanPhone ? `https://wa.me/55${cleanPhone}?text=${encodeURIComponent('Olá ' + (order.customerName || 'querida cliente') + '! Falamos do Brechó Sisters sobre seu pedido ' + order.id)}` : '#';

    const card = document.createElement('div');
    card.className = 'order-card-row';
    card.innerHTML = `
      <div class="order-header-row">
        <span class="order-id-badge">${order.id}</span>
        <span class="order-date-text">📅 ${order.date}</span>
      </div>

      <div style="font-size: 0.84rem; font-weight: 800; color: #2D3436; margin-top: 2px;">
        👤 ${order.customerName || 'Cliente Brechó'} 
        ${order.customerPhone ? `<span style="font-size: 0.74rem; color: #636E72; font-weight: 600;">(${order.customerPhone})</span>` : ''}
      </div>

      <div class="order-items-desc">
        <strong>Itens:</strong> ${order.items.join(', ')}
      </div>

      <div style="font-size: 0.76rem; color: #4A5568;">
        <strong>Modalidade:</strong> ${order.type === 'delivery' ? '🛵 Entrega em Casa' : '🏡 Retirada no Brechó'} • <em>${order.address}</em>
      </div>

      <div class="order-footer-row">
        <strong style="font-size: 0.95rem; color: #FF477E; font-family: 'Fredoka', cursive;">
          R$ ${order.total.toFixed(2).replace('.', ',')}
        </strong>

        <div style="display: flex; gap: 6px; align-items: center;">
          ${cleanPhone ? `
            <a href="${waLink}" target="_blank" style="padding: 5px 8px; background: #25D366; color: #FFF; border-radius: var(--radius-sm); font-size: 0.72rem; font-weight: 800; text-decoration: none;">
              💬 WhatsApp
            </a>
          ` : ''}

          ${!isDone ? `
            <button class="btn-order-complete" onclick="completeOrder('${order.id}')">
              ✓ Baixa (Pago)
            </button>
          ` : `
            <span style="font-size: 0.74rem; font-weight: 800; color: #00B894;">
              ✓ Concluído
            </span>
          `}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function completeOrder(orderId) {
  const order = analyticsData.orders.find(o => o.id === orderId);
  if (!order) return;

  order.status = 'concluido';

  // Marca os produtos como vendidos automaticamente no catálogo
  if (order.itemsIds && order.itemsIds.length > 0) {
    order.itemsIds.forEach(id => {
      const prod = productsList.find(p => p.id === id);
      if (prod) prod.status = 'vendido';
    });
    AppStorage.saveProducts(productsList);
    renderProducts();
    renderAdminProductsList();
  }

  AppStorage.saveAnalytics(analyticsData);
  renderOrdersList();
  renderParentsDashboard();
  showToast(`Pedido ${orderId} marcado como concluído!`, '🎉');
}

function exportOrdersCSV() {
  const orders = analyticsData.orders || [];
  if (orders.length === 0) {
    alert('Não há pedidos registrados para exportar.');
    return;
  }

  let csvContent = 'data:text/csv;charset=utf-8,\uFEFF';
  csvContent += 'ID Pedido;Data;Cliente;Telefone;CPF;Itens;Modalidade;Endereço;Subtotal (R$);Taxa Entrega (R$);Total (R$);Status\n';

  orders.forEach(o => {
    const cleanItems = o.items.join(' + ').replace(/;/g, ',');
    const cleanAddress = (o.address || '').replace(/;/g, ',');
    csvContent += `${o.id};${o.date};"${o.customerName || '-'}";"${o.customerPhone || '-'}";"${o.customerCpf || '-'}";"${cleanItems}";${o.type === 'delivery' ? 'Entrega' : 'Retirada'};"${cleanAddress}";${o.subtotal.toFixed(2)};${o.deliveryFee.toFixed(2)};${o.total.toFixed(2)};${o.status}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `relatorio_brecho_sisters_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Relatório baixado com sucesso!', '📊');
}

function renderAdminProductsList() {
  const container = document.getElementById('admin-products-list');
  container.innerHTML = '';

  productsList.forEach(prod => {
    const row = document.createElement('div');
    row.className = 'admin-product-row';
    const photoCountText = (prod.images && prod.images.length > 1) ? `📸 ${prod.images.length} fotos` : '📸 1 foto';

    row.innerHTML = `
      <div class="admin-prod-meta">
        <img src="${prod.image}" alt="${prod.name}" class="admin-prod-thumb" onerror="this.src='icon.svg'">
        <div>
          <strong style="font-size: 0.85rem;">${prod.name}</strong>
          <div style="font-size: 0.72rem; color: #636E72;">
            ${prod.size} • R$ ${prod.price.toFixed(2).replace('.', ',')} • ${photoCountText} • 
            <span style="font-weight: 800; color: ${prod.status === 'disponivel' ? '#00B894' : '#E17055'}">
              ${prod.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
      <div class="admin-actions-btns">
        <button class="btn-admin-action" style="background: #E2CBF7;" onclick="editProductAdmin('${prod.id}')">✏️</button>
        <button class="btn-admin-action" style="background: ${prod.status === 'disponivel' ? '#FFEAA7' : '#B5EAD7'};" onclick="toggleProductStatus('${prod.id}')">
          ${prod.status === 'disponivel' ? 'Marcar Vendido' : 'Disponibilizar'}
        </button>
        <button class="btn-admin-action" style="background: #FF7675; color: #FFF;" onclick="deleteProductAdmin('${prod.id}')">🗑️</button>
      </div>
    `;
    container.appendChild(row);
  });
}

// ============================================================================
// GESTÃO DE FOTOS DA PEÇA NO PAINEL ADMIN (ATÉ 4 FOTOS)
// ============================================================================
let adminFormPhotos = [];

function renderAdminPhotosGrid() {
  const grid = document.getElementById('admin-photos-grid');
  if (!grid) return;
  grid.innerHTML = '';

  adminFormPhotos.forEach((photoUrl, idx) => {
    const slot = document.createElement('div');
    slot.className = 'admin-photo-slot';
    const isCover = idx === 0;
    slot.innerHTML = `
      <img src="${photoUrl}" alt="Foto ${idx + 1}" onerror="this.src='icon.svg'">
      <span class="slot-label">${isCover ? '⭐ Capa Vitrine' : `Foto ${idx + 1}`}</span>
      <button type="button" class="btn-del-photo" onclick="removeAdminPhoto(${idx})" title="Remover esta foto">✕</button>
    `;
    grid.appendChild(slot);
  });

  if (adminFormPhotos.length < 4) {
    const addSlot = document.createElement('div');
    addSlot.className = 'admin-photo-slot add-slot';
    addSlot.title = 'Clique para escolher foto do seu computador ou celular (até 4 fotos)';
    addSlot.onclick = () => {
      const fileInput = document.getElementById('prod-form-img-file');
      if (fileInput) fileInput.click();
    };
    addSlot.innerHTML = `
      <div style="font-size: 1.4rem;">➕</div>
      <span style="font-size: 0.65rem; font-weight: 800; color: #BA75E3; margin-top: 3px;">
        ${adminFormPhotos.length === 0 ? 'Add Capa' : `Add Foto ${adminFormPhotos.length + 1}`}
      </span>
    `;
    grid.appendChild(addSlot);
  }

  const hiddenUrl = document.getElementById('prod-form-img-url');
  if (hiddenUrl) {
    hiddenUrl.value = adminFormPhotos.length > 0 ? adminFormPhotos[0] : '';
  }
}

function removeAdminPhoto(idx) {
  if (idx >= 0 && idx < adminFormPhotos.length) {
    adminFormPhotos.splice(idx, 1);
    renderAdminPhotosGrid();
  }
}

function addAdminPhotoFromUrl() {
  const input = document.getElementById('prod-form-img-url-input');
  if (!input) return;
  const url = input.value.trim();
  if (!url) {
    showToast('Cole o link da foto da internet!', '⚠️');
    return;
  }
  if (adminFormPhotos.length >= 4) {
    showToast('Limite máximo de 4 fotos atingido!', '⚠️');
    return;
  }
  adminFormPhotos.push(url);
  input.value = '';
  renderAdminPhotosGrid();
  showToast(`Foto ${adminFormPhotos.length} adicionada!`, '📸');
}

function handleAdminPhotoFile(e) {
  const files = e.target.files;
  if (!files || !files[0]) return;
  if (adminFormPhotos.length >= 4) {
    showToast('Limite de 4 fotos por peça!', '⚠️');
    e.target.value = '';
    return;
  }

  compressImageFile(files[0], (compressedDataUrl) => {
    adminFormPhotos.push(compressedDataUrl);
    e.target.value = '';
    renderAdminPhotosGrid();
    showToast(`Foto ${adminFormPhotos.length} anexada com sucesso!`, '📸');
  });
}

// Comprime imagem para economizar espaço mantendo alta nitidez
function compressImageFile(file, callback) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const maxDim = 800;
      let width = img.width;
      let height = img.height;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      let dataUrl = canvas.toDataURL('image/webp', 0.82);
      if (!dataUrl.startsWith('data:image/webp')) {
        dataUrl = canvas.toDataURL('image/jpeg', 0.82);
      }
      callback(dataUrl);
    };
    img.onerror = () => callback(event.target.result);
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

window.removeAdminPhoto = removeAdminPhoto;

function saveProductFromForm() {
  const idInput = document.getElementById('prod-form-id').value;
  const name = document.getElementById('prod-form-name').value.trim();
  const category = document.getElementById('prod-form-category').value;
  const size = document.getElementById('prod-form-size').value.trim();
  const price = parseFloat(document.getElementById('prod-form-price').value);
  const condition = document.getElementById('prod-form-condition').value;
  const desc = document.getElementById('prod-form-desc').value.trim();

  if (!name || isNaN(price)) {
    alert('Preencha o nome da peça e um preço válido!');
    return;
  }

  let conditionLabel = '💕 Em Ótimo Estado';
  if (condition === 'novo') conditionLabel = '🏷️ Novo com Etiqueta';
  if (condition === 'usado-1x') conditionLabel = '✨ Usado 1 vez';

  const defaultPlaceholder = 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80';
  const finalImages = adminFormPhotos.length > 0 ? [...adminFormPhotos] : [defaultPlaceholder];
  const finalImage = finalImages[0];

  if (idInput) {
    // Editar
    const idx = productsList.findIndex(p => p.id === idInput);
    if (idx > -1) {
      productsList[idx] = {
        ...productsList[idx],
        name, category, size, price, condition, conditionLabel,
        image: finalImage,
        images: finalImages,
        desc
      };
    }
  } else {
    // Novo
    const newProd = {
      id: 'prod-' + Date.now(),
      name, category, size, price, condition, conditionLabel,
      image: finalImage,
      images: finalImages,
      desc,
      status: 'disponivel'
    };
    productsList.unshift(newProd);
  }

  AppStorage.saveProducts(productsList);
  renderProducts();
  renderAdminProductsList();
  document.getElementById('form-product').style.display = 'none';
  showToast('Peça salva com sucesso!', '✨');
}

function editProductAdmin(id) {
  const prod = productsList.find(p => p.id === id);
  if (!prod) return;

  document.getElementById('prod-form-id').value = prod.id;
  document.getElementById('prod-form-name').value = prod.name;
  document.getElementById('prod-form-category').value = prod.category;
  document.getElementById('prod-form-size').value = prod.size;
  document.getElementById('prod-form-price').value = prod.price;
  document.getElementById('prod-form-condition').value = prod.condition;
  document.getElementById('prod-form-desc').value = prod.desc || '';

  if (Array.isArray(prod.images) && prod.images.length > 0) {
    adminFormPhotos = [...prod.images];
  } else if (prod.image) {
    adminFormPhotos = [prod.image];
  } else {
    adminFormPhotos = [];
  }
  renderAdminPhotosGrid();

  document.getElementById('form-product-title').textContent = 'Editar Peça ✏️';
  document.getElementById('form-product').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleProductStatus(id) {
  const prod = productsList.find(p => p.id === id);
  if (!prod) return;

  prod.status = prod.status === 'disponivel' ? 'vendido' : 'disponivel';
  AppStorage.saveProducts(productsList);
  renderProducts();
  renderAdminProductsList();
  showToast(`Status alterado para: ${prod.status}`, '✨');
}

function deleteProductAdmin(id) {
  if (confirm('Tem certeza que deseja excluir esta peça da vitrine?')) {
    productsList = productsList.filter(p => p.id !== id);
    AppStorage.saveProducts(productsList);
    renderProducts();
    renderAdminProductsList();
    showToast('Peça excluída com sucesso!', '🗑️');
  }
}

function saveConfigFromForm() {
  appConfig.whatsapp = document.getElementById('cfg-whatsapp').value.trim();
  appConfig.address = document.getElementById('cfg-address').value.trim();
  appConfig.lat = parseFloat(document.getElementById('cfg-lat').value);
  appConfig.lng = parseFloat(document.getElementById('cfg-lng').value);
  appConfig.radiusKm = parseFloat(document.getElementById('cfg-radius-km').value);
  appConfig.deliveryFee = parseFloat(document.getElementById('cfg-delivery-fee').value);
  appConfig.pixKey = document.getElementById('cfg-pix-key').value.trim();
  appConfig.pixName = document.getElementById('cfg-pix-name').value.trim();

  const cfgVideo = document.getElementById('cfg-video-url');
  if (cfgVideo) appConfig.videoUrl = cfgVideo.value.trim();

  const cfgWelcome = document.getElementById('cfg-welcome-msg');
  if (cfgWelcome) appConfig.welcomeMsg = cfgWelcome.value.trim();

  const cfgRules = document.getElementById('cfg-delivery-rules');
  if (cfgRules) appConfig.deliveryRules = cfgRules.value.trim();

  AppStorage.saveConfig(appConfig);
  initUI();
  showToast('Configurações do Brechó salvas!', '💾');
}

// ============================================================================
// TOAST NOTIFIER
// ============================================================================

let toastTimeout = null;

function showToast(message, icon = '✨') {
  const toast = document.getElementById('toast-notice');
  const msgEl = document.getElementById('toast-msg');
  const iconEl = document.getElementById('toast-icon');

  msgEl.textContent = message;
  iconEl.textContent = icon;

  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// ============================================================================
// STORIES & VÍDEOS DE BOAS-VINDAS DAS SISTERS
// ============================================================================

// Detecta se a URL é de um vídeo real (MP4, WebM, etc.)
function isVideoMedia(url) {
  if (!url) return false;
  const clean = url.split('?')[0].toLowerCase();
  return clean.endsWith('.mp4') || clean.endsWith('.webm') || clean.endsWith('.ogg') || clean.endsWith('.mov') || url.startsWith('data:video/');
}

let storyTimer = null;
let isStoryMuted = true;

function toggleStorySound() {
  const video = document.getElementById('story-media-video');
  const btn = document.getElementById('btn-story-sound');
  if (!video || !btn) return;
  isStoryMuted = !isStoryMuted;
  video.muted = isStoryMuted;
  btn.textContent = isStoryMuted ? '🔇' : '🔊';
}

function getStoriesData() {
  return appConfig.stories || DEFAULT_CONFIG.stories;
}

function openStory(type) {
  const stories = getStoriesData();
  const story = stories[type] || stories['welcome'];
  if (!story) return;

  const modal = document.getElementById('modal-story-view');
  const title = document.getElementById('story-caption-title');
  const text = document.getElementById('story-caption-text');
  const img = document.getElementById('story-media-img');
  const video = document.getElementById('story-media-video');
  const fill = document.getElementById('story-progress-fill');
  const soundBtn = document.getElementById('btn-story-sound');

  if (!modal || !title || !text) return;

  title.textContent = story.title;
  text.textContent = story.text;

  const isVid = isVideoMedia(story.media);

  if (isVid && video) {
    if (img) img.style.display = 'none';
    video.style.display = 'block';
    video.src = story.media;
    video.muted = isStoryMuted;
    video.currentTime = 0;
    video.play().catch(() => {});
    if (soundBtn) {
      soundBtn.style.display = 'flex';
      soundBtn.textContent = isStoryMuted ? '🔇' : '🔊';
    }
  } else {
    if (video) {
      video.pause();
      video.style.display = 'none';
    }
    if (img) {
      img.style.display = 'block';
      img.src = story.media;
    }
    if (soundBtn) soundBtn.style.display = 'none';
  }

  fill.style.width = '0%';
  fill.style.transition = 'none';

  modal.classList.add('active');
  ModalHistoryManager.push('modal-story-view');

  const durationMs = isVid ? 12000 : 7000;

  setTimeout(() => {
    fill.style.transition = `width ${durationMs / 1000}s linear`;
    fill.style.width = '100%';
  }, 50);

  if (storyTimer) clearTimeout(storyTimer);
  storyTimer = setTimeout(() => {
    closeStory();
  }, durationMs + 100);
}

function openStoryPreviewDirect(customTitle, customText, mediaUrl) {
  const modal = document.getElementById('modal-story-view');
  const title = document.getElementById('story-caption-title');
  const text = document.getElementById('story-caption-text');
  const img = document.getElementById('story-media-img');
  const video = document.getElementById('story-media-video');
  const fill = document.getElementById('story-progress-fill');
  const soundBtn = document.getElementById('btn-story-sound');

  if (!modal || !title || !text) return;

  title.textContent = customTitle || 'Prévia das Sisters ✨';
  text.textContent = customText || 'Mensagem do vídeo...';

  const isVid = isVideoMedia(mediaUrl);

  if (isVid && video) {
    if (img) img.style.display = 'none';
    video.style.display = 'block';
    video.src = mediaUrl;
    video.muted = isStoryMuted;
    video.currentTime = 0;
    video.play().catch(() => {});
    if (soundBtn) {
      soundBtn.style.display = 'flex';
      soundBtn.textContent = isStoryMuted ? '🔇' : '🔊';
    }
  } else {
    if (video) {
      video.pause();
      video.style.display = 'none';
    }
    if (img) {
      img.style.display = 'block';
      img.src = mediaUrl;
    }
    if (soundBtn) soundBtn.style.display = 'none';
  }

  fill.style.width = '0%';
  fill.style.transition = 'none';

  modal.classList.add('active');
  ModalHistoryManager.push('modal-story-view');

  const durationMs = isVid ? 12000 : 7000;

  setTimeout(() => {
    fill.style.transition = `width ${durationMs / 1000}s linear`;
    fill.style.width = '100%';
  }, 50);

  if (storyTimer) clearTimeout(storyTimer);
  storyTimer = setTimeout(() => {
    closeStory();
  }, durationMs + 100);
}

function closeStory(fromPopstate = false) {
  const modal = document.getElementById('modal-story-view');
  if (modal) modal.classList.remove('active');
  const video = document.getElementById('story-media-video');
  if (video) {
    video.pause();
    video.removeAttribute('src');
    video.load();
  }
  if (storyTimer) clearTimeout(storyTimer);
  ModalHistoryManager.close('modal-story-view', fromPopstate);
}

// Bind seguro dos botões de Stories
['welcome', 'care', 'delivery', 'garimpo'].forEach(type => {
  const btn = document.getElementById(`btn-story-${type}`);
  if (btn) btn.addEventListener('click', () => openStory(type));
});
const btnCloseStory = document.getElementById('btn-close-story');
if (btnCloseStory) btnCloseStory.addEventListener('click', closeStory);

/**
 * Abre o Vídeo/Apresentação de Boas-Vindas das Sisters
 * (Disparado pelo botão do Header e pelo banner na Central de Dúvidas)
 */
function openSistersWelcomeVideo() {
  openStory('welcome');
}

// ============================================================================
// GESTÃO DINÂMICA DE FAQ (PERGUNTAS FREQUENTES)
// ============================================================================

function renderFAQ() {
  const container = document.getElementById('faq-accordion-list');
  if (!container) return;
  const faqs = appConfig.faq || DEFAULT_CONFIG.faq;
  container.innerHTML = '';

  faqs.forEach((item, index) => {
    const details = document.createElement('details');
    details.className = 'faq-item';
    if (index === 0) details.setAttribute('open', '');
    details.innerHTML = `
      <summary class="faq-question">${item.question}</summary>
      <p class="faq-answer">${item.answer.replace(/\n/g, '<br>')}</p>
    `;
    container.appendChild(details);
  });
}

function renderAdminFAQList() {
  const container = document.getElementById('admin-faq-list');
  if (!container) return;
  const faqs = appConfig.faq || [];
  container.innerHTML = '';

  if (faqs.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:16px; color:#A0AEC0; font-size:0.85rem;">Nenhuma dúvida cadastrada ainda.</div>';
    return;
  }

  faqs.forEach(faq => {
    const card = document.createElement('div');
    card.className = 'admin-faq-item-card';
    card.innerHTML = `
      <div class="admin-faq-card-header">
        <span class="admin-faq-card-q">${faq.question}</span>
        <div class="admin-actions-btns">
          <button type="button" class="btn-admin-action" style="background:#E2CBF7;" onclick="editFAQItem('${faq.id}')">✏️</button>
          <button type="button" class="btn-admin-action" style="background:#FF7675; color:#FFF;" onclick="deleteFAQItem('${faq.id}')">🗑️</button>
        </div>
      </div>
      <div class="admin-faq-card-a">${faq.answer}</div>
    `;
    container.appendChild(card);
  });
}

function editFAQItem(id) {
  const item = (appConfig.faq || []).find(f => f.id === id);
  if (!item) return;

  document.getElementById('faq-form-id').value = item.id;
  document.getElementById('faq-form-question').value = item.question;
  document.getElementById('faq-form-answer').value = item.answer;
  document.getElementById('form-faq-title').textContent = 'Editar Dúvida 💬';
  document.getElementById('form-faq').style.display = 'block';
  document.getElementById('form-faq').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function deleteFAQItem(id) {
  if (confirm('Deseja realmente excluir esta dúvida frequente?')) {
    appConfig.faq = (appConfig.faq || []).filter(f => f.id !== id);
    AppStorage.saveConfig(appConfig);
    renderAdminFAQList();
    renderFAQ();
    showToast('Dúvida excluída com sucesso!', '🗑️');
  }
}

function saveFAQFromForm() {
  const id = document.getElementById('faq-form-id').value;
  const question = document.getElementById('faq-form-question').value.trim();
  const answer = document.getElementById('faq-form-answer').value.trim();

  if (!question || !answer) {
    alert('Preencha a pergunta e a resposta.');
    return;
  }

  if (!appConfig.faq) appConfig.faq = [];

  if (id) {
    const idx = appConfig.faq.findIndex(f => f.id === id);
    if (idx > -1) {
      appConfig.faq[idx] = { id, question, answer };
    }
  } else {
    appConfig.faq.push({
      id: 'faq-' + Date.now(),
      question,
      answer
    });
  }

  AppStorage.saveConfig(appConfig);
  renderAdminFAQList();
  renderFAQ();
  document.getElementById('form-faq').style.display = 'none';
  showToast('Dúvida salva com sucesso!', '✨');
}

// ============================================================================
// GESTÃO DINÂMICA DE STORIES DA SEMANA
// ============================================================================

function renderAdminStoriesList() {
  const container = document.getElementById('admin-stories-list');
  if (!container) return;
  const stories = appConfig.stories || DEFAULT_CONFIG.stories;
  container.innerHTML = '';

  Object.entries(stories).forEach(([key, story]) => {
    const row = document.createElement('div');
    row.className = 'admin-story-row';
    const isVid = isVideoMedia(story.media);
    row.innerHTML = `
      <div class="admin-story-meta">
        ${isVid ? `
          <div class="admin-story-thumb" style="display:flex;align-items:center;justify-content:center;background:#2D3436;color:#FFF;font-size:1.1rem;" title="Vídeo">🎬</div>
        ` : `
          <img src="${story.media}" alt="${story.title}" class="admin-story-thumb" onerror="this.src='icon.svg'">
        `}
        <div>
          <strong style="font-size: 0.85rem; display:block; color:#2D3436;">${story.title}</strong>
          <span style="font-size: 0.72rem; color: #636E72;">
            ${(story.text || '').substring(0, 52)}...
          </span>
        </div>
      </div>
      <div class="admin-actions-btns">
        <button type="button" class="btn-admin-action" style="background:#B2E2F8;" onclick="openStory('${key}')">▶ Ver</button>
        <button type="button" class="btn-admin-action" style="background:#E2CBF7;" onclick="editStoryAdmin('${key}')">✏️</button>
      </div>
    `;
    container.appendChild(row);
  });
}

function editStoryAdmin(id) {
  const stories = appConfig.stories || DEFAULT_CONFIG.stories;
  const story = stories[id];
  if (!story) return;

  document.getElementById('story-form-id').value = id;
  document.getElementById('story-form-title').value = story.title;
  document.getElementById('story-form-text').value = story.text;
  document.getElementById('story-form-media').value = story.media;
  document.getElementById('form-story-title').textContent = `Editar: ${story.title} ✨`;
  document.getElementById('form-story').style.display = 'block';
  document.getElementById('form-story').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function saveStoryFromForm() {
  const id = document.getElementById('story-form-id').value;
  const title = document.getElementById('story-form-title').value.trim();
  const text = document.getElementById('story-form-text').value.trim();
  const media = document.getElementById('story-form-media').value.trim();

  if (!title || !text || !media) {
    alert('Preencha todos os campos do story.');
    return;
  }

  if (!appConfig.stories) appConfig.stories = { ...DEFAULT_CONFIG.stories };
  appConfig.stories[id] = { id, title, text, media };

  // Se for o de boas-vindas, sincroniza também os campos globais de vídeo
  if (id === 'welcome') {
    appConfig.videoUrl = media;
    appConfig.welcomeMsg = text;
    const cfgVideo = document.getElementById('cfg-video-url');
    if (cfgVideo) cfgVideo.value = media;
    const cfgMsg = document.getElementById('cfg-welcome-msg');
    if (cfgMsg) cfgMsg.value = text;
  }

  AppStorage.saveConfig(appConfig);
  renderAdminStoriesList();
  initUI();
  document.getElementById('form-story').style.display = 'none';
  showToast('Story atualizado com carinho!', '💖');
}

// ============================================================================
// SEGURANÇA & ALTERAÇÃO DE SENHA DO ADMIN
// ============================================================================

async function changeAdminPassword() {
  const newPwd = document.getElementById('cfg-new-password').value;
  const confirmPwd = document.getElementById('cfg-confirm-password').value;

  if (!newPwd || newPwd.length < 4) {
    alert('A nova senha deve ter pelo menos 4 caracteres.');
    return;
  }
  if (newPwd !== confirmPwd) {
    alert('A confirmação da nova senha não confere. Digite a mesma senha nos dois campos.');
    return;
  }

  const newHash = await sha256Hex(newPwd);
  appConfig.adminPasswordHash = newHash;
  delete appConfig.adminPassword; // Remove senha em texto plano legada caso existisse
  AppStorage.saveConfig(appConfig);

  document.getElementById('cfg-new-password').value = '';
  document.getElementById('cfg-confirm-password').value = '';
  showToast('Senha do painel alterada com sucesso!', '🔐');
}

/**
 * Modal de Regras de Entrega & Retirada
 * (Parametrizado via Admin e exibido em tela exclusiva sem abrir carrinho)
 */
function openDeliveryRulesModal() {
  const modal = document.getElementById('modal-delivery-rules');
  const body = document.getElementById('rules-content-body');
  if (!modal || !body) return;

  const rulesText = appConfig.deliveryRules || '🌸 Entregamos com motinho com todo carinho nas redondezas (raio de até 2km do nosso brechó) por taxa fixa de apenas R$ 5,00!\n🏡 Se preferir retirar pessoalmente, a retirada é 100% gratuita com horário combinado pelo WhatsApp.\n✨ Acima do raio de 2km, consulte frete especial diretamente com as Sisters no WhatsApp.';

  body.innerHTML = `
    <div class="rules-info-pill">
      <strong>🛵 Entrega na Vizinhança (Raio de até ${appConfig.radiusKm}km):</strong><br>
      Taxa fixa de <strong>R$ ${appConfig.deliveryFee.toFixed(2).replace('.', ',')}</strong> calculada automaticamente no carrinho pelo seu CEP, endereço ou GPS!
    </div>
    <div class="rules-info-pill blue">
      <strong>🏡 Retirada Gratuita no Brechó:</strong><br>
      ${appConfig.address}
    </div>
    <div class="rules-custom-text">
      ${rulesText.replace(/\n/g, '<br>')}
    </div>
  `;

  modal.classList.add('active');
  ModalHistoryManager.push('modal-delivery-rules');
}

function closeDeliveryRulesModal(fromPopstate = false) {
  const modal = document.getElementById('modal-delivery-rules');
  if (modal) modal.classList.remove('active');
  ModalHistoryManager.close('modal-delivery-rules', fromPopstate);
}

// ============================================================================
// CENTRAL DE DÚVIDAS & QUEM SOMOS
// ============================================================================

function openHelpCenterModal() {
  const modal = document.getElementById('modal-help-center');
  if (!modal) return;
  const waLink = document.getElementById('link-direct-whatsapp');
  if (waLink) {
    const cleanPhone = (appConfig.whatsapp || '5511987654321').replace(/\D/g, '');
    waLink.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá Sisters! Estou visitando o Brechó e gostaria de tirar uma dúvida sobre as pecinhas 💕')}`;
  }
  modal.classList.add('active');
  ModalHistoryManager.push('modal-help-center');
}

function closeHelpCenterModal(fromPopstate = false) {
  const modal = document.getElementById('modal-help-center');
  if (modal) modal.classList.remove('active');
  ModalHistoryManager.close('modal-help-center', fromPopstate);
}

// ============================================================================
// SISTEMA DE FAVORITOS (LOCALSTORAGE & MODAL EXCLUSIVO)
// ============================================================================

function toggleFavorite(id) {
  const index = favoritesList.indexOf(id);
  const prod = productsList.find(p => p.id === id);
  if (index >= 0) {
    favoritesList.splice(index, 1);
    showToast('Removido dos favoritos', '🤍');
  } else {
    favoritesList.push(id);
    showToast(`${prod ? prod.name : 'Peça'} favoritada com carinho!`, '❤️');
    if (navigator.vibrate) navigator.vibrate([40, 30, 40]);
  }
  AppStorage.saveFavorites(favoritesList);
  updateFavBadges();

  // Atualiza modal se estiver aberto
  const favModal = document.getElementById('modal-favorites');
  if (favModal && favModal.classList.contains('active')) {
    renderFavoritesModal();
  }

  // Atualiza vitrine
  renderProducts(getActiveCategory(), document.getElementById('search-input').value.trim().toLowerCase());
}

function updateFavBadges() {
  const count = favoritesList.length;
  const badge = document.getElementById('bottom-fav-badge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  }
}

function openFavoritesModal() {
  const modal = document.getElementById('modal-favorites');
  if (!modal) return;
  setActiveBottomNav('nav-favs');
  renderFavoritesModal();
  modal.classList.add('active');
  ModalHistoryManager.push('modal-favorites');
}

function closeFavoritesModal(fromPopstate = false) {
  const modal = document.getElementById('modal-favorites');
  if (modal) modal.classList.remove('active');
  setActiveBottomNav('nav-home');
  ModalHistoryManager.close('modal-favorites', fromPopstate);
}

function renderFavoritesModal() {
  const body = document.getElementById('favs-modal-body');
  if (!body) return;

  const favProds = productsList.filter(p => favoritesList.includes(p.id));

  if (favProds.length === 0) {
    body.innerHTML = `
      <div class="empty-state-box">
        <div class="empty-icon">🤍</div>
        <h4 class="empty-title">Nenhum favorito ainda!</h4>
        <p class="empty-desc">Toque no coraçãozinho das pecinhas que você mais amar na vitrine para guardá-las aqui 💕</p>
        <button type="button" class="btn-whatsapp-submit" style="margin-top: 14px; background: var(--pastel-pink); color: #7B112D;" onclick="closeFavoritesModal(); window.scrollTo({top: 0, behavior: 'smooth'});">
          Explorar Vitrine 🌸
        </button>
      </div>
    `;
    return;
  }

  let html = `
    <div style="font-size: 0.88rem; color: #636E72; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
      <span><strong>${favProds.length}</strong> ${favProds.length === 1 ? 'peça guardada' : 'peças guardadas'}</span>
      <button type="button" style="background: none; border: none; color: #E84393; font-size: 0.82rem; font-weight: 700; cursor: pointer; text-decoration: underline;" onclick="clearAllFavorites()">Limpar lista</button>
    </div>
  `;

  favProds.forEach(prod => {
    const isSold = prod.status === 'vendido';
    const inCart = cartItems.some(item => item.id === prod.id);

    html += `
      <div class="fav-prod-row">
        <img src="${prod.image}" alt="${prod.name}" class="fav-prod-thumb" onclick="openProductDetails('${prod.id}')" onerror="this.src='icon.svg'">
        <div class="fav-prod-details">
          <span class="fav-prod-cat">${formatCategory(prod.category)} • Tam ${prod.size}</span>
          <h4 class="fav-prod-name" onclick="openProductDetails('${prod.id}')">${prod.name}</h4>
          <div class="fav-prod-price">R$ ${prod.price.toFixed(2).replace('.', ',')}</div>
        </div>
        <div class="fav-actions">
          ${!isSold ? `
            <button type="button" class="btn-fav-add-cart ${inCart ? 'in-cart' : ''}" onclick="toggleCart('${prod.id}'); renderFavoritesModal();">
              ${inCart ? '✓ Na Sacola' : '+ Sacola'}
            </button>
          ` : `
            <span style="font-size: 0.75rem; color: #A0AEC0; font-weight: 700;">Vendido</span>
          `}
          <button type="button" class="btn-fav-remove" onclick="toggleFavorite('${prod.id}')" title="Remover dos favoritos">
            🗑️
          </button>
        </div>
      </div>
    `;
  });

  body.innerHTML = html;
}

function clearAllFavorites() {
  if (confirm('Deseja limpar todos os seus favoritos?')) {
    favoritesList = [];
    AppStorage.saveFavorites(favoritesList);
    updateFavBadges();
    renderFavoritesModal();
    renderProducts(getActiveCategory(), document.getElementById('search-input').value.trim().toLowerCase());
    showToast('Favoritos limpos 🤍');
  }
}

// ============================================================================
// COMPARTILHAR / INDICAR O BRECHÓ & PEÇAS ESPECÍFICAS
// ============================================================================

async function shareShop() {
  const shareData = {
    title: 'Brechó Sisters 🌸',
    text: 'Olha que fofura o Brechó Sisters! Roupitchas, calçados e brinquedos infantis selecionados com carinho e entrega rápida na vizinhança 💕',
    url: window.location.origin || 'https://brecho-sisters.pages.dev'
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      showToast('Obrigado por indicar as Sisters! 💕', '🌸');
      return;
    } catch (e) {
      // Usuário cancelou
    }
  }

  // Fallback WhatsApp
  const shareText = encodeURIComponent(`${shareData.text}\n\nConheça o Brechó Sisters: ${shareData.url}`);
  window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
}

async function sharePiece(id) {
  const prod = productsList.find(p => p.id === id);
  if (!prod) return;

  const url = `${window.location.origin || 'https://brecho-sisters.pages.dev'}?piece=${encodeURIComponent(prod.id)}`;
  const text = `Olha que achadinho lindo no Brechó Sisters! 🌸\n*${prod.name}* (Tam: ${prod.size}) por apenas *R$ ${prod.price.toFixed(2).replace('.', ',')}*!`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: prod.name,
        text: text,
        url: url
      });
      showToast('Compartilhado com sucesso! 💖', '✨');
      return;
    } catch (e) {}
  }

  // Fallback WhatsApp
  const fullText = encodeURIComponent(`${text}\n\nVeja aqui: ${url}`);
  window.open(`https://api.whatsapp.com/send?text=${fullText}`, '_blank');
}

// Exposição explícita para inline handlers
window.toggleFavorite = toggleFavorite;
window.clearAllFavorites = clearAllFavorites;
window.openFavoritesModal = openFavoritesModal;
window.closeFavoritesModal = closeFavoritesModal;
window.openHelpCenterModal = openHelpCenterModal;
window.closeHelpCenterModal = closeHelpCenterModal;
window.shareShop = shareShop;
window.sharePiece = sharePiece;
window.editFAQItem = editFAQItem;
window.deleteFAQItem = deleteFAQItem;
window.editStoryAdmin = editStoryAdmin;
window.openStory = openStory;
window.openStoryPreviewDirect = openStoryPreviewDirect;

// ============================================================================
// MINI-EDITOR DE FOTOS (CROPPER 1:1, PAN, ZOOM & CONVERSOR WEBP RETINA)
// ============================================================================

const CropperStudio = {
  modal: null,
  viewport: null,
  imgTarget: null,
  zoomSlider: null,
  rawImage: null,
  imgWidth: 0,
  imgHeight: 0,
  scale: 1,
  rotation: 0,
  posX: 0,
  posY: 0,
  isDragging: false,
  startX: 0,
  startY: 0,
  onCompleteCallback: null,

  init() {
    this.modal = document.getElementById('modal-cropper-view');
    this.viewport = document.getElementById('crop-viewport');
    this.imgTarget = document.getElementById('crop-img-target');
    this.zoomSlider = document.getElementById('crop-zoom-slider');

    // Pan / Drag com ponteiro (Touch ou Mouse)
    this.viewport.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    window.addEventListener('pointermove', (e) => this.onPointerMove(e));
    window.addEventListener('pointerup', () => this.onPointerUp());

    // Zoom slider
    this.zoomSlider.addEventListener('input', (e) => {
      this.scale = parseFloat(e.target.value);
      this.updateTransform();
    });

    document.getElementById('btn-zoom-in').addEventListener('click', () => {
      this.scale = Math.min(3, this.scale + 0.15);
      this.zoomSlider.value = this.scale;
      this.updateTransform();
    });

    document.getElementById('btn-zoom-out').addEventListener('click', () => {
      this.scale = Math.max(1, this.scale - 0.15);
      this.zoomSlider.value = this.scale;
      this.updateTransform();
    });

    // Rotação 90º
    document.getElementById('btn-crop-rotate').addEventListener('click', () => {
      this.rotation = (this.rotation + 90) % 360;
      this.updateTransform();
    });

    // Fechar e Cancelar
    document.getElementById('btn-close-cropper').addEventListener('click', () => this.close());
    document.getElementById('btn-crop-cancel').addEventListener('click', () => this.close());

    // Confirmar e Converter para WebP Retina
    document.getElementById('btn-crop-confirm').addEventListener('click', () => this.exportWebP());

    // Intercepta o input de arquivo do produto
    const fileInput = document.getElementById('prod-form-img-file');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.open(event.target.result, (webpDataUrl) => {
              // Preenche a URL do formulário com a versão WebP otimizada
              document.getElementById('prod-form-img-url').value = webpDataUrl;
              showToast('Foto enquadrada e pronta em WebP Retina! ✨', '📸');
            });
          };
          reader.readAsDataURL(e.target.files[0]);
        }
      });
    }
  },

  open(imgSrc, callback) {
    this.onCompleteCallback = callback;
    this.rawImage = new Image();
    this.rawImage.onload = () => {
      this.imgWidth = this.rawImage.width;
      this.imgHeight = this.rawImage.height;

      // Reseta estado
      this.scale = 1;
      this.rotation = 0;
      this.posX = 0;
      this.posY = 0;
      this.zoomSlider.value = 1;

      this.imgTarget.src = imgSrc;
      this.modal.classList.add('active');
      ModalHistoryManager.push('modal-cropper-view');
      this.fitInitial();
    };
    this.rawImage.src = imgSrc;
  },

  fitInitial() {
    const vpSize = this.viewport.clientWidth || 360;
    const aspect = this.imgWidth / this.imgHeight;

    if (aspect > 1) {
      // Imagem mais larga que alta
      this.imgTarget.style.height = `${vpSize}px`;
      this.imgTarget.style.width = 'auto';
    } else {
      // Imagem mais alta que larga
      this.imgTarget.style.width = `${vpSize}px`;
      this.imgTarget.style.height = 'auto';
    }

    this.updateTransform();
  },

  onPointerDown(e) {
    this.isDragging = true;
    this.startX = e.clientX - this.posX;
    this.startY = e.clientY - this.posY;
  },

  onPointerMove(e) {
    if (!this.isDragging) return;
    this.posX = e.clientX - this.startX;
    this.posY = e.clientY - this.startY;
    this.updateTransform();
  },

  onPointerUp() {
    this.isDragging = false;
  },

  updateTransform() {
    this.imgTarget.style.transform = `translate(${this.posX}px, ${this.posY}px) scale(${this.scale}) rotate(${this.rotation}deg)`;
  },

  close(fromPopstate = false) {
    this.modal.classList.remove('active');
    ModalHistoryManager.close('modal-cropper-view', fromPopstate);
  },

  /**
   * Recorta a área exata do viewport e gera WebP Retina 800x800
   */
  exportWebP() {
    const outputSize = 800; // Resolução Retina nítida
    const canvas = document.createElement('canvas');
    canvas.width = outputSize;
    canvas.height = outputSize;
    const ctx = canvas.getContext('2d');

    const vpSize = this.viewport.clientWidth || 360;
    const ratio = outputSize / vpSize;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, outputSize, outputSize);

    ctx.save();
    // Centraliza o ponto de transformação
    ctx.translate(outputSize / 2 + this.posX * ratio, outputSize / 2 + this.posY * ratio);
    ctx.scale(this.scale, this.scale);
    ctx.rotate((this.rotation * Math.PI) / 180);

    const displayedWidth = this.imgTarget.clientWidth * ratio;
    const displayedHeight = this.imgTarget.clientHeight * ratio;

    ctx.drawImage(
      this.rawImage,
      -displayedWidth / 2,
      -displayedHeight / 2,
      displayedWidth,
      displayedHeight
    );
    ctx.restore();

    // Converte para WebP Retina
    let webpUrl = canvas.toDataURL('image/webp', 0.85);

    // Fallback caso navegador não suporte data:image/webp
    if (!webpUrl.startsWith('data:image/webp')) {
      webpUrl = canvas.toDataURL('image/jpeg', 0.88);
    }

    if (this.onCompleteCallback) {
      this.onCompleteCallback(webpUrl);
    }

    this.close();
  }
};

// ============================================================================
// INSTALAÇÃO DISCRETA DO PWA (APP NO CELULAR)
// ============================================================================
let deferredPwaPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPwaPrompt = e;
  setTimeout(triggerPwaBannerSmoothly, 8000);
});

function triggerPwaBannerSmoothly() {
  const dismissedTime = localStorage.getItem('brecho_pwa_dismissed');
  if (dismissedTime && Date.now() - parseInt(dismissedTime, 10) < 15 * 24 * 60 * 60 * 1000) {
    return; // Não incomoda o usuário se ele dispensou recentemente (15 dias)
  }

  const banner = document.getElementById('pwa-install-banner');
  if (!banner) return;
  banner.classList.add('show');
}

function setupPwaBannerEvents() {
  const banner = document.getElementById('pwa-install-banner');
  const btnInstall = document.getElementById('btn-pwa-install');
  const btnDismiss = document.getElementById('btn-pwa-dismiss');

  if (!banner || !btnInstall || !btnDismiss) return;

  btnInstall.addEventListener('click', async () => {
    if (deferredPwaPrompt) {
      deferredPwaPrompt.prompt();
      const { outcome } = await deferredPwaPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast('App instalado com sucesso! 🌸', '🎉');
      }
      deferredPwaPrompt = null;
      banner.classList.remove('show');
    } else {
      alert('Para ter o App na tela do celular:\n\n• No iPhone (Safari): Toque em Compartilhar (ícone com setinha ⎋) e depois em "Adicionar à Tela de Início" 📲\n• No Android (Chrome): Toque nos 3 pontinhos ⋮ e depois em "Instalar aplicativo" 📲');
      banner.classList.remove('show');
    }
  });

  btnDismiss.addEventListener('click', () => {
    banner.classList.remove('show');
    localStorage.setItem('brecho_pwa_dismissed', Date.now().toString());
  });

  // Temporizador suave de 15 segundos na primeira visita
  setTimeout(triggerPwaBannerSmoothly, 15000);
}

// Inicializa o mini-editor
document.addEventListener('DOMContentLoaded', () => {
  CropperStudio.init();
});

