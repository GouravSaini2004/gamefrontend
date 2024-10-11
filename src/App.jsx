import Header from './component/header'
import { Outlet } from 'react-router'

function App() {

  return (
    <>
      <div><Header /></div>
      <div><Outlet /></div>
    </>
  )
}

export default App
