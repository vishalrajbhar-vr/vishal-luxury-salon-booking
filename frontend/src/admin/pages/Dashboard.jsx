import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { findallappointment } from "../../service/appointment.js";
import { getAllService } from "../../service/sevvise.js";

function Dashboard({ setActivePage }, refresh) {

  // --------------------total Appointments count------------------------
  const [appointments, setAppointments] = useState([])
  const featchappointments = async () => {
    try {
      const response = await findallappointment();
      console.log(response.data);
      setAppointments(response.data.founddata);
    }
    catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }
  useEffect(() => {
    featchappointments();
    const interval = setInterval(() => {
      featchappointments();
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  // --------------------total service count------------------------
  const [getServices, setGetServices] = useState([]);
  const fetchServices = async () => {
    try {
      const response = await getAllService();
      setGetServices(response.data.getdata);

      console.log(response.data.getdata[0]);
    }
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [refresh]);

  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 25000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 35000 },
    { month: "Jun", revenue: 42000 },
  ];

  const serviceData = [
    { name: "Hair Cut", value: 40 },
    { name: "Facial", value: 25 },
    { name: "Hair Spa", value: 20 },
    { name: "Beard", value: 15 },
  ];

  const colors = [
    "#dc2626",
    "#ef4444",
    "#f87171",
    "#fca5a5",
  ];


  return (
    <div className="bg-black text-white min-h-screen p-8">

      {/* Stats Cards */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

        <div className="transition-all duration-300 hover:-translate-y-3 rounded-3xl hover:border-t hover:border-blue-500 hover:shadow-blue-500 shadow-md">
          <StatsCard
            title="Total Services"
            value={getServices.length}
          />
        </div>

        <div className="transition-all duration-300 hover:-translate-y-3 hover:border-t hover:border-green-500 rounded-3xl hover:shadow-green-500 shadow-md">
          <StatsCard
            title="Appointments"
            value={appointments.length}
          />
        </div>

        <div className="transition-all duration-300 hover:-translate-y-3 hover:border-t hover:border-purple-500 rounded-3xl hover:shadow-purple-500 shadow-md">
          <StatsCard
            title="Gallery Images"
            value="50"
          />
        </div>

        <div className="transition-all duration-300 hover:-translate-y-3 hover:border-t hover:border-yellow-500 rounded-3xl hover:shadow-yellow-500 shadow-md">
          <StatsCard
            title="Revenue"
            value="₹50,000"
          />
        </div>

      </div>
      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-8 mb-10">

        {/* Revenue Chart */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            Monthly Revenue
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="revenue"
                fill="#dc2626"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* Pie Chart */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            Service Distribution
          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <PieChart>

              <Pie
                data={serviceData}
                dataKey="value"
                outerRadius={120}
              >
                {serviceData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={colors[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Tables */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Recent Appointments */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            Recent Appointments
          </h2>

          <div className="space-y-4">

            <div className="bg-black p-4 rounded-xl flex justify-between">
              <span>Rahul Sharma</span>
              <span className="text-green-500">
                Confirmed
              </span>
            </div>

            <div className="bg-black p-4 rounded-xl flex justify-between">
              <span>Aman Verma</span>
              <span className="text-yellow-500">
                Pending
              </span>
            </div>

            <div className="bg-black p-4 rounded-xl flex justify-between">
              <span>Rohit Kumar</span>
              <span className="text-red-500">
                Cancelled
              </span>
            </div>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <button
              onClick={() => setActivePage("addService")}
              className="rounded-xl p-5 font-semibold bg-zinc-800 hover:bg-red-600 hover:-translate-y-1 transition-all duration-300"
            >
              Add Service
            </button>

            <button
              onClick={() => setActivePage("addGallery")}
              className="rounded-xl p-5 font-semibold bg-zinc-800 hover:bg-red-600 hover:-translate-y-1 transition-all duration-300"
            >
              Add Gallery
            </button>

            <button
              onClick={() => setActivePage("appointments")}
              className="rounded-xl p-5 font-semibold bg-zinc-800 hover:bg-red-600 hover:-translate-y-1 transition-all duration-300"
            >
              View Appointments
            </button>

            <button
              onClick={() => setActivePage("allcontact")}
              className="rounded-xl p-5 font-semibold bg-zinc-800 hover:bg-red-600 hover:-translate-y-1 transition-all duration-300"
            >
              View Contact
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;