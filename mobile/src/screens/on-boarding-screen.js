import React, {useState} from 'react'
import {
    Animated,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

// constants
import {colors, images, sizes} from '../constants'
import {adaptToHeight, adaptToWidth} from '../config/dimensions'
import routes from "../navigation/routes";

const {onBoarding1, onBoarding2, onBoarding3, onBoarding4} = images

const onBoardings = [
    {
        title: 'Accept a Job',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
        img: onBoarding1,
    },
    {
        title: 'Tracking Realtime',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
        img: onBoarding2,
    },
    {
        title: 'Earn Money',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
        img: onBoarding3,
    },
    {
        title: 'Enable Your location',
        description: 'Choose your location to start find the request around you.',
        img: onBoarding4,
    },
]

const OnBoarding = ({navigation}) => {
    const [completed, setCompleted] = useState(false)
    const scrollX = new Animated.Value(0)
    React.useEffect(() => {
        scrollX.addListener(({value}) => {
            if (Math.ceil(value / sizes.width) === onBoardings.length - 1) {
                setCompleted(true)
            } else {
                setCompleted(false)
            }
        })
        return () => scrollX.removeListener()
    }, [completed])

    function renderContent() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEnabled
                decelerationRate={0}
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false}
                )}
            >
                {onBoardings.map((item, index) => (
                    <View key={`img-${index}`} style={styles.imageAndTextContainer}>
                        <View
                            style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}
                        >
                            <Image
                                source={item.img}
                                resizeMode="cover"
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>

                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                navigation.navigate(routes.REGISTER)
                            }}
                        >
                            <Text style={styles.textButton}>
                                {completed ? 'Get Started' : 'Skip'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </Animated.ScrollView>
        )
    }

    function renderDots() {
        const dotPosition = Animated.divide(scrollX, sizes.width)

        return (
            <View style={styles.dotsContainer}>
                {onBoardings.map((item, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    })

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [adaptToWidth(0.03), 20, adaptToWidth(0.03)],
                        extrapolate: 'clamp',
                    })

                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={[styles.dot, {width: dotSize, height: dotSize}]}
                        />
                    )
                })}
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>{renderContent()}</View>
            <View style={styles.dotsRootContainer}>{renderDots()}</View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageAndTextContainer: {
        width: sizes.width,
    },
    dotsRootContainer: {
        position: 'absolute',
        bottom: sizes.height > 700 ? '5%' : '10%',
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: adaptToHeight(0.01) / 2,
        marginBottom: adaptToHeight(0.01) * 3,
        height: adaptToHeight(0.01),
    },
    dot: {
        borderRadius: sizes.radius,
        backgroundColor: colors.primary,
        marginHorizontal: sizes.margin,
    },
    textContainer: {
        position: 'absolute',
        bottom: '30%',
        left: 40,
        right: 40,
    },
    title: {
        fontSize: sizes.h1,
        fontFamily: 'latoMedium',
        color: colors.black,
        textAlign: 'center',
    },
    description: {
        fontSize: sizes.h2,
        textAlign: 'center',
        fontFamily: 'latoRegular',
        marginTop: adaptToHeight(0.04),
        color: colors.gray,
    },
    textButton: {
        fontSize: sizes.h2,
        color: colors.greyMedium,
        fontFamily: 'latoBold',
        textAlign: 'center',
    },
    button: {
        position: 'absolute',
        bottom: '18%',
        justifyContent: 'center',
        width: '100%',
    },
})

export default OnBoarding
