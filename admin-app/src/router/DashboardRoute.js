import { Route, Switch, useRouteMatch } from "react-router-dom"
import Dashboard from "../components/layouts/Dashboard";
import Header from "../components/layouts/Header";
import Sidebar from "../components/layouts/Sidebar";
import Footer from "../components/layouts/Footer";
import UserRoute from "../components/user/UserRoute";
import CategoryRoute from "../components/category/CategoryRoute";
// import GenreRoute from "../components/genre/GenreRoute";
// import VideoRoute from "../components/video/VideoRoute";
// import InterviewRoute from "../components/interview/InterviewRoute";

const DashboardRoute = () => {
    const { path } = useRouteMatch();
    return (
        <>
            <Header/>
            <Sidebar/>
            <Switch>
                <Route exact path={`${path}/dashboard`} component={Dashboard}></Route>
                <Route path={`${path}/user`} component={UserRoute}></Route>
                <Route path={`${path}/category`} component={CategoryRoute}></Route>
                {/* <Route path={`${path}/genre`} component={GenreRoute}></Route>
                <Route path={`${path}/video`} component={VideoRoute}></Route>
                <Route path={`${path}/interview`} component={InterviewRoute}></Route> */}
            </Switch>
            <Footer/>
        </>
    );
}

export default DashboardRoute;