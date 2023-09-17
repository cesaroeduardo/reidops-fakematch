<template>
  <div class="teams-list-results">
    <div class="purple-team">
      <div class="result-bar"><span>Victorious</span><span>{{ purpleScore }}</span></div>
      <div class="player-list">
        <div class="status-caption">Dmg. Dealt Dmg. Taken <b>Recovery</b></div>
        <div class="playerlist">
          <!-- Use v-for to iterate over purpleTeam and create player entries -->
          <div v-for="player in purpleTeam" :key="player.name" class="player-add">
            <img
              class="add-button"
              :class="{ 'last-purple-player': isLastItem(player) && player.type === 'purple' }"
              src="/assets/buttons/add-friend.svg"
              width="37"
              height="37"
              alt="Pokémon Image"
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
                    @dblclick="toggleSelect(player)"
                    :src="player.image"
                    :alt="player.selectedPokemon"
                    width="50"
                    height="50"
                  />
                  <select v-model="player.selectedPokemon" @change="changePokemon(player)" v-if="player.isSelectOpen" class="select-pokemon">
                    <option v-for="pokemon in availablePokemon" :key="pokemon.name" :value="pokemon.name">
                      {{ pokemon.name }}
                    </option>
                  </select>
                </div>
                <div class="box-name-status">
                  <div v-if="!player.isEditing" :style="playerNameStyle(player)" @dblclick="startEditing(player)" class="player-name">
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
                    <div v-if="!player.isEditingDamageDealt" @dblclick="startEditingDamageDealt(player)">
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
                      class="player-input"
                    />
                    <div v-if="!player.isEditingDamageTaken" @dblclick="startEditingDamageTaken(player)">
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
                      class="player-input"
                    />
                    <div v-if="!player.isEditingRecovery" @dblclick="startEditingRecovery(player)">
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
                      class="player-input"
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
      <div class="result-bar"><span>Surrender</span><span>{{ orangeScore }}</span></div>
      <div class="player-list">
        <div class="status-caption">Dmg. Dealt Dmg. Taken <b>Recovery</b></div>
        <div class="playerlist">
          <!-- Use v-for to iterate over orangeTeam and create player entries -->
          <div v-for="player in orangeTeam" :key="player.name" class="player-add">
            <img
              class="add-button"
              :class="{ 'last-purple-player': isLastItem(player) && player.type === 'purple' }"
              src="/assets/buttons/add-friend.svg"
              width="37"
              height="37"
              alt="Pokémon Image"
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
                    @dblclick="toggleSelect(player)"
                    :src="player.image"
                    :alt="player.selectedPokemon"
                    width="50"
                    height="50"
                  />
                  <select v-model="player.selectedPokemon" @change="changePokemon(player)" v-if="player.isSelectOpen" class="select-pokemon">
                    <option v-for="pokemon in availablePokemon" :key="pokemon.name" :value="pokemon.name">
                      {{ pokemon.name }}
                    </option>
                  </select>
                </div>
                <div class="box-name-status">
                  <div v-if="!player.isEditing" :style="playerNameStyle(player)" @dblclick="startEditing(player)" class="player-name">
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
                    <div v-if="!player.isEditingDamageDealt" @dblclick="startEditingDamageDealt(player)">
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
                      class="player-input"
                    />
                    <div v-if="!player.isEditingDamageTaken" @dblclick="startEditingDamageTaken(player)">
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
                      class="player-input"
                    />
                    <div v-if="!player.isEditingRecovery" @dblclick="startEditingRecovery(player)">
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
                      class="player-input"
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
</template>

<script>
import PlayerStatus from '../components/PlayerStatus.vue';

