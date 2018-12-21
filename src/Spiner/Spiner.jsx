import React from 'react';
import {Dimer, Loader, Dimmer} from 'semantic-ui-react';

const Spiner = () => {
    return (
        <Dimmer active>
            <Loader size='huge' content={'Preparing chat...'}/>
        </Dimmer>
    );
};

export default Spiner;