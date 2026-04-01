# Cardapio Digital da Clinica Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Construir um cardapio digital mobile-first com pedidos online via QR Code, painel `/admin` em tempo real, alerta sonoro/visual e mini estoque simples para uma clinica.

**Architecture:** O projeto sera um app Next.js com App Router e TypeScript. O frontend publico e o painel admin compartilharao o mesmo codigo-base, enquanto o Supabase cuidara de banco, realtime e armazenamento de imagens. O estoque sera atualizado automaticamente quando pedidos forem criados, e o admin reagira em tempo real a novos pedidos.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Supabase, SQL migrations, ESLint, Playwright, Vitest

---

### Task 1: Inicializar a base do projeto

**Files:**
- Create: `package.json`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `.env.example`
- Create: `.gitignore`
- Create: `README.md`

**Step 1: Criar o app Next.js com TypeScript e Tailwind**

Run: `npx create-next-app@latest . --ts --tailwind --eslint --app --use-npm`
Expected: estrutura base do Next.js criada na raiz do projeto

**Step 2: Revisar os arquivos base criados**

Run: `rg --files`
Expected: exibicao dos arquivos principais do app

**Step 3: Ajustar metadados e identidade inicial do projeto**

Modificar o layout global para refletir o nome do produto e preparar o app para visual mobile-first.

**Step 4: Validar que a aplicacao sobe localmente**

Run: `npm run dev`
Expected: servidor Next.js rodando sem erros

**Step 5: Commit**

```bash
git init
git add .
git commit -m "chore: bootstrap next app"
```

### Task 2: Configurar o Supabase e as variaveis de ambiente

**Files:**
- Create: `lib/supabase/browser.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/admin.ts`
- Modify: `.env.example`
- Create: `supabase/config.toml`

**Step 1: Escrever um teste simples para garantir falha quando faltar configuracao**

**Test File:** `tests/unit/env.test.ts`

```ts
import { describe, expect, it } from 'vitest';
import { getRequiredEnv } from '@/lib/env';

describe('getRequiredEnv', () => {
  it('throws when a required env var is missing', () => {
    expect(() => getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL')).toThrow();
  });
});
```

**Step 2: Rodar o teste para confirmar a falha**

Run: `npm run test -- tests/unit/env.test.ts`
Expected: FAIL porque `getRequiredEnv` ainda nao existe

**Step 3: Implementar a camada minima de configuracao**

Criar `lib/env.ts` e os clientes do Supabase para browser, server e admin.

**Step 4: Rodar o teste novamente**

Run: `npm run test -- tests/unit/env.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add .env.example lib tests
git commit -m "chore: add supabase configuration layer"
```

### Task 3: Modelar o banco de dados do cardapio

**Files:**
- Create: `supabase/migrations/0001_initial_schema.sql`
- Create: `supabase/seed.sql`
- Create: `types/database.ts`
- Create: `lib/catalog.ts`

**Step 1: Escrever teste para o catalogo inicial**

**Test File:** `tests/unit/catalog.test.ts`

```ts
import { describe, expect, it } from 'vitest';
import { initialCatalog } from '@/lib/catalog';

describe('initialCatalog', () => {
  it('contains Agua com gas and Barra de cereal castanha de caju', () => {
    const names = initialCatalog.map((item) => item.name);
    expect(names).toContain('Agua com gas');
    expect(names).toContain('Barra de cereal castanha de caju');
  });
});
```

**Step 2: Rodar o teste para confirmar a falha**

Run: `npm run test -- tests/unit/catalog.test.ts`
Expected: FAIL porque `initialCatalog` ainda nao existe

**Step 3: Criar schema SQL e seed do catalogo**

Definir tabelas `items`, `inventory`, `orders` e `order_items`, mais seed com os produtos aprovados.

**Step 4: Rodar o teste novamente**

Run: `npm run test -- tests/unit/catalog.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add supabase lib types tests
git commit -m "feat: add menu schema and seed data"
```

### Task 4: Construir a camada de dados de pedidos e estoque

**Files:**
- Create: `lib/orders.ts`
- Create: `lib/inventory.ts`
- Create: `lib/validators/order.ts`
- Test: `tests/unit/orders.test.ts`

**Step 1: Escrever teste para validar criacao de pedido**

