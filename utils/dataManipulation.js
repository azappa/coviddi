const dataManipulation = (data) => {
  return data.map(
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
      const giornoPrecedente = data && data[dataIndex - 1];
      return {
        casiDaScreeningTotali: casi_da_screening,
        casiDaScreeningGiornalieri: giornoPrecedente
          ? giornoPrecedente.casi_da_screening - casi_da_screening
          : casi_da_screening,
        casiDaSospettoDiagnosticoTotali: casi_da_sospetto_diagnostico,
        casiDaSospettoDiagnosticoGiornalieri: giornoPrecedente
          ? giornoPrecedente.casi_da_sospetto_diagnostico - casi_da_sospetto_diagnostico
          : casi_da_sospetto_diagnostico,
        casiTestatiTotali: casi_testati,
        casiTestatiGiornalieri: giornoPrecedente
          ? giornoPrecedente.casi_testati - casi_testati
          : casi_testati,
        casiTotali: totale_casi,
        casiGiornalieri: giornoPrecedente
          ? giornoPrecedente.totale_casi - totale_casi
          : totale_casi,
        decedutiTotali: deceduti,
        decedutiGiornalieri: giornoPrecedente ? giornoPrecedente.deceduti - deceduti : deceduti,
        dimessiGuaritiTotali: dimessi_guariti,
        dimessiGuaritiGiornalieri: giornoPrecedente
          ? giornoPrecedente.dimessi_guariti - dimessi_guariti
          : dimessi_guariti,
        giorno: data,
        isolamentoDomiciliareTotali: isolamento_domiciliare,
        isolamentoDomiciliareGiornalieri: giornoPrecedente
          ? giornoPrecedente.isolamento_domiciliare - isolamento_domiciliare
          : isolamento_domiciliare,
        note,
        nuoviPositiviGiornalieri: nuovi_positivi,
        ospedalizzatiTotali: totale_ospedalizzati,
        ospedalizzatiGiornalieri: giornoPrecedente
          ? giornoPrecedente.totale_ospedalizzati - totale_ospedalizzati
          : totale_ospedalizzati,
        positiviTotali: totale_positivi,
        positiviGiornalieri: giornoPrecedente
          ? giornoPrecedente.totale_positivi - totale_positivi
          : totale_positivi,
        positiviVariazioneTotale: variazione_totale_positivi,
        positiviVariazioneGiornaliera: giornoPrecedente
          ? giornoPrecedente.variazione_totale_positivi - variazione_totale_positivi
          : variazione_totale_positivi,
        ricoveratiConSintomiTotali: ricoverati_con_sintomi,
        ricoveratiConSintomiGiornalieri: giornoPrecedente
          ? giornoPrecedente.ricoverati_con_sintomi - ricoverati_con_sintomi
          : ricoverati_con_sintomi,
        stato,
        tamponiTotali: tamponi,
        tamponiGiornalieri: giornoPrecedente ? giornoPrecedente.tamponi - tamponi : tamponi,
        terapiaIntensivaTotali: terapia_intensiva,
        terapiaIntensivaGiornalieri: giornoPrecedente
          ? giornoPrecedente.terapia_intensiva - terapia_intensiva
          : terapia_intensiva,
      };
    },
  );
};

export default dataManipulation;
