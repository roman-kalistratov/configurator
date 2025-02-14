import { useSelector } from "react-redux"
import { UpgradesContainer } from "./styles"
import UpgradeItem from "./UpgradeItem/UpgradeItem"

const Upgrades = () => {
  const partItems = useSelector((state) => state.filters.partItems)
  return (
    <UpgradesContainer>
      {Object.entries(partItems).map(([itemKey, item]) => (
        <UpgradeItem key={itemKey} item={item} />
      ))}
    </UpgradesContainer>
  )
}

export default Upgrades
