import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "Shop Simply Admin",
  description: "Shop Simply Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
