import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'
import Pagination from "../pagination/Pagination";
import Loader from "../loader/Loader";
import $ from 'jquery';
import { REMOVE_BANNER_MESSAGE, REMOVE_BANNER_REDIRECT, REMOVE_SINGLE_BANNER } from "../../store/types/BannerType";
import { deleteAction, fetchBanners, statusAction } from "../../store/actions/BannerAction";


const Banner = (props) => {

  const {message,loading,banners,count,perPage,pageLink, banner_status, bannerId} = useSelector((state)=> state.BannerReducer);
  const dispatch = useDispatch();
  const query = new URLSearchParams(props.location.search);
  const page = query.get('page')

  const deleteBanner = (id) =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAction(id));
      }
    })
  }
  const bannerStatus = () =>{
    $(document).on('click', '.updateBannerStatus', function(){
       const banner_id = $(this).attr('data-banner');
       const status = $(this).children("i").attr("status");
       dispatch(statusAction({banner_id,status}));
    })
  }
  useEffect(()=>{
    if(message){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: message,
          toast: true,
          showConfirmButton: false,
          timer: 2000
        })
      dispatch({type: REMOVE_BANNER_MESSAGE});
      dispatch({type: REMOVE_BANNER_REDIRECT});
      dispatch(fetchBanners(page));
    }
  },[message]);

  useEffect(()=>{
      dispatch(fetchBanners(page));
  },[page]);
  // Category Status Code
  useEffect(()=>{
      if(banner_status == 0){
        $('#banner-'+bannerId).html(`<i class='fas fa-toggle-off' aria-hidden='true' status=${banner_status}></i>`);
      }else{
        $('#banner-'+bannerId).html(`<i class='fas fa-toggle-on' aria-hidden='true' status=${banner_status}></i>`);
      }
  },[banner_status,bannerId]);

  useEffect(()=>{
    dispatch({type: REMOVE_SINGLE_BANNER});
  },[]);

    return (
        <div class="content-wrapper">
        <Helmet>
            <title>Banners - ecom website</title>
            <meta name="description" content="User Login Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 className="float-left">All Banner</h4>
                    <h3><NavLink exact to="/admin/banner/create"><button type="button" class="btn btn-primary float-right text-bold">Add Banner</button></NavLink></h3>
                  </div>
                  <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Banner Title</th>
                        <th>Banner Image</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                    {
                      !loading?
                      banners.length > 0 ?
                      banners.map((banner, index)=>(
                          <tr key={banner.id}>
                          <td>{ index+1}</td>
                          <td>{ banner.title }</td>
                          <td><img width="100" height="100" src={`${process.env.REACT_APP_API_PATH}/images/banner_images/${banner.image}`}/></td>
                          <td>
                              {
                                (banner.status === 1) ? 
                                <a class="updateBannerStatus" data-banner={banner.id} id={`banner-${banner.id}`} onClick={bannerStatus} href="javascript:void(0)"> <i class="fas fa-toggle-on" status={banner.status} aria-hidden="true"></i></a>
                                :<a class="updateBannerStatus" data-banner={banner.id} id={`banner-${banner.id}`} onClick={bannerStatus} href="javascript:void(0)"> <i class="fas fa-toggle-off" status={banner.status} aria-hidden="true"></i> </a> 
                              }
                          </td>
                          <td>
                            <NavLink exact to={`/admin/banner/edit/${banner.id}`} ><button className="text-success" ><i className="fas fa-edit"></i></button></NavLink>&nbsp;
                            <button onClick={() => deleteBanner(banner.id)} className="text-danger"><i className="fas fa-trash"></i></button>&nbsp;
                          </td>
                        </tr>
                        ))
                        :'No banners found'
                      :(<Loader/>)
                    }
                      </tbody>
                    </table>
                    
                  </div>
                </div>
                </div>
              </div>
            </div>
           {!loading ? <Pagination page={page} perPage={perPage} count={count} pageLink={pageLink} /> : ''}
        </section>
        </div>
    );
}

export default Banner;