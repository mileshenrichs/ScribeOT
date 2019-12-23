import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export interface ProtectedRouteProps extends RouteProps {
    isLoggedIn: boolean
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, component, isLoggedIn }) => {

    if(!isLoggedIn) {
        const renderComponent = () => <Redirect to="/no-auth" />;
        return <Route path={path} component={renderComponent} render={undefined} />;
    } else {
        return <Route exact path={path} component={component} />;
    }
};

export default ProtectedRoute;