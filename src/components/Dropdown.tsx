import { Portal, Select, createListCollection } from "@chakra-ui/react";

import { cities } from "../data/cities";

type DropdownProps = {
  cityName: string;
  onCityChange: (cityName: string) => void;
};

const cityCollection = createListCollection({
  items: cities.map((city) => ({
    label: city.name,
    value: city.name,
  })),
});

function Dropdown({ cityName, onCityChange }: DropdownProps) {
  return (
    <Select.Root
      size="lg"
      width="100%"
      maxWidth="340px"
      marginTop="2.5rem"
      collection={cityCollection}
      value={[cityName]}
      onValueChange={(selected) => {
        onCityChange(selected.value[0]);
      }}
    >
      <Select.HiddenSelect />

      <Select.Label
        fontSize="md"
        fontWeight="semibold"
        color="rgba(255, 255, 255, 0.82)"
        marginBottom="2"
      >
        Select city
      </Select.Label>

      <Select.Control>
        <Select.Trigger
          minHeight="50px"
          bg="rgba(20, 30, 50, 0.32)"
          backdropFilter="blur(12px)"
          border="1px solid rgba(255, 255, 255, 0.42)"
          borderRadius="xl"
          color="#F7F9FC"
          boxShadow="0 8px 24px rgba(0, 0, 0, 0.12)"
          _hover={{
            borderColor: "rgba(255, 255, 255, 0.65)",
            bg: "rgba(20, 30, 50, 0.40)",
          }}
        >
          <Select.ValueText
            placeholder="Select city"
            fontSize="lg"
            fontWeight="bold"
            color="#F7F9FC"
          />
        </Select.Trigger>

        <Select.IndicatorGroup>
          <Select.Indicator color="#F7F9FC" />
        </Select.IndicatorGroup>
      </Select.Control>

      <Portal>
        <Select.Positioner>
          <Select.Content
            bg="rgba(245, 248, 252, 0.96)"
            backdropFilter="blur(14px)"
            border="1px solid rgba(255, 255, 255, 0.5)"
            borderRadius="xl"
            boxShadow="0 18px 45px rgba(0, 0, 0, 0.18)"
            maxHeight="320px"
            overflowY="auto"
          >
            {cityCollection.items.map((city) => (
              <Select.Item
                item={city}
                key={city.value}
                fontSize="lg"
                fontWeight="semibold"
                paddingY="3"
                color="#17213B"
                _highlighted={{
                  bg: "rgba(49, 91, 214, 0.10)",
                }}
              >
                {city.label}

                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}

export default Dropdown;
