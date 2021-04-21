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

import { I18nContext } from '@looker/components-providers'
import i18next, { ResourceKey } from 'i18next'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface NamespaceResources {
  [locale: string]: {
    [key: string]: string
  }
}

export type NamespaceResourceGetter = (locale: string) => Promise<ResourceKey>
interface ResourcesOptions {
  resources: NamespaceResources
}
interface GetResourcesOptions {
  getResource: NamespaceResourceGetter
}
export type UseI18nOptions = ResourcesOptions | GetResourcesOptions

const hasGetResourceOption = (
  options?: UseI18nOptions
): options is GetResourcesOptions => {
  if (!options) return false
  return (options as GetResourcesOptions).getResource !== undefined
}

export const useI18n = (ns: string, options?: UseI18nOptions) => {
  const { locale, ready: contextReady, setLocale } = useContext(I18nContext)

  const [ready, setReady] = useState(hasGetResourceOption(options))
  const { t } = useTranslation(ns)

  let getResource: NamespaceResourceGetter | undefined
  if (hasGetResourceOption(options)) {
    getResource = options.getResource
  } else {
    i18next.addResourceBundle(locale, ns, options?.resources)
  }

  useEffect(() => {
    if (getResource) {
      setReady(false)
      getResource(locale).then(() => {
        setReady(true)
      })
    }
  }, [locale, getResource])

  return { locale, ready: contextReady && ready, setLocale, t }
}
