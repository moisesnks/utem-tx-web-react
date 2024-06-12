import { ErrorBar as RechartsErrorBar } from 'recharts';

const CustomErrorBar = ({ width = 1, strokeWidth = 1, ...props }) => {
  return <RechartsErrorBar width={width} strokeWidth={strokeWidth} {...props} />;
};

export default CustomErrorBar;
