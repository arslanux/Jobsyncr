import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircleProgress = ({ value = 0, color = '#23A455', ...props }) => {
  return (
    <div style={{ width: 64, height: 64 }}>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        strokeWidth={10}
        styles={{
          path: {
            stroke: color,
          },
        }}
        {...props}
      />
    </div>
  );
};

export default CircleProgress;
