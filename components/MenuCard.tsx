import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/type";
import React from "react";
import { Image, Platform, Text, TouchableOpacity } from "react-native";
const MenuCard = ({ item }: { item: MenuItem }) => {
  const {$id ,image_url, name, price } = item;
const {addItem} = useCartStore()
  return (
    <TouchableOpacity className="menu-card" style={Platform?.OS === 'android' ? {elevation:10, shadowColor:"#878787"} : {}}>
     <Image source={{uri:image_url}} className="size-32 absolute -top-10" resizeMode="contain"/>
     <Text className="text-center base-bold text-dark-100 mb-2" numberOfLines={1}>
        {name}
     </Text>
     <Text className="body-regular text-gray-200 mb-4">From AED {price}</Text>
     <TouchableOpacity onPress={()=> addItem({id:$id, name, image_url, price, customizations:[]})}>
        <Text className="paragraph-bold text-primary">Add to Cart +</Text>
     </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;
