import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const mutateVote = gql`
  mutation mutateVote($agreementId: ID!, $vote: Vote!) {
    mutateVote(agreementId: $agreementId, vote: $vote) {
      id,
      result
    }
  }
`

const Test = () => {
  return (
    <Mutation
      mutation={mutateVote}
      update={(cache, { data }) =>{
          console.log(cache, data)
      }}
    >
      {(mutateVote, res) => {
         console.log(res)
         return (
           <button onClick={() => {
               mutateVote({
                 variables: {
                   agreementId: 'Agreement-1214',
                   vote: {
                     id: 'Vote-1234',
                     result: 1
                   }
                 }
               })
             }
           }>
             add vote
           </button>
         )}
      }
    </Mutation>
  )
}

export default Test
