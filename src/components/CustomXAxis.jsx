import { XAxis as RechartsXAxis } from 'recharts';

const CustomXAxis = ({ dataKey = 'date', ...props }) => {
    return <RechartsXAxis dataKey={dataKey} {...props} />;
};

export default CustomXAxis;
