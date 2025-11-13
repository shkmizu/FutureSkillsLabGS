
# Future Skills Lab

O **Future Skills Lab** é um aplicativo mobile desenvolvido em **React Native** com persistência local utilizando **AsyncStorage**, criado para ajudar pessoas a acompanhar o desenvolvimento de novas competências essenciais para o futuro do trabalho.

## 🎯 Objetivo do Aplicativo
O aplicativo permite que o usuário:
- Registre novas soft skills e hard skills que deseja aprender.
- Marque seu progresso individual em cada habilidade.
- Visualize uma lista persistente das habilidades salvas.
- Edite ou remova habilidades conforme sua evolução.
- Acompanhe sua jornada de aprendizado dentro de um laboratório pessoal de competências do futuro.

## 🚀 Tecnologias Utilizadas
- **React Native** (Expo ou CLI)
- **AsyncStorage** para persistência local
- **JavaScript / TypeScript**
- **Hooks (useState, useEffect)**
- **React Navigation** (opcional, caso organize telas)

## 📦 Funcionalidades
- Adicionar nova habilidade com descrição e categoria.
- Atualizar o nível de progresso da habilidade (0 a 100%).
- Listar todas as habilidades salvas.
- Persistência automática usando AsyncStorage.
- Interface simples, amigável e moderna.

## 🧠 Conceito
A ideia do app está alinhada ao tema **“O Futuro do Trabalho”**, permitindo que usuários se preparem para  
o mercado por meio de autoavaliação, registro e acompanhamento de evolução em competências emergentes,  
como:
- Inteligência Artificial aplicada  
- Pensamento crítico  
- Automação e DevOps  
- Aprendizado contínuo (Lifelong Learning)  
- Resolução de problemas complexos  
- Comunicação e colaboração digital  

## 📁 Estrutura do Projeto (Exemplo)
```
FutureSkillsLab/
├── src/
│   ├── components/
│   ├── screens/
│   │   ├── Home.js
│   │   ├── AddSkill.js
│   │   ├── SkillDetails.js
│   ├── storage/
│   │   ├── skillsStorage.js
│   ├── App.js
├── package.json
└── README.md
```

## 🛠 Como Executar
1. Clone o repositório:
```
git clone https://github.com/usuario/FutureSkillsLab.git
```

2. Instale as dependências:
```
npm install
```

3. Execute o aplicativo:
```
npm start
```

## 💾 Armazenamento Local (AsyncStorage)
O app utiliza uma chave única:
```
"@futureSkillsLab:skills"
```

Os dados são salvos em formato JSON:
```
[
  {
    "id": "uuid",
    "name": "Machine Learning",
    "category": "Tecnologia",
    "progress": 40
  }
]
```

## 📘 Melhorias Futuras
- Modo escuro
- Integração com API de sugestões de habilidades
- Gráficos de progresso
- Categorias avançadas
- Gamificação com pontos e conquistas

## 📄 Licença
MIT License – fique à vontade para usar, modificar e melhorar.

---

Desenvolvido para o desafio **Global Solution FIAP – Futuro do Trabalho**.
