import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import NavigationBar from '../components/NavigationBar'

function LayoutLoader() {
  return (
    <div>
        
        <NavigationBar />

        <Outlet />

    </div>
  )
}

export default LayoutLoader