/**
 * 🌸 BRECHÓ SISTERS - CORE APP JAVASCRIPT
 * Mobile-First, Geolocalização (Raio 5km), Rotas Google Maps, WhatsApp e Painel Admin
 */

// ============================================================================
// DADOS INICIAIS & ESTADO DO APP
// ============================================================================

const DEFAULT_CONFIG = {
  whatsapp: '5511987654321',
  address: 'Rua das Rosas, 350 - Bairro das Flores, São Paulo - SP',
  lat: -23.550520,
  lng: -46.633308,
  radiusKm: 5.0,
  deliveryFee: 5.00,
  pixKey: 'sisters.brecho@exemplo.com.br',
  pixName: 'Ana & Clara Brechó Sisters',
  adminPasswordHash: '112bca87455d673dba92c8b7b838d519ee6ce35dbf5e6537d953b4ff3cc7e3ec', // sisters123
  videoUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=85',
  welcomeMsg: 'Oi, bem-vindo ao Brechó Sisters! 💕 Todas as nossas pecinhas, tênis e brinquedos são higienizados com carinho e prontos para novas histórias. Escolha na sacolinha e fale com a gente no WhatsApp! 🎀',
  deliveryRules: '🌸 Entregamos com motinho com todo carinho nas redondezas (raio de até 5km do nosso brechó) por taxa fixa de apenas R$ 5,00!\n🏡 Se preferir retirar pessoalmente, a retirada é 100% gratuita com horário combinado pelo WhatsApp.\n✨ Acima do raio de 5km, consulte frete especial diretamente com as Sisters no WhatsApp.'
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
    return data ? { ...DEFAULT_CONFIG, ...JSON.parse(data) } : DEFAULT_CONFIG;
  },
  saveConfig(cfg) {
    localStorage.setItem('brecho_sisters_config', JSON.stringify(cfg));
  },
  getProducts() {
    const data = localStorage.getItem('brecho_sisters_products');
    return data ? JSON.parse(data) : DEFAULT_PRODUCTS;
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
let analyticsData = AppStorage.getAnalytics();

// Estado atual de entrega/geolocalização
let currentDeliveryOption = 'pickup'; // 'pickup' ou 'delivery'
let customerCoords = null; // { lat, lng }
let calculatedDistanceKm = null;
let isWithinRadius = false;
let customerAddressText = '';

// ============================================================================
// INICIALIZAÇÃO & EVENT LISTENERS
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  renderProducts();
  updateCartBadges();
  setupEventListeners();
  updateDeliveryUI();
});

