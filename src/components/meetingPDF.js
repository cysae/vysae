import React, { Component } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import { Document } from '@react-pdf/dom'
import { Page, Text, View, StyleSheet } from '@react-pdf/core'


const Wrapper = styled(Col)`
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
  state = {
    companyName: 'CYSAE',
    type: 'GENERAL'
  }

  render() {
    const { companyName, type } = this.state

    return (
      <Wrapper>
        <Document title="pdf">
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.h1}>{companyName}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.h2}>{`CONVOCATORIA A LA JUNTA GENERAL ${type} DE SOCIOS`}</Text>
              <Text style={styles.text}>
                persona_que_convoca, de conformidad con lo dispuesto en los artículos 166 y 167 de la Ley de Sociedades de Capital, por la presente convoca a sus socios a la Junta General Ordinaria que tendrá lugar el próximo día fecha_inicio a las hora_inicio horas en lugar_junta, pudiendo asistir y/o votar por medios telemáticos, para tratar los asuntos contenidos en el siguiente
                Section #2
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.h3}>ORDEN DEL DÍA</Text>
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
        </Document>
      </Wrapper>
    )
  }
}

export default MeetingPDF
