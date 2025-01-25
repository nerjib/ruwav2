import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";

import ruwaLogo from "../../assets/192.png";
import "./index.css";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const Index = (props) => {  
  const { children } = props;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const userRole = JSON.parse(localStorage.getItem('userDetails'))?.user?.role;


  useEffect(() => {
    // console.log('userDetails', localStorage.getItem('userDetails'))
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };
  const menuData = [
    {title: 'Analytics',
        url: '/',
        icon: '',
        visibility: true,
    },
    {title: 'Projects',
        url: '/projects',
        icon: '',
        visibility: true,
    },
    {title: 'Reports',
        url: '/reports',
        icon: '',
        visibility: true,
    },
    {title: 'Users',
      url: '/users',
        icon: '',
      visibility: userRole === 'super_admin',
    },
    {title: 'Map',
        url: '/maps',
        icon: '',
        visibility: true,
    },
    {title: 'ODF',
        url: '/odf',
        icon: '',
        visibility: true,
    },
    {title: 'Logout',
        url: '/logout',
        icon: '',
        visibility: true,
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{ background: "#fff" }}
        width={270}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginLeft: "-20px",
            alignItems: "center",
            height: "97px",
            marginBottom: "20px"
          }}
        >
          <img
            src={ruwaLogo}
            alt="ruwassaLogo"
            style={{
              height: "100px",
              width: "100px",
            //   width: collapsed ? "85%" : "100%",
              marginLeft: collapsed ? "40px" : "0px",
              marginTop: collapsed ? "-15px" :"0px"
            }}
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
        >
          {menuData.filter((e) => e.visibility).map((item) => {
            if (item.children) {
              return (
                <SubMenu key={item.key} title={item.title} icon={item.icon}>
                  {item.children.map((subItem) => {
                    return (
                      <Menu.Item
                        key={subItem.key}
                        onClick={() => navigate(subItem.url)}
                      >
                        {subItem.title}
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              );
            }
            return (
              <Menu.Item
                key={item.key}
                onClick={() => {
                  if (item.url === "/logout") {
                    localStorage.clear();
                    navigate("/login");
                  } else  {
                  navigate(item.url)
                  }
                }}
                icon={item.icon}
              >
                {item.title}
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            // padding: '47px',
            background: "#fff",
            display: "flex",
            justifyContent: "end",
            // height: '97px',
            alignItems: "center",
          }}/>
        
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
       
      </Layout>
      
    </Layout>
  );
};

export default Index;
