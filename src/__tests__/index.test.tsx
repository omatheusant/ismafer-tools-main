import { screen, render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { SessionProvider } from 'next-auth/react';
import Home from '@/pages';
import { Session } from 'next-auth';

describe('Home', () => {
  test('Admin can see admin dashboard', () => {
    render(
      <SessionProvider session={{
        user: {
          id: "testid",
          role: 'admin'
        }
      } as Session}>
        <Home />
      </SessionProvider>
    );

    const adminMenu = screen.getByRole('adminMenu')

    expect(adminMenu).toBeDefined()
  })
})
