import { useEffect, useState } from "react"
import data from "../../parts.json"
import PartItem from "./PartItem/PartItem"

const Parts = () => {
  const [parts, setParts] = useState([])

  useEffect(() => {
    setParts(data.parts)
  }, [])

  return (
    <>
      {parts.map((item) => (
        <PartItem key={item.idnt} item={item} />
      ))}
    </>
  )
}

export default Parts
