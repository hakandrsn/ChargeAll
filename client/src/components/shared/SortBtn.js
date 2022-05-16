import React, {useState} from 'react'
import filterIcons from "../../assets/icons/filter.svg"

const SortBtn = ({title,state}) => {
  const [sorted, setSorted] = useState("amount")

    return (
        <>
            <button
                onClick={state}
                style={{ backgroundColor: "transparent", color: "white", border: "none", margin: 0, padding: 0 }}>
               {title}
            </button>
            <img width={25} alt="user" src={filterIcons} />
        </>

    )
}

export default SortBtn