```ts
import { describe, expect, it } from 'vitest';
import { createOrderInputSchema } from '@/lib/validators/order';

describe('createOrderInputSchema', () => {
  it('rejects payload without patient name', () => {
    const result = createOrderInputSchema.safeParse({ patientName: '', items: [] });
    expect(result.success).toBe(false);
  });
});
```

**Step 2: Rodar o teste para confirmar a falha**

Run: `npm run test -- tests/unit/orders.test.ts`
Expected: FAIL porque o schema ainda nao existe

**Step 3: Implementar validacao e funcoes de persistencia**

Criar funcoes para criar pedido, listar pedidos e atualizar estoque apos criacao.

**Step 4: Rodar o teste novamente**

Run: `npm run test -- tests/unit/orders.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add lib tests
git commit -m "feat: add order and inventory services"
```

### Task 5: Criar a interface mobile-first do cardapio

**Files:**
- Create: `app/(menu)/page.tsx`
- Create: `components/menu/menu-screen.tsx`
- Create: `components/menu/category-tabs.tsx`
- Create: `components/menu/item-card.tsx`
- Create: `components/menu/cart-sheet.tsx`
- Create: `components/menu/patient-name-form.tsx`
- Create: `components/menu/order-submit-button.tsx`
- Modify: `app/globals.css`
- Test: `tests/unit/menu-screen.test.tsx`

**Step 1: Escrever teste de renderizacao do cardapio**

```tsx
import { render, screen } from '@testing-library/react';
import { MenuScreen } from '@/components/menu/menu-screen';

it('renders patient name field and menu item cards', () => {
  render(<MenuScreen categories={['Bebidas']} items={[{ id: '1', name: 'Agua sem gas', category: 'Bebidas' }]} />);
  expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
  expect(screen.getByText('Agua sem gas')).toBeInTheDocument();
});
```

**Step 2: Rodar o teste para confirmar a falha**

Run: `npm run test -- tests/unit/menu-screen.test.tsx`
Expected: FAIL porque `MenuScreen` ainda nao existe

**Step 3: Implementar a tela publica**

Criar layout com cara de app, categorias, cards ilustrados e carrinho acessivel.

**Step 4: Rodar o teste novamente**

Run: `npm run test -- tests/unit/menu-screen.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add app components tests
git commit -m "feat: build patient menu experience"
```

### Task 6: Criar a acao de envio de pedido

**Files:**
- Create: `app/api/orders/route.ts`
- Create: `app/actions/create-order.ts`
- Create: `components/menu/order-success-state.tsx`
- Test: `tests/integration/create-order-route.test.ts`

**Step 1: Escrever teste para a API de pedidos**

```ts
import { describe, expect, it } from 'vitest';

describe('POST /api/orders', () => {
  it('returns 400 when patient name is missing', async () => {
    const response = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      body: JSON.stringify({ patientName: '', items: [] }),
    });
    expect(response.status).toBe(400);
  });
});
```

**Step 2: Rodar o teste para confirmar a falha**

Run: `npm run test -- tests/integration/create-order-route.test.ts`
Expected: FAIL porque a rota ainda nao existe

**Step 3: Implementar a rota e a acao**

Criar endpoint/acao para validar o payload, persistir pedido e retornar confirmacao.

**Step 4: Rodar o teste novamente**

Run: `npm run test -- tests/integration/create-order-route.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add app components tests
git commit -m "feat: submit orders from public menu"
```

### Task 7: Construir o painel `/admin` em tempo real

**Files:**
- Create: `app/admin/page.tsx`
- Create: `components/admin/admin-dashboard.tsx`
- Create: `components/admin/order-list.tsx`
- Create: `components/admin/order-card.tsx`
- Create: `components/admin/new-order-sound.tsx`
- Create: `components/admin/order-status-button.tsx`
- Create: `hooks/use-orders-realtime.ts`
- Test: `tests/unit/admin-dashboard.test.tsx`

**Step 1: Escrever teste do painel admin**

```tsx
import { render, screen } from '@testing-library/react';
import { AdminDashboard } from '@/components/admin/admin-dashboard';

it('renders new order and deliver action', () => {
  render(<AdminDashboard orders={[{ id: '1', patientName: 'Ana', status: 'novo', createdAt: '2026-04-01T10:00:00Z', items: [] }]} />);
  expect(screen.getByText('Ana')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /entregue/i })).toBeInTheDocument();
});
```

**Step 2: Rodar o teste para confirmar a falha**

Run: `npm run test -- tests/unit/admin-dashboard.test.tsx`
Expected: FAIL porque `AdminDashboard` ainda nao existe

