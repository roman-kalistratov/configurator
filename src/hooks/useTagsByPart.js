import { useMemo } from "react"
import { useSelector } from "react-redux"
import data from "../upgrades.json"

export const useTagsByPart = () => {
  const idnt = useSelector((state) => state.filters.part)

  const tagsByPart = useMemo(() => {
    if (idnt === null || idnt === undefined) {
      console.warn("IDNT is null or undefined")
      return {} // Возвращаем пустой объект, если idnt не определен
    }

    if (!data.upgrade[idnt]) {
      console.error(`No data found for idnt: ${idnt}`)
      return {}
    }

    if (!data.upgrade[idnt].filter) {
      console.warn(`No filters available for idnt: ${idnt}`)
      return {}
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
  }, [idnt])

  return tagsByPart
}
