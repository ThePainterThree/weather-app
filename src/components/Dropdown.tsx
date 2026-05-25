import { Portal, Select, createListCollection } from "@chakra-ui/react"
import { cities } from "../data/cities";

type DropdownProps = {
    cityName: string,
    onCityChange: (cityName : string) => void;
}

const cityCollection = createListCollection({
  items: cities.map((city) => ({
    label: city.name, 
    value: city.name 
})),
});

function Dropdown ({cityName, onCityChange }: DropdownProps){
  return (
    <Select.Root 
        size="sm" width="220px"
        collection={cityCollection} 
        value={[cityName]}
        onValueChange={(selected) => {
            onCityChange(selected.value[0])
        }}
        >
      <Select.HiddenSelect />
      <Select.Label>Select city</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select city" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
         <Select.Content>
            {cityCollection.items.map((city) => (
              <Select.Item item={city} key={city.value}>
                {city.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default Dropdown