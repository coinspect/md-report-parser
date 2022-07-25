import { renderTemplate } from './Templates'


export function RenderReports ({ metadataBlockTypeName } : any) {

  const metadataRenderer = (tokens: { [x: string]: any }, idx: string | number, _options: any, env: any, self: any) => {
    const token = tokens[idx]
    const metadata = token.content || {}
    const className = metadata[metadataBlockTypeName]
    return className === 'finding' ? renderTemplate('findingHeader', metadata) : ''
  }

  const render = (tokens: { [x: string]: any }, idx: string | number, _options: any, env: any, self: { renderToken: (arg0: any, arg1: any, arg2: any, arg3: any, arg4: any) => any }) => {
    const token = tokens[idx]
    if (token.nesting === 1) {
      const metadata = token.meta || {}
      const className = metadata[metadataBlockTypeName]
      if (className) token.attrJoin('class', `${className}`)
    }
    return self.renderToken(tokens, idx, _options, env, self)
  }

  const titleCb = (metadata: { [x: string]: any; title?: any; id?: any }) => {
    let { title, id } = metadata
    title = title || ''
    const className = metadata[metadataBlockTypeName]
    return className === 'finding' ? `${id} - ${title}` : title
  }

  return { render, metadataRenderer, titleCb }
}

export default RenderReports
