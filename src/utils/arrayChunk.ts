export const arrayChunk = <T>(array: Array<T>, chunkSize: number): Array<Array<T>> => {
  const arrayChunks: Array<Array<T>> = []
  if (chunkSize <= 0) return arrayChunks

  for (let i = 0; i < array.length; i += chunkSize) {
    arrayChunks.push(array.slice(i, i + chunkSize))
  }

  return arrayChunks
}