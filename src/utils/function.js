export function calculatePercentage(total, playerTotal) {
    return (playerTotal / total) * 100;
  }

  // export function formatTotal(value) {
  //   const formattedValue = parseFloat(value).toLocaleString(undefined, {
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 3,
  //   });
  
  //   return formattedValue.replace(/\./g, ',');
  // }

  export function calculateTeamTotal(team) {
    let totalDamageDealt = 0;
    let totalDamageTaken = 0;
    let totalRecovery = 0;
  
    team.forEach((player) => {
      player.types.forEach((type) => {
        if (type.type === 'Damage Dealt') {
          totalDamageDealt += type.total;
        } else if (type.type === 'Damage Taken') {
          totalDamageTaken += type.total;
        } else if (type.type === 'Recovery') {
          totalRecovery += type.total;
        }
      });
    });
  
    return {
      totalDamageDealt,
      totalDamageTaken,
      totalRecovery,
    };
  }