import { NativeSyntheticEvent, NativeScrollEvent } from "react-native"
import { InfiniteListState } from "@roborox/focal-react/build/src/infinite-list/domain"
import { Observable } from "rxjs"
import { useRx } from "@roborox/focal-react/build/src/use-rx"

export const isScrollCloseToBottom = (offset: number, ev: NativeSyntheticEvent<NativeScrollEvent>) => {
	return ev.nativeEvent.layoutMeasurement.height + ev.nativeEvent.contentOffset.y >=
	ev.nativeEvent.contentSize.height - offset
}

export const useScrollEvent = (rxState: Observable<InfiniteListState<any, any>>, offset = 50) => {
	const state = useRx(rxState)

	return (ev: NativeSyntheticEvent<NativeScrollEvent>, loadNext?: () => Promise<void>) => {
		if ( state
			&& loadNext
			&& isScrollCloseToBottom(offset, ev)
			&& state.status.status === "success"
			&& !state.finished
		) {
			loadNext()
		}
	}
}