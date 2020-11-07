import useSWR from 'swr';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

const URL = `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json`;

const fetcher = async (...args) => {
  const res = await fetch(...args);
  return res.json();
};

const colors = {
  default: '#2a9d8f',
  ricoveratiConSintomi: '#003049',
  terapiaIntensiva: '#d62828',
  isolamentoDomiciliare: '#fcbf49',
  totalePositivi: '#3d5a80',
  tamponi: '#a4161a',
  nuoviPositivi: '#5f0f40',
  totaleCasi: '#8a5a44',
  tamponiGiornalieri: '#5c677d',
};

export default function Home({ data: initialData }) {
  const { data, error, isValidating } = useSWR(URL, fetcher, { initialData });
  const data0 = data.map(
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
  const data1 = data.map(({ data: giorno, totale_positivi: totalePositivi, tamponi }) => ({
    giorno,
    totalePositivi,
    tamponi,
  }));
  const lines1 = ['totalePositivi', 'tamponi'];
  const data2 = data.map(
    ({ data: giorno, nuovi_positivi: nuoviPositivi, tamponi, totale_casi: totaleCasi }, index) => ({
      giorno,
      nuoviPositivi,
      tamponi,
      tamponiGiornalieri: data[index - 1] ? tamponi - data[index - 1].tamponi : tamponi,
      totaleCasi,
    }),
  );
  const lines2 = ['nuoviPositivi', 'tamponiGiornalieri', 'totaleCasi'];

  return (
    <div style={{ display: 'flex', padding: 50 }}>
      <div style={{ flex: 3 }}>
        <ResponsiveContainer width="100%" minWidth={710} height="100%" maxHeight={400}>
          <LineChart data={data0}>
            <XAxis
              dataKey="giorno"
              tickCount={10}
              minTickGap={50}
              tickSize={10}
              tickFormatter={(giorno) => dayjs(giorno).format('DD MMM YY')}
            />
            <YAxis tickCount={10} minTickGap={10} tickSize={10} />
            <Tooltip />
            {lines0.map((k) => (
              <Line
                type="monotone"
                dataKey={k}
                dot={false}
                key={`g0-${k}`}
                stroke={colors[k] || colors.default}
                strokeWidth={1}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        <div style={{ height: 50 }} />
        <ResponsiveContainer width="100%" minWidth={710} height="100%" maxHeight={400}>
          <LineChart data={data1}>
            <XAxis
              dataKey="giorno"
              tickCount={10}
              minTickGap={50}
              tickSize={10}
              tickFormatter={(giorno) => dayjs(giorno).format('DD MMM YY')}
            />
            <YAxis tickCount={10} minTickGap={10} tickSize={10} />
            <Tooltip />
            {lines1.map((k) => (
              <Line
                type="monotone"
                dataKey={k}
                dot={false}
                key={`g1-${k}`}
                stroke={colors[k] || colors.default}
                strokeWidth={1}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        <div style={{ height: 50 }} />
        <ResponsiveContainer width="100%" minWidth={710} height="100%" maxHeight={400}>
          <LineChart data={data2}>
            <XAxis
              dataKey="giorno"
              tickCount={10}
              minTickGap={50}
              tickSize={10}
              tickFormatter={(giorno) => dayjs(giorno).format('DD MMM YY')}
            />
            <YAxis tickCount={10} minTickGap={10} tickSize={10} />
            <Tooltip />
            {lines2.map((k) => (
              <Line
                type="monotone"
                dataKey={k}
                dot={false}
                key={`g2-${k}`}
                stroke={colors[k] || colors.default}
                strokeWidth={1}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: 40 }} />
      <div style={{ flex: 1, position: 'relative' }}>
        <div
          style={{
            maxHeight: '100%',
            overflow: 'auto',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          {[...data].reverse().map((dailyData) => (
            <div>
              <strong>{dayjs(dailyData.data).format('DD MMM YY')}</strong>
              <br />
              <pre>{JSON.stringify(dailyData, null, 2)}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await fetcher(URL);
  return { props: { data } };
}
