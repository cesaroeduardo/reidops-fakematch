<template>
  <div class="teams-list-results">
    <!-- Purple Team -->
    <div class="purple-team">
      <div class="result-bar">
        <img
          :src="showPurpleDefeatImage ? resultImages.purple.defeat : (showPurpleSurrenderImage ? resultImages.purple.surrender : resultImages.purple.victorious)"
        >
        <div class="purple-score">
          <img src="/assets/images/question-ico.png">
          <span @click="editPurpleScore" class="score" v-if="!editingPurpleScore">{{ purpleScore }}</span>
          <input
            v-else
            v-model="purpleScore"
            type="number"
            @keydown.enter="editingPurpleScore = false"
            @blur="editingPurpleScore = false"
            class="score-input"
          />
        </div>
      </div>
      <div class="player-list">
        <div class="status-caption">Dmg. Dealt Dmg. Taken <b>Recovery</b></div>
        <div class="playerlist">
          <!-- Use v-for to iterate over purpleTeam and create player entries -->
          <div v-for="player in purpleTeam" :key="player.name" class="player-add">
            <img
              class="add-button"
              :class="{ 'last-purple-player': isLastItem(player) && player.type === 'purple' }"
              :src="player.isFriendAdded ? '/assets/images/added-friend.svg' : '/assets/images/add-friend.svg'"
              width="37"
              height="37"
              alt="Pokémon Image"
              @click="toggleFriendStatus(player)"
            />
            <div class="player-pattern">
              <div class="playerListStyle player-container">
                <div class="pokemon-avatar">
                  <div class="box-level" @click="startEditingLevel(player)">
                    {{ player.level }}
                  </div>
                  <input
                    v-if="player.isEditingLevel"
                    type="number"
                    ref="playerLevelInput"
                    v-model="player.newLevel"
                    @keyup.enter="stopEditingLevel(player)"
                    class="level-input"
                  />
                  <img
                    @click="toggleSelect(player)"
                    :src="player.image"
                    :alt="player.selectedPokemon"
                    width="50"
                    height="50"
                  />
                  <select v-model="player.selectedPokemon" @change="changePokemon(player)" v-if="player.isSelectOpen" class="select-pokemon">
                    <option v-for="pokemon in availablePokemons" :key="pokemon.name" :value="pokemon.name">
                      {{ pokemon.name }}
                    </option>
                  </select>
                </div>
                <div class="box-name-status">
                  <div v-if="!player.isEditing" :style="playerNameStyle(player)" @click="startEditing(player)" class="player-name">
                    {{ player.name }}
                  </div>
                  <input
                    v-else
                    ref="playerInput"
                    v-model="player.newName"
                    @keyup.enter="stopEditing(player)"
                    class="player-input"
                  />
                  <div class="status-row">
                    <div v-if="!player.isEditingDamageDealt" @click="startEditingDamageDealt(player)">
                      <PlayerStatus
                        :total="player.totalDamageDealt"
                        :percentage="player.damageDealtPercentage"
                        type="Damage Dealt"
                      />
                    </div>
                    <input
                      v-else
                      ref="playerDamageDealtInput"
                      v-model="player.newDamageDealt"
                      @keyup.enter="stopEditingDamageDealt(player)"
                      class="status-input"
                    />
                    <div v-if="!player.isEditingDamageTaken" @click="startEditingDamageTaken(player)">
                      <PlayerStatus
                        :total="player.totalDamageTaken"
                        :percentage="player.damageTakenPercentage"
                        type="Damage Taken"
                      />
                    </div>
                    <input
                      v-else
                      ref="playerDamageTakenInput"
                      v-model="player.newDamageTaken"
                      @keyup.enter="stopEditingDamageTaken(player)"
                      class="status-input"
                    />
                    <div v-if="!player.isEditingRecovery" @click="startEditingRecovery(player)">
                      <PlayerStatus
                        :total="player.totalRecovery"
                        :percentage="player.recoveryPercentage"
                        type="Recovery"
                      />
                    </div>
                    <input
                      v-else
                      ref="playerRecoveryInput"
                      v-model="player.newRecovery"
                      @keyup.enter="stopEditingRecovery(player)"
                      class="status-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Orange Team -->
    <div class="orange-team">
      <div class="result-bar">
        <img
          :src="showOrangeDefeatImage ? resultImages.orange.defeat : (showOrangeSurrenderImage ? resultImages.orange.surrender : resultImages.orange.victorious)"
        >
        <span @click="editOrangeScore" class="score" v-if="!editingOrangeScore">{{ orangeScore }}</span>
        <input
          v-else
          v-model="orangeScore"
          type="number"
          @keydown.enter="editingOrangeScore = false"
          @blur="editingOrangeScore = false"
          class="score-input"
        />
      </div>
      <div class="player-list">
        <div class="status-caption">Dmg. Dealt Dmg. Taken <b>Recovery</b></div>
        <div class="playerlist">
          <!-- Use v-for to iterate over orangeTeam and create player entries -->
          <div v-for="player in orangeTeam" :key="player.name" class="player-add">
            <img
              class="add-button"
              :src="player.isFriendAdded ? '/assets/images/added-friend.svg' : '/assets/images/add-friend.svg'"
              width="37"
              height="37"
              alt="Pokémon Image"
              @click="toggleFriendStatus(player)"
            />
            <div class="player-pattern">
              <div class="playerListStyle player-container">
                <div class="pokemon-avatar">
                  <div class="box-level" @click="startEditingLevel(player)">
                    {{ player.level }}
                  </div>
                  <input
                    v-if="player.isEditingLevel"
                    type="number"
                    ref="playerLevelInput"
                    v-model="player.newLevel"
                    @keyup.enter="stopEditingLevel(player)"
                    class="level-input"
                  />
                  <img
                    @click="toggleSelect(player)"
                    :src="player.image"
                    :alt="player.selectedPokemon"
                    width="50"
                    height="50"
                  />
                  <select v-model="player.selectedPokemon" @change="changePokemon(player)" v-if="player.isSelectOpen" class="select-pokemon">
                    <option v-for="pokemon in availablePokemons" :key="pokemon.name" :value="pokemon.name">
                      {{ pokemon.name }}
                    </option>
                  </select>
                </div>
                <div class="box-name-status">
                  <div v-if="!player.isEditing" :style="playerNameStyle(player)" @click="startEditing(player)" class="player-name">
                    {{ player.name }}
                  </div>
                  <input
                    v-else
                    ref="playerInput"
                    v-model="player.newName"
                    @keyup.enter="stopEditing(player)"
                    class="player-input"
                  />
                  <div class="status-row">
                    <div v-if="!player.isEditingDamageDealt" @click="startEditingDamageDealt(player)">
                      <PlayerStatus
                        :total="player.totalDamageDealt"
                        :percentage="player.damageDealtPercentage"
                        type="Damage Dealt"
                      />
                    </div>
                    <input
                      v-else
                      ref="playerDamageDealtInput"
                      v-model="player.newDamageDealt"
                      @keyup.enter="stopEditingDamageDealt(player)"
                      class="status-input"
                    />
                    <div v-if="!player.isEditingDamageTaken" @click="startEditingDamageTaken(player)">
                      <PlayerStatus
                        :total="player.totalDamageTaken"
                        :percentage="player.damageTakenPercentage"
                        type="Damage Taken"
                      />
                    </div>
                    <input
                      v-else
                      ref="playerDamageTakenInput"
                      v-model="player.newDamageTaken"
                      @keyup.enter="stopEditingDamageTaken(player)"
                      class="status-input"
                    />
                    <div v-if="!player.isEditingRecovery" @click="startEditingRecovery(player)">
                      <PlayerStatus
                        :total="player.totalRecovery"
                        :percentage="player.recoveryPercentage"
                        type="Recovery"
                      />
                    </div>
                    <input
                      v-else
                      ref="playerRecoveryInput"
                      v-model="player.newRecovery"
                      @keyup.enter="stopEditingRecovery(player)"
                      class="status-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="actions">
    <button @click="generateRandomNames" class="button-style"><img src="/assets/images/random-ico.svg">Randomize Nicknames</button>
  </div>
  <div class="instructions">
    <div class="aviso"><b>Click</b> to edit PlayerName, Pokémon, Level, Friend and Status. <b>Enter</b> to confirm.</div>
    <div class="shortcut">To take a capture <b>Win + Shift + S</b> on Windows or <b>Cmd + Shift + 4</b> on Mac</div>
  </div>
