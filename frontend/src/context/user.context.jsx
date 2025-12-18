import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from '../config/axios'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		try {
			const raw = localStorage.getItem('user')
			return raw ? JSON.parse(raw) : null
		} catch {
			return null
		}
	})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user))
			if (user.token) {
				axios.defaults.headers.common.Authorization = `Bearer ${user.token}`
			}
		} else {
			localStorage.removeItem('user')
			delete axios.defaults.headers.common.Authorization
		}
	}, [user])

	const register = async ({ email, password }) => {
		setLoading(true)
		setError(null)
		try {
			const res = await axios.post('/users/register', { email, password })
			const payload = res.data || {}
			if (payload.token || payload.user) {
				const nextUser = payload.user ? { ...payload.user, token: payload.token } : { token: payload.token }
				setUser(nextUser)
			}
			setLoading(false)
			return res.data
		} catch (err) {
			setLoading(false)
			setError(err?.response?.data || err.message)
			throw err
		}
	}

	const login = async ({ email, password }) => {
		setLoading(true)
		setError(null)
		try {
			const res = await axios.post('/users/login', { email, password })
			const payload = res.data || {}
			const nextUser = payload.user ? { ...payload.user, token: payload.token } : { token: payload.token }
			setUser(nextUser)
			setLoading(false)
			return res.data
		} catch (err) {
			setLoading(false)
			setError(err?.response?.data || err.message)
			throw err
		}
	}

	const logout = () => {
		setUser(null)
	}

	return (
		<UserContext.Provider value={{ user, loading, error, register, login, logout, setError }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => {
  return useContext(UserContext)
}