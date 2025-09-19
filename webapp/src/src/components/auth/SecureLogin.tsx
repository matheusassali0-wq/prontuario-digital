import React, { useState, useEffect } from 'react';

/**
 * Provide minimal JSX typings and lightweight fallbacks for missing project modules so
 * this file can compile even if some project-level types or modules are missing.
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

/* Lightweight local fallbacks to avoid missing-module errors in the editor/TS server.
   Replace these with your real implementations when available. */
type AnyProps = { children?: any; [key: string]: any };

const Container = ({ children, ...rest }: AnyProps) => <div {...rest}>{children}</div>;
const Form = ({ children, ...rest }: AnyProps) => <form {...rest}>{children}</form>;
const SecurityBadge = ({ children, ...rest }: AnyProps) => (
  <div {...rest} style={{ padding: 8, background: '#eef', borderRadius: 4 }}>
    {children}
  </div>
);
const ErrorMessage = ({ children, ...rest }: AnyProps) => (
  <div {...rest} style={{ color: 'red', marginTop: 8 }}>
    {children}
  </div>
);

/* Fallback validation utilities */
const validateCRM = (value: string) => typeof value === 'string' && value.trim().length > 0;
const sanitizeInput = (value: string) => String(value).trim();

/* Fallback hooks */
function useSecurity() {
  return {
    login: async (creds: any) => {
      // fake: require TOTP when username contains '2fa'
      return String(creds.username).toLowerCase().includes('2fa');
    },
    verifyTOTP: async ({ totp }: any) => {
      // fake validation: accept '123456' as valid
      return totp === '123456';
    },
    validateSecurityContext: () => {
      // noop
    },
  };
}

function useRateLimit(_key: string, maxAttempts = 5, _windowMs = 300000) {
  const attemptsRef = React.useRef(0);
  return {
    isRateLimited: () => attemptsRef.current >= maxAttempts,
    incrementAttempts: () => {
      attemptsRef.current += 1;
    },
  };
}

export function SecureLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    totp: '',
    deviceId:
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2),
  });
  const [step, setStep] = useState('credentials' as 'credentials' | 'totp');
  const [error, setError] = useState(null as string | null);
  const { login, verifyTOTP, validateSecurityContext } = useSecurity();
  const { isRateLimited, incrementAttempts } = useRateLimit('login', 5, 300000); // 5 tentativas/5min

  useEffect(() => {
    validateSecurityContext();
  }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError(null);

    try {
      if (isRateLimited()) {
        throw new Error('Muitas tentativas. Aguarde 5 minutos.');
      }

      if (step === 'credentials') {
        if (!validateCRM(credentials.username)) {
          throw new Error('CRM inválido');
        }

        const sanitizedCredentials = {
          username: sanitizeInput(credentials.username),
          password: credentials.password,
          deviceId: credentials.deviceId,
        };

        const hasTotp = await login(sanitizedCredentials);
        incrementAttempts();

        if (hasTotp) {
          setStep('totp');
          return;
        } else {
          // no 2FA required — navigate to dashboard
          window.location.href = '/dashboard';
        }
      } else {
        const isValid = await verifyTOTP({
          totp: credentials.totp,
          deviceId: credentials.deviceId,
        });

        if (isValid) {
          window.location.href = '/dashboard';
        } else {
          throw new Error('Código 2FA inválido');
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao fazer login');
      console.error('Login failed:', error);
    }
  };

  return (
    <Container>
      <SecurityBadge>
        <i className="fas fa-shield-alt" />
        Conexão Segura - E2EE
      </SecurityBadge>

      <Form onSubmit={handleLogin}>
        {step === 'credentials' ? (
          <>
            <input
              type="text"
              placeholder="CRM"
              value={credentials.username}
              onChange={(e: any) => setCredentials({ ...credentials, username: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={credentials.password}
              onChange={(e: any) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </>
        ) : (
          <input
            type="text"
            placeholder="Código 2FA"
            value={credentials.totp}
            onChange={(e: any) => setCredentials({ ...credentials, totp: e.target.value })}
            pattern="[0-9]{6}"
            required
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <button type="submit">{step === 'credentials' ? 'Acessar' : 'Verificar 2FA'}</button>
      </Form>
    </Container>
  );
}