</template>

<script>
import PlayerStatus from '../components/PlayerStatus.vue';
import { playerNames } from '../utils/RandomNames.js';
import { availablePokemons } from '../utils/PokemonList.js';

export default {
  name: "Home",
  components: {
    PlayerStatus,
  },
  data() {
    return {
      availablePokemons: availablePokemons,
      purpleScore: 584,
      orangeScore: 168,
      editingOrangeScore: false,
      editingPurpleScore: false,
      resultImages: {
        purple: {
          defeat: '/assets/images/purple_defeat.png',
          surrender: '/assets/images/purple_surrendered.png',
          victorious: '/assets/images/purple_victorious.png',
        },
        orange: {
          defeat: '/assets/images/orange_defeat.png',
          surrender: '/assets/images/orange_surrendered.png',
          victorious: '/assets/images/orange_victorious.png',
        },
      },
      purpleTeam: [
        {
          name: "Medot",
          level: 14,
          image: "/assets/pokemons/Gardevoir.png",
          type: 'purple', // Added type property to distinguish team
          totalDamageDealt: 88562,
          totalDamageTaken: 5352,
          totalRecovery: 9400,
          isFriendAdded: false
        },
        {
          name: "Makoto_x3",
          level: 14,
          image: "/assets/pokemons/Zeraora.png",
          type: 'purple', // Added type property to distinguish team
          totalDamageDealt: 109350,
          totalDamageTaken: 88020,
          totalRecovery: 34705,
          isFriendAdded: false
        },
        {
          name: "Olivotec",
          level: 13,
          image: "/assets/pokemons/Mamoswine.png",
          type: 'purple', // Added type property to distinguish team
          totalDamageDealt: 63400,
          totalDamageTaken: 18232,
          totalRecovery: 7650,
          isFriendAdded: false
        },
        {
          name: "Alanzetee",
          level: 14,
          image: "/assets/pokemons/Pikachu.png",
          type: 'purple', // Added type property to distinguish team
          totalDamageDealt: 82600,
          totalDamageTaken: 12654,
          totalRecovery: 1100,
          isFriendAdded: true
        },
        {
          name: "ttvReiDoPS",
          level: 15,
          image: "/assets/pokemons/Scizor.png",
          type: 'purple', // Added type property to distinguish team
          totalDamageDealt: 148820,
          totalDamageTaken: 75500,
          totalRecovery: 25803,
          isFriendAdded: false
        },
      ],
      orangeTeam: [
        {
          name: 'Falb',
          level: 13,
          image: "/assets/pokemons/Lucario.png",
          type: 'orange', // Added type property to distinguish team
          totalDamageDealt: 75030,
          totalDamageTaken: 56720,
          totalRecovery: 23023,
          isFriendAdded: false
        },
        {
          name: 'f3rZera',
          level: 12,
          image: "/assets/pokemons/Glaceon.png",
          type: 'orange', // Added type property to distinguish team
          totalDamageDealt: 44523,
          totalDamageTaken: 52356,
          totalRecovery: 15232,
          isFriendAdded: false
        },
        {
          name: 'Kinkiwi',
          level: 12,
          image: "/assets/pokemons/Blissey.png",
          type: 'orange', // Added type property to distinguish team
          totalDamageDealt: 56023,
          totalDamageTaken: 86025,
          totalRecovery: 159023,
          isFriendAdded: false
        },
        {
          name: 'Tatuliz',
          level: 13,
          image: "/assets/pokemons/Lapras.png",
          type: 'orange', // Added type property to distinguish team
          totalDamageDealt: 45323,
          totalDamageTaken: 130234,
          totalRecovery: 50232,
          isFriendAdded: false
        },
        {
          name: 'Zanarc',
          level: 9,
          image: "/assets/pokemons/Dragonite.png",
          type: 'orange', // Added type property to distinguish team
          totalDamageDealt: 15625,
          totalDamageTaken: 35232,
          totalRecovery: 3245,
          isFriendAdded: false
        },
      ],
      isSelectOpen: false, // Variável para rastrear se o select está aberto
    };
  },
  computed: {
    totalDamageDealtPurple() {
      return this.calculateTotal(this.purpleTeam, 'totalDamageDealt');
    },
    totalDamageTakenPurple() {
      return this.calculateTotal(this.purpleTeam, 'totalDamageTaken');
    },
    totalRecoveryPurple() {
      return this.calculateTotal(this.purpleTeam, 'totalRecovery');
    },
    totalDamageDealtOrange() {
      return this.calculateTotal(this.orangeTeam, 'totalDamageDealt');
    },
    totalDamageTakenOrange() {
      return this.calculateTotal(this.orangeTeam, 'totalDamageTaken');
    },
    totalRecoveryOrange() {
      return this.calculateTotal(this.orangeTeam, 'totalRecovery');
    },
    // Adicione uma computed property para o total de cada time
    totalPurple() {
      return (
        this.totalDamageDealtPurple +
        this.totalDamageTakenPurple +
        this.totalRecoveryPurple
      );
    },
    totalOrange() {
      return (
        this.totalDamageDealtOrange +
        this.totalDamageTakenOrange +
        this.totalRecoveryOrange
      );
    },
  },
  watch: {
    purpleScore: "toggleDefeatImage",
    orangeScore: "toggleDefeatImage",
    'player.totalDamageDealt': {
      handler(newDamageDealt, oldDamageDealt) {
        // Calcula a nova porcentagem quando totalDamageDealt muda
        this.player.damageDealtPercentage = (newDamageDealt / this.totalDamageDealtPurple) * 100;
      },
      deep: true, // Para observar mudanças profundas na propriedade player
    },
  },
  methods: {

    // Metodo de verificar time vencedor
    toggleDefeatImage() {
      const purpleScore = parseInt(this.purpleScore);
      const orangeScore = parseInt(this.orangeScore);

      // Verifique se alguma equipe se rendeu
      if (this.purpleSurrendered || this.orangeSurrendered) {
        this.showPurpleDefeatImage = this.purpleSurrendered;
        this.showOrangeDefeatImage = this.orangeSurrendered;
      } else {
        // Verifique qual time é o vencedor com base nas pontuações
        if (purpleScore > orangeScore) {
          this.showPurpleDefeatImage = false;
          this.showOrangeDefeatImage = true;
        } else if (orangeScore > purpleScore) {
          this.showPurpleDefeatImage = true;
          this.showOrangeDefeatImage = false;
        } else {
          // Em caso de empate, o time Purple vence
          this.showPurpleDefeatImage = false;
          this.showOrangeDefeatImage = true;
        }
      }
    },

    // Método para alternar entre defeat e surrender
    toggleSurrenderImage(team) {
      if (team === 'purple') {
        this.purpleSurrendered = !this.purpleSurrendered;
      } else if (team === 'orange') {
        this.orangeSurrendered = !this.orangeSurrendered;
      }
      this.toggleDefeatImage();
    },

    // Metodo para alteração de amizade
    toggleFriendStatus(player) {
      player.isFriendAdded = !player.isFriendAdded;
    },

    // Metodo para geração de nomes aleatorios
    generateRandomNames() {
      // Armazene o nome do último jogador do purpleTeam
      const lastPurplePlayerName = this.purpleTeam[this.purpleTeam.length - 1].name;

      // Embaralhe a lista de nomes para obter uma ordem aleatória
      const shuffledNames = this.shuffleArray(playerNames);

      // Preencha seus jogadores com nomes aleatórios da lista
      this.purpleTeam.forEach((player, index) => {
        if (player.name !== lastPurplePlayerName) {
          player.name = shuffledNames[index] || ""; // Use um nome aleatório ou uma string vazia
        }
      });

      this.orangeTeam.forEach((player, index) => {
        player.name = shuffledNames[index + this.purpleTeam.length] || ""; // Continue a partir do próximo índice
      });
    },

    shuffleArray(array) {
      // Função para embaralhar um array
      let currentIndex = array.length,
        randomIndex,
        temporaryValue;

      while (currentIndex !== 0) {
        // Escolha um elemento aleatório restante
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // E troque-o pelo elemento atual
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },

  // Método para alternar a visibilidade do seletor do jogador
  toggleSelect(player) {
      player.selectedPokemon = player.name; // Garanta que o valor selecionado seja o Pokémon atual
      player.isSelectOpen = !player.isSelectOpen; // Alterna o estado do seletor
    },

    // Método para fechar o seletor quando o usuário selecionar um novo Pokémon
    closeSelect(player) {
      player.isSelectOpen = false;
    },

    // Método para atualizar o Pokémon quando o usuário selecionar um novo
    changePokemon(player) {
      // Encontre o objeto Pokémon correspondente com base no nome selecionado
      const selectedPokemon = this.availablePokemons.find((pokemon) => pokemon.name === player.selectedPokemon);

      // Atualize a imagem do jogador
      player.image = selectedPokemon.image;
      this.closeSelect(player); // Feche o seletor após a seleção
    },

    // Método para iniciar a edição do nome do jogador
    startEditing(player) {
      player.isEditing = true;
      player.newName = player.name; // Inicialize o novo nome com o valor atual
      this.$nextTick(() => {
        // Após a renderização, focar o campo de entrada de texto
        this.$refs.playerInput.focus();
      });
    },

    // Método para alterar a pontuação dos times
    editOrangeScore() {
      this.editingOrangeScore = true;
      this.editingPurpleScore = false;
    },
    editPurpleScore() {
      this.editingOrangeScore = false;
      this.editingPurpleScore = true;
    },

    // Método para parar a edição do nome do jogador
    stopEditing(player) {
      player.isEditing = false;
      player.name = player.newName;
    },

    // Métodos para iniciar e parar a edição do nível (level)
    startEditingLevel(player) {
      player.isEditingLevel = true;
      player.newLevel = player.level.toString();
      this.$nextTick(() => {
        this.$refs.playerLevelInput.focus();
      });
    },
    stopEditingLevel(player) {
      player.isEditingLevel = false;
      player.level = parseInt(player.newLevel);
    },

    // Métodos para iniciar e parar a edição de cada status
    startEditingDamageDealt(player) {
      player.isEditingDamageDealt = true;
      player.newDamageDealt = player.totalDamageDealt.toString();
      this.$nextTick(() => {
        this.$refs.playerDamageDealtInput.focus();
      });
    },
    stopEditingDamageDealt(player) {
      player.isEditingDamageDealt = false;
      player.totalDamageDealt = parseFloat(player.newDamageDealt);
      this.calculatePercentages(player.type === 'purple' ? this.purpleTeam : this.orangeTeam);
    },

    startEditingDamageTaken(player) {
      player.isEditingDamageTaken = true;
      player.newDamageTaken = player.totalDamageTaken.toString();
      this.$nextTick(() => {
        this.$refs.playerDamageTakenInput.focus();
      });
    },
    stopEditingDamageTaken(player) {
      player.isEditingDamageTaken = false;
      player.totalDamageTaken = parseFloat(player.newDamageTaken);
      this.calculatePercentages(player.type === 'purple' ? this.purpleTeam : this.orangeTeam);
    },

    startEditingRecovery(player) {
      player.isEditingRecovery = true;
      player.newRecovery = player.totalRecovery.toString();
      this.$nextTick(() => {
        this.$refs.playerRecoveryInput.focus();
      });
    },
    stopEditingRecovery(player) {
      player.isEditingRecovery = false;
      player.totalRecovery = parseFloat(player.newRecovery);
      this.calculatePercentages(player.type === 'purple' ? this.purpleTeam : this.orangeTeam);
    },

    // Método para calcular as porcentagens individuais de cada Status
    calculatePercentages(team) {
      const totalDamageDealt = team.reduce((total, player) => total + player.totalDamageDealt, 0);
      const totalDamageTaken = team.reduce((total, player) => total + player.totalDamageTaken, 0);
      const totalRecovery = team.reduce((total, player) => total + player.totalRecovery, 0);

      team.forEach((player) => {
        player.damageDealtPercentage = (player.totalDamageDealt / totalDamageDealt) * 100;
        player.damageTakenPercentage = (player.totalDamageTaken / totalDamageTaken) * 100;
        player.recoveryPercentage = (player.totalRecovery / totalRecovery) * 100;
      });
    },
    isLastItem(player) {
      const team = player.type === 'purple' ? this.purpleTeam : this.orangeTeam;
      return player === team[team.length - 1];
    },
    playerNameStyle(player) {
      // Verifique se o jogador é o último da equipe roxa
      const isLastPurplePlayer = this.purpleTeam[this.purpleTeam.length - 1] === player;

      // Atribua a cor com base na condição
      return {
        color: isLastPurplePlayer ? '#edcf81' : 'rgba(255, 255, 255, .87)',
        // Outros estilos...
      };
    },
  },
  created() {
    // Inicialize showOrangeDefeatImage como true para que a equipe Orange comece com a imagem de derrota
    this.showOrangeDefeatImage = true;

    // Chamada para calcular as porcentagens para o time roxo
    this.calculatePercentages(this.purpleTeam);

    // Chamada para calcular as porcentagens para o time laranja
    this.calculatePercentages(this.orangeTeam);

    // Chamada para calcular as porcentagens para o time roxo
    this.calculatePercentages(this.purpleTeam);
    
    // Chamada para calcular as porcentagens para o time laranja
    this.calculatePercentages(this.orangeTeam);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.closeSelect);
  },
};
</script>

