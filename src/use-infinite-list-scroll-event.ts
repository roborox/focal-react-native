import { NativeSyntheticEvent, NativeScrollEvent } from "react-native"
import { InfiniteListState } from "@roborox/focal-react/build/src/infinite-list/domain"
import { Atom } from "@grammarly/focal"
import { useCallback } from "react"

export const isScrollCloseToBottom = (offset: number, ev: NativeSyntheticEvent<NativeScrollEvent>) => {
	return ev.nativeEvent.layoutMeasurement.height + ev.nativeEvent.contentOffset.y >=
	ev.nativeEvent.contentSize.height - offset
}

export const useInfiniteListScrollEvent = (
	state: Atom<InfiniteListState<any, any>>,
	loadNext: () => Promise<void>,
	offset: number,
) => useCallback((ev: NativeSyntheticEvent<NativeScrollEvent>) => {
	const { finished, status: { status } } = state.get()

	if (status === "success" && !finished && isScrollCloseToBottom(offset, ev)) {
		loadNext().then()
	}
}, [offset, loadNext, state])