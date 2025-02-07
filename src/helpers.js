import { useDispatch, useSelector } from "react-redux"
import data from "./upgrades.json"

export const getTagsByPart = () => {
  const dispatch = useDispatch()
  const idnt = useSelector((state) => state.filters.idnt)

  if (!data.upgrade[idnt] || !data.upgrade[idnt].filter) {
    return []
  }

  return Object.entries(data.upgrade[idnt].filter).reduce(
    (acc, [categoryKey, categoryValue]) => {
      acc[categoryKey] = {
        title: categoryValue.title || "",
        tags: Object.values(categoryValue).filter((tag) => tag.name),
      }
      return acc
    },
    {}
  )
}
