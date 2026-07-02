import AdminLayout from "../layouts/AdminLayout";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <AdminLayout>
      <div className="grid grid-cols-3 gap-6">
        <DashboardCard title="Employees" value="120" />
        <DashboardCard title="Skills" value="48" />
        <DashboardCard title="Assessments" value="300" />
      </div>
    </AdminLayout>
  );
}

export default Dashboard;