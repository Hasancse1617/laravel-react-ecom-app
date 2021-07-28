import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
const Sidebar = () => {
    let { pathname } = useLocation();
    const {user} = useSelector((state)=>state.AuthReducer);
    return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* <!-- Brand Logo --> */}
                <NavLink to="/admin/dashboard" className="brand-link">
                <img src="/assets/images/admin_images/AdminLTELogo.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{opacity: .8 }} />
                <span className="brand-text font-weight-light">Admin Panel</span>
                </NavLink>

                {/* <!-- Sidebar --> */}
                <div className="sidebar">
                {/* <!-- Sidebar user (optional) --> */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                    <img src={!user.image?`${process.env.REACT_APP_API_PATH}/images/admin_images/avatar.png`:`${process.env.REACT_APP_API_PATH}/images/admin_images/${user.image}`} className="img-circle elevation-2" alt="User Image"/>
                    </div>
                    <div class="info">
                    <a href="#" className="d-block">{user.name}</a>
                    </div>
                </div>

                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    {/* <!-- Add icons to the links using the .nav-icon class */}
                        {/* with font-awesome or any other icon font library --> */}
                    <li className="nav-item has-treeview">
                        <NavLink exact to="/admin/dashboard" activeClassName="active" className="nav-link">
                        <i className="nav-icon fas fa-tachometer-alt"></i>
                        <p>
                            Dashboard
                        </p>
                        </NavLink>
                    </li>
                    <li className="nav-item has-treeview menu-open">
                        <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-copy"></i>
                        <p>
                            Users
                            <i className="fas fa-angle-left right"></i>
                        </p>
                        </a>
                        <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <NavLink exact to="/admin/user/all?page=1" activeClassName="active" className={pathname==='/admin/user/create'?'active nav-link':'nav-link'}>
                            <i className="far fa-circle nav-icon"></i>
                            <p>All User</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to={`/admin/user/update-profile/${user.id}`} activeClassName="active" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Update Profile</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to={`/admin/user/update-password/${user.id}`} activeClassName="active" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Update Password</p>
                            </NavLink>
                        </li>                          
                        </ul>
                    </li>
                    <li className="nav-item has-treeview menu-open">
                        <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-copy"></i>
                        <p>
                            Catelogues
                            <i className="fas fa-angle-left right"></i>
                        </p>
                        </a>
                        <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <NavLink exact to="/admin/banner/all?page=1" activeClassName="active" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Banner</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/admin/brand/all?page=1" activeClassName="active" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Brand</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/admin/category/all?page=1" activeClassName="active" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Category</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/admin/product/all?page=1" activeClassName="active" className={ pathname==='/admin/product/create' || pathname.includes('/admin/product/edit/') || pathname.includes('/admin/product/details/')?'nav-link active':'nav-link'}>
                            <i className="far fa-circle nav-icon"></i>
                            <p>Products</p>
                            </NavLink>
                        </li>                          
                        </ul>
                    </li>
                    <li className="nav-item has-treeview menu-open">
                        <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-copy"></i>
                        <p>
                            Interviews
                            <i className="fas fa-angle-left right"></i>
                        </p>
                        </a>
                        <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <NavLink exact to="/admin/interview/all?page=1" activeClassName="active" className={ pathname==='/admin/interview/create' || pathname.includes('/admin/interview/edit/')?'nav-link active':'nav-link'}>
                            <i className="far fa-circle nav-icon"></i>
                            <p>Interview</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/admin/genre/all?page=1" activeClassName="active" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Genres</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/admin/video/all?page=1" activeClassName="active" className={ pathname==='/admin/video/create' || pathname.includes('/admin/video/edit/') || pathname.includes('/admin/video/details/')?'nav-link active':'nav-link'}>
                            <i className="far fa-circle nav-icon"></i>
                            <p>Videos</p>
                            </NavLink>
                        </li>                          
                        </ul>
                    </li>
                    </ul>
                </nav>
                {/* <!-- /.sidebar-menu --> */}
                </div>
                {/* <!-- /.sidebar --> */}
            </aside>
    );
}

export default Sidebar;