<style scoped>
.player-input {
  max-width: 120px;
  width: auto;
  border: none;
  font-size: 16px;
  background-color: white;
  color: black;
  border-radius: 2px;
  font-family: 'PlayersName';
  padding-top: 5px;
  font-weight: 500;
  letter-spacing: -0.36px;
}
.status-input {
  width: 65px;
  border: none;
  font-size: 19px;
  background-color: white;
  color: black;
  border-radius: 2px;
  font-family: "Exo 2";
  font-weight: 600;
  letter-spacing: -0.36px;
}
.level-input {
  position: absolute;
  width: 45px;
  margin-left: 30px;
  margin-top: 30px;
  border: none;
  font-size: 16px;
  background-color: white;
  color: black;
  border-radius: 2px;
  padding-top: 5px;
  font-family: 'PlayersName';
  font-weight: 500;
  letter-spacing: -0.36px;
  z-index: 2;
}
.last-purple-player {
  opacity: 0; /* Ajuste a opacidade conforme necessário */
}
.select-pokemon, option {
  z-index: 990;
  max-width: 120px;
  position: absolute;
  border: none;
  font-size: 16px;
  background-color: white;
  color: black;
  margin-right: 30px;
  border-radius: 2px;
  font-family: 'PlayersName';
  font-weight: 500;
}
.score-input {
  width: 65px;
  border: none;
  font-size: 19px;
  background-color: white;
  color: black;
  border-radius: 2px;
  font-family: 'Exo 2';
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.36px;
  z-index: 2;
}
</style>
