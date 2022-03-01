import React from 'react'
import  IndividualData  from './IndividualData'

 const Data = ({excelData}) => {
    return excelData.map((individualExcelData)=>(
        <tr key={individualExcelData.round}>
            <IndividualData IndividualExcelData={individualExcelData}/>
        </tr>        
    ))
}

export default Data;