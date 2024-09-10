import { useContext } from "react"
import { DisplayContext } from "./Preview"

export const RoundButton=function({id, text})
{
  const displaying=useContext(DisplayContext)
    return(
      <button id={id} className={`filter-btn ${displaying==id&&('active')}`}>
        {text}
      </button>
    )
}