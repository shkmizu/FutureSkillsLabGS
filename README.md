# Future Skills Lab

## Integrantes

* Vitor Shimizu – RM550390
* Fabrizio Maia - RM551869
* Victor Asfur - RM551684


## 🌐 Resumo do Projeto

O **Future Skills Lab** é uma aplicação mobile (cross-platform) desenvolvida em **React Native** utilizando o *Managed Workflow* do **Expo** e o **Expo Router** para navegação. O objetivo central é fornecer aos usuários uma ferramenta estruturada para registrar, categorizar e acompanhar o desenvolvimento de competências (Hard Skills e Soft Skills) essenciais para o futuro do mercado de trabalho.

Todos os dados da jornada de aprendizado são mantidos com persistência local através do **AsyncStorage**.

## 🎯 Objetivo de Negócio

A aplicação está alinhada ao tema **"O Futuro do Trabalho"**. Ela permite que o usuário gerencie ativamente seu desenvolvimento profissional por meio de:

* **Autoavaliação:** Registro do nível de proficiência e objetivos de aprendizado.
* **Acompanhamento:** Visualização da lista de habilidades com filtros de categoria.
* **Evolução:** Edição e exclusão de habilidades à medida que o conhecimento evolui.
* **Aprendizado Contínuo:** Incentiva o registro e o acompanhamento de novas competências emergentes.

## 📦 Recursos e Funcionalidades Implementadas

O aplicativo possui um conjunto de funcionalidades estáveis, totalmente em Português:

* **Gestão Completa de Habilidades (CRUD):** Adicionar, listar, editar e excluir habilidades.
* **Localização:** Interface do usuário (labels, botões e mensagens) totalmente em **Português do Brasil**.
* **Fluxo de UX Corrigido:**
    * **Salvar/Editar:** Exibe uma mensagem de sucesso ("Habilidade salva com sucesso!") e retorna automaticamente à tela Home.
    * **Excluir:** Remove a habilidade do armazenamento, exibe a confirmação e atualiza a lista de habilidades em tempo real.
* **Categorização e Níveis:** Classificação por `Hard Skill`, `Soft Skill` e nível de proficiência (`Iniciante`, `Intermediário`, `Avançado`).
* **Filtros Dinâmicos:** Filtra a lista de habilidades por tipo (Todas, Hard Skills ou Soft Skills).
* **Persistência:** Utiliza `AsyncStorage` para manter os dados localmente.

## 🚀 Tecnologias Utilizadas

O projeto foi construído sobre uma base moderna e tipada:

| Categoria | Tecnologia | Pacotes Chave |
| :--- | :--- | :--- |
| **Framework/Plataforma** | **React Native** & **Expo** | `react-native`, `expo`, `expo-status-bar` |
| **Roteamento** | Expo Router | `expo-router`, `@react-navigation/*` |
| **Persistência de Dados**| AsyncStorage | `@react-native-async-storage/async-storage` |
| **Linguagem** | TypeScript | `typescript` |
| **Utilidades** | Hooks e Validações | `useState`, `useEffect`, `useFocusEffect` |

## 🛠 Instalação e Execução

Para configurar e rodar o projeto localmente, siga os passos abaixo:

### Pré-requisitos

1.  Node.js (versão LTS).
2.  Git.
3.  Expo Go instalado em seu dispositivo móvel (ou emulador/simulador).

### Comandos de Inicialização

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/usuario/FutureSkillsLabGS.git](https://github.com/usuario/FutureSkillsLabGS.git)
    cd FutureSkillsLabGS
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    ```

3.  **Execute o Aplicativo:**
    (Use o flag `--clear` para garantir que o cache do Metro Bundler esteja limpo, resolvendo problemas de renderização.)
    ```bash
    npx expo start --clear
    ```
4.  Use o aplicativo **Expo Go** para escanear o QR Code exibido no terminal e iniciar a aplicação.

## 📁 Estrutura do Código

A arquitetura de pastas segue o padrão de roteamento do Expo Router:
