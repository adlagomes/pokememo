# PokeMemo

// inserir imagem! <img src="">

## ~ :gear: Tecnologias <a name="-tecnologias"></a>
  - Vite
  - React
  - CSS
  - PokeAPI

## ~ :clipboard: Projeto <a name="-projeto"></a>
  PokeMemo é um jogo da memória diferente desenvolvido por mim com o único intuito de por em prática os conhecimentos adquiridos estudando react e consumo de API.
  
  #### :thinking: Como funciona:
   O jogador deverá clicar no botão START para que nove cartões diferentes sejam exibidos na tela, todos exibirão a imagem e o nome do respectivo pokemon. Após um tempo de 6s, os cartões irão mudar a face e a seguinte pergunta aparecerá para o jogador: Onde está 'nome do pokemon'?. Ao clicar na carta a rodada será encerrada exibindo uma mensagem informando o sucesso ou o fracasso do jogador e um ponto será acumulado na tabela de score. Um botão de RESTART surgirá junto com a mensagem informativa e ao clicar no botão uma nova rodada começará.
   
   #### :nerd_face: Para dev:
   Criei o projeto usando Vite e escolhendo react como biblioteca. Tenho uma função assíncrona chamada pokeApi que faz fetch na api do pokemon e faço uma busca pela rota que vai me trazer a url e um name. Esse name eu posso acessar ele também das informações vindas dessa url que estou buscando, porém já passei o name que vem junto com a url. Dentro da função pokeAPi faço um map passando a url e o name para outra função chamada getPokeData. Essa função é responsável por fazer um fetch na url que lhe foi passada e então consigo acessar mais informações sobre cada um dos pokemons, isso inclui o sprite do pokemon que é o meu objetivo principal. Dentro dessa função, após obter um json de cada url acessada, executo setInitialPokeList que irá passar um objeto contendo id, name e imagem para o array que é inicialmente vazio. Em seguida uso método sort() para embaralhar essa lista e passo o método slice() para que ela me devolva apenas nove objetos.
   A função pokeApi é ativada quando o jogador clica no botão START, então a primeira lista de pokemons será criada e exibida. Ainda na função pokeApi mudo o estado do botão START usando setShowButton(true) para que ele fique invisível e em getPokeData mudo o estado de message para que mostre o componente timer. Quando pokeApi é executada e a initialPokeList[8] passa a existir o useEffect executará setTimeout que após 6s chamará a função cardsFaceDown. Essa função tem como objetivo verificar se initialPokelist[8] existe e então mudar o estado de showCard (que esconderá as cartas), mudará namePokemon que receberá um nome aleatório da lista de pokemons e mudará o estado de board para true, fazendo com que ao ser verdadeiro exiba a pergunta: "Onde está namePokemon?".
   Ao clicar na carta escolhida o componente Card recebe como propriedade a função handleCardClick. Essa função recebe um parâmetro n e verifica se board é true, caso seja ele verifica se o parametro n é igual a namePokemon, sendo verdadeiro ele mudará o valor do estado victory que recebe victory + 1 e passa a mensagem de vitória que será exibida no modal. O mesmo ocorre para o caso de n ser diferente de namePokemon, e caso board seja false nada acontece. No fim ele muda o valor de showModal e de showButton.
   O componente Card recebe as propriedades key, name, img, show e takingTheCard que é responsável por passar handleCardClick. Basicamente esse componente retorna uma div principal que recebe onCLick executando a função getCard e mudando o valor de showCard para true. Uma div mais interna recebe uma variável como className que é responsável pela aplicação do flip nas cartas e dentro dessa div temos mais duas divs, uma contendo a tag img que recebe como src props.img e uma tag span que recebe como conteúdo props.name, e a outra é uma div vazia com apenas um className responsável por exibir a parte de trás do card. A função getCard cria uma variável que recebe props.name e verifica props.takingTheCard que caso exista passará cardName como propriedade para a função takingTheCard que por sua vez transmitirá esse parâmetro para handleCardClick. Esse componente conta ainda com um useEffect que ficará ouvindo props.show, sempre que o valor de show mudar o useEffect executará a função setShowCard. Sempre que showCard for true o efeito flip será ativado nos cards.
   O componente Modal...
  
## :memo: Licença <a name="memo-licença"></a>
