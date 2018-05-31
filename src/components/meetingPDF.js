import React, { Component } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import { Document } from '@react-pdf/dom'
import { Page, Text, View, StyleSheet } from '@react-pdf/core'


const Wrapper = styled(Col)`
  display: flex;

  iframe {
    flex: 1;
  }
`

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});


// Create Document Component
const MeetingPDF = () => (
  <Wrapper>
      <Document title="pdf">
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
  </Wrapper>
);

export default MeetingPDF
