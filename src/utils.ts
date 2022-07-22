export const flipObject = (obj: { [s: string]: unknown } | ArrayLike<unknown>) => {
  return Object.entries(obj).reduce((v, a) => {
    const [key, value] = a
    v[value] = key
    return v
  }, {})
}

export const filterObjectFields = (data: { [s: string]: unknown } | ArrayLike<unknown>, fields: string | string[]) => Object.entries(data)
  .filter(([field]) => fields.includes(field))
  .reduce((v, [field, value]) => {
    v[field] = value
    return v
  }, {})

