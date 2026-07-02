function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-800 text-white p-5">
      <h2 className="text-2xl font-bold mb-6">Knowledge Gap</h2>

      <ul className="space-y-4">
        <li>Dashboard</li>
        <li>Employees</li>
        <li>Skills</li>
        <li>Competencies</li>
        <li>Reports</li>
      </ul>
    </aside>
  );
}

export default Sidebar;