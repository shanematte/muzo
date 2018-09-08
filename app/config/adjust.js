import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust'

let adjustConfig = new AdjustConfig('j60kc0gnzrb4', AdjustConfig.EnvironmentSandbox)

adjustConfig.setEventTrackingSucceededCallbackListener(function(eventSuccess) {
    // Printing all event success properties.
    console.log("Event tracking succeeded!")
    console.log(eventSuccess.message)
    console.log(eventSuccess.timestamp)
    console.log(eventSuccess.eventToken)
    console.log(eventSuccess.adid)
    console.log(eventSuccess.jsonResponse)
})

adjustConfig.setEventTrackingFailedCallbackListener(function(eventFailure) {
    console.log("Event tracking failed!")
    console.log(eventSuccess.message)
    console.log(eventSuccess.timestamp)
    console.log(eventSuccess.eventToken)
    console.log(eventSuccess.adid)
    console.log(eventSuccess.willRetry)
    console.log(eventSuccess.jsonResponse)
})

Adjust.create(adjustConfig)

export const adjust = Adjust
export const adjustConfigApp = AdjustConfig
export const adjustEvent = AdjustEvent