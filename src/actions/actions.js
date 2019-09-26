export const setParameter = (parameter, value) =>(
    {
        type: 'SET_PARAMETER',
        value,
        parameter
    }
)