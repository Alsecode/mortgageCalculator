export const numberToRubles = (num) => {
  return `${new Intl.NumberFormat('ru-RU').format(num.toFixed(0))} ₽`
}

export const numberToPercent = (num) => {
  if (num === Number(num.toFixed(0))) {
    return `${num.toFixed(0)}%`
  }
  return `${num.toFixed(1)}%`
}

export const numberToReadableRubles = (num) => {
  const absNum = Math.abs(num);
  let formattedNumber;
  let suffix = '₽';

  if (absNum >= 1_000_000_000) {
    formattedNumber = new Intl.NumberFormat('ru-RU', { 
      maximumFractionDigits: 1, 
      minimumFractionDigits: 1 
    }).format(num / 1_000_000_000);
    suffix = ' млрд. ₽';
  } else if (absNum >= 1_000_000) {
    formattedNumber = new Intl.NumberFormat('ru-RU', { 
      maximumFractionDigits: 1, 
      minimumFractionDigits: 1 
    }).format(num / 1_000_000);
    suffix = ' млн. ₽';
  } else if (absNum >= 1_000) {
    formattedNumber = new Intl.NumberFormat('ru-RU', { 
      maximumFractionDigits: 0 
    }).format(num / 1_000);
    suffix = ' тыс. ₽';
  } else {
    formattedNumber = new Intl.NumberFormat('ru-RU').format(num);
    suffix = ' ₽';
  }

  return `${formattedNumber} ${suffix}`;
}