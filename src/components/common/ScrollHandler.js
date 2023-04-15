import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { setScrollHeader } from "../../redux/features/scrollHeaderSlice";
import { useEffect } from "react";

export default function ScrollHandler({ children }) {
  const aref = useAnimatedRef();
  const scrollHandler = useScrollViewOffset(aref);
  const offsetY = useSharedValue(0);
  const dispatch = useDispatch();

  useAnimatedStyle(() => {
    offsetY.value = scrollHandler.value;

    return {};
  });

  useEffect(() => {
    dispatch(setScrollHeader(true));
  }, [offsetY.value]);

  // const scrollHandler = useAnimatedScrollHandler({
  //   onScroll: (event) => {
  //     if (event.contentOffset.y >= 50) {
  //       // dispatch(setScrollHeader(true));
  //       console.log("true");
  //       // runOnJS(dispatch)(setScrollHeader(true));
  //     }

  //     translationY.value = event.contentOffset.y;
  //   },
  //   // onBeginDrag: (e) => {

  //   //   isScrolling.value = true;
  //   // },
  //   // onEndDrag: (e) => {
  //   //   isScrolling.value = false;
  //   // },
  // });

  return <Animated.ScrollView ref={aref}>{children}</Animated.ScrollView>;
}
