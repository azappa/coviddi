import { useState } from 'react';
import useSWR from 'swr';
import dayjs from 'dayjs';

import { API_URL, fetcher } from '../utils/dataFetch';
import { keys as timeFramesKeys, timeFrames, timeFramesDict } from '../utils/timeFrames';
import parseData from '../utils/dataManipulation';
import LineGraph from '../components/LineGraph';

const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');

dayjs.extend(isSameOrAfter);

export default function Home({ data: initialData }) {
  const { data: covidData, error, isValidating } = useSWR(API_URL, fetcher, { initialData });
  const [timeFrame, setTimeFrame] = useState(timeFrames.LASTWEEK);

  if (!covidData) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  const lastDayInTimeFrame =
    timeFrame !== -1 ? dayjs().subtract(timeFrame, 'days') : dayjs(parseData(covidData)[0].giorno);

  const getCurrentDataTimeFrame = () => {
    return [...parseData(covidData)].filter(({ giorno }) =>
      dayjs(giorno).isSameOrAfter(lastDayInTimeFrame),
    );
  };

  const data0 = getCurrentDataTimeFrame().map(
    ({
      giorno,
      ricoveratiConSintomiTotali,
      terapiaIntensivaTotali,
      isolamentoDomiciliareTotali,
    }) => ({
      giorno,
      ricoveratiConSintomiTotali,
      terapiaIntensivaTotali,
      isolamentoDomiciliareTotali,
      totale: ricoveratiConSintomiTotali + terapiaIntensivaTotali + isolamentoDomiciliareTotali,
    }),
  );
  const lines0 = [
    'ricoveratiConSintomiTotali',
    'terapiaIntensivaTotali',
    'isolamentoDomiciliareTotali',
    'totale',
  ];
  const data1 = getCurrentDataTimeFrame().map(
    ({ giorno, casiGiornalieri, dimessiGuaritiGiornalieri }) => ({
      giorno,
      casiGiornalieri,
      dimessiGuaritiGiornalieri,
    }),
  );
  const lines1 = ['casiGiornalieri', 'dimessiGuaritiGiornalieri'];
  const data2 = getCurrentDataTimeFrame().map(
    ({ giorno, nuoviPositiviGiornalieri, tamponiGiornalieri }) => ({
      giorno,
      nuoviPositiviGiornalieri,
      tamponiGiornalieri,
    }),
  );
  const lines2 = ['nuoviPositiviGiornalieri', 'tamponiGiornalieri'];
  const data3 = getCurrentDataTimeFrame().map(
    ({ giorno, terapiaIntensivaTotali, decedutiTotali }) => ({
      giorno,
      terapiaIntensivaTotali,
      decedutiTotali,
    }),
  );
  const lines3 = ['terapiaIntensivaTotali', 'decedutiTotali'];

  return (
    <>
      <div style={{ display: 'flex', padding: '20px 100px', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 24 }}>🦠 19 🇮🇹</div>
        <div>
          {Object.keys(timeFramesKeys).map((k) => {
            const isSelected = timeFrames[k] === timeFrame;
            return (
              <div
                style={{
                  display: 'inline-block',
                  margin: '0 10px 10px 0',
                  padding: 10,
                  color: isSelected ? '#FFFFFF' : '#BBBBBB',
                  cursor: 'pointer',
                  background: isSelected ? '#8CB3E2' : 'transparent',
                  textAlign: 'center',
                  borderBottom: `2px solid ${isSelected ? 'transparent' : '#CCCCCC'}`,
                }}
                onClick={() => setTimeFrame(timeFrames[k])}
                role="button"
                key={`button-${timeFramesDict[k].label}`}
              >
                <span>{timeFramesDict[k].label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '20px 100px' }}>
        <LineGraph title={lines0.join(' vs ')} graphLines={lines0} graphData={data0} />
        <div style={{ height: 20 }} />
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <LineGraph title={lines1.join(' vs ')} graphLines={lines1} graphData={data1} />
          </div>
          <div style={{ flex: 1 }}>
            <LineGraph title={lines2.join(' vs ')} graphLines={lines2} graphData={data2} />
          </div>
        </div>
        <div style={{ height: 20 }} />
        <LineGraph title={lines3.join(' vs ')} graphLines={lines3} graphData={data3} />
        {/*
        <div style={{ width: 20 }} />
        <div style={{ flex: 1, position: 'relative' }}>
          <h4>Periodo selezionato</h4>
          {getCurrentDataTimeFrame()
            .reverse()
            .map((dailyData) => (
              <div key={`dailyData-${dayjs(dailyData.giorno).format('DD MMM YY')}`}>
                <strong>{dayjs(dailyData.giorno).format('DD MMM YY')}</strong>
                <br />
                <pre>{JSON.stringify(dailyData, null, 2)}</pre>
              </div>
            ))}
        </div>
        */}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const data = await fetcher(API_URL);
  return { props: { data } };
}
