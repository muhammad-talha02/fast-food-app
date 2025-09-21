import { Category } from "@/type";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Platform, Text, TouchableOpacity } from "react-native";

const defaultCategory = { $id: "all", name: "All" };

const CategoryFilter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams<{
    category: string;
  }>();

  const [activeCategory, setActiveCategory] = React.useState(
    searchParams.category || defaultCategory?.$id
  );

  const handlePress = (id: string) => {
    setActiveCategory(id);

    if (id === "all") router.setParams({ category: undefined });
    else router.setParams({ category: id });
  };


  const filterData = categories
    ? [defaultCategory, ...categories]
    : [defaultCategory];
  return (
    <FlatList
      data={filterData}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-x-2 pb-3"
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            key={item.$id}
            className={cn(
              "filter",
              activeCategory === item.$id ? "bg-amber-500" : "bg-white"
            )}
            style={
              Platform.OS === "android"
                ? { elevation: 5, shadowColor: "#878787" }
                : {}
            }
            onPress={() => handlePress(item.$id)}
          >
            <Text
              className={cn(
                "body-medium",
                activeCategory === item?.$id ? "text-white" : "text-gray-200"
              )}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    >
    </FlatList>
  );
};

export default CategoryFilter;
