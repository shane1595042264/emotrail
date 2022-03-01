import React from 'react'

const IndividualData = ({IndividualExcelData}) => {

  return (
    <>
    <th>{IndividualExcelData.round}</th>
    <th>{IndividualExcelData.grade}</th>
    <th>{IndividualExcelData.emotion}</th>
    <th>{IndividualExcelData.time.slice(5)}</th>

    </>
  )
}

export default IndividualData;