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

const ResponsiveContainerDefaultProps = {
  width: '100%',
  minWidth: 480,
  height: '100%',
  maxHeight: 320,
};

const XAxisDefaultProps = {
  dataKey: 'giorno',
  tickCount: 10,
  minTickGap: 50,
  tickSize: 6,
  tickMargin: 10,
  tickFormatter: (giorno) => dayjs(giorno).format('DD MMM YY'),
};
const YAxisDefaultProps = {
  tickCount: 10,
  minTickGap: 10,
  tickSize: 6,
  tickMargin: 10,
  tickFormatter: (tick) => (tick < 1000 ? tick : `${tick / 1000}K`),
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
  const data3 = data.map(({ data: giorno, terapia_intensiva: terapiaIntensiva, deceduti }) => ({
    giorno,
    terapiaIntensiva,
    deceduti,
  }));
  const lines3 = ['terapiaIntensiva', 'deceduti'];

  return (
    <div style={{ display: 'flex', padding: 100 }}>
      <div style={{ flex: 3 }}>
        <h4>{lines0.join(' vs ')}</h4>
        <ResponsiveContainer {...ResponsiveContainerDefaultProps}>
          <LineChart data={data0}>
            <XAxis {...XAxisDefaultProps} />
            <YAxis {...YAxisDefaultProps} />
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
        <h4>{lines1.join(' vs ')}</h4>
        <ResponsiveContainer {...ResponsiveContainerDefaultProps}>
          <LineChart data={data1}>
            <XAxis {...XAxisDefaultProps} />
            <YAxis {...YAxisDefaultProps} />
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
        <h4>{lines2.join(' vs ')}</h4>
        <ResponsiveContainer {...ResponsiveContainerDefaultProps}>
          <LineChart data={data2}>
            <XAxis {...XAxisDefaultProps} />
            <YAxis {...YAxisDefaultProps} />
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
        <div style={{ height: 50 }} />
        <h4>{lines3.join(' vs ')}</h4>
        <ResponsiveContainer {...ResponsiveContainerDefaultProps}>
          <LineChart data={data3}>
            <XAxis {...XAxisDefaultProps} />
            <YAxis {...YAxisDefaultProps} />
            <Tooltip />
            {lines3.map((k) => (
              <Line
                type="monotone"
                dataKey={k}
                dot={false}
                key={`g3-${k}`}
                stroke={colors[k] || colors.default}
                strokeWidth={1}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: 40 }} />
      <div style={{ flex: 1, position: 'relative' }}>
        <h4>Last week data</h4>
        {[...data]
          .reverse()
          .slice(0, 7)
          .map((dailyData) => (
            <div>
              <strong>{dayjs(dailyData.data).format('DD MMM YY')}</strong>
              <br />
              <pre>{JSON.stringify(dailyData, null, 2)}</pre>
            </div>
          ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await fetcher(URL);
  return { props: { data } };
}
