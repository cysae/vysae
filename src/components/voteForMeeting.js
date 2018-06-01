import React, { Component, Fragment } from 'react'
import { List, Radio, Button } from 'antd'
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
                <RadioButton value="no">No</RadioButton>
              </RadioGroup>
            ]}>
              {item}
            </List.Item>)}
        />
      <Button>Votar</Button>
      </Fragment>
    )
  }
}

export default VoteForMeeting