export default {
  name: "Home",
  components: {
    PlayerStatus,
  },
  data() {
    return {
      purpleScore: 360,
      orangeScore: 0,
      purpleTeam: [
        {
          name: "Aliado1",
          level: 15,
          image: "/assets/pokemons/Gardevoir.png",
          type: 'purple', // Added type property to distinguish team
          totalDamageDealt: 400500,
          totalDamageTaken: 5300,
          totalRecovery: 9400,
        },
        {
          name: "Aliado2",
          level: 15,
          image: "/assets/pokemons/Charizard.png",
          type: 'purple', // Added type property to distinguish team
          totalDamageDealt: 320900,
          totalDamageTaken: 7200,
          totalRecovery: 11200,
        },
        {
          name: "Aliado3",
          level: 15,
          image: "/assets/pokemons/Blastoise.png",
          type: 'purple', // Added type property to distinguish team
          totalDamageDealt: 240700,
          totalDamageTaken: 9500,
          totalRecovery: 7600,
        },
        {
          name: "Aliado4",
          level: 15,
          image: "/assets/pokemons/Venusaur.png",
          type: 'purple', // Added type property to distinguish team
          totalDamageDealt: 180600,
          totalDamageTaken: 4200,
          totalRecovery: 5300,
        },
        {
          name: "Aliado5",
          level: 15,
          image: "/assets/pokemons/Pikachu.png",
          type: 'purple', // Added type property to distinguish team
          totalDamageDealt: 140400,
          totalDamageTaken: 6200,
          totalRecovery: 8400,
        },
      ],
      orangeTeam: [
        {
          name: 'Inimigo1',
          level: 15,
          image: "/assets/pokemons/Lucario.png",
          type: 'orange', // Added type property to distinguish team
          totalDamageDealt: 126030,
          totalDamageTaken: 56720,
          totalRecovery: 2340,
        },
        {
          name: 'Inimigo2',
          level: 15,
          image: "/assets/pokemons/Glaceon.png",
          type: 'orange', // Added type property to distinguish team
          totalDamageDealt: 99020,
          totalDamageTaken: 38400,
          totalRecovery: 6200,
        },
        {
          name: 'Inimigo3',
          level: 15,
          image: "/assets/pokemons/Blissey.png",
          type: 'orange', // Added type property to distinguish team
          totalDamageDealt: 76090,
          totalDamageTaken: 29300,
          totalRecovery: 4080,
        },
        {
          name: 'Inimigo4',
          level: 15,
          image: "/assets/pokemons/Machamp.png",
          type: 'orange', // Added type property to distinguish team
          totalDamageDealt: 52060,
          totalDamageTaken: 21500,
          totalRecovery: 3060,
        },
        {
          name: 'Inimigo5',
          level: 15,
          image: "/assets/pokemons/Dragonite.png",
          type: 'orange', // Added type property to distinguish team
          totalDamageDealt: 45030,
          totalDamageTaken: 16800,
          totalRecovery: 2380,
        },
      ],
      isSelectOpen: false, // Variável para rastrear se o select está aberto
      availablePokemon: [
        { name: 'Absol', image: '/assets/pokemons/Absol.png' },
        { name: 'Aegislash', image: '/assets/pokemons/Aegislash.png' },
        { name: 'Alolan Ninetales', image: '/assets/pokemons/Alolan_Ninetales.png' },
        { name: 'Azumarill', image: '/assets/pokemons/Azumarill.png' },
        { name: 'Blastoise', image: '/assets/pokemons/Blastoise.png' },
        { name: 'Blaziken', image: '/assets/pokemons/Blaziken.png' },
        { name: 'Blissey', image: '/assets/pokemons/Blissey.png' },
        { name: 'Buzzwole', image: '/assets/pokemons/Buzzwole.png' },
        { name: 'Charizard', image: '/assets/pokemons/Charizard.png' },
        { name: 'Cinderace', image: '/assets/pokemons/Cinderace.png' },
        { name: 'Clefable', image: '/assets/pokemons/Clefable.png' },
        { name: 'Comfey', image: '/assets/pokemons/Comfey.png' },
        { name: 'Cramorant', image: '/assets/pokemons/Cramorant.png' },
        { name: 'Crustle', image: '/assets/pokemons/Crustle.png' },
        { name: 'Decidueye', image: '/assets/pokemons/Decidueye.png' },
        { name: 'Delphox', image: '/assets/pokemons/Delphox.png' },
        { name: 'Dodrio', image: '/assets/pokemons/Dodrio.png' },
        { name: 'Dragapult', image: '/assets/pokemons/Dragapult.png' },
        { name: 'Dragonite', image: '/assets/pokemons/Dragonite.png' },
        { name: 'Duraludon', image: '/assets/pokemons/Duraludon.png' },
        { name: 'Eldegoss', image: '/assets/pokemons/Eldegoss.png' },
        { name: 'Espeon', image: '/assets/pokemons/Espeon.png' },
        { name: 'Garchomp', image: '/assets/pokemons/Garchomp.png' },
        { name: 'Gardevoir', image: '/assets/pokemons/Gardevoir.png' },
        { name: 'Gengar', image: '/assets/pokemons/Gengar.png' },
        { name: 'Glaceon', image: '/assets/pokemons/Glaceon.png' },
        { name: 'Goodra', image: '/assets/pokemons/Goodra.png' },
        { name: 'Greedent', image: '/assets/pokemons/Greedent.png' },
        { name: 'Greninja', image: '/assets/pokemons/Greninja.png' },
        { name: 'Hoopa', image: '/assets/pokemons/Hoopa.png' },
        { name: 'Lapras', image: '/assets/pokemons/Lapras.png' },
        { name: 'Lucario', image: '/assets/pokemons/Lucario.png' },
        { name: 'Machamp', image: '/assets/pokemons/Machamp.png' },
        { name: 'Mamoswine', image: '/assets/pokemons/Mamoswine.png' },
        { name: 'Mew', image: '/assets/pokemons/Mew.png' },
        { name: 'MewtwoY', image: '/assets/pokemons/MewtwoY.png' },
        { name: 'MewtwoX', image: '/assets/pokemons/MewtwoX.png' },
        { name: 'Mr. Mime', image: '/assets/pokemons/Mr_Mime.png' },
        { name: 'Pikachu', image: '/assets/pokemons/Pikachu.png' },
        { name: 'Sableye', image: '/assets/pokemons/Sableye.png' },
        { name: 'Scizor', image: '/assets/pokemons/Scizor.png' },
        { name: 'Slowbro', image: '/assets/pokemons/Slowbro.png' },
        { name: 'Snorlax', image: '/assets/pokemons/Snorlax.png' },
        { name: 'Sylveon', image: '/assets/pokemons/Sylveon.png' },
        { name: 'Talonflame', image: '/assets/pokemons/Talonflame.png' },
        { name: 'Trevenant', image: '/assets/pokemons/Trevenant.png' },
        { name: 'Tsareena', image: '/assets/pokemons/Tsareena.png' },
        { name: 'Tyranitar', image: '/assets/pokemons/Tyranitar.png' },
        { name: 'Urshifu', image: '/assets/pokemons/Urshifu.png' },
        { name: 'Venusaur', image: '/assets/pokemons/Venusaur.png' },
        { name: 'Wigglytuff', image: '/assets/pokemons/Wigglytuff.png' },
        { name: 'Zacian', image: '/assets/pokemons/Zacian.png' },
        { name: 'Zeraora', image: '/assets/pokemons/Zeraora.png' },
        { name: 'Zoroark', image: '/assets/pokemons/Zoroark.png' },
      ],
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
    'player.totalDamageDealt': {
      handler(newDamageDealt, oldDamageDealt) {
        // Calcula a nova porcentagem quando totalDamageDealt muda
        this.player.damageDealtPercentage = (newDamageDealt / this.totalDamageDealtPurple) * 100;
      },
      deep: true, // Para observar mudanças profundas na propriedade player
    },
  },
  methods: {
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
      const selectedPokemon = this.availablePokemon.find((pokemon) => pokemon.name === player.selectedPokemon);

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
        color: isLastPurplePlayer ? '#edcf81' : '#EFE2FF',
        // Outros estilos...
      };
    },
  },
  created() {
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
  max-width: 85px;
  width: auto;
  border: none;
  font-size: 19px;
  background-color: white;
  color: black;
  border-radius: 2px;
  font-family: 'Exo 2';
  font-weight: 500;
  letter-spacing: -0.36px;
}
.level-input {
  position: absolute;
  width: 45px;
  margin-left: 30px;
  margin-top: 30px;
  border: none;
  font-size: 19px;
  background-color: white;
  color: black;
  border-radius: 2px;
  font-family: 'Exo 2';
  font-weight: 500;
  letter-spacing: -0.36px;
}
.last-purple-player {
  opacity: 0; /* Ajuste a opacidade conforme necessário */
}
.select-pokemon {
  z-index: 990;
  position: absolute;
  border: none;
  font-size: 19px;
  background-color: white;
  color: black;
  border-radius: 2px;
  font-family: 'Exo 2';
  font-weight: 500;
  letter-spacing: -0.36px;
}
</style>