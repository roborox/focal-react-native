import { NativeSyntheticEvent, NativeScrollEvent } from "react-native"
import { InfiniteListState } from "@roborox/focal-react/build/src/infinite-list/domain"
import { Atom } from "@grammarly/focal"

export const isScrollCloseToBottom = (offset: number, ev: NativeSyntheticEvent<NativeScrollEvent>) => {
	return ev.nativeEvent.layoutMeasurement.height + ev.nativeEvent.contentOffset.y >=
	ev.nativeEvent.contentSize.height - offset
}

export const useInfiniteListScrollEvent = (
	state: Atom<InfiniteListState<any, any>>,
	loadNext?: () => Promise<void>,
	offset = 50,
) => {
	return (ev: NativeSyntheticEvent<NativeScrollEvent>) => {
		const current = state.get()
		if (current) {
			const { status: { status }, finished } = current
			if (status === "success" && !finished && loadNext && isScrollCloseToBottom(offset, ev)) {
				loadNext()
			}
		}
	}
}