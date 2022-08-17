import React from 'react';
import { Context } from '../Context/Authentication';

const useToken = () => {
	const ctx = React.useContext(Context);

	return [ctx.state, ctx.setState];
};

export default useToken;