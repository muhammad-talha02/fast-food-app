import CartButton from "@/components/CartButton";
import CategoryFilter from "@/components/CategoryFilter";
import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";
import { getCategories, getMenuItems } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { Category, MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Search = () => {
  const { category, query } = useLocalSearchParams<{
    query: string;
    category: string;
  }>();

  const { data: categoriesData  } = useAppwrite({
    fn: getCategories,
  });
  const { data, refetch, loading } = useAppwrite({
    fn: getMenuItems,
    params: { category, query, limit: 6 },
  });

  useEffect(() => {
 refetch({ category, query, limit: 6 });
  }, [query, category]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}        
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;
          return (
            <View className={cn("flex-1 max-w-[48%]", !isFirstRightColItem ? "mt-10" : "mt-0")}>
              <MenuCard item={item as unknown as MenuItem}/>
            </View>
          );
        }}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => {
          return (
            <View className="my-5 gap-5">
              <View className="flex-between flex-row w-full">
                <View className="flex-start">
                  <Text className="small-bold text-primary">Search</Text>
                  <View className="flex-row flex-start gap-x-1 mt-0.5">
                    <Text className="paragraph-semibold text-dark-100">
                      Find your favourite food
                    </Text>
                  </View>
                </View>
                <CartButton/>
              </View>
             <SearchBar/>
              <CategoryFilter categories={categoriesData as unknown as Category[]}/>
            </View>
          );
        }}
        ListEmptyComponent={()=>!loading && <Text className="text-center">No items found</Text>}
      />
    </SafeAreaView>
  );
};

export default Search;
