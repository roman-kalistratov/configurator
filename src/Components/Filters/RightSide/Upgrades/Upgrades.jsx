import { useSelector } from "react-redux"
import { UpgradesContainer } from "./styles"
import UpgradeItem from "./UpgradeItem/UpgradeItem"

const Upgrades = () => {
  const partItems = useSelector((state) => state.filters.partItems)

  return (
    <UpgradesContainer>
      {Object.values(partItems).map((item) => (
        <UpgradeItem key={item.uin} item={item} />
      ))}
    </UpgradesContainer>
  )
}

export default Upgrades
