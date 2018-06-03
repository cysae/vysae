const dict = {
    ordinaryMeeting: 'Junta General Ordiniaria',
    extraOrdinaryMeeting: 'Junta General Extraordinaria',
}
export function formDict(text) {
    return dict[text]
}
