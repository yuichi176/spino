// This function returns today's date in the format of 'YYYY-MM-DD'
export const getToday = (): string => {
    const date = new Date()
    const y = date.getFullYear()
    const m = ('00' + (date.getMonth() + 1)).slice(-2)
    const d = ('00' + date.getDate()).slice(-2)
    return y + '-' + m + '-' + d
}
