# Navegação do App

## Fluxo de Navegação

### 1. Tela Inicial (Login)
- **Rota**: `/login`
- **Descrição**: Primeira tela que aparece ao abrir o app
- **Funcionalidades**:
  - Login com email e senha
  - Validação de campos obrigatórios
  - Login social (Facebook, Google, Apple)
  - Link para "Esqueci a senha"
  - Link para cadastro (onboarding)

### 2. Tela de Onboarding
- **Rota**: `/onboarding`
- **Descrição**: Tela de boas-vindas com apresentação do app
- **Funcionalidades**:
  - Apresentação visual do app
  - Botão "Login" (vai para `/login`)
  - Botão "Create Account" (vai para `/login`)

### 3. Tela de Torneios
- **Rota**: `/tournaments`
- **Descrição**: Lista de torneios disponíveis
- **Funcionalidades**:
  - Tabs: Tournaments, Upcoming, Live
  - Cards de torneios com preços
  - Botão para criar novo torneio

### 4. Home (Tabs)
- **Rota**: `/(tabs)/home`
- **Descrição**: Tela principal após login
- **Funcionalidades**:
  - Lista de times
  - Jogos ao vivo
  - Últimos jogos
  - Botão flutuante para criar jogo

### 5. Profile (Tabs)
- **Rota**: `/(tabs)/profile`
- **Descrição**: Perfil do usuário
- **Funcionalidades**:
  - Informações do usuário
  - Estatísticas de jogo
  - Opções de configuração
  - **Logout** (volta para `/login`)

## Como Testar

1. **Iniciar o app**: A primeira tela será o login
2. **Fazer login**: Preencher email e senha (qualquer valor válido)
3. **Navegar**: Após login, será redirecionado para a home
4. **Testar logout**: Ir para Profile → Clicar em "Sair" → Confirmar → Volta para login
5. **Testar outras telas**: Usar os links de navegação

## Validações do Login

- Email e senha são obrigatórios
- Senha deve ter pelo menos 6 caracteres
- Feedback visual durante o processo de login
- Alertas para campos inválidos

## Funcionalidade de Logout

- **Localização**: Tela de Profile
- **Ação**: Botão "Sair" no final da tela
- **Confirmação**: Alert de confirmação antes de sair
- **Navegação**: `router.replace('/login')` (substitui a tela atual)
- **Comportamento**: Não permite voltar para a home após logout

## Cores Utilizadas

- **Laranja principal**: `#ff6500`
- **Azul**: `#0038a7`
- **Branco**: `#ffffff`
- **Cinza claro**: `#f5f5f7`
- **Cinza médio**: `#666666`
- **Preto**: `#333333`
- **Vermelho (logout)**: `#FF3B30`
