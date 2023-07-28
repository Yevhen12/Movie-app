import * as bcrypt from 'bcrypt'

const SALT = 10

export const encodePassword: (password: string) => string = (password) => {
  return bcrypt.hashSync(password, SALT)
}

export const comparePassword: (password: string, hash: string) => boolean = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}
