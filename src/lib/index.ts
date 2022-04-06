/// <reference path="../types/main.d.ts" />

;(() => {
  const lmWindow = window as LM.Window

  if (lmWindow.LM_LIB === undefined) {
    function scope (_libs: LM.LMLibName|LM.LMLibName[]) {
      const lmLib = lmWindow.LM_LIB
      if (lmLib === undefined) return
      const libs = (typeof _libs === 'string') ? [_libs] : [..._libs]
      libs.forEach(lib => {
        if (!['dayjs', 'OpenSeadragon'].includes(lib)) return
        if (lmWindow[lib] !== undefined) {
          lmLib[lib] = lmWindow[lib]
          lmWindow[lib] = undefined
        }
      })
    }
    lmWindow.LM_LIB = { scope }
  }

})();
