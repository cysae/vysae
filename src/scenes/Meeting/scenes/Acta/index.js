import React from 'react'
// antd
import { List, Card, Spin } from 'antd'
// services
import getCompany from '../../../../services/getCompany'
import getMeeting from '../../../../services/getMeeting'
import getAgreementResult from './services/getAgreementResult'
import getCompanyShareholders from './services/getCompanyShareholders.js'
import Promise from 'bluebird'
import { compose } from 'recompose'

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
    console.log('shareholders', shareholders)

    console.log(this.state.agreements)
    const test = await getAgreementResult(this.state.agreements[0], shareIntervals.items, shareholders)
    console.log(test)
  }

  renderAgreementResult(result) {
    if(result === 1)
      return (<div>Aceptado</div>)

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
              {!loading && this.renderAgreementResult(agreement.result)}
            </Card>
          </List.Item>
        )}
      />
    )
  }
}

export default compose(
  getMeeting,
  getCompany,
)(Acta)
