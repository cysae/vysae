import React, { Component } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import { Document } from '@react-pdf/dom'
import { Page, Text, View, StyleSheet } from '@react-pdf/core'
import { formDict } from '../utils/formDict.js'
import moment from 'moment'

const Wrapper = styled.div`
  display: flex;

  iframe {
    flex: 1;
  }
`

// Create styles
const styles = StyleSheet.create({
  page: {
    margin: 10,
  },
  h1: {
    textAlign: 'center',
  },
  h2: {
    textAlign: 'center',
    marginBottom: 10,
  },
  h3: {
    textAlign: 'center',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  }
});

// Create Document Component
class MeetingPDF extends Component {
  renderAgreementList(agreementTypes) {
    return agreementTypes.map((agreement, index) => {
      return (
        <View key={index}>
          <Text>
            {index+1}. Acuerdo: {agreement}
          </Text>
        </View>
      )
    })
  }

  render() {
    const {
      companyName,
      meetingType,
      person,
      votingStart,
      agreementTypes,
      location,
      additionalInfo
    } = this.props.meeting
    const startDate = moment(votingStart).format('DD-MM-YYYY')
    const startHour = moment(votingStart).format('HH:mm')
    /* const endDate = moment(votingEnd).format('DD-MM-YYYY') */
    /* const endHour = moment(votingEnd).format('HH:mm') */

    return (
      <Row type="flex">
        <Col span={24}>
          <Wrapper>
            <Document>
              <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                  <Text style={styles.h1}>{companyName}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.h2}>{`Convocatoria a la ${formDict(meetingType)} de socios`}</Text>
                  <Text style={styles.text}>
                    {person}, de conformidad con lo dispuesto en los artículos 166 y 167 de la Ley de Sociedades de Capital, por la presente convoca a sus socios a la Junta General Ordinaria que tendrá lugar el próximo día {startDate} a las {startHour} horas en {location}, pudiendo asistir y/o votar por medios telemáticos, para tratar los asuntos contenidos en el siguiente
                  </Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.h3}>ORDEN DEL DÍA</Text>
                  {this.renderAgreementList(agreementTypes)}
                </View>

                <View style={styles.section}>
                  <Text style={styles.h3}>Derecho de información</Text>
                  <Text style={styles.text}>
                    Se pone en conocimiento de los socios, conforme a lo dispuesto en el artículo 272 de la Ley de Sociedades de Capital, que a partir de la convocatoria de la junta general, cualquiera de ellos podrá obtener de la sociedad, de forma inmediata y gratuita, los documentos que han de ser sometidos a la aprobación de la misma que estarán disponibles en la plataforma digital de la sociedad a la que podrán acceder todos los socios.
                  </Text>
                  <Text style={styles.text}>
                    De conformidad con lo establecido en los artículos 196 y 287 de la Ley de Sociedades de Capital, se informa a los señores socios del derecho que les asiste a examinar en el domicilio social el texto íntegro de las modificaciones estatuarias propuestas así como a solicitar por escrito, con anterioridad a la reunión de la junta general, los informes o aclaraciones que estimen precisos acerca de los asuntos comprendidos en el orden del día.
                  </Text>
                </View>
              </Page>

              <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                  <Text style={styles.h3}>Voto anticipado y delegación de voto</Text>
                  <Text style={styles.text}>
                    Asimismo, se informa a los socios que podrán emitir su voto sobre las propuestas contenidas en el presente Orden del Día remitiendo a la Sociedad, antes de su celebración, por medios telemáticos, a través de la plataforma digital de la sociedad habilitada al efecto, un escrito conteniendo su voto, manifestando el sentido de su voto separadamente sobre cada uno de los puntos o asuntos comprendidos en el Orden del Día. Caso de no hacerlo sobre alguno o algunos se entenderá que se abstiene en relación con ellos.
                  </Text>
                  <Text style={styles.text}>
                    También podrá delegar su voto libremente a otro socio remitiendo a dicho socio, por los medios telemáticos indicados, un escrito conteniendo la delegación del voto a la libre elección del socio en quien se ha delegado.
                  </Text>
                  <Text style={styles.text}>
                    El voto anticipado deberá recibirse por la sociedad con un mínimo de 24 horas de antelación a la hora fijada para el comienzo de la Junta. Hasta ese momento el voto podrá revocarse o modificarse. Transcurrido el mismo, el voto anticipado emitido a distancia sólo podrá dejarse sin efecto por la presencia personal o telemática del socio en la Junta.
                  </Text>
                </View>

                <View style={styles.section}>
                  <Text style={styles.h3}>Voto anticipado y delegación de voto</Text>
                  <Text style={styles.text}>
                    Asimismo, se informa a los socios que podrán emitir su voto sobre las propuestas contenidas en el presente Orden del Día remitiendo a la Sociedad, antes de su celebración, por medios telemáticos, a través de la plataforma digital de la sociedad habilitada al efecto, un escrito conteniendo su voto, manifestando el sentido de su voto separadamente sobre cada uno de los puntos o asuntos comprendidos en el Orden del Día. Caso de no hacerlo sobre alguno o algunos se entenderá que se abstiene en relación con ellos.
                  </Text>
                  <Text style={styles.text}>
                    También podrá delegar su voto libremente a otro socio remitiendo a dicho socio, por los medios telemáticos indicados, un escrito conteniendo la delegación del voto a la libre elección del socio en quien se ha delegado.
                  </Text>
                  <Text style={styles.text}>
                    El voto anticipado deberá recibirse por la sociedad con un mínimo de 24 horas de antelación a la hora fijada para el comienzo de la Junta. Hasta ese momento el voto podrá revocarse o modificarse. Transcurrido el mismo, el voto anticipado emitido a distancia sólo podrá dejarse sin efecto por la presencia personal o telemática del socio en la Junta.
                  </Text>
                </View>

                <View style={styles.section}>
                  <Text style={styles.text}>
                    {additionalInfo}
                  </Text>
                </View>

                <View style={styles.section}>
                  <Text style={styles.text}>
                    Fecha: {moment().format('DD-MM-YYYY')}
                  </Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.text}>
                    Fdo.: {person}
                  </Text>
                </View>
              </Page>
            </Document>
          </Wrapper>
        </Col>
      </Row>
    )
  }
}

export default MeetingPDF