function initUI() {
  document.getElementById('header-radius-km').textContent = `${appConfig.radiusKm}km`;
  document.querySelectorAll('.calc-radius-label').forEach(el => {
    el.textContent = `${appConfig.radiusKm}km`;
  });
  document.getElementById('pickup-address-text').textContent = appConfig.address;
  
  // Link de rota para o endereço das vendedoras
  const pickupLink = document.getElementById('link-pickup-route');
  pickupLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(appConfig.address)}`;
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

  // Botão Pílula: Vídeo de Boas-Vindas das Sisters no Header
  const btnOpenVideoSisters = document.getElementById('btn-open-video-sisters');
  if (btnOpenVideoSisters) {
    btnOpenVideoSisters.addEventListener('click', openSistersWelcomeVideo);
  }

  // Botões do Modal de Regras de Entrega
  const btnCloseRules = document.getElementById('btn-close-rules');
  if (btnCloseRules) btnCloseRules.addEventListener('click', closeDeliveryRulesModal);

  const btnRulesGotIt = document.getElementById('btn-rules-got-it');
  if (btnRulesGotIt) btnRulesGotIt.addEventListener('click', closeDeliveryRulesModal);

  // Botões de Abrir Sacola
  document.getElementById('btn-open-cart-header').addEventListener('click', openCartModal);
  document.getElementById('nav-cart').addEventListener('click', openCartModal);

  // Botões de Fechar Modais
  document.getElementById('btn-close-details').addEventListener('click', closeDetailsModal);
  document.getElementById('btn-close-cart').addEventListener('click', closeCartModal);
  document.getElementById('btn-close-admin').addEventListener('click', closeAdminModal);

  // Navegação da Bottom Bar (3 Botões do Cliente)
  document.getElementById('nav-home').addEventListener('click', () => {
    setActiveBottomNav('nav-home');
    resetCategoryFilter();
    closeAllModais();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('nav-cats').addEventListener('click', () => {
    setActiveBottomNav('nav-cats');
    closeAllModais();
    const navCats = document.getElementById('categories-nav');
    navCats.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('search-input').focus();
    showToast('Escolha uma categoria ou busque sua peça! 🔍', '✨');
  });

  // Botão "Ver Vitrine" no carrinho vazio
  document.getElementById('btn-start-shopping').addEventListener('click', () => {
    closeCartModal();
    resetCategoryFilter();
  });

  // Escolha de Retirada vs Entrega
  document.getElementById('opt-pickup').addEventListener('click', () => selectDeliveryOption('pickup'));
  document.getElementById('opt-delivery').addEventListener('click', () => selectDeliveryOption('delivery'));

  // Geolocalização no Carrinho
  document.getElementById('btn-geo-locate').addEventListener('click', handleGPSLocation);
  document.getElementById('btn-calc-address').addEventListener('click', handleAddressGeocode);
  document.getElementById('input-customer-address').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddressGeocode();
    }
  });

  // Inicialização das Máscaras e Eventos da Compradora
  setupInputMasks();

  // Botão Concluir no WhatsApp
  document.getElementById('btn-submit-whatsapp').addEventListener('click', submitOrderViaWhatsApp);

  // Admin Events
  setupAdminEvents();

  // PWA Banner Events
  setupPwaBannerEvents();
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
  closeDetailsModal();
  closeCartModal();
  closeAdminModal();
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
// MODAL DE DETALHES DO PRODUTO (BOTTOM SHEET)
// ============================================================================

function openProductDetails(id) {
  const prod = productsList.find(p => p.id === id);
  if (!prod) return;

  const modal = document.getElementById('modal-product-details');
  const body = document.getElementById('modal-detail-body');
  const title = document.getElementById('modal-detail-title');

  title.textContent = prod.name;
  const inCart = cartItems.some(i => i.id === prod.id);
  const isSold = prod.status === 'vendido';

  body.innerHTML = `
    <div style="position: relative; width: 100%; aspect-ratio: 1/1; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 14px; box-shadow: var(--shadow-sm);">
      <img src="${prod.image}" alt="${prod.name}" style="width: 100%; height: 100%; object-fit: cover;">
      <span style="position: absolute; bottom: 10px; right: 10px; background: rgba(255,255,255,0.92); padding: 4px 10px; border-radius: var(--radius-sm); font-weight: 800; font-size: 0.85rem;">
        ${prod.size}
      </span>
    </div>

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
  `;

  modal.classList.add('active');
}

function closeDetailsModal() {
  document.getElementById('modal-product-details').classList.remove('active');
}

function closeAllModais() {
  closeDetailsModal();
  closeCartModal();
  closeAdminModal();
  if (typeof closeStory === 'function') closeStory();
  if (typeof closeDeliveryRulesModal === 'function') closeDeliveryRulesModal();
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

  headerBadge.textContent = count;
  bottomBadge.textContent = count;
  bottomBadge.style.display = count > 0 ? 'flex' : 'none';
}

function openCartModal() {
  renderCartModal();
  document.getElementById('modal-cart').classList.add('active');
  setActiveBottomNav('nav-cart');
}

function closeCartModal() {
  document.getElementById('modal-cart').classList.remove('active');
  setActiveBottomNav('nav-home');
}

function renderCartModal() {
  const list = document.getElementById('cart-items-list');
  const wrap = document.getElementById('cart-content-wrap');
  const empty = document.getElementById('cart-empty-state');

  if (cartItems.length === 0) {
    wrap.style.display = 'none';
    empty.style.display = 'block';
    return;
  }

  wrap.style.display = 'block';
  empty.style.display = 'none';
  list.innerHTML = '';

  let subtotal = 0;

  cartItems.forEach(item => {
    subtotal += item.price;
    const row = document.createElement('div');
    row.className = 'cart-item-row';
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='icon.svg'">
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.name}</h4>
        <span class="cart-item-meta">${item.size} • ${formatCategory(item.category)}</span>
        <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
      </div>
      <button class="btn-remove-cart" onclick="removeFromCart('${item.id}')" title="Remover">
        ✕
      </button>
    `;
    list.appendChild(row);
  });

  // Atualiza totais
  document.getElementById('cart-subtotal-val').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;

  const deliveryLine = document.getElementById('delivery-tax-line');
  const deliveryVal = document.getElementById('cart-delivery-val');
  const totalVal = document.getElementById('cart-total-val');

  let finalTotal = subtotal;

  if (currentDeliveryOption === 'delivery' && isWithinRadius) {
    deliveryLine.style.display = 'flex';
    deliveryVal.textContent = `R$ ${appConfig.deliveryFee.toFixed(2).replace('.', ',')}`;
    finalTotal += appConfig.deliveryFee;
  } else {
    deliveryLine.style.display = 'none';
  }

  totalVal.textContent = `R$ ${finalTotal.toFixed(2).replace('.', ',')}`;
}

