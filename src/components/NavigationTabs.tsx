import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type NavigationTab = Readonly<{
  label: string;
  route: string;
}>;

export type NavigationTabsProps = Readonly<{ tabs: NavigationTab[] }>;

export default function NavigationTabs({ tabs }: NavigationTabsProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setValue(newValue);
    navigate(newValue);
  };

  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  return (
    <Tabs value={value} onChange={handleChange} centered>
      {tabs.map((tab) => {
        return <Tab key={tab.label} label={tab.label} value={tab.route} />;
      })}
    </Tabs>
  );
}
