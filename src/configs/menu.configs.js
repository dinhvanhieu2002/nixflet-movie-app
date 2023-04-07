const main = [
  {
    display: "Home",
    path: "index",
    icon: "home-outline",
    typeIcon: "Ionicons",
    state: "home",
  },
  {
    display: "Movies",
    path: "movie/list",
    icon: "movie-outline",
    typeIcon: "MaterialCommunityIcons",
    state: "movie",
  },
  {
    display: "TV Series",
    path: "tv/list",
    icon: "ios-tv-outline",
    typeIcon: "Ionicons",
    state: "tv",
  },
  {
    display: "Search",
    path: "search",
    icon: "search-outline",
    typeIcon: "Ionicons",
    state: "search",
  },
];

const user = [
  {
    display: "Favorites",
    path: "/favorites",
    icon: "heart-outline",
    state: "favorite",
  },
  {
    display: "Reviews",
    path: "/reviews",
    icon: "comment-outline",
    state: "reviews",
  },
  {
    display: "Password Update",
    path: "/password-update",
    icon: "lock-reset",
    state: "password.update",
  },
];

const menuConfigs = { main, user };

export default menuConfigs;
