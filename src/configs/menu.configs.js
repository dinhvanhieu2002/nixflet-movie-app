const main = [
  {
    display: "Home",
    initialParams: (handleScroll) => ({
      handleScroll: handleScroll,
    }),
    icon: "home-outline",
    typeIcon: "Ionicons",
  },
  {
    display: "Movies",
    initialParams: (handleScroll) => ({
      mediaType: "movie",
      handleScroll: handleScroll,
    }),
    icon: "movie-outline",
    typeIcon: "MaterialCommunityIcons",
  },
  {
    display: "TV Series",
    initialParams: (handleScroll) => ({
      mediaType: "tv",
      handleScroll: handleScroll,
    }),
    icon: "ios-tv-outline",
    typeIcon: "Ionicons",
  },
  {
    display: "Search",
    icon: "search-outline",
    typeIcon: "Ionicons",
  },
];

const user = [
  {
    display: "Favorites",
    icon: "heart-outline",
    typeIcon: "Ionicons",
  },
  {
    display: "Reviews",
    icon: "comment-outline",
    typeIcon: "MaterialCommunityIcons",
  },
  {
    display: "Password Update",
    icon: "lock-reset",
    typeIcon: "MaterialCommunityIcons",
  },
];

const menuConfigs = { main, user };

export default menuConfigs;
