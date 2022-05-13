import React from 'react'
import proTypes from "prop-types"

const totalValue = (data, value) => {
    let total = 0
   if(data){
    for (let i = 0; i < data.length; i++) {
      total += data[i][value]
    }
    return isNaN(total) ? 0 : total.toFixed(1)
   }
  }
const TotalLabel = ({data,value,title}) => {
    let valueBirim = value == "energy" && "kWh"|| "amount" && "TL" || "duration" && "dakika"|| "lastbalance" && "TL"
    return (
        <label className='px-2 py-1 my-1 text-nowrap fs-6 rounded' style={{backgroundColor:"#BDE6F1"}}>
            {title} : <strong>{totalValue(data, value)} {valueBirim}</strong>
        </label>
    )
}
totalValue.defaultProps = {
    data: [],
    value: "amount"
}
totalValue.proTypes = {
    data:proTypes.array,
    value:proTypes.string
}

export default TotalLabel