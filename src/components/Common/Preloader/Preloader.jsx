import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

function Preloader() {
    return (
        <Dimmer inverted active>
            <Loader>Loading</Loader>
        </Dimmer>
    )
}

export default Preloader