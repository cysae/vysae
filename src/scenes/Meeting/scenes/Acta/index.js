import React from 'react'
// antd
import { Row, Col, List, Card, Spin } from 'antd'
// services
import getMeeting from '../../../../services/getMeeting'
import getAgreementWithResult from './services/getAgreementResult'
import Promise from 'bluebird'

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

class Acta extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      agreements: props.meeting.agreements.items
    }
  }

  componentDidMount() {
    const promises = this.state.agreements.map(agreement => {
      return getAgreementWithResult(agreement.id)
    })
    Promise.all(promises)
      .then((agreements) => this.setState({ loading: false, agreements }))
      .catch(err => console.error(err))
  }

  renderAgreementResult(result) {
    if(result === 1)
      return (<div>Acceptado</div>)

    return (<div>Denegado</div>)
  }

  render() {
    const { loading, agreements } = this.state

    return (
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
    )
  }
}

export default getMeeting(Acta)
