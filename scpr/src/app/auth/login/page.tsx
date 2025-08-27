'use client'
import Login from '@/components/Login'
import { Suspense } from 'react'

const LoginPage = () => {
  return (
    <Suspense fallback={''}>
      <Login />
    </Suspense>
  )
}

export default LoginPage
