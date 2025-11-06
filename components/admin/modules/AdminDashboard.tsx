import React from 'react';
import WidgetCard from '../../ui/WidgetCard';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const userGrowthData = [
  { month: 'Jan', users: 1 }, { month: 'Feb', users: 2 },
  { month: 'Mar', users: 2 }, { month: 'Apr', users: 4 },
  { month: 'May', users: 5 }, { month: 'Jun', users: 6 },
];

const revenueData = [
  { month: 'Jan', revenue: 10 }, { month: 'Feb', revenue: 15 },
  { month: 'Mar', revenue: 12 }, { month: 'Apr', revenue: 20 },
  { month: 'May', revenue: 25 }, { month: 'Jun', revenue: 28 },
];

const requestData = [
  { name: 'Transport', value: 40 },
  { name: 'Property', value: 30 },
  { name: 'Events', value: 20 },
  { name: 'Other', value: 10 },
];
const COLORS = ['#06b6d4', '#8b5cf6', '#ec4899', '#64748b'];

const AdminDashboard: React.FC = () => {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-400">Platform-wide analytics and overview.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <WidgetCard title="Active Users"><p className="text-3xl font-bold text-white">6</p></WidgetCard>
                <WidgetCard title="Total AUM"><p className="text-3xl font-bold text-white">$1.075B</p></WidgetCard>
                <WidgetCard title="Pending Requests"><p className="text-3xl font-bold text-white">3</p></WidgetCard>
                <WidgetCard title="System Status"><p className="text-3xl font-bold text-green-400">Operational</p></WidgetCard>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WidgetCard title="User Growth (YTD)">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={userGrowthData}>
                                <defs><linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/><stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/></linearGradient></defs>
                                <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: '#e5e7eb' }} />
                                <Area type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={2} fill="url(#colorUsers)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </WidgetCard>
                 <WidgetCard title="Monthly Revenue (in thousands USD)">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={revenueData}>
                                <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: '#e5e7eb' }} cursor={{fill: 'rgba(255,255,255,0.1)'}}/>
                                <Bar dataKey="revenue" fill="#8b5cf6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </WidgetCard>
                 <WidgetCard title="Concierge Request Distribution">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                                <Pie data={requestData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                    {requestData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: '#e5e7eb' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </WidgetCard>
            </div>
        </div>
    );
};

export default AdminDashboard;
