
const StatsCard = ({ stat }) => {
  const { icon: Icon, color, title, value } = stat;
  const colorClasses = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600'
  };

  return (
    <div className="border rounded-lg p-4 flex items-center">
      <div className={`p-3 rounded-full mr-4 ${colorClasses[color]}`}>
        <Icon className="text-xl" />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;