**Step 3: Implementar admin com realtime e som**

Criar listagem em tempo real, destaque de pedidos novos, contador e audio para nova entrada.

**Step 4: Rodar o teste novamente**

Run: `npm run test -- tests/unit/admin-dashboard.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add app components hooks tests
git commit -m "feat: add realtime admin dashboard"
```

### Task 8: Implementar a marcacao de pedido como entregue

**Files:**
- Create: `app/api/orders/[id]/deliver/route.ts`
- Modify: `lib/orders.ts`
- Test: `tests/integration/deliver-order-route.test.ts`

**Step 1: Escrever teste para marcar pedido como entregue**

```ts
import { describe, expect, it } from 'vitest';

describe('POST /api/orders/:id/deliver', () => {
  it('returns 200 for valid order id', async () => {
    expect(true).toBe(false);
  });
});
```

**Step 2: Rodar o teste para confirmar a falha**

Run: `npm run test -- tests/integration/deliver-order-route.test.ts`
Expected: FAIL

**Step 3: Implementar o endpoint de entrega**

Atualizar o pedido para `entregue` e preencher `entregue_em`.

**Step 4: Rodar o teste novamente**

Run: `npm run test -- tests/integration/deliver-order-route.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add app lib tests
git commit -m "feat: allow orders to be marked as delivered"
```

### Task 9: Construir o mini estoque no admin

**Files:**
- Create: `app/admin/inventory/page.tsx`
- Create: `components/admin/inventory-table.tsx`
- Create: `components/admin/inventory-row.tsx`
- Create: `app/api/inventory/[itemId]/route.ts`
- Modify: `lib/inventory.ts`
- Test: `tests/unit/inventory-table.test.tsx`

**Step 1: Escrever teste para alerta de estoque baixo**

```tsx
import { render, screen } from '@testing-library/react';
import { InventoryTable } from '@/components/admin/inventory-table';

it('shows low stock badge when quantity is below threshold', () => {
  render(<InventoryTable items={[{ id: '1', name: 'Agua de coco', quantity: 3, alertThreshold: 5 }]} />);
  expect(screen.getByText(/estoque baixo/i)).toBeInTheDocument();
});
```

**Step 2: Rodar o teste para confirmar a falha**

Run: `npm run test -- tests/unit/inventory-table.test.tsx`
Expected: FAIL porque `InventoryTable` ainda nao existe

**Step 3: Implementar a gestao simples de estoque**

Criar tela e endpoint para editar quantidade e limite de alerta com feedback rapido.

**Step 4: Rodar o teste novamente**

Run: `npm run test -- tests/unit/inventory-table.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add app components lib tests
git commit -m "feat: add simple inventory management"
```

### Task 10: Bloquear itens indisponiveis no cardapio

**Files:**
- Modify: `lib/catalog.ts`
- Modify: `components/menu/item-card.tsx`
- Modify: `components/menu/menu-screen.tsx`
- Test: `tests/unit/item-availability.test.tsx`

**Step 1: Escrever teste para item indisponivel**

```tsx
import { render, screen } from '@testing-library/react';
import { ItemCard } from '@/components/menu/item-card';

it('disables add button when item is unavailable', () => {
  render(<ItemCard item={{ id: '1', name: 'Chocolate quente', available: false }} />);
  expect(screen.getByRole('button')).toBeDisabled();
});
```

**Step 2: Rodar o teste para confirmar a falha**

Run: `npm run test -- tests/unit/item-availability.test.tsx`
Expected: FAIL porque o comportamento ainda nao existe

**Step 3: Implementar indisponibilidade**

Nao permitir adicionar item zerado ou marcado como indisponivel.

**Step 4: Rodar o teste novamente**

Run: `npm run test -- tests/unit/item-availability.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add components lib tests
git commit -m "feat: reflect stock availability in menu"
```

### Task 11: Adicionar ilustracoes e refinamento visual

**Files:**
- Create: `public/menu/`
- Modify: `components/menu/item-card.tsx`
- Modify: `components/admin/order-card.tsx`
- Modify: `app/globals.css`
- Test: `tests/unit/item-card-visual.test.tsx`

**Step 1: Escrever teste para fallback de imagem**

