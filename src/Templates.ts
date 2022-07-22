
import templates from './templates/index'

export const renderTemplate = (name: string, data: any) => {
  const template = templates[name]
  if (!template) throw new Error(`Unknown template: ${name}`)
  return template(data)
}