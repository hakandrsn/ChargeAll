import React from 'react'
import Pdf from '../../utils/pdf/pdf'
const PdfButton = ({ header, data, title ,className}) => {
    return (
        <button className={`btn btn-danger mx-1 h-50 ${className}`} onClick={() => { Pdf(header, data, title) }}>
            PDF
        </button>
    )
}

export default PdfButton