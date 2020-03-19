import { NativeSyntheticEvent, NativeScrollEvent } from "react-native"
import { InfiniteListState } from "@roborox/focal-react/build/src/infinite-list/domain"

export const isScrollCloseToBottom = (offset: number, ev: NativeSyntheticEvent<NativeScrollEvent>) => {
	return ev.nativeEvent.layoutMeasurement.height + ev.nativeEvent.contentOffset.y >=
	ev.nativeEvent.contentSize.height - offset
}

export const useScrollEvent = (state: InfiniteListState<any, any>, offset = 50) => {
	return (ev: NativeSyntheticEvent<NativeScrollEvent>, loadNext?: () => Promise<void>) => {
		if (loadNext
			&& isScrollCloseToBottom(offset, ev)
			&& !state.finished
			&& state.status.status === "success"
		) {
			loadNext()
		}
	}
}