import { Route, Switch, useRouteMatch } from "react-router-dom"
import Brand from "./Brand";

const BrandRoute = () => {
    const { path } = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${path}/all`} component={Brand}></Route>
            </Switch>
        </>
    );
}

export default BrandRoute;