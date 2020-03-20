import { Animated } from "react-native"
import { Observable } from "rxjs"
import { useEffect, useMemo } from "react"

export function useSmoothAnimation(
	value: Observable<number>,
	config: Omit<Animated.TimingAnimationConfig, "toValue">,
	initialValue = 0,
): Animated.Value {
	const animated = useMemo(() => new Animated.Value(initialValue), [])
	useEffect(() => {
		const s = value.subscribe(next => {
			Animated.timing(animated, {
				toValue: next,
				...config,
			}).start()
		})
		return () => s.unsubscribe()
	}, [animated])

	return animated
}