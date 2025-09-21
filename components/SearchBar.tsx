import { images } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    Platform,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
const SearchBar = () => {
  const searchParams = useLocalSearchParams<{
    query: string;
  }>();
  const [query, setQuery] = useState(searchParams.query);

  const handleChange = (text: string) => {
    setQuery(text);
    if (!text) {
      router.setParams({ query: undefined });
    }
  };

  const handleSearch = () => {
    if (query.trim()) router.setParams({ query });
  };
  return (
    <View
      className="searchbar"
      style={
        Platform.OS === "android"
          ? { elevation: 5, shadowColor: "#878787" }
          : {}
      }
    >
      <TextInput
        className="flex-1 p-5"
        placeholder="Search for pizzas, burgers ..."
        value={query}
        onChangeText={handleChange}
        placeholderTextColor={"#A0A0A0"}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <TouchableOpacity className="pr-5" onPress={handleSearch}>
        <Image
          source={images.search}
          resizeMode="contain"
          tintColor={"#5D5F6D"}
          className="size-6"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