// ============================================================================
// GEOLOCALIZAÇÃO & CÁLCULO DE DISTÂNCIA / ROTAS (RAIO 5KM)
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
 * Avalia se o cliente está dentro do raio de 5km e gera rota
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

  let subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  let total = subtotal;

  let msg = `🌸 *Olá meninas do Brechó Sisters!* 💖\n\n`;
  msg += `Meu nome é *${custName}* e separei estas pecinhas na minha sacolinha:\n\n`;

  cartItems.forEach((item, index) => {
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
    items: cartItems.map(i => `${i.name} (${i.size})`),
    itemsIds: cartItems.map(i => i.id),
    subtotal: subtotal,
    deliveryFee: currentDeliveryOption === 'delivery' && isWithinRadius ? appConfig.deliveryFee : 0,
    total: total,
    type: currentDeliveryOption,
    address: currentDeliveryOption === 'delivery' ? customerAddressText : 'Retirada no Brechó',
    status: 'pendente'
  };

  analyticsData.orders.unshift(newOrder);
  AppStorage.saveAnalytics(analyticsData);

  const cleanPhone = appConfig.whatsapp.replace(/\D/g, '');
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;

  window.open(url, '_blank');
}

// ============================================================================
// PAINEL ADMINISTRATIVO & DASHBOARD DOS PAIS
// ============================================================================

function openAdminModal() {
  document.getElementById('modal-admin').classList.add('active');
}

function closeAdminModal() {
  document.getElementById('modal-admin').classList.remove('active');
  setActiveBottomNav('nav-home');
}

