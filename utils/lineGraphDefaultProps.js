import dayjs from 'dayjs';

export const ResponsiveContainerDefaultProps = {
  width: '100%',
  minWidth: 480,
  minHeight: 320,
  maxHeight: 320,
};

export const XAxisDefaultProps = {
  dataKey: 'giorno',
  tickCount: 10,
  minTickGap: 50,
  tickSize: 6,
  tickMargin: 10,
  tickFormatter: (giorno) => dayjs(giorno).format('DD MMM YY'),
};

export const YAxisDefaultProps = {
  tickCount: 10,
  minTickGap: 10,
  tickSize: 6,
  tickMargin: 10,
  tickFormatter: (tick) => (tick > -1000 && tick < 1000 ? tick : `${tick / 1000}K`),
};
