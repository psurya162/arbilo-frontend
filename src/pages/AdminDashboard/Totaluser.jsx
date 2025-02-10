import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserCheck, UserX } from 'lucide-react';
import axios from 'axios';
import config from '@/config.js/config';

const Totaluser = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) return;

        const response = await axios.get(`${config.API_URL}/api/admin/users`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (Array.isArray(response.data.users)) {
          const users = response.data.users;
          setStats({
            totalUsers: users.length,
            activeUsers: users.filter(user => user.is_active === 1).length,
            inactiveUsers: users.filter(user => user.is_active === 0).length,
          });
        }
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <Users className="h-6 w-6" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: <UserCheck className="h-6 w-6" />,
      color: 'bg-green-500',
    },
    {
      title: 'Inactive Users',
      value: stats.inactiveUsers,
      icon: <UserX className="h-6 w-6" />,
      color: 'bg-red-500',
    },
  ];

  if (loading) {
    return <div className="w-full h-24 flex items-center justify-center">Loading statistics...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {statCards.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Totaluser;