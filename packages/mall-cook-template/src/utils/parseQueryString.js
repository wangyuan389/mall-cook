import { parse } from 'qs'

const Mode = {
  history: 'history',
  hash: 'hash',
}

export default function parseQueryString(config) {
  let key, mode, del, search, hash

  if (typeof config === 'object') {
    key = config.key
    del = config.del
    mode = config.mode
    search = config.search
    hash = config.hash

    if (mode) {
      let pass = false
      for (const k in Mode) {
        if (mode === Mode[k]) {
          pass = true
        }
      }

      if (!pass) {
        throw new Error('\'mode\' can only be \'history\' or \'hash\'')
      }
    }
  } else {
    key = config
  }

  mode = mode || Mode.hash
  search = search || window.location.search
  hash = hash || window.location.hash

  function parseSearch() {
    return parse(search, { ignoreQueryPrefix: true })
  }

  function parseHash() {
    const questionMarkIndex = hash.indexOf('?')
    hash = hash.substring(questionMarkIndex)
    if (hash) {
      const result = parse(hash, { ignoreQueryPrefix: true })
      if (search.includes('code=')) {
        result.code = parseSearch().code // 如果 search 中没拿到code，则沿用 hash 中的 code
      }
      return result
    }
  }

  const obj = (mode === Mode.history ? parseSearch() : parseHash()) || {}

  if (key) {
    if (del) {
      // 删除会导致页面刷新，需要判断存在才删除，避免死循环
      if ((mode === Mode.history || key === 'code') && search.includes(`${key}=`)) {
        window.location.replace(window.location.href.replace(search, search.replace(`${key}=${obj[key]}`, '')))
      }
      if ((mode === Mode.hash || key === 'code') && hash.includes(`${key}=`)) {
        window.location.hash = hash.replace(`${key}=${obj[key]}`, '')
      }
    }
    return obj[key] || ''
  } else {
    if (del) {
      let newHref
      if (mode === Mode.hash) {
        if (obj.code && search.includes('code=')) {
          newHref = window.location.href.replace(hash, '')
          newHref = newHref.replace('code=', '')
          window.location.replace(newHref)
        } else {
          window.location.hash = ''
        }
      } else {
        newHref = window.location.href.replace(search, '')
        window.location.replace(newHref)
      }
    }
    return obj
  }
}
