import React, { Component, Fragment } from 'react'
import { Form, Button, Radio, Divider} from 'antd'
// redux
import { requestCompanyUpdate } from '../actions/index.js'
import { connect } from 'react-redux'
// components
import DefineAgreementRules from '../components/majorities'
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const FormItem = Form.Item

class AgreementRulesForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.updateDynamoDB()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        /* this.props.next() */
      }
    });
  }

  getAgreementBody(id) {
    const { getFieldValue } = this.props.form
    const body = {}

    body['type'] = getFieldValue(`${id}_majorityOption`)
    body['electionThreshold'] = getFieldValue(`${id}_electionThreshold`)
    if (body['type'] === 2) {
      body['minCapitalRatio'] = getFieldValue(`${id}_minCapitalRatio`)
    }
    if(getFieldValue(`${id}_hasMinNumberOfAssociates`) === 'yes') {
      body['minAssociateRatio'] = getFieldValue(`${id}_minAssociateRatio`)
    }
    body['countsBlancVotes'] = (getFieldValue(`${id}_countsBlankVotes`) === 'yes') ? true : false

    if ( id !== 'usual') {
      body['agreements'] = getFieldValue(`${id}_agreements`)
    }

    return body
  }

  updateDynamoDB() {
    const body = {majorities: []}

    // Ordinary majority
    body['majorities'].push(this.getAgreementBody('usual'))

    // Other majorities
    const majorityTypeIds =  this.props.form.getFieldValue(`majorityTypes`)
    majorityTypeIds.forEach((id) => {
      body['majorities'].push(this.getAgreementBody(id))
    })

    const companyId = this.props.form.getFieldValue('companyId')
    this.props.requestCompanyUpdate(companyId, body)
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator, getFieldValue } = form;
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit} layout='inline'>
          <FormItem>
            <span style={{marginRight: 10}}>
              ¿Tu empresa está sometida al régimen legal supletorio establecido en la (LSC)?
            </span>
            {getFieldDecorator('underliesLSC', {
               rules: [{
                 required: true,
                 message: 'Este campo es obligatorio.',
               }]
            })(
               <RadioGroup>
                 <RadioButton value="yes">Sí</RadioButton>
                 <RadioButton value="no">No</RadioButton>
               </RadioGroup>
             )}
          </FormItem>
          <Divider />
          {(getFieldValue('underliesLSC') === 'no') && <DefineAgreementRules form={form} />}
          <FormItem>
            <Button type="primary" onClick={this.props.prev}>
              Atrás
            </Button>
            <Button type="primary" htmlType="submit">
              Continuar
            </Button>
          </FormItem>
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {}
const mapDispatchToProps = dispatch => {
    return {
        requestCompanyUpdate: (companyId, body) => { dispatch(requestCompanyUpdate(companyId, body)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgreementRulesForm)
