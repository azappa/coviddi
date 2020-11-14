export const keys = {
  LASTWEEK: 'LASTWEEK',
  LASTTWOWEEKS: 'LASTTWOWEEKS',
  LASTMONTH: 'LASTMONTH',
  LASTTHREEMONTHS: 'LASTTHREEMONTHS',
  ALLTIME: 'ALLTIME',
};

export const timeFrames = {
  [keys.LASTWEEK]: 7,
  [keys.LASTTWOWEEKS]: 14,
  [keys.LASTMONTH]: 30,
  [keys.LASTTHREEMONTHS]: 90,
  [keys.ALLTIME]: -1,
};

export const timeFramesDict = {
  [keys.LASTWEEK]: {
    label: 'ultima settimana',
  },
  [keys.LASTTWOWEEKS]: {
    label: 'ultime due settimane',
  },
  [keys.LASTMONTH]: {
    label: 'ultimo mese',
  },
  [keys.LASTTHREEMONTHS]: {
    label: 'ultimi tre mesi',
  },
  [keys.ALLTIME]: {
    label: 'di sempre',
  },
};
