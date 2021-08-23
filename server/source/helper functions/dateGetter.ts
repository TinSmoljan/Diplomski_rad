const getTheDates = (orginalDateString: string): Array<Date> => {
  let allDates: Array<Date> = [];
  let i = 0;
  const originalDate = new Date(orginalDateString);
  const originalDay = originalDate.getDay();

  if (originalDay == 1) {
    for (i = 0; i < 7; i++) {
      let temp = nextDay(originalDate, i);
      allDates.push(temp);
    }
  } else if (originalDay == 2) {
    let temp = previousDay(originalDate, 1);
    allDates.push(temp);
    for (i = 0; i < 6; i++) {
      temp = nextDay(originalDate, i);
      allDates.push(temp);
    }
  } else if (originalDay == 3) {
    let temp;
    for (i = 2; i > 0; i--) {
      temp = previousDay(originalDate, i);
      allDates.push(temp);
    }
    for (i = 0; i < 5; i++) {
      temp = nextDay(originalDate, i);
      allDates.push(temp);
    }
  } else if (originalDay == 4) {
    let temp;
    for (i = 3; i > 0; i--) {
      temp = previousDay(originalDate, i);
      allDates.push(temp);
    }
    for (i = 0; i < 4; i++) {
      temp = nextDay(originalDate, i);
      allDates.push(temp);
    }
  } else if (originalDay == 5) {
    let temp;
    for (i = 4; i > 0; i--) {
      temp = previousDay(originalDate, i);
      allDates.push(temp);
    }
    for (i = 0; i < 3; i++) {
      temp = nextDay(originalDate, i);
      allDates.push(temp);
    }
  } else if (originalDay == 6) {
    let temp;
    for (i = 5; i > 0; i--) {
      temp = previousDay(originalDate, i);
      allDates.push(temp);
    }
    for (i = 0; i < 2; i++) {
      temp = nextDay(originalDate, i);
      allDates.push(temp);
    }
  } else if (originalDay == 0) {
    let temp;
    for (i = 6; i >= 0; i--) {
      temp = previousDay(originalDate, i);
      allDates.push(temp);
    }
  }

  return allDates;
};

const previousDay = (thisDay: Date, decrement: number): Date => {
  const tomorrow = new Date(thisDay);
  tomorrow.setDate(tomorrow.getDate() - decrement);
  return tomorrow;
};

const nextDay = (thisDay: Date, increment: number): Date => {
  const tomorrow = new Date(thisDay);
  tomorrow.setDate(tomorrow.getDate() + increment);
  return tomorrow;
};

// const getArray = (thisDay: Date): Array<Date> => {};

export default getTheDates;
