import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import colors from '../../utils/colors';
import {
  ResponsiveContainerDefaultProps,
  XAxisDefaultProps,
  YAxisDefaultProps,
} from '../../utils/lineGraphDefaultProps';

const LineGraph = ({ title, graphLines, graphData }) => (
  <>
    {title && <h4>{title}</h4>}
    <ResponsiveContainer {...ResponsiveContainerDefaultProps}>
      <LineChart data={graphData}>
        <XAxis {...XAxisDefaultProps} />
        <YAxis {...YAxisDefaultProps} />
        <Tooltip />
        {graphLines.map((k) => (
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
  </>
);

LineGraph.propTypes = {
  title: PropTypes.string,
  graphLines: PropTypes.arrayOf(PropTypes.string).isRequired,
  graphData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

LineGraph.defaultProps = {
  title: '',
};

export default LineGraph;
