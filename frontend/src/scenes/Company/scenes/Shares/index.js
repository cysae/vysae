import React, { Component, Fragment } from 'react'
import { Form, Button, Radio, Divider, Row, Col, Alert, InputNumber } from 'antd'
// services
import renameObjKey from '../../../../services/renameObjKey'
import {
  getCapital,
  numSharesFromIntvls,
  mergeTriplets,
  isIntersection,
  hasIntvl
} from './services/shareIntervals'
import getCompany from '../../../../services/getCompany'
import Promise from 'bluebird'
// components
import ShareIntervalFields from './components/ShareIntervalFields'
import IntervalTypeField from '../../../../components/intervalTypeField'
import ShareSuffrageFields from '../../../../components/shareSuffrageFields'
// graphql
import { graphql, compose } from 'react-apollo'
import MutationCreateShareInterval from '../../../../queries/MutationCreateShareInterval'
import MutationDeleteShareInterval from '../../../../queries/MutationDeleteShareInterval'
import QueryGetCompany from '../../../../queries/QueryGetCompany'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group


class Shares extends Component {
  state = {
    error: null
  }

  componentDidMount() {
    const {
      form: { setFieldsValue },
      match: { params: { companyId }},
    } = this.props

    const shareIntvls = [{
      companyId,
      start: 1,
      end: 990,
      attr: {
        value: 1,
      }
    }, {
      companyId,
      start: 991,
      end: 1000,
      attr: {
        value: 1,
      }
    }]

    setFieldsValue({
      capital: getCapital(shareIntvls),
      numberOfShares: numSharesFromIntvls(shareIntvls)
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && this.isExtraValid()) {
        this.update()
      }
    });
  }

  update = async () =>  {
    const {
      form: { getFieldValue },
      createShareInterval,
      deleteShareInterval,
      match: { params: { companyId }},
      company: { shareIntervals }
    } = this.props

    let intvls = []
    // normal shares
    const valueInEurPerShare = getFieldValue('capital') / getFieldValue('numberOfShares')
    intvls = intvls.concat(this.toIntervalFrom('shareInterval'))
    for(const intvl of intvls) {
      intvl.attr.value = valueInEurPerShare
    }

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

    const mergedIntvls = mergeTriplets(this.toTripleFrom(intvls))

    // delete all intervals
    let promises = []
    for(const intvl of shareIntervals.items) {
      promises.push(deleteShareInterval(intvl.start))
    }
    await Promise.all(promises)

    // create new intervals
    promises = []
    for (const intvl of mergedIntvls) {
      const shareInterval = {
        companyId,
        ...renameObjKey(intvl, 'attr', 'attributes') // rename attr -> attributes
      }
      promises.push(createShareInterval(shareInterval))
    }
    Promise.all(promises)
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
    /* let totalShareValue = 0
     * const sharesHaveSameValue = getFieldValue('sharesHaveSameValue')
     * if(sharesHaveSameValue === 'no') {
     *   const shareValueTypeIds = getFieldValue('shareValueType_ids')
     *   for(const valueTypeId of shareValueTypeIds) {
     *     const shareValue = getFieldValue(`shareValue_${valueTypeId}`)
     *     const shareIntervalIds = getFieldValue(`shareValueType_${valueTypeId}_ids`)
     *     for(const id of shareIntervalIds) {
     *       const shareCountOfInterval = Math.abs(
     *         getFieldValue(`shareValueType_${valueTypeId}_begin_${id}`)-getFieldValue(`shareValueType_${valueTypeId}_end_${id}`)
     *       )+1
     *       totalShareValue += shareCountOfInterval*shareValue
     *     }
     *   }

     *   if(capital !== totalShareValue) {
     *     this.setState({
     *       error: `La suma del valor de las participaciones (${totalShareValue}€) no coincide con el capital social.`
     *     })
     *     return false
     *   }
     * } */

    return true
  }


  render() {
    const {
      form,
      form: { getFieldDecorator, getFieldValue },
      match: { params: { companyId }},
      company: { shareIntervals },
    } = this.props

    return (
      <Fragment>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <FormItem label="Capital social">
            {getFieldDecorator('capital', {
               rules: [
                 {pattern: /^.*$/, message: 'Tiene que ser un número entero positivo'},
                 {required: true, message: 'Este campo es obligatorio'},
               ],
            })(
               <InputNumber min={1} formatter={value => `${value}€`} parser={value => value.replace('€', '')} />
            )}
          </FormItem>
          <FormItem label="Número de participaciones">
            {getFieldDecorator('numberOfShares', {
               rules: [
                 {required: true, message: 'Este campo es obligatorio.'},
                 {pattern: /^\d*$/, message: 'Tiene que ser un número entero positivo'},
               ],
            })(<InputNumber min={1} />)}
          </FormItem>
          <Row>
            <Col>
              <ShareIntervalFields intvls={shareIntervals.items} form={form} />
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

export default compose(
  Form.create(),
  getCompany,
  graphql(
    MutationCreateShareInterval,
    {
      props: props => ({
        createShareInterval: (shareInterval) => {
          const companyId = props.ownProps.match.params.companyId
          return props.mutate({
            variables: {
              shareInterval
            },
            optimisticResponse: {
              __typename: "Mutation",
              createShareInterval: {
                __typename: "ShareInterval",
                ...shareInterval,
                attributes: {
                  __typename: "ShareAttributes",
                  ...shareInterval.attributes
                }
              }
            },
            update: (proxy, { data } ) => {
              const query = QueryGetCompany
              const resQuery = proxy.readQuery({
                query,
                variables: { companyId }
              })

              resQuery.getCompany.shareIntervals.items.push( data.createShareInterval )

              proxy.writeQuery({
                query,
                variables: { companyId },
                data: resQuery
              })
            }
          })
        }
      })
    }
  ),
  graphql(
    MutationDeleteShareInterval,
    {
      props: props => ({
        deleteShareInterval: (start) => {
          const companyId = props.ownProps.match.params.companyId
          return props.mutate({
            variables: {
              companyId,
              start
            },
            optimisticResponse: {
              __typename: "Mutation",
              deleteShareInterval: {
                __typename: "ShareInterval",
                companyId,
                start
              }
            },
            update: (proxy, { data } ) => {
              const query = QueryGetCompany
              const resQuery = proxy.readQuery({
                query,
                variables: { companyId }
              })

              const shareIntvls = resQuery.getCompany.shareIntervals.items
              for(let i=shareIntvls.length -1; i>=0; i--) {
                if(shareIntvls[i].start === start)
                  resQuery.getCompany.shareIntervals.items.splice(i, 1)
              }

              proxy.writeQuery({
                query,
                variables: { companyId },
                data: resQuery
              })
            }
          })
        }
      })
    }
  )
)(Shares)
