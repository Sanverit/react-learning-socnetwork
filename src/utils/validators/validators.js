export const required = value => {

    if(value) return undefined

    return 'field is required'
}



export const maxLengthCreator = length => value => {

    if(value && value.length<=length) return undefined

    return `max length is ${length} cheracters`
}