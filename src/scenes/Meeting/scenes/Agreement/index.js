import React, { Fragment } from 'react'
// antd
import { List, Card, Spin } from 'antd'
// services
import getCompany from '../../../../services/getCompany'
import getMeeting from '../../../../services/getMeeting'
import getAgreementResult from './services/getAgreementResult'
import getCompanyShareholders from './services/getCompanyShareholders.js'
import Promise from 'bluebird'
import { compose } from 'recompose'
import 'moment/locale/es'
import moment from 'moment'
moment.locale('es')

class Acta extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      agreements: props.meeting.agreements.items
    }
  }

  componentDidMount = async () => {
    const {
      company: { shareIntervals },
      match: { params: { companyId }}
    } = this.props

    const shareholders = await getCompanyShareholders(companyId)

    const promises = this.state.agreements.map(agreement =>
      getAgreementResult(agreement.id, shareIntervals.items, shareholders)
    )
    Promise.all(promises)
      .then(results => {
        this.setState({
          loading: false,
          agreements: this.state.agreements.map(
            (agreement, i) => ({ ...agreement, result: results[i] })
          )
        })
      }
      ).catch(err => console.error(err))
  }

  renderAgreementResult(result) {
    if(result === 1)
      return (<div>Aprobado</div>)

    return (<div>No aprobado</div>)
  }

  render() {
    const {
      company,
      meeting: { end },
    } = this.props
    const { loading, agreements } = this.state

    return (
      <Fragment>
        <Card
          title={`ACTA DE LA REUNIÓN DE LA JUNTA GENERAL UNIVERSAL DE ${company.name}`}
          style={{ textAlign: 'center' }}
        >
          <p style={{textAlign: 'justify'}}>
            En Madrid, a <b>{moment(end).format('LL')}</b>, estando presentes y representados la totalidad de los socios de la sociedad, representantes de la totalidad del capital social, deciden por unanimidad constituirse en Junta Universal de Socios al amparo de lo establecido en los Estatutos Sociales y en la Ley de Sociedades de Capital.
          </p>
          <p style={{textAlign: 'justify'}}>
            Se forma la LISTA DE ASISTENTES, que consta al final del presente acta, y firman todos los socios presentes y representados.
          </p>
          <p style={{textAlign: 'justify'}}>
            Seguidamente se acepta por unanimidad los siguientes puntos del ORDEN DEL DÍA:
          </p>
        </Card>
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
          dataSource={agreements}
          renderItem={agreement => (
            <List.Item>
              <Card title={agreement.name}>
                {loading ? <Spin size="large" /> : this.renderAgreementResult(agreement.result)}
              </Card>
            </List.Item>
          )}
        />
        <p style={{textAlign: 'justify'}}>
          Abierta la sesión, toma la palabra el Presidente, el cual presenta y somete a la consideración de la Junta General el contenido de los puntos del Orden del día, facilitándose también a los socios la información necesaria acerca de los acuerdos comprendidos en el mismo. Todos los socios manifiestan encontrarse suficientemente informados y haber tenido derecho a examinar el texto íntegro de las modificaciones estatutarias propuestas, tras lo cual se adoptaron, con los resultados de votación expuestos, los siguientes
        </p>
      </Fragment>
    )
  }
}

export default compose(
  getMeeting,
  getCompany,
)(Acta)
