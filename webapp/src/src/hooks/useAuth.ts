import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { argon2id } from 'hash-wasm';

interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  token: string | null;
  totpEnabled: boolean;
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    token: null,
    totpEnabled: false,
  });
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    try {
      // Usar Argon2id para hash da senha
      const hash = await argon2id({
        password,
        salt: 'secure-salt',
        parallelism: 1,
        iterations: 256,
        memorySize: 512, // 512KB
        hashLength: 32,
      });

      // Simular chamada API segura
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCsrfToken(),
        },
        body: JSON.stringify({ username, hash }),
      });

      if (response.ok) {
        const data = await response.json();
        setAuth({
          user: username,
          isAuthenticated: true,
          token: data.token,
          totpEnabled: data.totpEnabled,
        });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Falha na autenticação');
    }
  };

  const logout = () => {
    setAuth({
      user: null,
      isAuthenticated: false,
      token: null,
      totpEnabled: false,
    });
    navigate('/login');
  };

  return { auth, login, logout };
}
