import React, { createContext, useContext, useState } from 'react'

interface ContextApp {

}

const AppContext = createContext({} as any);

export default function AppProvider({children}) {
  const sayHello = () => console.log("Hello context");
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({});
  return (
    <AppContext.Provider value={{sayHello, projects, setProjects, currentProject, setCurrentProject}}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
