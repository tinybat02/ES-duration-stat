import { Frame } from '../types';
export const processData = (data: Array<Frame>) => {
  let sub01_10 = 0,
    sub10_30 = 0,
    sub30_60 = 0,
    sub60_90 = 0,
    sub90_180 = 0;

  data.map(category => {
    if (category.name == '90-180m') {
      sub90_180 =
        category.fields[0].values.buffer
          .slice()
          .reverse()
          .find(item => item != null) || 0;
    }

    if (category.name == '60-90m') {
      sub60_90 =
        category.fields[0].values.buffer
          .slice()
          .reverse()
          .find(item => item != null) || 0;
    }

    if (category.name == '30-60m') {
      sub30_60 =
        category.fields[0].values.buffer
          .slice()
          .reverse()
          .find(item => item != null) || 0;
    }

    if (category.name == '10-30m') {
      sub10_30 =
        category.fields[0].values.buffer
          .slice()
          .reverse()
          .find(item => item != null) || 0;
    }

    if (category.name == '01-10m') {
      sub01_10 =
        category.fields[0].values.buffer
          .slice()
          .reverse()
          .find(item => item != null) || 0;
    }
  });

  console.log('================');
  console.log('1-10 ', sub01_10);
  console.log('10-30 ', sub10_30);
  console.log('30-60 ', sub30_60);
  console.log('60-90 ', sub60_90);
  console.log('90-180 ', sub90_180);
  const avg_duration = sub01_10 * 5.5 + sub10_30 * 20 + sub30_60 * 45 + sub60_90 * 75 + sub90_180 * 135;
  return Math.round(avg_duration / 10) / 10;
};
