import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#4f46e5', '#10b981', '#ec4899'];

const Overview = () => {
  const [stats, setStats] = useState({
    totalUsers: 120,
    totalEmployees: 15,
    totalCars: 75,
  });

  const pieData = [
    { name: 'Users', value: stats.totalUsers },
    { name: 'Employees', value: stats.totalEmployees },
    { name: 'Cars', value: stats.totalCars },
  ];

  const barData = [
    { name: 'Jan', cars: 5, users: 10 },
    { name: 'Feb', cars: 10, users: 15 },
    { name: 'Mar', cars: 7, users: 8 },
    { name: 'Apr', cars: 15, users: 12 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-black text-sm">Total Users</h2>
          <p className="text-3xl text-black  font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-black text-sm">Total Employees</h2>
          <p className="text-3xl text-black  font-bold">{stats.totalEmployees}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-black text-sm">Total Registered Cars</h2>
          <p className="text-3xl text-black font-bold">{stats.totalCars}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-gray-600 mb-2 font-semibold">Monthly Registrations</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cars" fill="#4f46e5" />
              <Bar dataKey="users" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-gray-600 mb-2 font-semibold">Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
