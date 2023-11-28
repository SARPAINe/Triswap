export const toObject = (obj: object): JSON => {
  return JSON.parse(
    JSON.stringify(
      obj,
      (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
    ),
  )
}
