import { NativeSyntheticEvent, NativeScrollEvent } from "react-native"
import { Subject, combineLatest, Observable, ReplaySubject } from "rxjs"
import { InfiniteListState } from "@roborox/focal-react/build/src/infinite-list/domain"
import { useSubscription } from "@roborox/focal-react/build/src/use-subscription"

export const isScrollCloseToBottom = (offset: number, ev: NativeSyntheticEvent<NativeScrollEvent>) => {
	return ev.nativeEvent.layoutMeasurement.height + ev.nativeEvent.contentOffset.y >=
	ev.nativeEvent.contentSize.height - offset
}

export const useInfiniteListScrollEvent = (
	stateObeservable: Observable<InfiniteListState<any, any>>,
	loadNextObservable: ReplaySubject<() => Promise<void>>,
	eventsObservable: Subject<NativeSyntheticEvent<NativeScrollEvent>>,
	offset: number,
) => {
	useSubscription(combineLatest(
		stateObeservable, loadNextObservable, eventsObservable,
	), ([{ status, finished }, loadNext, event]) => {
		if (status.status === "success" && !finished && isScrollCloseToBottom(offset, event)) {
			loadNext()
		}
	})
}