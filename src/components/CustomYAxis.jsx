import { YAxis as RechartsYAxis } from 'recharts';

const CustomYAxis = ({ domain = ['auto', 'auto'], ...props }) => {
    return <RechartsYAxis domain={domain} {...props} />;
};

export default CustomYAxis;
