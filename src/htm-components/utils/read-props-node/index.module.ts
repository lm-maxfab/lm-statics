function readPropsNode (propsNode: HTMLDataElement): any {
  const nodeDataType = propsNode.dataset['type']

  const unnamedDataChildren = [...propsNode.querySelectorAll(':scope > data:not([data-title])')] as HTMLDataElement[]
  const namedDataChildren = [...propsNode.querySelectorAll(':scope > data[data-title]:not([data-title=""])')] as HTMLDataElement[]
  const dataChildren = [
    ...unnamedDataChildren,
    ...namedDataChildren
  ]

  // No data children => return the value of innerHTML
  if (dataChildren.length === 0) {
    const rawNodeVal = propsNode.innerHTML.trim()
    if (nodeDataType === 'number') return parseFloat(rawNodeVal)
    if (nodeDataType === 'boolean') {
      const normalizedRawValue = rawNodeVal.toLowerCase().trim()
      const trueishValues = ['oui', 'yes', 'vrai', 'true', '1']
      return trueishValues.includes(normalizedRawValue)
    }
    else if (nodeDataType === 'null') return null
    else return rawNodeVal

  // With only unnamed data children
  } else if (namedDataChildren.length === 0) {
    return unnamedDataChildren.map(dataChild => readPropsNode(dataChild))
  
  // With named data children
  } else {
    const returned: any = {}
    dataChildren.forEach(dataChild => {
      const title = dataChild.dataset['title']
      if (typeof title !== 'string' || title.length < 1) return
      returned[title] = readPropsNode(dataChild)
    })
    return returned
  }
}

export default readPropsNode
