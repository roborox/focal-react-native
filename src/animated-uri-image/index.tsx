import React from "react"
import { Animated, Image } from "react-native"
import { Observable } from "rxjs"
import { useRx } from "@roborox/focal-react/build/src/use-rx"

export interface RxAnimatedUriImageProps extends React.ComponentProps<Animated.AnimatedComponent<Image>> {
	uri: Observable<string | number | undefined | null>,
}

export function RxAnimatedUriImage({ uri, ...restProps }: RxAnimatedUriImageProps) {
	const raw = useRx(uri)

	if (raw) {
		return <Animated.Image source={{ uri }} {...restProps} />
	}
	return null
}