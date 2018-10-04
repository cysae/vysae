import React from 'react'
// antd
import { List, Card, Spin } from 'antd'
// services
import getMeeting from '../../../../services/getMeeting'
import getAgreementWithResult from './services/getAgreementResult'
import Promise from 'bluebird'

class OrderDay extends React.Component {
  render() {
    console.log(this.props)
    var organiser = "Yolo McYolald"
    return(
      <div>
        <Card
          title="CONVOCATORIA A LA JUNTA GENERAL  'juntaType'  DE SOCIOS"
          style={{ width: 1000, textAlign: 'center' }}
        >
          <p style={{textAlign: 'justify'}}>
            { organiser } 'persona_que_convoca', de conformidad con lo dispuesto en los artículos 166 y 167 de la Ley de Sociedades de Capital,
            por la presente convoca a sus socios a la Junta General Ordinaria que tendrá lugar el próximo día 'fecha_inicio' a
            las 'hora_inicio' horas en 'lugar_junta', pudiendo asistir y/o votar por medios telemáticos, para tratar los asuntos
            contenidos en el siguiente
          </p>
        </Card>

        <Card
          title="ORDEN DEL DÍA"
          style={{ width: 1000, textAlign: 'center' }}
        >
          <List>

          </List>
        </Card>

        <Card
          title="Derecho de información"
          style={{ width: 1000, textAlign: 'center' }}
        >
          <p style={{textAlign: 'justify'}}>
              Se pone en conocimiento de los socios, conforme a lo dispuesto en el artículo 272 de la Ley de Sociedades de Capital, que
              a partir de la convocatoria de la junta general, cualquiera de ellos podrá obtener de la sociedad, de forma inmediata y
              gratuita, los documentos que han de ser sometidos a la aprobación de la misma que estarán disponibles en la plataforma
              digital de la sociedad a la que podrán acceder todos los socios.
          </p>
          <p style={{textAlign: 'justify'}}>
              De conformidad con lo establecido en los artículos 196 y 287 de la Ley de Sociedades de Capital, se informa a los señores
              socios del derecho que les asiste a examinar en el domicilio social el texto íntegro de las modificaciones estatuarias
              propuestas así como a solicitar por escrito, con anterioridad a la reunión de la junta general, los informes o aclaraciones
              que estimen precisos acerca de los asuntos comprendidos en el orden del día.
          </p>
        </Card>

        <Card
          title="Voto anticipado y delegación de voto"
          style={{ width: 1000, textAlign: 'center' }}
        >
          <p style={{textAlign: 'justify'}}>
            Asimismo, se informa a los socios que podrán emitir su voto sobre las propuestas contenidas en el presente Orden del Día
            remitiendo a la Sociedad, antes de su celebración, por medios telemáticos, a través de la plataforma digital de la sociedad
            habilitada al efecto, un escrito conteniendo su voto, manifestando el sentido de su voto separadamente sobre cada uno de los
            puntos o asuntos comprendidos en el Orden del Día. Caso de no hacerlo sobre alguno o algunos se entenderá que se abstiene en
            relación con ellos.
          </p>
          <p style={{textAlign: 'justify'}}>
            También podrá delegar su voto libremente a otro socio remitiendo a dicho socio, por los medios telemáticos indicados, un escrito
            conteniendo la delegación del voto a la libre elección del socio en quien se ha delegado.
          </p>
          <p style={{textAlign: 'justify'}}>
            El voto anticipado deberá recibirse por la sociedad con un mínimo de 24 horas de antelación a la hora fijada para el comienzo de
            la Junta. Hasta ese momento el voto podrá revocarse o modificarse. Transcurrido el mismo, el voto anticipado emitido a distancia
            sólo podrá dejarse sin efecto por la presencia personal o telemática del socio en la Junta.
          </p>
        </Card>
      </div>
    )
  }
}


export default getMeeting(OrderDay)
