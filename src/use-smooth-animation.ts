import { Animated } from "react-native"
import { Observable } from "rxjs"
import { useMemo } from "react"
import { getInitialState } from "@roborox/focal-react"
import { useSubscription } from "@roborox/focal-react/build/src/use-subscription"

export function useSmoothAnimation(
	value: Observable<number>,
	config: Omit<Animated.TimingAnimationConfig, "toValue">,
	initialValue = 0,
): Animated.Value {
	const animated = useMemo(() => new Animated.Value(getInitialState(value, initialValue) || initialValue), [])

	useSubscription(value, next => {
		Animated.timing(animated, {
			toValue: next,
			...config,
		}).start()
	}, [animated])

	return animated
}
