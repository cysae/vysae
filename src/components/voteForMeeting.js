import React, { Component, Fragment } from 'react'
import { List, Radio, Button } from 'antd'
import { Link } from 'react-router-dom'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class VoteForMeeting extends Component {
  state = {
    orderOfTheDay: [ 'point 1', 'point 2' ]
  }

  render() {
    const { orderOfTheDay } = this.state
    return (

      <Fragment>
        <List
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={orderOfTheDay}
          renderItem={item => (
            <List.Item actions={[
              <RadioGroup>
                <RadioButton value="yes">Sí</RadioButton>
                <RadioButton value="blank">En blanco</RadioButton>
                <RadioButton value="no">No</RadioButton>
              </RadioGroup>
            ]}>
              {item}
            </List.Item>)}
        />
        <Button><Link to="/meetings/result">Votar</Link></Button>
      </Fragment>
    )
  }
}

export default VoteForMeeting
