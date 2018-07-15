import moment from 'moment'

export const companies = [{
    uuid: "6963a677-3345-4e00-93e0-7af0e454a126",
    name: "CYSAE",
    shareIntervals: [{
        start: 1,
        end: 100,
        attr: {
            valueInEur: 1,
        }
    }],
    meetings: [{
        agreementTypes: [
            "Aumento o reducción de capital",
            "Autorización a administradores para que se dediquen a actividad inmersa en el objecto social",
            "Autorización a administradores para que se dediquen a actividad inmersa en el objeto social",
            "Exclusión y separación de socios",
            "Cambio de domicilio",
            "Supresión o limitación del derecho de prederencia en aumentos de capital"
        ],
        votingEnd: moment().day(7),
    }]
}, {
    uuid: "64c22c48-6363-42c5-85fe-67b54a2e94e8",
    name: "Hornung Solutions"
}]

