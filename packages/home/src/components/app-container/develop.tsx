import React from 'react';
import AppCard from '../app-card';
import { useDevelopApps } from './use-apps';

function Develop() {
  const apps = useDevelopApps();

  return (
    <>
      {apps.map((app, index) => {
        return <AppCard key={index} icon={app.icon} title={app.title} onClick={app.onClick} />;
      })}
    </>
  );
}

export default Develop;
