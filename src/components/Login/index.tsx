'use client'

import { useEffect, useState } from 'react'
import {
  GetCurrentUser,
  GetOtpWithMobile,
  GetUserPermissions,
  LoginWithOtpAndMobile,
  UserLoginAPI,
} from '@/services/user'
import {
  IAccessTokenResponse,
  setCurrentUsertoCookie,
  setTokenIntoCookie,
} from '@/actions/cookieToken'
import Loading from '../hub/Loading'
import OTPInput from '../hub/OTPinput'
import { BsArrowRight } from 'react-icons/bs'
import Image from 'next/image'
const Login = () => {
  const [inputState, setInputState] = useState<'otp' | 'password'>('password')
  const [mobile, setMobile] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [otp, setOtp] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<{
    phone?: string
    password?: string
    captcha?: string
  }>({})
  const toast = { error: (m: string) => '', success: (m: string) => '' }

  const validateInputs = () => {
    const newErrors: typeof errors = {}
    if (!mobile || !/^09\d{9}$/.test(mobile))
      newErrors.phone = 'شماره معتبر نیست'
    if (inputState === 'password' && (!password || password.length < 6))
      newErrors.password = 'رمز عبور حداقل ۶ کاراکتر'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    if (!validateInputs()) return
    try {
      setLoading(true)
      const response =
        inputState === 'password'
          ? await UserLoginAPI({ username: mobile, password })
          : await LoginWithOtpAndMobile({ mobile, otp })

      if (!response?.access_token) {
        setLoading(false)
        toast.error('ورود ناموفق')
        return
      }

      await setTokenIntoCookie({
        data: response as IAccessTokenResponse,
        mobile,
      })
      const currentUser = await GetCurrentUser({
        accessToken: response.access_token,
      })
      if (!currentUser) return

      await setCurrentUsertoCookie({ data: currentUser })

      if (currentUser?.user_role_id) {
        const result = await GetUserPermissions({
          accessToken: response.access_token,
          role_id: currentUser.user_role_id,
        })
        if (result) {
          const value = JSON.stringify(
            result.reduce(
              (acc, row) => {
                acc[0].push(row.menu_code)
                acc[1].push(row.form_code)
                acc[2].push(row.action_type)
                return acc
              },
              [[], [], []] as [string[], string[], number[]]
            )
          )
          document.cookie = `uzrprm=${encodeURIComponent(
            value
          )}; path=/; max-age=4200; SameSite=Lax`
        }
      }

      toast.success('ورود موفق')
      if (currentUser.user_status === 'INACTIVE')
        return (location.href = '/auth/validator')
      if (currentUser.approve_status !== 1)
        return toast.error('کاربر تأیید نشده')
      if (currentUser.user_status === 'DISABLED')
        return toast.error('کاربر غیرفعال است')

      localStorage.setItem('mobile', mobile)
      // location.href = '/'
    } catch (err) {
      setLoading(false)
      console.error(err)
    }
  }

  useEffect(() => {
    const lastPhone = localStorage.getItem('mobile') || ''
    setMobile(lastPhone)
  }, [])

  return loading ? (
    <div className="flex justify-center items-center h-screen bg-white">
      <Loading />
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#2f27ce] to-[#4d43f0] px-4">
      <div className="w-full max-w-2xl bg-white  rounded-2xl shadow-2xl shadow-[#ffffffae] p-6 sm:p-8">
        {inputState !== 'password' && (
          <button
            onClick={() => setInputState('password')}
            className="flex items-center text-[#2f27ce] mb-4 hover:underline outline-none"
          >
            <BsArrowRight size={20} />
            <span className="mr-2">بازگشت</span>
          </button>
        )}
        <div className="flex justify-center ">
          <Image src="/images/logol.png" height={360} width={330} alt="logo" />
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {inputState === 'password' && (
            <>
              <p className="text-center text-xl font-bold text-[#2f27ce]">
                به داکلینک خوش آمدیت
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 flex-col sm:flex-row">
                  <input
                    type="tel"
                    placeholder="شماره موبایل"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="outline-none border-blue-200 w-full sm:w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2f27ce] transition"
                  />
                  <input
                    type="password"
                    placeholder="رمز عبور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="outline-none border-blue-200 w-full sm:w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2f27ce] transition"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-600 text-sm">{errors.phone}</p>
                )}
                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password}</p>
                )}

                <div className="flex flex-col gap-3 mt-4">
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="bg-[#2f27ce] text-white py-2 rounded-lg hover:bg-[#241fa4] transition"
                  >
                    ورود
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      if (!validateInputs()) return
                      await GetOtpWithMobile({ mobile })
                      setInputState('otp')
                    }}
                    className="border border-[#2f27ce] text-[#2f27ce] py-2 rounded-lg hover:bg-[#f0f0ff] transition"
                  >
                    دریافت کد یکبار مصرف
                  </button>
                </div>
              </div>
            </>
          )}

          {inputState === 'otp' && (
            <div className="mt-4">
              <OTPInput setResult={setOtp} />
              <button
                onClick={handleLogin}
                className="mt-4 w-full bg-[#2f27ce] text-white py-2 rounded-lg hover:bg-[#241fa4] transition"
              >
                تأیید کد
              </button>
            </div>
          )}

          <p className="text-center text-sm text-gray-600">
            حساب کاربری ندارید؟{' '}
            <span
              onClick={() => (location.href = '/auth/sign-up')}
              className="text-[#2f27ce] cursor-pointer hover:underline"
            >
              ثبت‌نام کنید
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
