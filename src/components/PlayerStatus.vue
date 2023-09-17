<template>
  <div class="status-container">
    <div class="total-status">{{ formatNumber(total) }}</div>
    <div class="statusStyle status-bar">
      <div :style="percentStatusStyle">
        <div :style="percentColorStatusStyle"></div>
      </div>
      <div class="status-text" :style="percentTextStatusStyle">{{ formattedPercentage }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerStatus",
  props: {
    total: Number,
    percentage: Number,
    type: String,
  },
  computed: {
    formattedPercentage() {
      return this.percentage.toFixed(1) + "%";
    },
    percentStatusStyle() {
      return {
        display: 'flex',
        width: '64px',
        flexDirection: 'column',
        justifyContent: 'center',
      };
    },
    percentTextStatusStyle() {
      return {
        color: '#FFF',
        textAlign: 'center',
        fontSize: '12px',
        fontFamily: 'Exo 2',
        fontWeight: 500,
        letterSpacing: '-0.36px',
        position: 'absolute',
        width: '64px',
        marginTop: '-3px',
        zIndex: 99,
      };
    },
    getTypeColor() {
      const colors = {
        'Damage Dealt': '#D16F6A',
        'Damage Taken': '#86B1E1',
        'Recovery': '#9CC59B',
      };
      return colors[this.type] || '#000';
    },
    percentColorStatusStyle() {
      const percent = parseFloat(this.percentage);
      const barWidth = Math.round((percent / 100) * 64);

      return {
        width: `${barWidth}px`,
        position: 'relative',
        height: '14px',
        background: this.getTypeColor,
        zIndex: 9,
        borderRadius: '2px 0 0 2px',
      };
    },
  },
  methods: {
    // Função de formatação personalizada para adicionar vírgula como separador de milhares
    formatNumber(number) {
      const parts = number.toFixed(0).toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
  },
};
</script>

<style scoped>
/* Adicione seus estilos específicos do componente aqui */
</style>
