/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import i18next from 'i18next'
import React, { createContext, FC, useState, useEffect } from 'react'
import { I18nOptions } from './types'
import { i18nUpdate } from './utils'

export interface I18nContextProps {
  locale: string
  ready: boolean
  setLocale: (locale: string) => void
}

export const I18nContext = createContext<I18nContextProps>({
  locale: 'en',
  ready: false,
  setLocale: () => {
    // eslint-disable-next-line no-console
    console.warn('Not implemented: Please wrap your component in I18nProvider')
  },
})
I18nContext.displayName = 'I18nContext'

export const I18nProvider: FC<I18nOptions> = ({
  children,
  locale: initialLocale,
  resources,
  getLocaleResource,
}) => {
  const [locale, setLocale] = useState(initialLocale || 'en')
  const [ready, setReady] = useState(i18next.isInitialized)

  useEffect(() => {
    setReady(false)
    let isSubscribed = true
    i18nUpdate({ getLocaleResource, locale, resources }).then(
      () => isSubscribed && setReady(true)
    )
    return () => {
      isSubscribed = false
    }
  }, [locale, resources, getLocaleResource])

  if (!ready) return null

  return (
    <I18nContext.Provider value={{ locale, ready, setLocale }}>
      {children}
    </I18nContext.Provider>
  )
}
