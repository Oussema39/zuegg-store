import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Button, theme, Typography } from "antd";
import {
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  MenuIcon,
  Sun,
  Moon,
  Activity,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

const { Header, Content, Footer, Sider } = Layout;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="80"
        onBreakpoint={(broken) => {
          if (broken) {
            setCollapsed(true);
          }
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <div className="logo py-8">
          {!collapsed && (
            <div className="flex">
              <Activity size={32} className="text-primary mr-2 flex-shrink-0" />
              <span>Store & Zuegg Price Explorer</span>
            </div>
          )}
          {collapsed && (
            <span>
              <Activity size={32} className="text-primary mr-2" />
            </span>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <LayoutDashboard size={18} />,
              label: "Dashboard",
            },
          ]}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: "margin-left 0.2s",
        }}
      >
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex justify-between items-center h-full px-4 w-full">
            <Button
              type="text"
              icon={
                collapsed ? <MenuIcon size={18} /> : <ChevronLeft size={18} />
              }
              onClick={() => setCollapsed(!collapsed)}
              className="trigger"
            />
            <div className="flex items-center space-x-4">
              <Button
                type="text"
                variant="outlined"
                icon={isDark ? <Sun size={18} /> : <Moon size={18} />}
                onClick={toggleTheme}
                className="flex items-center justify-center"
              >
                <Typography>{isDark ? "Dark" : "Light"}</Typography>
              </Button>
            </div>
            <Button
              icon={<LogOut size={16} />}
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{ margin: "24px 16px", overflow: "initial" }}
        >
          <div
            style={{
              padding: 24,
              borderRadius: borderRadiusLG,
              background: colorBgContainer,
              minHeight: "calc(100vh - 112px)",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }} className="dark:text-gray-400">
          Dashboard ©{new Date().getFullYear()} Created by{" "}
          <a href="https://oussemaheni.vercel.app/" target="_blank">
            Oussema Heni
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
