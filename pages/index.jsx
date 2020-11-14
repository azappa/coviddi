import { useState } from 'react';
import useSWR from 'swr';
import dayjs from 'dayjs';

import { API_URL, fetcher } from '../utils/dataFetch';
import { keys as timeFramesKeys, timeFrames, timeFramesDict } from '../utils/timeFrames';
import LineGraph from '../components/LineGraph';

const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');

dayjs.extend(isSameOrAfter);

export default function Home({ data: initialData }) {
  const { data: covidData, error, isValidating } = useSWR(API_URL, fetcher, { initialData });

  if (!covidData) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  const [timeFrame, setTimeFrame] = useState(timeFrames.LASTWEEK);

  const lastDayInTimeFrame =
    timeFrame !== -1 ? dayjs().subtract(timeFrame, 'days') : dayjs(covidData[0].data);

  const getCurrentDataTimeFrame = () => {
    return [...covidData].filter(({ data: giorno }) =>
      dayjs(giorno).isSameOrAfter(lastDayInTimeFrame),
    );
  };

  const data0 = getCurrentDataTimeFrame().map(
    ({
      data: giorno,
      ricoverati_con_sintomi: ricoveratiConSintomi,
      terapia_intensiva: terapiaIntensiva,
      isolamento_domiciliare: isolamentoDomiciliare,
    }) => ({
      giorno,
      ricoveratiConSintomi,
      terapiaIntensiva,
      isolamentoDomiciliare,
      totale: ricoveratiConSintomi + terapiaIntensiva + isolamentoDomiciliare,
    }),
  );
  const lines0 = ['ricoveratiConSintomi', 'terapiaIntensiva', 'isolamentoDomiciliare', 'totale'];
  const data1 = getCurrentDataTimeFrame().map(
    ({ data: giorno, totale_positivi: totalePositivi, tamponi }) => ({
      giorno,
      totalePositivi,
      tamponi,
    }),
  );
  const lines1 = ['totalePositivi', 'tamponi'];
  const data2 = getCurrentDataTimeFrame().map(
    ({ data: giorno, nuovi_positivi: nuoviPositivi, tamponi, totale_casi: totaleCasi }, index) => ({
      giorno,
      nuoviPositivi,
      tamponi,
      tamponiGiornalieri: getCurrentDataTimeFrame()[index - 1]
        ? tamponi - getCurrentDataTimeFrame()[index - 1].tamponi
        : tamponi,
      totaleCasi,
    }),
  );
  const lines2 = ['nuoviPositivi', 'tamponiGiornalieri', 'totaleCasi'];
  const data3 = getCurrentDataTimeFrame().map(
    ({ data: giorno, terapia_intensiva: terapiaIntensiva, deceduti }) => ({
      giorno,
      terapiaIntensiva,
      deceduti,
    }),
  );
  const lines3 = ['terapiaIntensiva', 'deceduti'];

  return (
    <>
      <div style={{ display: 'flex', padding: '20px 100px' }}>
        {Object.keys(timeFramesKeys).map((k) => (
          <div
            style={{
              padding: '0 40px 10px 0',
              color: timeFrames[k] === timeFrame ? 'blue' : 'grey ',
              cursor: 'pointer',
            }}
            onClick={() => setTimeFrame(timeFrames[k])}
            role="button"
          >
            <span>{timeFramesDict[k].label}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', padding: '20px 100px' }}>
        <div style={{ flex: 3 }}>
          <LineGraph title={lines0.join(' vs ')} graphLines={lines0} graphData={data0} />
          <div style={{ height: 50 }} />
          <LineGraph title={lines1.join(' vs ')} graphLines={lines1} graphData={data1} />
          <div style={{ height: 50 }} />
          <LineGraph title={lines2.join(' vs ')} graphLines={lines2} graphData={data2} />
          <div style={{ height: 50 }} />
          <LineGraph title={lines3.join(' vs ')} graphLines={lines3} graphData={data3} />
        </div>
        <div style={{ width: 40 }} />
        <div style={{ flex: 1, position: 'relative' }}>
          <h4>Periodo selezionato</h4>
          {getCurrentDataTimeFrame()
            .reverse()
            .map((dailyData) => (
              <div>
                <strong>{dayjs(dailyData.data).format('DD MMM YY')}</strong>
                <br />
                <pre>{JSON.stringify(dailyData, null, 2)}</pre>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const data = await fetcher(API_URL);
  return { props: { data } };
}