function setupAdminEvents() {
  // Login com verificação SHA-256 criptografada
  document.getElementById('btn-admin-login').addEventListener('click', async () => {
    const pass = document.getElementById('admin-password-input').value.trim();
    const inputHash = await sha256Hex(pass);
    const expectedHash = appConfig.adminPasswordHash || '112bca87455d673dba92c8b7b838d519ee6ce35dbf5e6537d953b4ff3cc7e3ec';
    if (inputHash === expectedHash || (appConfig.adminPassword && pass === appConfig.adminPassword)) {
      document.getElementById('admin-login-view').style.display = 'none';
      document.getElementById('admin-dashboard-view').style.display = 'block';
      loadAdminData();
    } else {
      alert('Senha incorreta das Sisters!');
    }
  });

  // Alternar abas do Admin (Pais, Pedidos, Produtos, Config)
  const tabBtns = [
    { btn: 'tab-btn-parents', content: 'admin-tab-parents-content' },
    { btn: 'tab-btn-orders', content: 'admin-tab-orders-content' },
    { btn: 'tab-btn-products', content: 'admin-tab-products-content' },
    { btn: 'tab-btn-config', content: 'admin-tab-config-content' }
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
      document.getElementById(content).style.display = 'block';
      if (btn === 'tab-btn-parents') renderParentsDashboard();
      if (btn === 'tab-btn-orders') renderOrdersList();
    });
  });

  // Exportar Relatório CSV
  document.getElementById('btn-export-sales-csv').addEventListener('click', exportOrdersCSV);

  // Mostrar form de adicionar produto
  document.getElementById('btn-show-add-product').addEventListener('click', () => {
    document.getElementById('form-product').reset();
    document.getElementById('prod-form-id').value = '';
    document.getElementById('form-product-title').textContent = 'Cadastrar Nova Peça 🎀';
    document.getElementById('form-product').style.display = 'block';
  });

  document.getElementById('btn-cancel-product').addEventListener('click', () => {
    document.getElementById('form-product').style.display = 'none';
  });

  // Submissão do formulário de produto
  document.getElementById('form-product').addEventListener('submit', (e) => {
    e.preventDefault();
    saveProductFromForm();
  });

  // Submissão do formulário de configuração
  document.getElementById('form-config').addEventListener('submit', (e) => {
    e.preventDefault();
    saveConfigFromForm();
  });

  // Buscar coordenadas do endereço da vendedora automaticamente
  document.getElementById('btn-get-seller-coords').addEventListener('click', async () => {
    const address = document.getElementById('cfg-address').value.trim();
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

  // Carrega campos de configuração
  document.getElementById('cfg-whatsapp').value = appConfig.whatsapp || '';
  document.getElementById('cfg-address').value = appConfig.address || '';
  document.getElementById('cfg-lat').value = appConfig.lat || '';
  document.getElementById('cfg-lng').value = appConfig.lng || '';
  document.getElementById('cfg-radius-km').value = appConfig.radiusKm || 5.0;
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
    row.innerHTML = `
      <div class="admin-prod-meta">
        <img src="${prod.image}" alt="${prod.name}" class="admin-prod-thumb" onerror="this.src='icon.svg'">
        <div>
          <strong style="font-size: 0.85rem;">${prod.name}</strong>
          <div style="font-size: 0.72rem; color: #636E72;">
            ${prod.size} • R$ ${prod.price.toFixed(2).replace('.', ',')} • 
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

function saveProductFromForm() {
  const idInput = document.getElementById('prod-form-id').value;
  const name = document.getElementById('prod-form-name').value.trim();
  const category = document.getElementById('prod-form-category').value;
  const size = document.getElementById('prod-form-size').value.trim();
  const price = parseFloat(document.getElementById('prod-form-price').value);
  const condition = document.getElementById('prod-form-condition').value;
  const imgUrl = document.getElementById('prod-form-img-url').value.trim();
  const fileInput = document.getElementById('prod-form-img-file');
  const desc = document.getElementById('prod-form-desc').value.trim();

  let conditionLabel = '💕 Em Ótimo Estado';
  if (condition === 'novo') conditionLabel = '🏷️ Novo com Etiqueta';
  if (condition === 'usado-1x') conditionLabel = '✨ Usado 1 vez';

  const onImageReady = (finalImage) => {
    if (idInput) {
      // Editar
      const idx = productsList.findIndex(p => p.id === idInput);
      if (idx > -1) {
        productsList[idx] = {
          ...productsList[idx],
          name, category, size, price, condition, conditionLabel,
          image: finalImage || productsList[idx].image,
          desc
        };
      }
    } else {
      // Novo
      const newProd = {
        id: 'prod-' + Date.now(),
        name, category, size, price, condition, conditionLabel,
        image: finalImage || 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80',
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
  };

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => onImageReady(e.target.result);
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    onImageReady(imgUrl);
  }
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
  document.getElementById('prod-form-img-url').value = prod.image;
  document.getElementById('prod-form-desc').value = prod.desc || '';

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

const STORIES_DATA = {
  welcome: {
    title: 'Oi, bem-vindo ao Brechó Sisters! 💕',
    text: 'Todas as nossas pecinhas, tênis e brinquedos são higienizados com carinho e prontos para novas histórias. Escolha na sacolinha e fale com a gente no WhatsApp! 🎀',
    media: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=85'
  },
  care: {
    title: 'Higienização com Cheirinho de Amor 🧼',
    text: 'Cada roupitcha que entra no nosso brechó é cuidadosamente lavada com sabão hipoalergênico e passada a vapor. É pegar e já vestir nas crianças!',
    media: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=85'
  },
  delivery: {
    title: 'Entregamos na sua Porta (Raio até 5km) 🛵',
    text: 'Mora pertinho da gente? Entregamos com taxa fixa de R$ 5,00 ou grátis para vizinhos próximos. Se preferir, pode retirar com a gente!',
    media: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=85'
  },
  garimpo: {
    title: 'Achadinhos Únicos da Semana ✨',
    text: 'Temos Carter’s, Hering, Nike, Klin e brinquedos educativos. Como cada peça é única, se você amou, garanta rápido na sacolinha!',
    media: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85'
  }
};

let storyTimer = null;

function openStory(type) {
  const story = STORIES_DATA[type];
  if (!story) return;

  const modal = document.getElementById('modal-story-view');
  const title = document.getElementById('story-caption-title');
  const text = document.getElementById('story-caption-text');
  const img = document.getElementById('story-media-img');
  const fill = document.getElementById('story-progress-fill');

  title.textContent = story.title;
  text.textContent = story.text;
  img.src = story.media;

  fill.style.width = '0%';
  fill.style.transition = 'none';

  modal.classList.add('active');

  setTimeout(() => {
    fill.style.transition = 'width 6s linear';
    fill.style.width = '100%';
  }, 50);

  if (storyTimer) clearTimeout(storyTimer);
  storyTimer = setTimeout(() => {
    closeStory();
  }, 6100);
}

function closeStory() {
  const modal = document.getElementById('modal-story-view');
  modal.classList.remove('active');
  if (storyTimer) clearTimeout(storyTimer);
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
 * (Disparado pelo botão pílula do Header)
 */
function openSistersWelcomeVideo() {
  const modal = document.getElementById('modal-story-view');
  const title = document.getElementById('story-caption-title');
  const text = document.getElementById('story-caption-text');
  const img = document.getElementById('story-media-img');
  const fill = document.getElementById('story-progress-fill');

  if (!modal) return;

  title.textContent = 'Oi, bem-vindo ao Brechó Sisters! 💕';
  text.textContent = appConfig.welcomeMsg || 'Todas as nossas pecinhas, tênis e brinquedos são higienizados com carinho e prontos para novas histórias. Escolha na sacolinha e fale com a gente no WhatsApp! 🎀';
  img.src = appConfig.videoUrl || 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=85';

  fill.style.width = '0%';
  fill.style.transition = 'none';

  modal.classList.add('active');

  setTimeout(() => {
    fill.style.transition = 'width 7s linear';
    fill.style.width = '100%';
  }, 50);

  if (storyTimer) clearTimeout(storyTimer);
  storyTimer = setTimeout(() => {
    closeStory();
  }, 7100);
}

/**
 * Modal de Regras de Entrega & Retirada
 * (Parametrizado via Admin e exibido em tela exclusiva sem abrir carrinho)
 */
function openDeliveryRulesModal() {
  const modal = document.getElementById('modal-delivery-rules');
  const body = document.getElementById('rules-content-body');
  if (!modal || !body) return;

  const rulesText = appConfig.deliveryRules || '🌸 Entregamos com motinho com todo carinho nas redondezas (raio de até 5km do nosso brechó) por taxa fixa de apenas R$ 5,00!\n🏡 Se preferir retirar pessoalmente, a retirada é 100% gratuita com horário combinado pelo WhatsApp.\n✨ Acima do raio de 5km, consulte frete especial diretamente com as Sisters no WhatsApp.';

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
}

function closeDeliveryRulesModal() {
  const modal = document.getElementById('modal-delivery-rules');
  if (modal) modal.classList.remove('active');
}

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

  close() {
    this.modal.classList.remove('active');
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

