import React, { Component, Fragment } from 'react'
// antd
import { Row, Col, Table, Spin } from 'antd'
// recharts
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
// graphql
import { graphql } from 'react-apollo'
import QueryGetMeeting from '../queries/QueryGetMeeting'

class MeetingResult extends Component {
  getAgreementResult(agreement) {
    const result = { pro: 0, contra: 0, blank: 0 }
    for (const vote of agreement.votes) {
      switch(vote.result) {
        case 1: result.pro++; break
        case -1: result.contra++; break
        default: result.blank++
      }
    }
    return result
  }

  getMeetingResult(agreements) {
    // { id:, name:, pro:, contra:, blank: }
    const result = []
    let id = 1;
    for (const agreement of agreements) {
      const aResult = {
        id,
        meetingId: agreement.id,
        name: agreement.name,
        ...this.getAgreementResult(agreement)
      }
      result.push(aResult)
      id++;
    }

    return result
  }

  render() {
    const { meeting, isLoading } = this.props

    if (isLoading)
      return (<Spin size="large" />)

    const meetingResult = this.getMeetingResult(meeting.agreements)

    const columns = [{
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'Pro',
      dataIndex: 'pro',
      key: 'pro'
    }, {
      title: 'Contra',
      dataIndex: 'contra',
      key: 'contra'
    }, {
      title: 'Blanco',
      dataIndex: 'blank',
      key: 'blank'
    }]

    return (
      <Fragment>
        <h1 style={{textAlign: 'center'}}>Voto pendiente</h1>
        <Row type="flex">
          <Col span={24}>
            <ResponsiveContainer width='100%' aspect={4}>
              <BarChart data={meetingResult}
                margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="id"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="pro" stackId="a" fill="#8884d8" />
                <Bar dataKey="contra" stackId="a" fill="#82ca9d" />
                <Bar dataKey="blank" stackId="a" fill="#84449d" />
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={meetingResult}
              rowKey="meetingId"
            />
          </Col>
        </Row>
      </Fragment>
    )
  }
}

export default graphql(
  QueryGetMeeting,
  {
    options: props => ({
      variables: {
        id: props.match.params.id,
        withAgreements: true,
        withVotes: true
      }
    }),
    props: ({ data: { loading, getMeeting } }) => ({
      isLoading: loading,
      meeting: getMeeting
    })
  }
)(MeetingResult)
