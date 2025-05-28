// RecyclingPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell } from 'recharts';

const RecyclingPage = () => {
  const data = [
    { name: 'Plastic', value: 40 },
    { name: 'Paper', value: 30 },
    { name: 'Glass', value: 20 },
    { name: 'Metal', value: 10 }
  ];

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#6366F1'];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Recycling Statistics</h1>
          <Link to="/dashboard" className="text-green-600 hover:text-green-700">
            ← Back to Dashboard
          </Link>

          <div className="mt-8 flex justify-center">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx={200}
                cy={200}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecyclingPage;