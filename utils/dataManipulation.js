const dataManipulation = (dataFetched) => {
  if (!dataFetched) {
    return [];
  }

  return dataFetched.map(
    (
      {
        data,
        stato,
        ricoverati_con_sintomi,
        terapia_intensiva,
        totale_ospedalizzati,
        isolamento_domiciliare,
        totale_positivi,
        variazione_totale_positivi,
        nuovi_positivi,
        dimessi_guariti,
        deceduti,
        casi_da_sospetto_diagnostico,
        casi_da_screening,
        totale_casi,
        tamponi,
        casi_testati,
        note,
      },
      dataIndex,
    ) => {
      const giornoPrecedente = dataFetched && dataFetched[dataIndex - 1];
      return {
        casiDaScreeningTotali: casi_da_screening,
        casiDaScreeningGiornalieri: giornoPrecedente
          ? casi_da_screening - giornoPrecedente.casi_da_screening
          : casi_da_screening,
        casiDaSospettoDiagnosticoTotali: casi_da_sospetto_diagnostico,
        casiDaSospettoDiagnosticoGiornalieri: giornoPrecedente
          ? casi_da_sospetto_diagnostico - giornoPrecedente.casi_da_sospetto_diagnostico
          : casi_da_sospetto_diagnostico,
        casiTestatiTotali: casi_testati,
        casiTestatiGiornalieri: giornoPrecedente
          ? casi_testati - giornoPrecedente.casi_testati
          : casi_testati,
        casiTotali: totale_casi,
        casiGiornalieri: giornoPrecedente
          ? totale_casi - giornoPrecedente.totale_casi
          : totale_casi,
        decedutiTotali: deceduti,
        decedutiGiornalieri: giornoPrecedente ? deceduti - giornoPrecedente.deceduti : deceduti,
        dimessiGuaritiTotali: dimessi_guariti,
        dimessiGuaritiGiornalieri: giornoPrecedente
          ? dimessi_guariti - giornoPrecedente.dimessi_guariti
          : dimessi_guariti,
        giorno: data,
        isolamentoDomiciliareTotali: isolamento_domiciliare,
        isolamentoDomiciliareGiornalieri: giornoPrecedente
          ? isolamento_domiciliare - giornoPrecedente.isolamento_domiciliare
          : isolamento_domiciliare,
        note,
        nuoviPositiviGiornalieri: nuovi_positivi,
        ospedalizzatiTotali: totale_ospedalizzati,
        ospedalizzatiGiornalieri: giornoPrecedente
          ? totale_ospedalizzati - giornoPrecedente.totale_ospedalizzati
          : totale_ospedalizzati,
        positiviTotali: totale_positivi,
        positiviGiornalieri: giornoPrecedente
          ? totale_positivi - giornoPrecedente.totale_positivi
          : totale_positivi,
        positiviVariazioneTotale: variazione_totale_positivi,
        positiviVariazioneGiornaliera: giornoPrecedente
          ? variazione_totale_positivi - giornoPrecedente.variazione_totale_positivi
          : variazione_totale_positivi,
        ricoveratiConSintomiTotali: ricoverati_con_sintomi,
        ricoveratiConSintomiGiornalieri: giornoPrecedente
          ? ricoverati_con_sintomi - giornoPrecedente.ricoverati_con_sintomi
          : ricoverati_con_sintomi,
        stato,
        tamponiTotali: tamponi,
        tamponiGiornalieri: giornoPrecedente ? tamponi - giornoPrecedente.tamponi : tamponi,
        terapiaIntensivaTotali: terapia_intensiva,
        terapiaIntensivaGiornalieri: giornoPrecedente
          ? terapia_intensiva - giornoPrecedente.terapia_intensiva
          : terapia_intensiva,
      };
    },
  );
};

export default dataManipulation;