```tsx
import { render, screen } from '@testing-library/react';
import { ItemCard } from '@/components/menu/item-card';

it('renders fallback alt text for item image', () => {
  render(<ItemCard item={{ id: '1', name: 'Expresso', imageUrl: '/menu/expresso.png', available: true }} />);
  expect(screen.getByAltText(/expresso/i)).toBeInTheDocument();
});
```

**Step 2: Rodar o teste para confirmar a falha**

Run: `npm run test -- tests/unit/item-card-visual.test.tsx`
Expected: FAIL caso a imagem ainda nao seja renderizada

**Step 3: Implementar visual final**

Adicionar imagens ilustrativas, refinamento dos cards, hierarquia tipografica e sinalizacao de estado.

**Step 4: Rodar o teste novamente**

Run: `npm run test -- tests/unit/item-card-visual.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add public components app tests
git commit -m "feat: polish menu and admin visuals"
```

### Task 12: Configurar autenticacao simples do admin

**Files:**
- Create: `middleware.ts`
- Create: `app/login/page.tsx`
- Create: `components/auth/login-form.tsx`
- Modify: `app/admin/page.tsx`
- Test: `tests/integration/admin-auth.test.ts`

**Step 1: Escrever teste para protecao do admin**

```ts
import { describe, expect, it } from 'vitest';

describe('/admin protection', () => {
  it('redirects unauthenticated users to /login', () => {
    expect(true).toBe(false);
  });
});
```

**Step 2: Rodar o teste para confirmar a falha**

Run: `npm run test -- tests/integration/admin-auth.test.ts`
Expected: FAIL

**Step 3: Implementar login simples**

Proteger o admin com autenticacao basica via Supabase Auth ou sessao simples.

**Step 4: Rodar o teste novamente**

Run: `npm run test -- tests/integration/admin-auth.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add app components middleware.ts tests
git commit -m "feat: protect admin access"
```

### Task 13: Garantir qualidade com testes de fluxo

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/patient-order.spec.ts`
- Create: `tests/e2e/admin-order-flow.spec.ts`

**Step 1: Escrever o teste e2e do paciente**

Cobrir entrada de nome, selecao de itens e envio do pedido.

**Step 2: Rodar o teste para confirmar a falha inicial**

Run: `npm run test:e2e -- tests/e2e/patient-order.spec.ts`
Expected: FAIL antes da aplicacao estar totalmente pronta

**Step 3: Escrever o teste e2e do admin**

Cobrir visualizacao do pedido, alerta de novo pedido e marcacao como entregue.

**Step 4: Rodar ambos os testes apos a implementacao**

Run: `npm run test:e2e`
Expected: PASS

**Step 5: Commit**

```bash
git add playwright.config.ts tests/e2e
git commit -m "test: add end-to-end order flows"
```

### Task 14: Preparar deploy e operacao

**Files:**
- Modify: `README.md`
- Create: `docs/deploy.md`
- Create: `vercel.json`

**Step 1: Documentar setup do ambiente**

Listar envs, Supabase, deploy na Vercel e como gerar o QR Code.

**Step 2: Validar build de producao**

Run: `npm run build`
Expected: build concluido sem erros

**Step 3: Validar lint e testes**

Run: `npm run lint`
Expected: PASS

Run: `npm run test`
Expected: PASS

Run: `npm run test:e2e`
Expected: PASS

**Step 4: Commit**

```bash
git add README.md docs vercel.json
git commit -m "docs: add deployment and operations guide"
```

### Task 15: Publicar catalogo inicial e revisar operacao

**Files:**
- Modify: `supabase/seed.sql`
- Modify: `README.md`

**Step 1: Confirmar catalogo final com o cliente**

Revisar nomes dos itens, categorias e imagens ilustrativas.

**Step 2: Aplicar seed no ambiente**

Run: `supabase db push`
Expected: schema e seed aplicados

**Step 3: Validar no navegador os fluxos principais**

Run: `npm run dev`
Expected: menu, admin e estoque funcionando localmente

**Step 4: Commit**

```bash
git add supabase/seed.sql README.md
git commit -m "chore: finalize seeded clinic menu"
```

## Notas de Execucao

- Como a pasta estava vazia no inicio, a execucao deve comecar pela criacao do projeto base.
- Se o Supabase local nao for usado, adaptar as tarefas de migration/seed para o projeto remoto.
- O audio do admin deve incluir fallback visual, pois alguns navegadores exigem interacao inicial para liberar som.
- Ilustracoes podem entrar inicialmente como placeholders padronizados antes das artes finais.
