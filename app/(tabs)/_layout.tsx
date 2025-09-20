import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { TabBarIconProps } from "@/type";
import cn from "clsx";
import { Redirect, Slot, Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const TabBarIcon = ({ focused, title, icon }: TabBarIconProps) => {
  return (
    <View className="tab-icon">
      <Image
        source={icon}
        className="size-7"
        resizeMode="contain"
        tintColor={focused ? "#FE8C00" : "#5D5F6D"}
      />
      <Text
        className={cn(
          "text-sm font-bold",
          focused ? "text-primary" : "text-gray-200"
        )}
      >
        {title}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href={"/sign-in"} />;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderRadius: 30,
          height: 80,
          marginHorizontal: 20,
          position: "absolute",
          bottom: 40,
          backgroundColor: "white",
          shadowColor: "#1a1a1a",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Home" focused={focused} icon={images.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Search" focused={focused} icon={images.search} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Cart" focused={focused} icon={images.bag} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Profile" focused={focused} icon={images.person} />
          ),
        }}
      />
      <Slot />
    </Tabs>
  );
};

export default TabLayout;
