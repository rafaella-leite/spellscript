# 🔮 SpellScript

SpellScript é um jogo de memória desenvolvido para a disciplina de Programação Web.

O jogador assume o papel de uma bruxa que precisa preparar poções mágicas. Para isso, deve memorizar uma sequência de ingredientes exibida por alguns segundos e reproduzi-la corretamente no caldeirão.

## 🎯 Objetivo

O objetivo do jogo é preparar corretamente 8 poções antes que todas as vidas sejam perdidas.

A cada rodada, uma receita com quatro ingredientes é apresentada. Após alguns segundos, a receita desaparece e o jogador deve selecionar os ingredientes na mesma ordem.

## 🎮 Como jogar

1. Clique em **Executar feitiço** para iniciar a partida.
2. Observe a sequência de ingredientes apresentada.
3. Memorize os quatro ingredientes e a ordem em que aparecem.
4. Quando a receita desaparecer, selecione os ingredientes na ordem correta.
5. Ao completar uma receita corretamente, o jogador recebe pontos.
6. Conforme as rodadas avançam, o tempo disponível para memorizar a receita diminui.
7. Ao selecionar um ingrediente incorreto, o jogador perde uma vida.
8. O jogador possui 5 vidas.
9. Complete as 10 poções para vencer.

## 💥 Erros mágicos

Quando um ingrediente incorreto é selecionado, um efeito aleatório acontece:

- 💥 **Potion Overflow:** o caldeirão explode.
- 🐸 **Frog Transformation:** a bruxa é transformada em sapo.
- 👻 **Undeclared Spirit:** um fantasma é invocado.
- 🐈‍⬛ **Familiar Interference:** o familiar interfere no feitiço.

Cada erro possui animação e efeito sonoro próprio.

## 🏆 Pontuação

Cada poção preparada corretamente concede pontos.

A primeira poção concede 100 pontos e o valor aumenta progressivamente conforme o jogador avança.

## 💻 Tecnologias utilizadas

O jogo foi desenvolvido utilizando exclusivamente:

- HTML5
- CSS3
- JavaScript

Também foram utilizados conceitos como:

- Manipulação do DOM
- Tratamento de eventos
- Funções
- Arrays e objetos
- Estruturas condicionais
- Temporizadores
- Controle do estado da partida
- Geração aleatória
- Animações CSS
- Reprodução de áudio

Nenhum framework ou biblioteca externa foi utilizado.

## 📁 Estrutura do projeto

```text
SpellScript/
│
├── index.html
├── style.css
├── script.js
├── README.md
├── LICENSE
│
└── audio/
    ├── musica.mp3
    ├── gato.mp3
    ├── explosao.mp3
    ├── sapo.mp3
    └── fantasma.mp3

⚙️ Como executar

O SpellScript não necessita de instalação ou dependências externas.

Faça o download ou clone o repositório.
Abra a pasta do projeto.
Abra o arquivo index.html em um navegador.

Também é possível jogar diretamente pela versão publicada no GitHub Pages.

🌐 Jogo publicado

GitHub Pages: https://rafaella-leite.github.io/spellscript/

📦 Repositório

GitHub: https://github.com/rafaella-leite/spellscript

📄 Licença

Este projeto está disponível sob a licença MIT.

## Informações da atividade

```json
{
    "nome": "SpellScript",
    "descricao": "Jogo de memória em que o jogador memoriza receitas mágicas e seleciona os ingredientes na ordem correta para preparar poções.",
    "autores": "RAFAELLA MACIEL PEREIRA LEITE",
    "turma": "14B"
}