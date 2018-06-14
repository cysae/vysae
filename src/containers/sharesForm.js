import React, { Component, Fragment } from 'react'
import { Form, Button, Radio, Divider, Row, Col, Alert} from 'antd'
// redux
import { connect } from 'react-redux'
import { requestCompanyUpdate } from '../actions/index.js'
// utils
import { mergeTriplets } from '../utils/mergeIntervalTiplets.js'
// components
import ShareIntervalFields from '../components/shareIntervalFields'
import IntervalTypeField from '../components/intervalTypeField.js'
import ShareSuffrageFields from '../components/shareSuffrageFields'
import { MyInputNumber } from './addCompanyForms.js'
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class SharesForm extends Component {
  state = {
    error: null
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && this.isExtraValid()) {
        this.update()
        this.props.next()
      }
    });
  }

  update() {
    const { getFieldValue } = this.props.form

    let intvls = []
    // normal shares
    intvls = intvls.concat(this.toIntervalFrom('shareInterval'))
    // valued shares
    if(getFieldValue('sharesHaveSameValue') === 'no') {
      intvls = intvls.concat(this.toIntervalFromTypeWithFieldId('shareValue', 'valueInEur'))
    }

    // share suffrage
    if(getFieldValue('sharesHaveEqualSuffrage') === 'no') {
      // shares without right to vote
      if(getFieldValue('hasSharesWithoutSuffrage') === 'yes') {
        intvls = intvls.concat(
          this.toIntervalFrom('shareIntervalWithoutSuffrage', { relativeVoteWeight: 0 })
        )
      }

      // shares with unequal suffrage
      if(getFieldValue('hasSharesWithUnequalSuffrage') === 'yes') {
        intvls = intvls.concat(
          this.toIntervalFromTypeWithFieldId(
            'shareIntervalWithUnequalSuffrage', 'relativeVoteWeight'
          )
        )
      }
    }

    // treasury shares
    if(getFieldValue('hasTreasuryShares') === 'yes') {
      intvls = intvls.concat(
        this.toIntervalFrom('treasuryShareIntervals', { isTreasury: true })
      )
    }

    const triplets = mergeTriplets(this.toTripleFrom(intvls))

    const body = {
      shareIntervals: triplets,
    }


    const companyId = this.props.form.getFieldValue('companyId')
    this.props.requestCompanyUpdate(companyId, body)
  }

  toIntervalFromTypeWithFieldId(fieldId, attrName, ) {
    const { getFieldValue } = this.props.form
    let intvls = []

    const valueTypeIds = getFieldValue(`${fieldId}_type_ids`)
    for (const id in valueTypeIds) {
      const attr = {}
      attr[attrName] = getFieldValue(`${fieldId}_${id}`)
      intvls = intvls.concat(this.toIntervalFrom(`${fieldId}_type_${id}`, attr))
    }
    return intvls
  }

  toIntervalFrom(name, attr = {}) {
    const triplets = []
    const intvlIds = this.props.form.getFieldValue(`${name}_ids`)
    for (const id in intvlIds) {
      const start = this.props.form.getFieldValue(`${name}_start_${id}`)
      const end = this.props.form.getFieldValue(`${name}_end_${id}`)
      triplets.push({ start, end, attr })
    }
    return triplets
  }

  toTripleFrom(intvls) {
    const triplets = []
    for (const intvl of intvls) {
      triplets.push({ num: intvl.start, attr: intvl.attr, isEnd: false})
      triplets.push({ num: intvl.end, attr: intvl.attr, isEnd: true})
    }
    return triplets
  }


  handleErrorClose = () => {
    console.log('close')
    this.setState({ error: null })
  }

  isExtraValid() {
    const { getFieldValue } = this.props.form
    const capital = getFieldValue('capital')
    const totalShareNumber = getFieldValue('numberOfShares')

    // total share number
    let totalShareIntervalNumber = 0
    const shareIntervalIds = getFieldValue('shareInterval_ids')
    for (const id of shareIntervalIds) {
      totalShareIntervalNumber += Math.abs(getFieldValue(`shareInterval_start_${id}`)-getFieldValue(`shareInterval_end_${id}`))+1
    }

    // number of shares have to coincide
    if (totalShareNumber !== totalShareIntervalNumber) {
      this.setState({ error: `El numero total de las participaciones (${totalShareNumber}) no coincide con la suma sobre las numeraciones (${totalShareIntervalNumber}).` })
      return false
    }

    // social capital has to coincide with shares and their corresponding values
    let totalShareValue = 0
    const sharesHaveSameValue = getFieldValue('sharesHaveSameValue')
    if(sharesHaveSameValue === 'no') {
      const shareValueTypeIds = getFieldValue('shareValueType_ids')
      for(const valueTypeId of shareValueTypeIds) {
        const shareValue = getFieldValue(`shareValue_${valueTypeId}`)
        const shareIntervalIds = getFieldValue(`shareValueType_${valueTypeId}_ids`)
        for(const id of shareIntervalIds) {
          const shareCountOfInterval = Math.abs(
            getFieldValue(`shareValueType_${valueTypeId}_begin_${id}`)-getFieldValue(`shareValueType_${valueTypeId}_end_${id}`)
          )+1
          totalShareValue += shareCountOfInterval*shareValue
        }
      }

      if(capital !== totalShareValue) {
        this.setState({
          error: `La suma del valor de las participaciones (${totalShareValue}€) no coincide con el capital social.`
        })
        return false
      }
    }

    return true
  }


  render() {
    const { form } = this.props
    const { getFieldDecorator, getFieldValue } = form;

    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="Capital social"
            labelCol={{span: 12}}
          >
            {getFieldDecorator('capital', {
               rules: [
                 {pattern: /^.*$/, message: 'Tiene que ser un número entero positivo'},
                 {required: true, message: 'Este campo es obligatorio'},
               ],
            })(
               <MyInputNumber min={1} formatter={value => `${value}€`} parser={value => value.replace('€', '')} />
            )}
          </FormItem>
          <FormItem
            label="Número de participaciones"
            labelCol={{span: 12}}
          >
            {getFieldDecorator('numberOfShares', {
               rules: [
                 {required: true, message: 'Este campo es obligatorio.'},
                 {pattern: /^\d*$/, message: 'Tiene que ser un número entero positivo'},
               ],
            })(<MyInputNumber min={1} />)}
          </FormItem>
          <Row>
            <Col offset={12} span={12}>
              <ShareIntervalFields form={form} />
            </Col>
          </Row>
          <Divider />

          <FormItem
            label="¿Tienen todas las participaciones el mismo valor nominal?"
            labelCol={{span: 12}}
          >
            {getFieldDecorator('sharesHaveSameValue', {
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
          {getFieldValue('sharesHaveSameValue') === 'no' && (
             <IntervalTypeField fieldId='shareValue' form={form}  />
          )}
          <Divider />

          <FormItem
            label="¿Todas las participaciones tienen el mismo derecho de voto?"
            labelCol={{span: 12}}
          >
            {getFieldDecorator('sharesHaveEqualSuffrage', {
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
          {(getFieldValue('sharesHaveEqualSuffrage') === 'no') && <ShareSuffrageFields form={form} />}
          <Divider />

          <FormItem
            label="¿Hay acciones en autocartera?"
            labelCol={{span: 12}}
          >
            {getFieldDecorator('hasTreasuryShares', {
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
          {(getFieldValue('hasTreasuryShares') === 'yes') ? (
             <Row>
               <Col offset={12}>
                 <ShareIntervalFields form={form} fieldId="treasuryShareIntervals" />
               </Col>
             </Row>
          ) : null}
          <Divider />

          {
            this.state.error ? (
              <Alert
                type="error"
                message={this.state.error}
                closable
                banner
                afterClose={this.handleErrorClose}
              />
            ) : null
          }
          
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

export default connect(mapStateToProps, mapDispatchToProps)(SharesForm)
