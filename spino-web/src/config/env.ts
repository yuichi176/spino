import * as process from 'process'

interface Env {
  BFF_PROTOCOL?: string
  BFF_BASE_DOMAIN?: string
  BE_PROTOCOL?: string
  BE_BASE_DOMAIN?: string
  USE_MOCK_DATA?: boolean
}

export const env = {
  BFF_PROTOCOL: process.env.NEXT_PUBLIC_BFF_PROTOCOL || 'http',
  BFF_BASE_DOMAIN: process.env.NEXT_PUBLIC_BFF_BASE_DOMAIN || 'localhost:3000',
  BE_PROTOCOL: process.env.NEXT_PUBLIC_BE_PROTOCOL || 'http',
  BE_BASE_DOMAIN: process.env.NEXT_PUBLIC_BE_BASE_DOMAIN || 'localhost:8080',
  USE_MOCK_DATA: process.env.USE_MOCK_DATA === 'true',
} as Env
