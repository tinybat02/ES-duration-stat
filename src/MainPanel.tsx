import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions, Frame } from 'types';
import { processData } from './util/process';

interface Props extends PanelProps<PanelOptions> {}
interface State {
  duration: number;
}

export class MainPanel extends PureComponent<Props, State> {
  state: State = {
    duration: 0,
  };
  componentDidMount() {
    if (this.props.data.series.length > 0) {
      const series = this.props.data.series as Array<Frame>;
      const stat = processData(series);
      this.setState({ duration: stat });
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.data.series !== this.props.data.series) {
      const series = this.props.data.series as Array<Frame>;
      if (series.length == 0) {
        this.setState({ duration: 0 });
        return;
      }
      const stat = processData(series);
      this.setState({ duration: stat });
    }
  }

  render() {
    const { width, height } = this.props;
    const { duration } = this.state;

    return (
      <div
        style={{
          width,
          height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            height: '70%',
            width: '70%',
            textAlign: 'center',
            color: '#56a64b',
            // translate: -50,
          }}
        >
          <span style={{ fontSize: width / 4 }}>{duration}</span>
          <span style={{ fontSize: width / 8 }}>min</span>
        </div>
      </div>
    );
  }
}
