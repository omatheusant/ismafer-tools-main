import { ReadableStream } from 'stream/web'

export interface UserBody extends ReadableStream<Uint8Array> {
    name: string,
    username: string,
    password: string,
    local: string,
    role: string
  }
