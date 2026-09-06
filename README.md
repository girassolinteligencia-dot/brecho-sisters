# 🌸 Brechó Sisters — Aplicativo Web Mobile-First

Aplicativo web responsivo, doce e acolhedor para divulgação e venda de roupas, tênis e brinquedos infantis e juvenis com foco em facilidade absoluta (kids-friendly), geolocalização para entregas nas redondezas (raio de até 5km), rotas no Google Maps e contato humanizado via WhatsApp.

---

## 🎨 Identidade Visual
* **Paleta Candy Pastel**:
  * Rosa Algodão-Doce (`#FFB7C5` / `#FF477E`)
  * Verde Menta Suave (`#B5EAD7` / `#00B894`)
  * Amarelo Baunilha (`#FFF2B2` / `#FFEAA7`)
  * Roxo Lavanda (`#E2CBF7` / `#A29BFE`)
  * Azul Céu Macio (`#B2E2F8` / `#81D4FA`)
  * Fundo Creme Confortável (`#FFFDF9`)
* **Tipografia**: `Fredoka` (títulos e preços lúdicos) + `Nunito` (leitura fluida).

---

## ✨ Funcionalidades Principais

1. **Vitrine Limpa & Fotográfica**:
   * Pílulas deslizantes de categorias: Roupas, Calçados, Brinquedos e Acessórios.
   * Selos de estado da peça: *Novo com Etiqueta*, *Usado 1x* ou *Muito Amor (Ótimo estado)*.
   * Busca em tempo real por nome, tamanho ou descrição.
2. **Modal de Detalhes da Peça**:
   * Desliza suavemente da parte inferior (*bottom sheet*).
   * Mostra fotos ampliadas, medidas, história da peça e botão largo de adicionar à sacola.
3. **Sacolinha de Compras Inteligente**:
   * Sem cadastro ou login chato: salva no navegador (`localStorage`).
   * **Opção 1: Retirada no Brechó (Grátis)** — exibe o endereço das vendedoras com botão direto *"Ver Como Chegar no Google Maps"*.
   * **Opção 2: Receber em Casa (Raio até 5km)**:
     * Botão **"📍 Usar Minha Localização Atual"** (lê o GPS do celular com 1 toque).
     * Ou campo para digitar o endereço.
     * Calcula a distância com a fórmula de *Haversine*.
     * Se estiver em até 5km: aplica a taxa de entrega configurada e cria a rota.
     * Se passar de 5km: avisa carinhosamente que ultrapassou o raio e sugere retirada ou combinação especial.
4. **Fechamento Direto no WhatsApp (`wa.me`)**:
   * Gera uma mensagem formatada com emojis carinhosos, lista das peças, tamanhos, valores, modalidade escolhida, endereço do cliente, chave PIX e **link da rota pronta no Google Maps** para as irmãs ou entregador clicarem e navegarem no GPS!
5. **⚙️ Painel Administrativo Completo**:
   * Acesso por senha simples (padrão: `sisters123`).
   * **Gerenciamento de Peças**: Cadastrar nova peça (com upload de imagem do celular ou URL), editar dados, excluir e marcar como *Disponível*, *Reservado* ou *Vendido*.
   * **Configurações do Brechó**:
     * Número do WhatsApp das vendedoras com DDD.
     * Endereço oficial de retirada (com botão para buscar coordenadas automáticas no mapa).
     * Raio máximo de entrega em km (padrão: 5km).
     * Taxa de entrega fixa (R$).
     * Chave PIX e titular para recebimento imediato com taxa zero.

---

## 🚀 Como Publicar no Cloudflare Pages (100% Gratuito)

### Método 1: Direto pelo Painel Web da Cloudflare (Mais Fácil)
1. Crie uma conta gratuita em [cloudflare.com](https://dash.cloudflare.com/).
2. No menu lateral, acerte **Workers & Pages** ➜ **Create application** ➜ Aba **Pages**.
3. Selecione **Upload assets** (ou conecte ao seu repositório GitHub).
4. Arraste todos os arquivos desta pasta (`index.html`, `style.css`, `app.js`, `icon.svg`, `manifest.json`).
5. Clique em **Deploy site**!
6. Pronto! Seu app estará no ar com link seguro `https://brecho-sisters.pages.dev` (ou seu próprio domínio personalizado).

### Método 2: Via Terminal com Wrangler CLI
```bash
npx wrangler pages deploy ./ --project-name brecho-sisters
```

---

## 📱 PWA: Como Instalar no Celular
* **No Android (Chrome)**: Acesse o link do site, toque nos 3 pontinhos no canto superior e selecione **"Adicionar à tela inicial"** ou **"Instalar aplicativo"**.
* **No iPhone (Safari)**: Acesse o link do site, toque no botão de **Compartilhar** (ícone quadrado com seta para cima) e escolha **"Adicionar à Tela de Início"**.
